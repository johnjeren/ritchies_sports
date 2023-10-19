<?php $background_color = $section['background_color'] ?? 'bg-white';
  $text_color = $section['text_color']=='light' ? 'text-white' : 'text-gray-900';
  $container_width = $section['container_width']=='full-width' ? 'max-w-none' : 'max-w-7xl';
?>
<div class="py-12 sm:py-16" style="background-color: <?=$background_color?>;">
    <div class="mx-auto <?=$container_width?> text-center">
      <h2 class="mt-2 text-4xl font-bold tracking-tight <?=$text_color?> sm:text-6xl"><?=$section['title']?></h2>
      <p class="mt-6 text-lg leading-8 <?=$text_color?>"><?=$section['subtext']?></p>
    </div>
  </div><?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/page-sections/section_title.blade.php ENDPATH**/ ?>