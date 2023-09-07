<?php

namespace BWPS\SSU\Aws3\Aws\Api;

/**
 * Base class representing a modeled shape.
 */
class Shape extends \BWPS\SSU\Aws3\Aws\Api\AbstractModel
{
    /**
     * Get a concrete shape for the given definition.
     *
     * @param array    $definition
     * @param ShapeMap $shapeMap
     *
     * @return mixed
     * @throws \RuntimeException if the type is invalid
     */
    public static function create(array $definition, \BWPS\SSU\Aws3\Aws\Api\ShapeMap $shapeMap)
    {
        static $map = ['structure' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\StructureShape', 'map' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\MapShape', 'list' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\ListShape', 'timestamp' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\TimestampShape', 'integer' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\Shape', 'double' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\Shape', 'float' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\Shape', 'long' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\Shape', 'string' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\Shape', 'byte' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\Shape', 'character' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\Shape', 'blob' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\Shape', 'boolean' => 'BWPS\\SSU\\Aws3\\Aws\\Api\\Shape'];
        if (isset($definition['shape'])) {
            return $shapeMap->resolve($definition);
        }
        if (!isset($map[$definition['type']])) {
            throw new \RuntimeException('Invalid type: ' . print_r($definition, true));
        }
        $type = $map[$definition['type']];
        return new $type($definition, $shapeMap);
    }
    /**
     * Get the type of the shape
     *
     * @return string
     */
    public function getType()
    {
        return $this->definition['type'];
    }
    /**
     * Get the name of the shape
     *
     * @return string
     */
    public function getName()
    {
        return $this->definition['name'];
    }
}
