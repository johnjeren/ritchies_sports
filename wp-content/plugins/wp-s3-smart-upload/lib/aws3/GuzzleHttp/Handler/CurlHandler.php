<?php

namespace BWPS\SSU\Aws3\GuzzleHttp\Handler;

use BWPS\SSU\Aws3\GuzzleHttp\Psr7;
use BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface;
/**
 * HTTP handler that uses cURL easy handles as a transport layer.
 *
 * When using the CurlHandler, custom curl options can be specified as an
 * associative array of curl option constants mapping to values in the
 * **curl** key of the "client" key of the request.
 */
class CurlHandler
{
    /** @var CurlFactoryInterface */
    private $factory;
    /**
     * Accepts an associative array of options:
     *
     * - factory: Optional curl factory used to create cURL handles.
     *
     * @param array $options Array of options to use with the handler
     */
    public function __construct(array $options = [])
    {
        $this->factory = isset($options['handle_factory']) ? $options['handle_factory'] : new \BWPS\SSU\Aws3\GuzzleHttp\Handler\CurlFactory(3);
    }
    public function __invoke(\BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $request, array $options)
    {
        if (isset($options['delay'])) {
            usleep($options['delay'] * 1000);
        }
        $easy = $this->factory->create($request, $options);
        curl_exec($easy->handle);
        $easy->errno = curl_errno($easy->handle);
        return \BWPS\SSU\Aws3\GuzzleHttp\Handler\CurlFactory::finish($this, $easy, $this->factory);
    }
}
