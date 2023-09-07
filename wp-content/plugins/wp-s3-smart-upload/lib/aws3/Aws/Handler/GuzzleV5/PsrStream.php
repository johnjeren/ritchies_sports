<?php

namespace BWPS\SSU\Aws3\Aws\Handler\GuzzleV5;

use BWPS\SSU\Aws3\GuzzleHttp\Stream\StreamDecoratorTrait;
use BWPS\SSU\Aws3\GuzzleHttp\Stream\StreamInterface as GuzzleStreamInterface;
use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface as Psr7StreamInterface;
/**
 * Adapts a Guzzle 5 Stream to a PSR-7 Stream.
 *
 * @codeCoverageIgnore
 */
class PsrStream implements \BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface
{
    use StreamDecoratorTrait;
    /** @var GuzzleStreamInterface */
    private $stream;
    public function __construct(\BWPS\SSU\Aws3\GuzzleHttp\Stream\StreamInterface $stream)
    {
        $this->stream = $stream;
    }
    public function rewind()
    {
        $this->stream->seek(0);
    }
    public function getContents()
    {
        return $this->stream->getContents();
    }
}
