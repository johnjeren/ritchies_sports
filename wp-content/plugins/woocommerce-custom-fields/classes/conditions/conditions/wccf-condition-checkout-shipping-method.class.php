<?php

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Condition: Checkout - Shipping Method
 *
 * @class WCCF_Condition_Checkout_Shipping_Method
 * @package WooCommerce Custom Fields
 * @author RightPress
 */
if (!class_exists('WCCF_Condition_Checkout_Shipping_Method')) {

class WCCF_Condition_Checkout_Shipping_Method extends RightPress_Condition_Checkout_Shipping_Method
{

    protected $plugin_prefix = WCCF_PLUGIN_PRIVATE_PREFIX;

    protected $contexts = array(
        'checkout_field',
    );

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

WCCF_Condition_Checkout_Shipping_Method::get_instance();

}
