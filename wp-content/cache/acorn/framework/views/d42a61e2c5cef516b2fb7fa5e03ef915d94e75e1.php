<?php 
foreach($section['staff_members'] as $sm){
    $staff_ids[] = $sm->ID;
}
$staff = Ritchies\Models\Staff::whereIn('ID',$staff_ids )->get();
?>
<div x-data="{
    mailTo: function(email) {
        window.location.href = 'mailto:'+email;
    }
}">
<?php $__currentLoopData = $staff; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $s): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
<div class="flex my-4 items-start w-full border-2 border-gray-300">
    <div class="w-1/4 flex justify-center">
        <img class="w-full min-h-[200px] max-h-[400px] object-contain object-left-top" src="<?php echo e($s->image); ?>" alt="image">
    </div>
    <div class="w-3/4 p-4">
    <h3 class=" text-3xl font-bold text-ritchiesblue-500 uppercase"><?php echo e($s->post_title); ?></h3>
    <p class="text-gray-600 text-xl"><?php echo e($s->getMeta('position')); ?></p>
    <p class=""><a href="javascript:;" class="text-ritchiesred-500 underline underline-offset-2" @click="mailTo('<?php echo e($s->getMeta('email')); ?>')">Email <?php echo e($s->first_name); ?></a></p>
    <hr class="my-2">
    <p class="my-2"><?php echo e($s->post_content); ?></p>
    <hr class="my-2">
    <?php if($s->getMeta('favorite_quote')): ?>
    <h4 class="text-ritchiesblue-500 text-xl font-bold">Favorite Quote</h4>
    <p class=""><?php echo e($s->getMeta('favorite_quote')); ?></p>
    <?php endif; ?>
    </div>
</div>
<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
</div><?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/page-sections/staff_grid.blade.php ENDPATH**/ ?>