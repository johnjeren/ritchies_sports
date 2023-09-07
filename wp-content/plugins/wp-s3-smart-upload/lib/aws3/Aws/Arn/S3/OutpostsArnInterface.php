<?php

namespace BWPS\SSU\Aws3\Aws\Arn\S3;

use BWPS\SSU\Aws3\Aws\Arn\ArnInterface;
/**
 * @internal
 */
interface OutpostsArnInterface extends ArnInterface
{
    public function getOutpostId();
}
