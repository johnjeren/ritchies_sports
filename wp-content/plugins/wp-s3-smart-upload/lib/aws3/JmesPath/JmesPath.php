<?php

namespace BWPS\SSU\Aws3\JmesPath;

/**
 * Returns data from the input array that matches a JMESPath expression.
 *
 * @param string $expression Expression to search.
 * @param mixed $data Data to search.
 *
 * @return mixed
 */
if (!function_exists(__NAMESPACE__ . '\\search')) {
    function search($expression, $data)
    {
        return \BWPS\SSU\Aws3\JmesPath\Env::search($expression, $data);
    }
}
