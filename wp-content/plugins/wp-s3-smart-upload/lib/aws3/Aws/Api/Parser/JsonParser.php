<?php

namespace BWPS\SSU\Aws3\Aws\Api\Parser;

use BWPS\SSU\Aws3\Aws\Api\DateTimeResult;
use BWPS\SSU\Aws3\Aws\Api\Shape;
/**
 * @internal Implements standard JSON parsing.
 */
class JsonParser
{
    public function parse(\BWPS\SSU\Aws3\Aws\Api\Shape $shape, $value)
    {
        if ($value === null) {
            return $value;
        }
        switch ($shape['type']) {
            case 'structure':
                $target = [];
                foreach ($shape->getMembers() as $name => $member) {
                    $locationName = $member['locationName'] ?: $name;
                    if (isset($value[$locationName])) {
                        $target[$name] = $this->parse($member, $value[$locationName]);
                    }
                }
                return $target;
            case 'list':
                $member = $shape->getMember();
                $target = [];
                foreach ($value as $v) {
                    $target[] = $this->parse($member, $v);
                }
                return $target;
            case 'map':
                $values = $shape->getValue();
                $target = [];
                foreach ($value as $k => $v) {
                    $target[$k] = $this->parse($values, $v);
                }
                return $target;
            case 'timestamp':
                return \BWPS\SSU\Aws3\Aws\Api\DateTimeResult::fromTimestamp($value, !empty($shape['timestampFormat']) ? $shape['timestampFormat'] : null);
            case 'blob':
                return base64_decode($value);
            default:
                return $value;
        }
    }
}
