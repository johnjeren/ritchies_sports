<?php
use Ritchies\Classes\CartHelpers;
class NavHelpers{

    public function __construct()
    {
       
    }
    
    public static function getNavMenuItems($menu_name){
        $locations = get_nav_menu_locations();
        $menu = wp_get_nav_menu_object($locations[$menu_name]);
        $menu_items = wp_get_nav_menu_items($menu->term_id);
        return $menu_items;
    }

    public static function buildMenuData($menu_items){
        $menu_data = [];
        foreach($menu_items as $menu_item){
            $menu_data[$menu_item->ID] = [
                'ID' => $menu_item->ID,
                'title' => $menu_item->title,
                'url' => $menu_item->url,
                'parent' => $menu_item->menu_item_parent,
                'children' => []
            ];
        }
        // add children
        foreach($menu_data as $menu_item){
            if($menu_item['parent'] != 0){
                $menu_data[$menu_item['parent']]['children'][] = $menu_item;
                unset($menu_data[$menu_item['ID']]);
            }
        }
        return $menu_data;
    }

    public static function renderDesktopNavMenu($menu_name, $menu){
        $cart = new CartHelpers();
        // render menu html
        $html = '<ul class="menu justify-center max-w-5xl mx-auto hidden md:flex ">';
        foreach($menu as $menu_item){
            $html .= '<li class="menu-item relative py-2 px-8" x-data="{open:false}" @mouseover="open = true" @mouseleave="open = false"> ';
             if(count($menu_item['children']) == 0){ 
            $html .= '<a href="'.$menu_item['url'].'"  class="text-2xl uppercase py-2 px-2 text-ritchiesblue-500 font-semibold hover:bg-ritchiesblue-500 hover:text-white transition duration-300">'.$menu_item['title'].'</a>';
             }elseif(count($menu_item['children']) > 0){
                $html .= '<a href="javascript:;" :class="open?\'bg-ritchiesblue-500 text-white\':\'\'"    class="text-2xl uppercase py-2 px-2 text-ritchiesblue-500 font-semibold hover:bg-ritchiesblue-500 hover:text-white transition duration-300">'.$menu_item['title'].'</a>';
                $html .= '<ul class="sub-menu absolute top-[44px]  z-20 bg-white w-[300px] shadow-lg border border-gray-300  duration-500" x-show="open">';
                foreach($menu_item['children'] as $child){
                    $html .= '<li class="menu-item text-ritchiesred-500 hover:bg-ritchiesred-500 hover:text-white py-1 px-2 transition duration-300">';
                    $html .= '<a href="'.$child['url'].'" class="text-lg ">'.$child['title'].'</a>';
                    $html .= '</li>';
                }
                $html .= '</ul>';
            }
            $html .= '</li>';
        }
        if($cart->getItemsCount() > 0){
        $html .= '<li x-data="{show:false}"   class="menu-item relative py-2 px-8" @mouseover="show = true" @mouseleave="show = false">
                    <a :class="show?\'bg-ritchiesblue-500 text-white\':\'\'" class="text-2xl uppercase py-2 px-2 cursor-pointer text-ritchiesblue-500 font-semibold hover:bg-ritchiesblue-500 hover:text-white transition duration-300" >Cart ( '.$cart->getItemsCount().' )</a>
                    <div id="miniCart" x-show="show"></div>
                </li>';
        }
        $html .= '</ul>';
        return $html;
    }

    public static function renderMobileNavMenu($menu_name, $menu){
        
        
        $html = '<ul class="w-full">';
        
        foreach($menu as $menu_item){
            
            $html .= '<li class="menu-item relative py-2 px-8" > ';
             
            $html .= '<a href="'.$menu_item['url'].'"  class="text-2xl uppercase py-2 px-2 text-ritchiesblue-500 font-semibold  ">'.$menu_item['title'].'</a>';
            // list children
            if(count($menu_item['children']) > 0){
                $html .= '<ul class="sub-menu ml-2">';
                foreach($menu_item['children'] as $child){
                    $html .= '<li class="menu-item text-ritchiesred-500 py-1 px-2 transition duration-300">';
                    $html .= '<a href="'.$child['url'].'" class="text-lg ">'.$child['title'].'</a>';
                    $html .= '</li>';
                }
                $html .= '</ul>';
            }
            
            $html .= '</li>';
        }
        $html .= '</ul>';
       
        return $html;
    }
    
}
