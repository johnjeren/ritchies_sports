<?php

namespace BWPS\SSU\Aws3\Aws\Api\Serializer;

use BWPS\SSU\Aws3\Aws\Api\Service;
use BWPS\SSU\Aws3\Aws\CommandInterface;
use BWPS\SSU\Aws3\GuzzleHttp\Psr7\Request;
use BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface;
/**
 * Prepares a JSON-RPC request for transfer.
 * @internal
 */
class JsonRpcSerializer
{
    /** @var JsonBody */
    private $jsonFormatter;
    /** @var string */
    private $endpoint;
    /** @var Service */
    private $api;
    /** @var string */
    private $contentType;
    /**
     * @param Service  $api           Service description
     * @param string   $endpoint      Endpoint to connect to
     * @param JsonBody $jsonFormatter Optional JSON formatter to use
     */
    public function __construct(\BWPS\SSU\Aws3\Aws\Api\Service $api, $endpoint, \BWPS\SSU\Aws3\Aws\Api\Serializer\JsonBody $jsonFormatter = null)
    {
        $this->endpoint = $endpoint;
        $this->api = $api;
        $this->jsonFormatter = $jsonFormatter ?: new \BWPS\SSU\Aws3\Aws\Api\Serializer\JsonBody($this->api);
        $this->contentType = \BWPS\SSU\Aws3\Aws\Api\Serializer\JsonBody::getContentType($api);
    }
    /**
     * When invoked with an AWS command, returns a serialization array
     * containing "method", "uri", "headers", and "body" key value pairs.
     *
     * @param CommandInterface $command
     *
     * @return RequestInterface
     */
    public function __invoke(\BWPS\SSU\Aws3\Aws\CommandInterface $command)
    {
        $name = $command->getName();
        $operation = $this->api->getOperation($name);
        return new \BWPS\SSU\Aws3\GuzzleHttp\Psr7\Request($operation['http']['method'], $this->endpoint, ['X-Amz-Target' => $this->api->getMetadata('targetPrefix') . '.' . $name, 'Content-Type' => $this->contentType], $this->jsonFormatter->build($operation->getInput(), $command->toArray()));
    }
}
