<?php

namespace BWPS\SSU\Aws3\Aws\Crypto;

use BWPS\SSU\Aws3\Aws\Exception\CryptoException;
use BWPS\SSU\Aws3\GuzzleHttp\Psr7;
use BWPS\SSU\Aws3\GuzzleHttp\Psr7\StreamDecoratorTrait;
use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface;
use BWPS\SSU\Aws3\Aws\Crypto\Polyfill\AesGcm;
use BWPS\SSU\Aws3\Aws\Crypto\Polyfill\Key;
/**
 * @internal Represents a stream of data to be gcm decrypted.
 */
class AesGcmDecryptingStream implements \BWPS\SSU\Aws3\Aws\Crypto\AesStreamInterface
{
    use StreamDecoratorTrait;
    private $aad;
    private $initializationVector;
    private $key;
    private $keySize;
    private $cipherText;
    private $tag;
    private $tagLength;
    /**
     * @param StreamInterface $cipherText
     * @param string $key
     * @param string $initializationVector
     * @param string $tag
     * @param string $aad
     * @param int $tagLength
     * @param int $keySize
     */
    public function __construct(\BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface $cipherText, $key, $initializationVector, $tag, $aad = '', $tagLength = 128, $keySize = 256)
    {
        $this->cipherText = $cipherText;
        $this->key = $key;
        $this->initializationVector = $initializationVector;
        $this->tag = $tag;
        $this->aad = $aad;
        $this->tagLength = $tagLength;
        $this->keySize = $keySize;
    }
    public function getOpenSslName()
    {
        return "aes-{$this->keySize}-gcm";
    }
    public function getAesName()
    {
        return 'AES/GCM/NoPadding';
    }
    public function getCurrentIv()
    {
        return $this->initializationVector;
    }
    public function createStream()
    {
        if (version_compare(PHP_VERSION, '7.1', '<')) {
            return \BWPS\SSU\Aws3\GuzzleHttp\Psr7\stream_for(\BWPS\SSU\Aws3\Aws\Crypto\Polyfill\AesGcm::decrypt((string) $this->cipherText, $this->initializationVector, new \BWPS\SSU\Aws3\Aws\Crypto\Polyfill\Key($this->key), $this->aad, $this->tag, $this->keySize));
        } else {
            $result = \openssl_decrypt((string) $this->cipherText, $this->getOpenSslName(), $this->key, OPENSSL_RAW_DATA, $this->initializationVector, $this->tag, $this->aad);
            if ($result === false) {
                throw new \BWPS\SSU\Aws3\Aws\Exception\CryptoException('The requested object could not be' . ' decrypted due to an invalid authentication tag.');
            }
            return \BWPS\SSU\Aws3\GuzzleHttp\Psr7\stream_for($result);
        }
    }
    public function isWritable()
    {
        return false;
    }
}
