<header class="bg-gray-300 p-4">
            <div class="flex max-w-7xl mx-auto" x-data="navigationData">
                <div class="w-full flex justify-center items-center">
                    <ul class="flex gap-4">
                        <?php foreach($menu as $k=>$m){
                            if($m['acf_fc_layout'] == 'dropdown_menu'){
                            
                            ?>
                            <li class="relative" @mouseover="setActiveSubMenu(<?=$k+1?>)" @mouseout="setActiveSubMenu(0)">
                                <div class="relative">
                                    <button type="button" class="hover:bg-white/10  py-12 px-4 flex items-center gap-x-1 text-xl uppercase !font-semibold  text-blue-800 hover:text-red-600 transition duration-300" aria-expanded="false" :class="shouldShowSubMenu(<?=$k+1?>)?'bg-white/10':''">
                                        <?=$m['top_level_text']; ?>
                                        <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </button>

                                <div x-cloak x-show="shouldShowSubMenu(<?=$k+1?>)" :class="shouldShowSubMenu(<?=$k+1?>)?'opacity-100 translate-y-0':'opacity-0 translate-y-1'" class="absolute -left-8 top-full z-10 mt-0 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                    <div class="p-2">
                                        <?php foreach($m['dropdown_links'] as $item){  ?>
                                        <div class="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                            <div class="flex-auto">
                                                <a href="<?=$item['link_page']?>" class="block font-semibold text-gray-900">
                                                <?=$item["link_text"]?>
                                                <span class="absolute inset-0"></span>
                                                </a>
                                                <p class="mt-1 text-gray-600"><?=$item['description']?$item['description']:''?></p>
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
                        <?php }else{
                          
                            ?>
                             <li><a :class="shouldShowSubMenu(<?=$k+1?>)?'bg-white/10':''" class="hover:bg-white/10 py-12 px-4 flex items-center font-semibold text-blue-800 hover:text-red-600  uppercase text-xl transition duration-300" href="<?=$m['menu_header_link']; ?>"><?=$m['menu_header_text']; ?></a></li>
                            <?php 
                            }
                        } ?> 
                       
                    </ul>
                </div>
            </div>
        </header>
        <script>
             document.addEventListener('alpine:init', () => {
                Alpine.data('navigationData', () => ({
                    activeSubMenu: null,
                    setActiveSubMenu(index){
                       
                        this.activeSubMenu = index;
                    },
                    shouldShowSubMenu(index){
                        if(index === this.activeSubMenu){
                            return true;
                        }
                    }
                }));
            });
        </script>