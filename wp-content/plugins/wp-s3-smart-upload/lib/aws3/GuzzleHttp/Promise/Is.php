<?php

namespace BWPS\SSU\Aws3\GuzzleHttp\Promise;

final class Is
{
    /**
     * Returns true if a promise is pending.
     *
     * @return bool
     */
    public static function pending(\BWPS\SSU\Aws3\GuzzleHttp\Promise\PromiseInterface $promise)
    {
        return $promise->getState() === \BWPS\SSU\Aws3\GuzzleHttp\Promise\PromiseInterface::PENDING;
    }
    /**
     * Returns true if a promise is fulfilled or rejected.
     *
     * @return bool
     */
    public static function settled(\BWPS\SSU\Aws3\GuzzleHttp\Promise\PromiseInterface $promise)
    {
        return $promise->getState() !== \BWPS\SSU\Aws3\GuzzleHttp\Promise\PromiseInterface::PENDING;
    }
    /**
     * Returns true if a promise is fulfilled.
     *
     * @return bool
     */
    public static function fulfilled(\BWPS\SSU\Aws3\GuzzleHttp\Promise\PromiseInterface $promise)
    {
        return $promise->getState() === \BWPS\SSU\Aws3\GuzzleHttp\Promise\PromiseInterface::FULFILLED;
    }
    /**
     * Returns true if a promise is rejected.
     *
     * @return bool
     */
    public static function rejected(\BWPS\SSU\Aws3\GuzzleHttp\Promise\PromiseInterface $promise)
    {
        return $promise->getState() === \BWPS\SSU\Aws3\GuzzleHttp\Promise\PromiseInterface::REJECTED;
    }
}
