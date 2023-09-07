<?php

namespace BWPS\SSU\Aws3\Aws\S3\UseArnRegion\Exception;

use BWPS\SSU\Aws3\Aws\HasMonitoringEventsTrait;
use BWPS\SSU\Aws3\Aws\MonitoringEventsInterface;
/**
 * Represents an error interacting with configuration for S3's UseArnRegion
 */
class ConfigurationException extends \RuntimeException implements \BWPS\SSU\Aws3\Aws\MonitoringEventsInterface
{
    use HasMonitoringEventsTrait;
}
