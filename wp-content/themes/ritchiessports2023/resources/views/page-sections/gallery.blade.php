<div class="pswp-gallery pswp-gallery--single-column grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0" id="gallery">
    @foreach($section['images'] as $image)
    <a href="{{ $image['url'] }}" data-pswp-width="1669" data-pswp-height="2500" target="_blank" class="flex item-center brightness-90 hover:brightness-110 transition duration-300">
        <img src="{{$image['url']}}" alt="" class="object-cover object-center h-[50vh] w-full"/>
    </a>
    @endforeach
</div>