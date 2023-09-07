<?php

namespace BWPS\SSU\Aws3\Aws\Handler\GuzzleV5;

use BWPS\SSU\Aws3\GuzzleHttp\Stream\StreamDecoratorTrait;
use BWPS\SSU\Aws3\GuzzleHttp\Stream\StreamInterface as GuzzleStreamInterface;
use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface as Psr7StreamInterface;
/**
 * Adapts a PSR-7 Stream to a Guzzle 5 Stream.
 *
 * @codeCoverageIgnore
 */
class GuzzleStream implements \BWPS\SSU\Aws3\GuzzleHttp\Stream\StreamInterface
{
    use StreamDecoratorTrait;
    /** @var Psr7StreamInterface */
    private $stream;
    public function __construct(\BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface $stream)
    {
        $this->stream = $stream;
    }
}
