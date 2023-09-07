<?php

namespace BWPS\SSU\Aws3\Aws\Api\Parser;

use BWPS\SSU\Aws3\Aws\Api\Service;
use BWPS\SSU\Aws3\Aws\Api\StructureShape;
use BWPS\SSU\Aws3\Psr\Http\Message\ResponseInterface;
use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface;
/**
 * @internal Implements REST-JSON parsing (e.g., Glacier, Elastic Transcoder)
 */
class RestJsonParser extends \BWPS\SSU\Aws3\Aws\Api\Parser\AbstractRestParser
{
    use PayloadParserTrait;
    /**
     * @param Service    $api    Service description
     * @param JsonParser $parser JSON body builder
     */
    public function __construct(\BWPS\SSU\Aws3\Aws\Api\Service $api, \BWPS\SSU\Aws3\Aws\Api\Parser\JsonParser $parser = null)
    {
        parent::__construct($api);
        $this->parser = $parser ?: new \BWPS\SSU\Aws3\Aws\Api\Parser\JsonParser();
    }
    protected function payload(\BWPS\SSU\Aws3\Psr\Http\Message\ResponseInterface $response, \BWPS\SSU\Aws3\Aws\Api\StructureShape $member, array &$result)
    {
        $jsonBody = $this->parseJson($response->getBody(), $response);
        if ($jsonBody) {
            $result += $this->parser->parse($member, $jsonBody);
        }
    }
    public function parseMemberFromStream(\BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface $stream, \BWPS\SSU\Aws3\Aws\Api\StructureShape $member, $response)
    {
        $jsonBody = $this->parseJson($stream, $response);
        if ($jsonBody) {
            return $this->parser->parse($member, $jsonBody);
        }
        return [];
    }
}
