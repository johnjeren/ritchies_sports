<?php

class PostTypes{

    public function __construct()
    {
        add_action('init', [__CLASS__, 'register_post_types']);
    }

    public static function register_post_types(){
        register_post_type('staff',  [
            'labels' => array(
                'name' => __( 'Staff' ),
                'singular_name' => __( 'Staff' )
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'staff'),
            'show_in_rest' => true,
  
        ]
        );
    }
            
}

new PostTypes();