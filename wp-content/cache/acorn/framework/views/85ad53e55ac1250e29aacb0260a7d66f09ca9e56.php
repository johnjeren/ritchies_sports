
<style>
    .glide__bullet--active {
        background: #333;
    }
</style>
 
<div
    x-data="reviews"
>
    <div x-ref="glide" class="glide block relative bg-white my-24">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
            <?php 
            foreach($section['review'] as $review){?>
                <li class="glide__slide flex flex-col items-center justify-center py-6">
                    <div class="w-1/2 mx-auto">
                        <p class="text-center text-lg md:text-2xl text-blue-700"><?=$review['review_text']; ?></p>
                        <p class="text-center text-base md:text-xl text-red-700"><?=$review['review_name']?'- '.$review['review_name']:''?></p>
                    </div>
                </li>
            <?php } ?>
                
            </ul>
        </div>
 
        <div class="glide__arrows pointer-events-none absolute inset-0 flex items-center justify-between w-3/4 mx-auto" data-glide-el="controls">
            <!-- Previous Button -->
            <button
                class="glide__arrow glide__arrow--left pointer-events-auto disabled:opacity-50 "
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
 
        <!-- Bullets -->
        <div class="glide__bullets flex w-full items-center justify-center gap-1" data-glide-el="controls[nav]">
        <?php 
            foreach($section['review'] as $k=>$review){?>
            <button class="glide__bullet h-3 w-3 rounded-full bg-gray-300 transition-colors" data-glide-dir="=<?=$k?>"></button>
            <?php } ?>
        </div>
    </div>
</div>

<script defer>
     document.addEventListener('alpine:init', () => {
        Alpine.data('reviews', () => ({
    
        init() {
            new Glide(this.$refs.glide, {
                perView: 1,
                type: 'carousel',
                perTouch: 1,
                autoplay: 5000,
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
</script><?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/page-sections/reviews.blade.php ENDPATH**/ ?>