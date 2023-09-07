<?php

namespace BWPS\SSU\Aws3\Aws\ClientSideMonitoring;

use BWPS\SSU\Aws3\Aws\CommandInterface;
use BWPS\SSU\Aws3\Aws\Exception\AwsException;
use BWPS\SSU\Aws3\Aws\ResultInterface;
use BWPS\SSU\Aws3\GuzzleHttp\Psr7\Request;
use BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface;
/**
 * @internal
 */
interface MonitoringMiddlewareInterface
{
    /**
     * Data for event properties to be sent to the monitoring agent.
     *
     * @param RequestInterface $request
     * @return array
     */
    public static function getRequestData(\BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $request);
    /**
     * Data for event properties to be sent to the monitoring agent.
     *
     * @param ResultInterface|AwsException|\Exception $klass
     * @return array
     */
    public static function getResponseData($klass);
    public function __invoke(\BWPS\SSU\Aws3\Aws\CommandInterface $cmd, \BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $request);
}
