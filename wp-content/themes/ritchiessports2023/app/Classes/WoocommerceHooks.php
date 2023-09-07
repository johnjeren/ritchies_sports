<?php

namespace Ritchies\Classes;

class WoocommerceHooks{

    public static function initHooks(){
        add_action('init', [__CLASS__, 'addTitleToProductSummary']);
    }

    public static function addTitleToProductSummary(){
        add_action('woocommerce_single_product_summary', [__CLASS__, 'title'], 5);
    }

    public static function title(){
        echo '<h1 class="text-3xl font-bold text-ritchiesblue-500">'.get_the_title().'</h1>';
    }

}

WoocommerceHooks::initHooks();

