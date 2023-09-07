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
@foreach($staff as $s)
<div class="flex my-4 items-start w-full border-2 border-gray-300">
    <div class="w-1/4 flex justify-center">
        <img class="w-full min-h-[200px] max-h-[400px] object-contain object-left-top" src="{{$s->image}}" alt="image">
    </div>
    <div class="w-3/4 p-4">
    <h3 class=" text-3xl font-bold text-ritchiesblue-500 uppercase">{{$s->post_title; }}</h3>
    <p class="text-gray-600 text-xl">{{$s->getMeta('position') }}</p>
    <p class=""><a href="javascript:;" class="text-ritchiesred-500 underline underline-offset-2" @click="mailTo('{{$s->getMeta('email') }}')">Email {{$s->first_name}}</a></p>
    <hr class="my-2">
    <p class="my-2">{{$s->post_content}}</p>
    <hr class="my-2">
    @if($s->getMeta('favorite_quote'))
    <h4 class="text-ritchiesblue-500 text-xl font-bold">Favorite Quote</h4>
    <p class="">{{$s->getMeta('favorite_quote') }}</p>
    @endif
    </div>
</div>
@endforeach
</div>