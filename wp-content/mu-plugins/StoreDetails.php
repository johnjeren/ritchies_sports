<?php

class StoreDetails{

    public static function init(){

    }

    public static function getStoreHoursData(){
        $hours = get_field('store_hours','option');
        return $hours;
    }
}

add_action('acf/init', array('StoreDetails', 'init'));
