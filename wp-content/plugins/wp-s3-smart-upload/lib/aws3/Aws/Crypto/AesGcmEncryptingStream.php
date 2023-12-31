<?php

namespace BWPS\SSU\Aws3\Aws\Crypto;

use BWPS\SSU\Aws3\Aws\Crypto\Polyfill\AesGcm;
use BWPS\SSU\Aws3\Aws\Crypto\Polyfill\Key;
use BWPS\SSU\Aws3\GuzzleHttp\Psr7;
use BWPS\SSU\Aws3\GuzzleHttp\Psr7\StreamDecoratorTrait;
use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface;
use RuntimeException;
/**
 * @internal Represents a stream of data to be gcm encrypted.
 */
class AesGcmEncryptingStream implements \BWPS\SSU\Aws3\Aws\Crypto\AesStreamInterface, \BWPS\SSU\Aws3\Aws\Crypto\AesStreamInterfaceV2
{
    use StreamDecoratorTrait;
    private $aad;
    private $initializationVector;
    private $key;
    private $keySize;
    private $plaintext;
    private $tag = '';
    private $tagLength;
    /**
     * Same as non-static 'getAesName' method, allowing calls in a static
     * context.
     *
     * @return string
     */
    public static function getStaticAesName()
    {
        return 'AES/GCM/NoPadding';
    }
    /**
     * @param StreamInterface $plaintext
     * @param string $key
     * @param string $initializationVector
     * @param string $aad
     * @param int $tagLength
     * @param int $keySize
     */
    public function __construct(\BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface $plaintext, $key, $initializationVector, $aad = '', $tagLength = 16, $keySize = 256)
    {
        $this->plaintext = $plaintext;
        $this->key = $key;
        $this->initializationVector = $initializationVector;
        $this->aad = $aad;
        $this->tagLength = $tagLength;
        $this->keySize = $keySize;
    }
    public function getOpenSslName()
    {
        return "aes-{$this->keySize}-gcm";
    }
    /**
     * Same as static method and retained for backwards compatibility
     *
     * @return string
     */
    public function getAesName()
    {
        return self::getStaticAesName();
    }
    public function getCurrentIv()
    {
        return $this->initializationVector;
    }
    public function createStream()
    {
        if (version_compare(PHP_VERSION, '7.1', '<')) {
            return \BWPS\SSU\Aws3\GuzzleHttp\Psr7\stream_for(\BWPS\SSU\Aws3\Aws\Crypto\Polyfill\AesGcm::encrypt((string) $this->plaintext, $this->initializationVector, new \BWPS\SSU\Aws3\Aws\Crypto\Polyfill\Key($this->key), $this->aad, $this->tag, $this->keySize));
        } else {
            return \BWPS\SSU\Aws3\GuzzleHttp\Psr7\stream_for(\openssl_encrypt((string) $this->plaintext, $this->getOpenSslName(), $this->key, OPENSSL_RAW_DATA, $this->initializationVector, $this->tag, $this->aad, $this->tagLength));
        }
    }
    /**
     * @return string
     */
    public function getTag()
    {
        return $this->tag;
    }
    public function isWritable()
    {
        return false;
    }
}
