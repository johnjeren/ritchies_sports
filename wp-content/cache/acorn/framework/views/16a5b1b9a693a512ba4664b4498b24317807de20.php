<article <?php (post_class('h-entry')); ?>>
  <header>
    <h1 class="p-name">
      <?php echo $title; ?>

    </h1>

    <?php echo $__env->make('partials.entry-meta', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
  </header>

  <div class="e-content">
    <?php (the_content()); ?>
  </div>

  <footer>
    <?php echo wp_link_pages(['echo' => 0, 'before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>

  </footer>

  <?php (comments_template()); ?>
</article>
<?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/partials/content-single.blade.php ENDPATH**/ ?>