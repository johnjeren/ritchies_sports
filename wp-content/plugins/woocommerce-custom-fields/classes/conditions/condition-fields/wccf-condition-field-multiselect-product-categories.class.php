<?php

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Condition Field: Multiselect - Product Categories
 *
 * @class WCCF_Condition_Field_Multiselect_Product_Categories
 * @package WooCommerce Custom Fields
 * @author RightPress
 */
if (!class_exists('WCCF_Condition_Field_Multiselect_Product_Categories')) {

class WCCF_Condition_Field_Multiselect_Product_Categories extends RightPress_Condition_Field_Multiselect_Product_Categories
{

    protected $plugin_prefix = WCCF_PLUGIN_PRIVATE_PREFIX;

    // Singleton instance
    protected static $instance = false;

    /**
     * Constructor
     *
     * @access public
     * @return void
     */
    public function __construct()
    {

        parent::__construct();
    }





}

WCCF_Condition_Field_Multiselect_Product_Categories::get_instance();

}
