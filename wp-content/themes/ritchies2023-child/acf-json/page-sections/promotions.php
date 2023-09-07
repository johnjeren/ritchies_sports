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
<div class="">
    <div class="flex gap-4">
    <?php
    foreach($section['promotion'] as $promo){ ?>
        <div class="w-full <?=$class?> flex items-center justify-center border border-gray-400 p-2.5">
            <a href="<?=$promo['link']; ?>" class="text-center" target="<?=$promo['link_location']=='internal'?'':'_blank'?>">
                <img src="<?=$promo['image']['url']; ?>" class="max-h-[400px] object-cover" alt="placeholder image">
                <h3 class="text-2xl font-bold my-3"><?=$promo['title']; ?></h3>
                <p class="text-xl"><?=$promo['description']; ?></p>
            </a>
        </div>
    <?php } ?>
    </div>
</div>