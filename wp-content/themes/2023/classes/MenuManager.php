<?php

use ACP\Column\Media\Menu;

class MenuManager {
    public function __construct()
    {
        
    }

    public static function init(){
        
    }

    public static function getMenuItems(){
        $menu = get_field('single_link', 'option');
        return $menu;
    }

    public static function getMenuDisplay(){
        $menu = self::getMenuItems();
        includeWithData(locate_template('partials/main-menu.php'),['menu' => $menu]);
    }
}


