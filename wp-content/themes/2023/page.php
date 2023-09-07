<?php get_header();?>
    <div class="">
        <?php $page_sections = PageBuilder::getPageSections(get_the_ID());
            if($page_sections){?>
            <?php foreach($page_sections as $section){ 
                includeWithData(locate_template('page-sections/' . $section['acf_fc_layout'] . '.php'),['section' => $section]);
            }
        } ?>
        <?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'content', 'page' ); ?>
		<?php endwhile; // end of the loop. ?>
        <div class="py-4 max-w-7xl mx-auto">
            <?php the_content(); ?>
        </div>
                </div>
<?php get_footer();?>