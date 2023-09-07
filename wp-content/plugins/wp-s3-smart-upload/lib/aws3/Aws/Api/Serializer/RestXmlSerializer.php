<?php

namespace BWPS\SSU\Aws3\Aws\Api\Serializer;

use BWPS\SSU\Aws3\Aws\Api\StructureShape;
use BWPS\SSU\Aws3\Aws\Api\Service;
/**
 * @internal
 */
class RestXmlSerializer extends \BWPS\SSU\Aws3\Aws\Api\Serializer\RestSerializer
{
    /** @var XmlBody */
    private $xmlBody;
    /**
     * @param Service $api      Service API description
     * @param string  $endpoint Endpoint to connect to
     * @param XmlBody $xmlBody  Optional XML formatter to use
     */
    public function __construct(\BWPS\SSU\Aws3\Aws\Api\Service $api, $endpoint, \BWPS\SSU\Aws3\Aws\Api\Serializer\XmlBody $xmlBody = null)
    {
        parent::__construct($api, $endpoint);
        $this->xmlBody = $xmlBody ?: new \BWPS\SSU\Aws3\Aws\Api\Serializer\XmlBody($api);
    }
    protected function payload(\BWPS\SSU\Aws3\Aws\Api\StructureShape $member, array $value, array &$opts)
    {
        $opts['headers']['Content-Type'] = 'application/xml';
        $opts['body'] = (string) $this->xmlBody->build($member, $value);
    }
}
