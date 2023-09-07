
<style>
    .glide__bullet--active {
        background: #333;
    }
</style>
 
<div x-data="carousel" class="mx-auto max-w-7xl">
    <div x-ref="glide" class="glide block relative">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
            <?php 
            foreach($section['carousel_item'] as $item){?>
                <li class="glide__slide flex flex-col items-center justify-center pb-6">
                    <div class="w-full">
                    <img class="w-full h-[350px] object-contain" src="<?=$item['image']['url']; ?>" alt="placeholder image">
                    <h3 class="text-center"><?=$item['title']; ?></h3>
                    <p class="text-center"><?=$item['text']; ?></p>
                    </div>
                </li>
            <?php } ?>
                
            </ul>
        </div>
 
        <div class="glide__arrows pointer-events-none absolute inset-0 flex items-center justify-between" data-glide-el="controls">
            <!-- Previous Button -->
            <button
                class="glide__arrow glide__arrow--left pointer-events-auto disabled:opacity-50"
                data-glide-dir="<"
            >
                <span aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </span>
                <span class="sr-only">Skip to previous slide page</span>
            </button>
 
            <!-- Next Button -->
            <button
                class="glide__arrow glide__arrow--left pointer-events-auto disabled:opacity-50"
                data-glide-dir=">"
            >
                <span aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                </span>
                <span class="sr-only">Skip to next slide page</span>
            </button>
        </div>
 
        
    </div>
</div>

<script defer>
     document.addEventListener('alpine:init', () => {
        Alpine.data('carousel', () => ({
    
        init() {
            new Glide(this.$refs.glide, {
                perView: 3,
                type: 'slide',
                perTouch: 1,
                breakpoints: {
                    640: {
                        perView: 1,
                    },
                },
            }).mount()
        },
    }
    ))
    })
</script>