<header class="bg-gray-300 p-2 hidden md:block ">
    <div class="flex max-w-7xl mx-auto" x-data="navigationData">
        <div class="w-full flex justify-center items-center">
            <ul class="flex gap-6">

                <?php foreach ($menu as $k => $m) {
                    if ($m['acf_fc_layout'] == 'dropdown_menu') {
                ?>
                        <li class="relative" @mouseover="setActiveSubMenu(<?= $k + 1 ?>)" @mouseout="setActiveSubMenu(0)">
                            <div class="relative">
                                <button type="button" class="hover:bg-white/10  py-2 px-2 flex items-center gap-x-1 text-xl uppercase font-normal  text-[#00388f] transition duration-300" aria-expanded="false" :class="shouldShowSubMenu(<?= $k + 1 ?>)?'bg-white/10':''">
                                    <?= $m['top_level_text'] ?>
                                    <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </button>

                                <div x-cloak x-show="shouldShowSubMenu(<?= $k + 1 ?>)" :class="shouldShowSubMenu(<?= $k + 1 ?>)?'opacity-100 translate-y-0':'opacity-0 translate-y-1'" class="absolute left-0 top-full z-10 mt-0 w-[325px] overflow-hidden bg-gray-200 shadow-lg ring-1 ring-gray-900/5">
                                    <div class="">
                                        <?php foreach ($m['dropdown_links'] as $item) {  ?>
                                            <div class="group relative flex gap-x-6 p-4 text-sm leading-6 hover:bg-gray-50 transition duration-300">
                                                <div class="flex-auto">
                                                    <a href="<?= $item['link_page'] ?>" class="block font-normal uppercase text-base text-[#00388f]">
                                                        <?= $item["link_text"] ?>
                                                        <span class="absolute inset-0"></span>
                                                    </a>
                                                    <p class="mt-1 text-gray-600"><?= $item['description'] ? $item['description'] : '' ?></p>
                                                </div>
                                            </div>
                                        <?php } ?>

                                    </div>
                                    <div class="hidden grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                        <a href="#" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                                            <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clip-rule="evenodd" />
                                            </svg>
                                            Watch demo
                                        </a>
                                        <a href="#" class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100">
                                            <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clip-rule="evenodd" />
                                            </svg>
                                            Contact sales
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    <?php } else {

                    ?>
                        <li><a :class="shouldShowSubMenu(<?= $k + 1 ?>)?'bg-white/10':''" class="hover:bg-white/10 py-2 px-2 flex items-center font-normal  text-[#00388f] uppercase text-xl transition duration-300" href="<?= $m['link_page']; ?>"><?= $m['link_text']; ?></a></li>
                <?php
                    }
                } ?>

            </ul>
        </div>
    </div>
</header>
<div class="block md:hidden absolute z-20 w-full">
    <nav x-data="mobileMenu" class="flex-no-wrap relative  flex w-full items-center justify-between bg-gray-300 py-2 shadow-md shadow-black/5  dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4" data-te-navbar-ref>
        <div class="flex w-full flex-wrap items-center justify-between px-3">
            <!-- Hamburger button for mobile view -->
            <button @click="toggleMobileMenu" class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden" type="button" data-te-collapse-init data-te-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
                <!-- Hamburger icon -->
                <span class="[&>svg]:w-7">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000" class="h-7 w-7">
                        <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                    </svg>
                </span>
            </button>

            <!-- Collapsible navigation container -->
            <div x-show="mobileOpen" x-cloak class="flex-grow basis-[100%] items-center lg:!flex lg:basis-auto" id="navbarSupportedContent1" data-te-collapse-item>

                <!-- Left navigation links -->
                <ul class="list-style-none mr-auto my-2 flex flex-col pl-2 lg:flex-row" data-te-navbar-nav-ref>
                    <?php foreach ($menu as $m) { ?>
                        <?php if ($m['acf_fc_layout'] == 'link') { ?>
                            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                                <a class="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400" href="<?= $m['link_page'] ?>" data-te-nav-link-ref><?= $m['link_text'] ?></a>
                            </li>
                        <?php } else { ?>
                            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref x-data="{
                        open:false,
                        toggle(){
                            this.open = !this.open;
                        }
                    }">
                                <a @click="toggle" class="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400" href="#" @click="show" data-te-nav-link-ref><?= $m['top_level_text'] ?></a>
                                <div x-show="open" class="bg-white p-2 my-1">
                                    <?php foreach ($m['dropdown_links'] as $item) {  ?>
                                        <a class="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none  lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400" href="<?= $item['link_page'] ?>" @click="" data-te-nav-link-ref><?= $item['link_text'] ?></a>
                                    <?php } ?>
                                </div>
                            </li>
                        <?php } ?>
                    <?php } ?>
                </ul>
            </div>


        </div>
    </nav>
</div>
<script>
    document.addEventListener('alpine:init', () => {
        Alpine.data('navigationData', () => ({
            activeSubMenu: null,
            setActiveSubMenu(index) {

                this.activeSubMenu = index;
            },
            shouldShowSubMenu(index) {
                if (index === this.activeSubMenu) {
                    return true;
                }
            }
        }));
    });

    document.addEventListener('alpine:init', () => {
        Alpine.data('mobileMenu', () => ({
            mobileOpen: false,
            toggleMobileMenu() {
                this.mobileOpen = !this.mobileOpen;
            }
        }));
    });
</script>