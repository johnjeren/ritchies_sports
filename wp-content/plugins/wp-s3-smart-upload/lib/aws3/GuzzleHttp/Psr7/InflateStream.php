<?php

namespace BWPS\SSU\Aws3\GuzzleHttp\Psr7;

use BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface;
/**
 * Uses PHP's zlib.inflate filter to inflate deflate or gzipped content.
 *
 * This stream decorator skips the first 10 bytes of the given stream to remove
 * the gzip header, converts the provided stream to a PHP stream resource,
 * then appends the zlib.inflate filter. The stream is then converted back
 * to a Guzzle stream resource to be used as a Guzzle stream.
 *
 * @link http://tools.ietf.org/html/rfc1952
 * @link http://php.net/manual/en/filters.compression.php
 *
 * @final
 */
class InflateStream implements \BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface
{
    use StreamDecoratorTrait;
    public function __construct(\BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface $stream)
    {
        // read the first 10 bytes, ie. gzip header
        $header = $stream->read(10);
        $filenameHeaderLength = $this->getLengthOfPossibleFilenameHeader($stream, $header);
        // Skip the header, that is 10 + length of filename + 1 (nil) bytes
        $stream = new \BWPS\SSU\Aws3\GuzzleHttp\Psr7\LimitStream($stream, -1, 10 + $filenameHeaderLength);
        $resource = \BWPS\SSU\Aws3\GuzzleHttp\Psr7\StreamWrapper::getResource($stream);
        stream_filter_append($resource, 'zlib.inflate', STREAM_FILTER_READ);
        $this->stream = $stream->isSeekable() ? new \BWPS\SSU\Aws3\GuzzleHttp\Psr7\Stream($resource) : new \BWPS\SSU\Aws3\GuzzleHttp\Psr7\NoSeekStream(new \BWPS\SSU\Aws3\GuzzleHttp\Psr7\Stream($resource));
    }
    /**
     * @param StreamInterface $stream
     * @param $header
     *
     * @return int
     */
    private function getLengthOfPossibleFilenameHeader(\BWPS\SSU\Aws3\Psr\Http\Message\StreamInterface $stream, $header)
    {
        $filename_header_length = 0;
        if (substr(bin2hex($header), 6, 2) === '08') {
            // we have a filename, read until nil
            $filename_header_length = 1;
            while ($stream->read(1) !== chr(0)) {
                $filename_header_length++;
            }
        }
        return $filename_header_length;
    }
}
