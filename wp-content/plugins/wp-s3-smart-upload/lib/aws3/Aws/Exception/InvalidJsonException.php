<?php

namespace BWPS\SSU\Aws3\Aws\Exception;

use BWPS\SSU\Aws3\Aws\HasMonitoringEventsTrait;
use BWPS\SSU\Aws3\Aws\MonitoringEventsInterface;
class InvalidJsonException extends \RuntimeException implements \BWPS\SSU\Aws3\Aws\MonitoringEventsInterface
{
    use HasMonitoringEventsTrait;
}
