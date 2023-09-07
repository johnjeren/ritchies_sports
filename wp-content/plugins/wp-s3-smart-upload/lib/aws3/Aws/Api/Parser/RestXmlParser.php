<?php

namespace BWPS\SSU\Aws3\Aws\Api\Parser;

use BWPS\SSU\Aws3\Aws\Api\StructureShape;
use BWPS\SSU\Aws3\Aws\Api\Service;
use BWPS\SSU\Aws3\Psr\Http\Message\ResponseInterface;
use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface;
/**
 * @internal Implements REST-XML parsing (e.g., S3, CloudFront, etc...)
 */
class RestXmlParser extends \BWPS\SSU\Aws3\Aws\Api\Parser\AbstractRestParser
{
    use PayloadParserTrait;
    /**
     * @param Service   $api    Service description
     * @param XmlParser $parser XML body parser
     */
    public function __construct(\BWPS\SSU\Aws3\Aws\Api\Service $api, \BWPS\SSU\Aws3\Aws\Api\Parser\XmlParser $parser = null)
    {
        parent::__construct($api);
        $this->parser = $parser ?: new \BWPS\SSU\Aws3\Aws\Api\Parser\XmlParser();
    }
    protected function payload(\BWPS\SSU\Aws3\Psr\Http\Message\ResponseInterface $response, \BWPS\SSU\Aws3\Aws\Api\StructureShape $member, array &$result)
    {
        $result += $this->parseMemberFromStream($response->getBody(), $member, $response);
    }
    public function parseMemberFromStream(\BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface $stream, \BWPS\SSU\Aws3\Aws\Api\StructureShape $member, $response)
    {
        $xml = $this->parseXml($stream, $response);
        return $this->parser->parse($member, $xml);
    }
}
