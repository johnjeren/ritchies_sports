<?php

namespace BWPS\SSU\Aws3\Aws\Api\Parser;

use BWPS\SSU\Aws3\Aws\Api\StructureShape;
use BWPS\SSU\Aws3\Aws\CommandInterface;
use BWPS\SSU\Aws3\Aws\Exception\AwsException;
use BWPS\SSU\Aws3\Psr\Http\Message\ResponseInterface;
use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface;
use BWPS\SSU\Aws3\GuzzleHttp\Psr7;
/**
 * @internal Decorates a parser and validates the x-amz-crc32 header.
 */
class Crc32ValidatingParser extends \BWPS\SSU\Aws3\Aws\Api\Parser\AbstractParser
{
    /**
     * @param callable $parser Parser to wrap.
     */
    public function __construct(callable $parser)
    {
        $this->parser = $parser;
    }
    public function __invoke(\BWPS\SSU\Aws3\Aws\CommandInterface $command, \BWPS\SSU\Aws3\Psr\Http\Message\ResponseInterface $response)
    {
        if ($expected = $response->getHeaderLine('x-amz-crc32')) {
            $hash = hexdec(\BWPS\SSU\Aws3\GuzzleHttp\Psr7\hash($response->getBody(), 'crc32b'));
            if ($expected != $hash) {
                throw new \BWPS\SSU\Aws3\Aws\Exception\AwsException("crc32 mismatch. Expected {$expected}, found {$hash}.", $command, ['code' => 'ClientChecksumMismatch', 'connection_error' => true, 'response' => $response]);
            }
        }
        $fn = $this->parser;
        return $fn($command, $response);
    }
    public function parseMemberFromStream(\BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface $stream, \BWPS\SSU\Aws3\Aws\Api\StructureShape $member, $response)
    {
        return $this->parser->parseMemberFromStream($stream, $member, $response);
    }
}
