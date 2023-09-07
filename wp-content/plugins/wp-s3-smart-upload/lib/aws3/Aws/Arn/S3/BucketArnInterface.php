<?php

namespace BWPS\SSU\Aws3\Aws\Arn\S3;

use BWPS\SSU\Aws3\Aws\Arn\ArnInterface;
/**
 * @internal
 */
interface BucketArnInterface extends ArnInterface
{
    public function getBucketName();
}
