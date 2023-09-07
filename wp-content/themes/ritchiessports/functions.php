<?php


function mytheme_add_woocommerce_support() {
  add_theme_support( 'woocommerce' );
}
add_action( 'after_setup_theme', 'mytheme_add_woocommerce_support' );

function includeWithData($filePath, $variables = array(), $print = true)
{
    // Extract the variables to a local namespace
    extract($variables);

    // Start output buffering
    ob_start();

    // Include the template file
    include $filePath;

    // End buffering and return its contents
    $output = ob_get_clean();
    if (!$print) {
        return $output;
    }

    echo $output;
}

// add a menu manager options page

if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title' => 'Menu Manager',
        'menu_title' => 'Menu Manager',
        'menu_slug' => 'menu-manager',
        'capability' => 'edit_posts',
        'redirect' => false
    ));
}

// require all classes
foreach (glob(__DIR__ . "/classes/*.php") as $filename) {
    require_once $filename;
}


wp_enqueue_style('glide','https://cdn.jsdelivr.net/npm/@glidejs/glide@3.5.x/dist/css/glide.core.min.css');
wp_enqueue_script('glide-js','https://cdn.jsdelivr.net/npm/@glidejs/glide@3.5.x');

if(!is_admin()){
  wp_enqueue_script('tailwind-css-cdn','https://cdn.tailwindcss.com',false);   
}

//wp_enqueue_script('alpinejs','https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',false);

add_action('admin_head', 'remove_fixed_table');

function remove_fixed_table() {
  echo '<style>
    table.fixed {
      table-layout: none!important;
      position: relative!important;
    }
  </style>';
}