<?php

namespace BWPS\SSU\Aws3\Aws\Crypto;

use BWPS\SSU\Aws3\GuzzleHttp\Psr7;
use BWPS\SSU\Aws3\GuzzleHttp\Psr7\AppendStream;
use BWPS\SSU\Aws3\GuzzleHttp\Psr7\Stream;
use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface;
trait EncryptionTraitV2
{
    private static $allowedOptions = ['Cipher' => true, 'KeySize' => true, 'Aad' => true];
    private static $encryptClasses = ['gcm' => \BWPS\SSU\Aws3\Aws\Crypto\AesGcmEncryptingStream::class];
    /**
     * Dependency to generate a CipherMethod from a set of inputs for loading
     * in to an AesEncryptingStream.
     *
     * @param string $cipherName Name of the cipher to generate for encrypting.
     * @param string $iv Base Initialization Vector for the cipher.
     * @param int $keySize Size of the encryption key, in bits, that will be
     *                     used.
     *
     * @return Cipher\CipherMethod
     *
     * @internal
     */
    protected abstract function buildCipherMethod($cipherName, $iv, $keySize);
    /**
     * Builds an AesStreamInterface and populates encryption metadata into the
     * supplied envelope.
     *
     * @param Stream $plaintext Plain-text data to be encrypted using the
     *                          materials, algorithm, and data provided.
     * @param array $options    Options for use in encryption, including cipher
     *                          options, and encryption context.
     * @param MaterialsProviderV2 $provider A provider to supply and encrypt
     *                                      materials used in encryption.
     * @param MetadataEnvelope $envelope A storage envelope for encryption
     *                                   metadata to be added to.
     *
     * @return StreamInterface
     *
     * @throws \InvalidArgumentException Thrown when a value in $options['@CipherOptions']
     *                                   is not valid.
     *s
     * @internal
     */
    public function encrypt(\BWPS\SSU\Aws3\GuzzleHttp\Psr7\Stream $plaintext, array $options, \BWPS\SSU\Aws3\Aws\Crypto\MaterialsProviderV2 $provider, \BWPS\SSU\Aws3\Aws\Crypto\MetadataEnvelope $envelope)
    {
        $options = array_change_key_case($options);
        $cipherOptions = array_intersect_key($options['@cipheroptions'], self::$allowedOptions);
        if (empty($cipherOptions['Cipher'])) {
            throw new \InvalidArgumentException('An encryption cipher must be' . ' specified in @CipherOptions["Cipher"].');
        }
        $cipherOptions['Cipher'] = strtolower($cipherOptions['Cipher']);
        if (!self::isSupportedCipher($cipherOptions['Cipher'])) {
            throw new \InvalidArgumentException('The cipher requested is not' . ' supported by the SDK.');
        }
        if (empty($cipherOptions['KeySize'])) {
            $cipherOptions['KeySize'] = 256;
        }
        if (!is_int($cipherOptions['KeySize'])) {
            throw new \InvalidArgumentException('The cipher "KeySize" must be' . ' an integer.');
        }
        if (!\BWPS\SSU\Aws3\Aws\Crypto\MaterialsProviderV2::isSupportedKeySize($cipherOptions['KeySize'])) {
            throw new \InvalidArgumentException('The cipher "KeySize" requested' . ' is not supported by AES (128 or 256).');
        }
        $cipherOptions['Iv'] = $provider->generateIv($this->getCipherOpenSslName($cipherOptions['Cipher'], $cipherOptions['KeySize']));
        $encryptClass = self::$encryptClasses[$cipherOptions['Cipher']];
        $aesName = $encryptClass::getStaticAesName();
        $materialsDescription = ['aws:x-amz-cek-alg' => $aesName];
        $keys = $provider->generateCek($cipherOptions['KeySize'], $materialsDescription, $options);
        // Some providers modify materials description based on options
        if (isset($keys['UpdatedContext'])) {
            $materialsDescription = $keys['UpdatedContext'];
        }
        $encryptingStream = $this->getEncryptingStream($plaintext, $keys['Plaintext'], $cipherOptions);
        // Populate envelope data
        $envelope[\BWPS\SSU\Aws3\Aws\Crypto\MetadataEnvelope::CONTENT_KEY_V2_HEADER] = $keys['Ciphertext'];
        unset($keys);
        $envelope[\BWPS\SSU\Aws3\Aws\Crypto\MetadataEnvelope::IV_HEADER] = base64_encode($cipherOptions['Iv']);
        $envelope[\BWPS\SSU\Aws3\Aws\Crypto\MetadataEnvelope::KEY_WRAP_ALGORITHM_HEADER] = $provider->getWrapAlgorithmName();
        $envelope[\BWPS\SSU\Aws3\Aws\Crypto\MetadataEnvelope::CONTENT_CRYPTO_SCHEME_HEADER] = $aesName;
        $envelope[\BWPS\SSU\Aws3\Aws\Crypto\MetadataEnvelope::UNENCRYPTED_CONTENT_LENGTH_HEADER] = strlen($plaintext);
        $envelope[\BWPS\SSU\Aws3\Aws\Crypto\MetadataEnvelope::MATERIALS_DESCRIPTION_HEADER] = json_encode($materialsDescription);
        if (!empty($cipherOptions['Tag'])) {
            $envelope[\BWPS\SSU\Aws3\Aws\Crypto\MetadataEnvelope::CRYPTO_TAG_LENGTH_HEADER] = strlen($cipherOptions['Tag']) * 8;
        }
        return $encryptingStream;
    }
    /**
     * Generates a stream that wraps the plaintext with the proper cipher and
     * uses the content encryption key (CEK) to encrypt the data when read.
     *
     * @param Stream $plaintext Plain-text data to be encrypted using the
     *                          materials, algorithm, and data provided.
     * @param string $cek A content encryption key for use by the stream for
     *                    encrypting the plaintext data.
     * @param array $cipherOptions Options for use in determining the cipher to
     *                             be used for encrypting data.
     *
     * @return [AesStreamInterface, string]
     *
     * @internal
     */
    protected function getEncryptingStream(\BWPS\SSU\Aws3\GuzzleHttp\Psr7\Stream $plaintext, $cek, &$cipherOptions)
    {
        switch ($cipherOptions['Cipher']) {
            // Only 'gcm' is supported for encryption currently
            case 'gcm':
                $cipherOptions['TagLength'] = 16;
                $encryptClass = self::$encryptClasses['gcm'];
                $cipherTextStream = new $encryptClass($plaintext, $cek, $cipherOptions['Iv'], $cipherOptions['Aad'] = isset($cipherOptions['Aad']) ? $cipherOptions['Aad'] : '', $cipherOptions['TagLength'], $cipherOptions['KeySize']);
                if (!empty($cipherOptions['Aad'])) {
                    trigger_error("'Aad' has been supplied for content encryption" . " with " . $cipherTextStream->getAesName() . ". The" . " PHP SDK encryption client can decrypt an object" . " encrypted in this way, but other AWS SDKs may not be" . " able to.", E_USER_WARNING);
                }
                $appendStream = new \BWPS\SSU\Aws3\GuzzleHttp\Psr7\AppendStream([$cipherTextStream->createStream()]);
                $cipherOptions['Tag'] = $cipherTextStream->getTag();
                $appendStream->addStream(\BWPS\SSU\Aws3\GuzzleHttp\Psr7\stream_for($cipherOptions['Tag']));
                return $appendStream;
        }
    }
}
