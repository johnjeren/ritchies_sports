<?php
/* Template Name: Custom Page Template */
get_header();
?>

<div class="">
    <div >
        <div>
            <?php the_content();?>
            <?php dd(PageBuilder::getPageSections(get_the_ID()));?>
            <?php foreach($page_sections as $section){ 
                includeWithData(locate_template('page-sections/' . $section['acf_fc_layout'] . '.php'),['section' => $section]);
            } ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>