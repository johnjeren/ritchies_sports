<?php

namespace BWPS\SSU\Aws3\Aws\Api\Parser;

use BWPS\SSU\Aws3\Aws\Api\Service;
use BWPS\SSU\Aws3\Aws\Api\StructureShape;
use BWPS\SSU\Aws3\Aws\CommandInterface;
use BWPS\SSU\Aws3\Aws\ResultInterface;
use BWPS\SSU\Aws3\Psr\Http\Message\ResponseInterface;
use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface;
/**
 * @internal
 */
abstract class AbstractParser
{
    /** @var \Aws\Api\Service Representation of the service API*/
    protected $api;
    /** @var callable */
    protected $parser;
    /**
     * @param Service $api Service description.
     */
    public function __construct(\BWPS\SSU\Aws3\Aws\Api\Service $api)
    {
        $this->api = $api;
    }
    /**
     * @param CommandInterface  $command  Command that was executed.
     * @param ResponseInterface $response Response that was received.
     *
     * @return ResultInterface
     */
    public abstract function __invoke(\BWPS\SSU\Aws3\Aws\CommandInterface $command, \BWPS\SSU\Aws3\Psr\Http\Message\ResponseInterface $response);
    public abstract function parseMemberFromStream(\BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface $stream, \BWPS\SSU\Aws3\Aws\Api\StructureShape $member, $response);
}
