<div class="pswp-gallery pswp-gallery--single-column grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0" id="gallery">
    <?php $__currentLoopData = $section['images']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $image): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <a href="<?php echo e($image['url']); ?>" data-pswp-width="1669" data-pswp-height="2500" target="_blank" class="flex item-center brightness-90 hover:brightness-110 transition duration-300">
        <img src="<?php echo e($image['url']); ?>" alt="" class="object-cover object-center h-[50vh] w-full"/>
    </a>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
</div><?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/page-sections/gallery.blade.php ENDPATH**/ ?>