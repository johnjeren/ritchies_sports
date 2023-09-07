<?php

namespace BWPS\SSU\Aws3\Aws\S3\Crypto;

use BWPS\SSU\Aws3\Aws\AwsClientInterface;
use BWPS\SSU\Aws3\Aws\Middleware;
use BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface;
trait UserAgentTrait
{
    private function appendUserAgent(\BWPS\SSU\Aws3\Aws\AwsClientInterface $client, $agentString)
    {
        $list = $client->getHandlerList();
        $list->appendBuild(\BWPS\SSU\Aws3\Aws\Middleware::mapRequest(function (\BWPS\SSU\Aws3\Psr\Http\Message\RequestInterface $req) use($agentString) {
            if (!empty($req->getHeader('User-Agent')) && !empty($req->getHeader('User-Agent')[0])) {
                $userAgent = $req->getHeader('User-Agent')[0];
                if (strpos($userAgent, $agentString) === false) {
                    $userAgent .= " {$agentString}";
                }
            } else {
                $userAgent = $agentString;
            }
            $req = $req->withHeader('User-Agent', $userAgent);
            return $req;
        }));
    }
}
