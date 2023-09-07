<?php 
add_action( 'wp',function(){
  if(is_woocommerce()){
    wp_enqueue_script('loop-js',get_template_directory_uri().'/js/loop-grid.js',true); 
    if(is_single()){
      wp_enqueue_script('single-product-js',get_template_directory_uri().'/js/single-product.js',true); 
    }
     
  }
});


// Add custom Theme Functions here
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
  
  add_action('admin_head', 'remove_fixed_table');

function remove_fixed_table() {
  echo '<style>
    table.fixed {
      table-layout: none!important;
      position: relative!important;
    }
  </style>';
}

if(!is_admin()){
  wp_enqueue_script('tailwind-css-cdn','https://cdn.tailwindcss.com',false);   
  wp_enqueue_style('woo-overrides',get_template_directory_uri().'/woocommerce.css');
}



wp_enqueue_style('glide','https://cdn.jsdelivr.net/npm/@glidejs/glide@3.5.x/dist/css/glide.core.min.css');
wp_enqueue_script('glide-js','https://cdn.jsdelivr.net/npm/@glidejs/glide@3.5.x');
