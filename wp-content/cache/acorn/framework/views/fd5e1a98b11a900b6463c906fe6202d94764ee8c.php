<div class="topbar p-2 bg-ritchiesblue-500 ">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
  <div><form action="/" method="GET"><input type="text" name="s" placeholder="Search"></form></div>
  <div>
    <span class="text-white text-base">Phone: 330.633.5667</span>
  </div>
  </div>
</div>
<header class="banner">
  <div class="hidden md:flex justify-center w-full py-2">
    <div class="w-1/5">
      <?php if($logo){ ?>
        <a class="brand" href="<?php echo e(home_url('/')); ?>">
          <img src="<?php echo $logo; ?>" alt="Logo" />
        </a>
      <?php }else{ ?>
      <a class="brand" href="<?php echo e(home_url('/')); ?>">
        <?php echo $siteName; ?>

      </a>
      <?php } ?>
    </div>
  </div>
</header>
  <?php if(has_nav_menu('primary_navigation')): ?>
  <?php 
    $menu_items = NavHelpers::getNavMenuItems('primary_navigation');
    $menu = NavHelpers::buildMenuData($menu_items);
   
  ?>
   <?php echo $__env->make('partials.mobile-nav', ['menu' => $menu], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <div class="bg-gray-300 w-full sticky top-0 z-20" x-data="mainNav">
      <?php echo NavHelpers::renderDesktopNavMenu('primary_navigation',$menu); ?>

    </div>
    <script>
      document.addEventListener('alpine:init', () => {
        Alpine.data('mainNav', () => ({
          toggleNavDropdown($event) {
            $event.preventDefault()
            let navDropdown = $event.target.nextElementSibling
            navDropdown.classList.toggle('hidden')
          },
        }))
      })
    </script>
   
   
  <?php endif; ?>

  <?php echo $__env->make('partials.woo.mini-cart', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

 

<?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/sections/header.blade.php ENDPATH**/ ?>