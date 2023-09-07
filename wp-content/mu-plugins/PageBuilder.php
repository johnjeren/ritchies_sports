<?php

class PageBuilder{

    public static function initHooks(){
        
        add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueueScripts'));
        add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueueStyles'));
        add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueueAlpine'));
        add_action('wp_enqueue_scripts', array(__CLASS__, 'enqueueGlide'));
        add_action('wp_enqueue_tailwind', array(__CLASS__, 'enqueueTailwind'));
 
        //dd(static::getPageSections(45));
    }

    public static function enqueueScripts(){
        wp_enqueue_script('page-builder', plugin_dir_url(__FILE__) . 'page-builder.js', array('jquery'), '1.0.0', true);
    }

    public static function enqueueStyles(){
        wp_enqueue_style('page-builder', plugin_dir_url(__FILE__) . 'page-builder.css', array(), '1.0.0', 'all');
    }

    public static function enqueueAlpine(){
        wp_enqueue_script('alpine', 'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js', array(), '1.0.0', true);
    }

    public static function enqueueGlide(){
        wp_enqueue_script('glide', 'https://cdn.jsdelivr.net/npm/@glidejs/glide', array(), '1.0.0', true);
    }

    public static function enqueueTailwind(){
        wp_enqueue_style('tailwind', 'https://cdn.tailwindcss.com', array(), '1.0.0', 'all');
    }

    public static function getPageSections($page_id){
       
        $page_sections = get_field('sections', $page_id);
        return $page_sections;
    }

}

// init hooks on acf init
add_action('acf/init', array('PageBuilder', 'initHooks'));
