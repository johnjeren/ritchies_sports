
<style>
    .carousel-list::-webkit-scrollbar{
    display: none;
  }
</style>
<script src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.js"></script>
<div
    x-data="{
        skip: 1,
        atBeginning: false,
        atEnd: false,
        next() {
            this.to((current, offset) => current + (offset * this.skip))
        },
        prev() {
            this.to((current, offset) => current - (offset * this.skip))
        },
        to(strategy) {
            let slider = this.$refs.slider
            let current = slider.scrollLeft
            let offset = slider.firstElementChild.getBoundingClientRect().width
            slider.scrollTo({ left: strategy(current, offset), behavior: 'smooth' })
        },
        focusableWhenVisible: {
            'x-intersect:enter'() {
                this.$el.removeAttribute('tabindex')
            },
            'x-intersect:leave'() {
                this.$el.setAttribute('tabindex', '-1')
            },
        },
        disableNextAndPreviousButtons: {
            'x-intersect:enter.threshold.05'() {
                let slideEls = this.$el.parentElement.children
 
                // If this is the first slide.
                if (slideEls[0] === this.$el) {
                    this.atBeginning = true
                // If this is the last slide.
                } else if (slideEls[slideEls.length-1] === this.$el) {
                    this.atEnd = true
                }
            },
            'x-intersect:leave.threshold.05'() {
                let slideEls = this.$el.parentElement.children
 
                // If this is the first slide.
                if (slideEls[0] === this.$el) {
                    this.atBeginning = false
                // If this is the last slide.
                } else if (slideEls[slideEls.length-1] === this.$el) {
                    this.atEnd = false
                }
            },
        },
    }"
    class="flex w-full flex-col"
>
    <div
        x-on:keydown.right="next"
        x-on:keydown.left="prev"
        tabindex="0"
        role="region"
        aria-labelledby="carousel-label"
        class="flex space-x-6"
    >
        <h2 id="carousel-label" class="sr-only" hidden>Carousel</h2>
 
        <!-- Prev Button -->
        <button
            x-on:click="prev"
            class="text-6xl"
            :aria-disabled="atBeginning"
            :tabindex="atEnd ? -1 : 0"
            :class="{ 'opacity-50 cursor-not-allowed': atBeginning }"
        >
            <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </span>
            <span class="sr-only">Skip to previous slide page</span>
        </button>
 
        <span id="carousel-content-label" class="sr-only" hidden>Carousel</span>
 
        <ul
            x-ref="slider"
            tabindex="0"
            role="listbox"
            aria-labelledby="carousel-content-label"
            class="carousel-list flex w-full snap-x snap-mandatory overflow-x-scroll"
        >
        <?php 
                foreach($section['carousel_item'] as $item){?>
            <li class="flex w-full md:w-1/3 shrink-0 snap-start flex-col items-center justify-center p-2" role="option">
                <a href="<?=$item['link']?>" target="<?=$item['link_target']=='external'?'_blank':''?>">
                <img class="mt-2 w-full" src="<?=$item['image']['url']; ?>" alt="placeholder image">
                <h3 class="px-4 py-2 text-xl text-center font-semibold"><?=$item['title']??''; ?></h3>
                <p class="text-base text-center"><?=$item['text']??''; ?></p>
                </a>
            </li>
            <?php } ?>
 
        </ul>
 
        <!-- Next Button -->
        <button
            x-on:click="next"
            class="text-6xl"
            :aria-disabled="atEnd"
            :tabindex="atEnd ? -1 : 0"
            :class="{ 'opacity-50 cursor-not-allowed': atEnd }"
        >
            <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
            </span>
            <span class="sr-only">Skip to next slide page</span>
        </button>
    </div>
</div>

<script defer>
     document.addEventListener('alpine:init', () => {
        Alpine.data('carousel', () => ({
    
        init() {
            new Glide(this.$refs.glide, {
                startAt: 0,
                perView: 3,
                type: 'carousel',
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
</script><?php /**PATH /Users/jj3/Projects/ritchies/wp-content/themes/ritchiessports2023/resources/views/page-sections/carousel.blade.php ENDPATH**/ ?>