<html>
    <head>
        <title>Richie's Sports</title>
        <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">
       
        <style type="text/css">
            [x-cloak] { display: none !important; }
        </style>
        <?php wp_head(); ?>
    </head>
    <body class="">
       <?php MenuManager::getMenuDisplay();?>
       <div class="w-full text-center py-8">
            <img src="<?php echo get_template_directory_uri(); ?>/img/logo.png" alt="logo" class="mx-auto h-[120px]">
            <div class="w-full block py-4">
                <p class="text-2xl text-blue-800 font-semibold">137 South Avenue | Tallmadge, Ohio 44278 | 330.633.5667</p>
            </div>
        </div>