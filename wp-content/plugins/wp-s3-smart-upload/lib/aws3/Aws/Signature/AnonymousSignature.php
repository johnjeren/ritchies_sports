<?php

namespace BWPS\SSU\Aws3\Aws\Signature;

use BWPS\SSU\Aws3\Aws\Credentials\CredentialsInterface;
use BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface;
/**
 * Provides anonymous client access (does not sign requests).
 */
class AnonymousSignature implements \BWPS\SSU\Aws3\Aws\Signature\SignatureInterface
{
    /**
     * /** {@inheritdoc}
     */
    public function signRequest(\BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $request, \BWPS\SSU\Aws3\Aws\Credentials\CredentialsInterface $credentials)
    {
        return $request;
    }
    /**
     * /** {@inheritdoc}
     */
    public function presign(\BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $request, \BWPS\SSU\Aws3\Aws\Credentials\CredentialsInterface $credentials, $expires, array $options = [])
    {
        return $request;
    }
}
