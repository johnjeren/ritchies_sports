<?php

namespace BWPS\SSU\Aws3\Aws\Signature;

use BWPS\SSU\Aws3\Aws\Credentials\CredentialsInterface;
use BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface;
/**
 * Amazon S3 signature version 4 support.
 */
class S3SignatureV4 extends \BWPS\SSU\Aws3\Aws\Signature\SignatureV4
{
    /**
     * S3-specific signing logic
     *
     * {@inheritdoc}
     */
    public function signRequest(\BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $request, \BWPS\SSU\Aws3\Aws\Credentials\CredentialsInterface $credentials, $signingService = null)
    {
        // Always add a x-amz-content-sha-256 for data integrity
        if (!$request->hasHeader('x-amz-content-sha256')) {
            $request = $request->withHeader('x-amz-content-sha256', $this->getPayload($request));
        }
        if (strpos($request->getUri()->getHost(), "s3-object-lambda")) {
            return parent::signRequest($request, $credentials, "s3-object-lambda");
        }
        return parent::signRequest($request, $credentials);
    }
    /**
     * Always add a x-amz-content-sha-256 for data integrity.
     *
     * {@inheritdoc}
     */
    public function presign(\BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $request, \BWPS\SSU\Aws3\Aws\Credentials\CredentialsInterface $credentials, $expires, array $options = [])
    {
        if (!$request->hasHeader('x-amz-content-sha256')) {
            $request = $request->withHeader('X-Amz-Content-Sha256', $this->getPresignedPayload($request));
        }
        return parent::presign($request, $credentials, $expires, $options);
    }
    /**
     * Override used to allow pre-signed URLs to be created for an
     * in-determinate request payload.
     */
    protected function getPresignedPayload(\BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $request)
    {
        return \BWPS\SSU\Aws3\Aws\Signature\SignatureV4::UNSIGNED_PAYLOAD;
    }
    /**
     * Amazon S3 does not double-encode the path component in the canonical request
     */
    protected function createCanonicalizedPath($path)
    {
        // Only remove one slash in case of keys that have a preceding slash
        if (substr($path, 0, 1) === '/') {
            $path = substr($path, 1);
        }
        return '/' . $path;
    }
}
