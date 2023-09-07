<html>
    <head>
        <title><?=wp_title()?></title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="<?=get_stylesheet_uri()?>?v=<?=date('mdY')?>">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <?php wp_head();?>
        <style type="text/tailwindcss">
            input[type="text"],input[type="tel"],input[type="email"],input[type=
        "number"],textarea{
                @apply border border-gray-300 p-2;
            }
            form h3{
                @apply text-xl font-semibold
            }
            form label{
                @apply text-lg font-normal
            }
            .variations_form{
                @apply border border-gray-300 p-2 my-4;
            }
            .single_add_to_cart_button{
                @apply bg-red-600 text-white px-4 py-3 my-2
            }
            .variations th.label > label{
                @apply font-semibold mr-2 ;
            }
            .variations th.label{
                @apply py-2
            }
            .variations tr{
                @apply !border-spacing-7 border-separate
            }
            .wc-default-select{
                @apply h-8 mr-2
            }
            .single_variation_wrap label{
                @apply font-semibold
            }
            
        </style>
    </head> 
    <body>
        
        <div class="bg-[#00388f] text-white text-center p-2">
            <div class="flex justify-between items-center">
                <!-- input search bar on left-->
                <div class="">
                    <form action="<?=site_url()?>" method="get" class="my-1">
                        <input type="text" name="s" placeholder="Search" class="rounded-lg p-1">
                    </form>
                </div>
                <!-- Phone number on right-->
                <div class="text-base">
                    <i class="fa-solid fa-phone mr-1"></i>
                    <a href="tel:330.633.5667">330.633.5667</a>
                </div>
            </div>
        </div>
    
        <div class="sticky top-0">
            <?=MenuManager::getMenuDisplay()?>
        </div>
        
