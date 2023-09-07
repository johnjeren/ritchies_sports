<article <?php (post_class('my-4')); ?>>
  <header>
    <h2 class="entry-title">
      <a href="<?php echo e(get_permalink()); ?>" class="text-ritchiesblue-500 text-2xl">
        <?php echo $title; ?>

      </a>
    </h2>

    <?php echo $__env->renderWhen(get_post_type() === 'post', 'partials.entry-meta', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path'])); ?>
  </header>

  <div class="entry-summary">
    <?php (the_excerpt()); ?>
  </div>
</article>
<?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/partials/content-search.blade.php ENDPATH**/ ?>