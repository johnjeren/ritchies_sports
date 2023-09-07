<?php
use Ritchies\Models\Product as Product;
$cart = new Ritchies\Classes\CartHelpers;
?>
<div x-data>
<template  x-teleport="#miniCart">
    <div class="absolute z-50 top-[44px] left-8 bg-white border-2 border-gray-300 shadow-xl p-2 w-[400px]">
    <?php $__currentLoopData = $cart->getProducts(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <div class="flex items-center justify-between w-full gap-x-2 cursor-pointer hover:bg-gray-200 transition duration-300" @click="window.location.href='<?php echo e($item->link); ?>'">
            <div class="w-1/4">
                <img class="w-full" src="<?php echo e($item->getProductImage()); ?>" alt="">
            </div>
            <div class="w-3/4">
                <p class="text-sm text-ritchiesblue-600"><?php echo e($item['post_title']); ?></p>
                <p class="text-sm text-ritchiesblue-500"><?php echo e($item['quantity']); ?> x $<?php echo e(number_format($item['price'],2)); ?></p>
            </div>
        </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
</template>
</div><?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/partials/woo/mini-cart.blade.php ENDPATH**/ ?>