<?php

namespace BWPS\SSU\Aws3\GuzzleHttp\Handler;

use BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface;
interface CurlFactoryInterface
{
    /**
     * Creates a cURL handle resource.
     *
     * @param RequestInterface $request Request
     * @param array            $options Transfer options
     *
     * @return EasyHandle
     * @throws \RuntimeException when an option cannot be applied
     */
    public function create(\BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $request, array $options);
    /**
     * Release an easy handle, allowing it to be reused or closed.
     *
     * This function must call unset on the easy handle's "handle" property.
     *
     * @param EasyHandle $easy
     */
    public function release(\BWPS\SSU\Aws3\GuzzleHttp\Handler\EasyHandle $easy);
}
