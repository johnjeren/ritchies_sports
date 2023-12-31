<?php

namespace BWPS\SSU\Aws3\Aws\Crypto;

use BWPS\SSU\Aws3\Aws\Exception\CryptoException;
use BWPS\SSU\Aws3\Aws\Kms\KmsClient;
/**
 * Uses KMS to supply materials for encrypting and decrypting data. This
 * V2 implementation should be used with the V2 encryption clients (i.e.
 * S3EncryptionClientV2).
 */
class KmsMaterialsProviderV2 extends \BWPS\SSU\Aws3\Aws\Crypto\MaterialsProviderV2 implements \BWPS\SSU\Aws3\Aws\Crypto\MaterialsProviderInterfaceV2
{
    const WRAP_ALGORITHM_NAME = 'kms+context';
    private $kmsClient;
    private $kmsKeyId;
    /**
     * @param KmsClient $kmsClient A KMS Client for use encrypting and
     *                             decrypting keys.
     * @param string $kmsKeyId The private KMS key id to be used for encrypting
     *                         and decrypting keys.
     */
    public function __construct(\BWPS\SSU\Aws3\Aws\Kms\KmsClient $kmsClient, $kmsKeyId = null)
    {
        $this->kmsClient = $kmsClient;
        $this->kmsKeyId = $kmsKeyId;
    }
    /**
     * @inheritDoc
     */
    public function getWrapAlgorithmName()
    {
        return self::WRAP_ALGORITHM_NAME;
    }
    /**
     * @inheritDoc
     */
    public function decryptCek($encryptedCek, $materialDescription, $options)
    {
        $params = ['CiphertextBlob' => $encryptedCek, 'EncryptionContext' => $materialDescription];
        if (empty($options['@KmsAllowDecryptWithAnyCmk'])) {
            if (empty($this->kmsKeyId)) {
                throw new \BWPS\SSU\Aws3\Aws\Exception\CryptoException('KMS CMK ID was not specified and the' . ' operation is not opted-in to attempting to use any valid' . ' CMK it discovers. Please specify a CMK ID, or explicitly' . ' enable attempts to use any valid KMS CMK with the' . ' @KmsAllowDecryptWithAnyCmk option.');
            }
            $params['KeyId'] = $this->kmsKeyId;
        }
        $result = $this->kmsClient->decrypt($params);
        return $result['Plaintext'];
    }
    /**
     * @inheritDoc
     */
    public function generateCek($keySize, $context, $options)
    {
        if (empty($this->kmsKeyId)) {
            throw new \BWPS\SSU\Aws3\Aws\Exception\CryptoException('A KMS key id is required for encryption' . ' with KMS keywrap. Use a KmsMaterialsProviderV2 that has been' . ' instantiated with a KMS key id.');
        }
        $options = array_change_key_case($options);
        if (!isset($options['@kmsencryptioncontext']) || !is_array($options['@kmsencryptioncontext'])) {
            throw new \BWPS\SSU\Aws3\Aws\Exception\CryptoException("'@KmsEncryptionContext' is a" . " required argument when using KmsMaterialsProviderV2, and" . " must be an associative array (or empty array).");
        }
        if (isset($options['@kmsencryptioncontext']['aws:x-amz-cek-alg'])) {
            throw new \BWPS\SSU\Aws3\Aws\Exception\CryptoException("Conflict in reserved @KmsEncryptionContext" . " key aws:x-amz-cek-alg. This value is reserved for the S3" . " Encryption Client and cannot be set by the user.");
        }
        $context = array_merge($options['@kmsencryptioncontext'], $context);
        $result = $this->kmsClient->generateDataKey(['KeyId' => $this->kmsKeyId, 'KeySpec' => "AES_{$keySize}", 'EncryptionContext' => $context]);
        return ['Plaintext' => $result['Plaintext'], 'Ciphertext' => base64_encode($result['CiphertextBlob']), 'UpdatedContext' => $context];
    }
}
