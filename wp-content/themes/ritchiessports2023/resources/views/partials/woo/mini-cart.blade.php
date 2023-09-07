<?php
use Ritchies\Models\Product as Product;
$cart = new Ritchies\Classes\CartHelpers;
?>
<div x-data>
<template  x-teleport="#miniCart">
    <div class="absolute z-50 top-[44px] left-8 bg-white border-2 border-gray-300 shadow-xl p-2 w-[400px]">
    @foreach($cart->getProducts() as $item)
        <div class="flex items-center justify-between w-full gap-x-2 cursor-pointer hover:bg-gray-200 transition duration-300" @click="window.location.href='{{$item->link}}'">
            <div class="w-1/4">
                <img class="w-full" src="{{$item->getProductImage()}}" alt="">
            </div>
            <div class="w-3/4">
                <p class="text-sm text-ritchiesblue-600">{{$item['post_title']}}</p>
                <p class="text-sm text-ritchiesblue-500">{{$item['quantity']}} x ${{number_format($item['price'],2)}}</p>
            </div>
        </div>
    @endforeach
    </div>
</template>
</div>