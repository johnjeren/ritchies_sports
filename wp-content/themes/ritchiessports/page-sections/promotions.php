<?php 
$count = count($section['promotion']);
if($count == 1){
    $class = 'md:w-full';
} elseif($count == 2){
    $class = 'md:w-1/2';
} elseif($count == 3){
    $class = 'md:w-1/3';
}elseif($count == 4){
    $class = 'md:w-1/4';
}elseif($count == 5){
    $class = 'md:w-1/5';
}elseif($count == 6){
    $class = 'md:w-1/6';
}?>
<div class="container mx-auto">
    <div class="flex">
    <?php
    foreach($section['promotion'] as $promo){ ?>
        <div class="w-full <?=$class?> flex items-center justify-center">
            <img src="<?=$promo['image']['url']; ?>" class="max-h-[400px] object-cover" alt="placeholder image">
        </div>
    <?php } ?>
    </div>
</div>