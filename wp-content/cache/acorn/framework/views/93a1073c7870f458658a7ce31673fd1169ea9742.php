<?php // build mobile nav display ?>
<div class="bg-gray-300 w-full md:hidden" x-data="mobileNav">
  <div class="flex justify-center items-center w-full py-2">
    <div class="w-1/3">
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
  <div class="flex justify-center w-full">
    <div class="w-full relative">
      <button class="flex w-full items-center justify-end px-3 py-2  text-ritchiesblue-500 border border-ritchiesblue-500 rounded-md" @click="toggleNavDropdown">
        <span class="mr-1 text-xl">Menu</span>
      </button>
      <div class=" bg-gray-300 w-full absolute z-30 bottom--4  duration-300 transition" x-show="open">
        <?php echo NavHelpers::renderMobileNavMenu('primary_navigation',$menu); ?>

      </div>
    </div>
  </div>
</div>
  <script>
    document.addEventListener('alpine:init', () => {
      Alpine.data('mobileNav', () => ({
        open: false,
        toggleNavDropdown() {
          this.open = !this.open
        },
      }))
    })
  </script><?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/partials/mobile-nav.blade.php ENDPATH**/ ?>