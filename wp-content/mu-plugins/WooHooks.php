<?php

class WooHooks{

    public static function initHooks(){
        static::removeActions();
    }

    public static function removeActions(){
        remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
        remove_action('woocommerce_sidebar','woocommerce_get_sidebar',10);
    }

}


add_action('wp',function(){
    WooHooks::initHooks();
});