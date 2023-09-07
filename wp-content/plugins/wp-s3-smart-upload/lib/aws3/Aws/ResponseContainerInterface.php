<?php

namespace BWPS\SSU\Aws3\Aws;

use BWPS\SSU\Aws3\Psr\Http\Message\ResponseInterface;
interface ResponseContainerInterface
{
    /**
     * Get the received HTTP response if any.
     *
     * @return ResponseInterface|null
     */
    public function getResponse();
}
