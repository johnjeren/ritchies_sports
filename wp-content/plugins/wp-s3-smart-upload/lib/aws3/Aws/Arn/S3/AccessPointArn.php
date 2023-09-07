<?php

namespace BWPS\SSU\Aws3\Aws\Arn\S3;

use BWPS\SSU\Aws3\Aws\Arn\AccessPointArn as BaseAccessPointArn;
use BWPS\SSU\Aws3\Aws\Arn\AccessPointArnInterface;
use BWPS\SSU\Aws3\Aws\Arn\ArnInterface;
use BWPS\SSU\Aws3\Aws\Arn\Exception\InvalidArnException;
/**
 * @internal
 */
class AccessPointArn extends \BWPS\SSU\Aws3\Aws\Arn\AccessPointArn implements \BWPS\SSU\Aws3\Aws\Arn\AccessPointArnInterface
{
    /**
     * Validation specific to AccessPointArn
     *
     * @param array $data
     */
    public static function validate(array $data)
    {
        parent::validate($data);
        if ($data['service'] !== 's3') {
            throw new \BWPS\SSU\Aws3\Aws\Arn\Exception\InvalidArnException("The 3rd component of an S3 access" . " point ARN represents the region and must be 's3'.");
        }
    }
}
