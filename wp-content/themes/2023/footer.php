<footer class="bg-gray-500 py-4  ">
    <div class="max-w-7xl mx-auto">
        <div class="flex">
            <div class="w-2/3">
                <h3 class="text-white font-semibold text-2xl underline underline-offset-4 mb-2">Store Hours</h3>
                <?php $sh = StoreDetails::getStoreHoursData();
                    foreach($sh as $h){?>
                    <div class="flex gap-2">
                        <div class=" text-white text-lg"><?=$h['day_days']?> <span>&middot;</span></div>
                        <div class=" text-white text-lg"><?=$h['hours']?></div>
                    </div>
                    <?php }
                ?>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
<script src="<?=get_template_directory_uri()?>/js/alpine.js"></script>
</body>

</html>