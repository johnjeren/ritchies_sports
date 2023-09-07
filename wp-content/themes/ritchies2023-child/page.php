<?php
/**
 * The template for displaying all pages.
 *
 * @package          Flatsome\Templates
 * @flatsome-version 3.16.0
 */

if(flatsome_option('pages_template') != 'default') {

	// Get default template from theme options.
	get_template_part('page', flatsome_option('pages_template'));
	return;

} else {

get_header();
do_action( 'flatsome_before_page' ); ?>
<div>
    <div>
        <?php $page_sections = PageBuilder::getPageSections(get_the_ID());?>
        <?php foreach($page_sections as $section){ 
            includeWithData(locate_template('page-sections/' . $section['acf_fc_layout'] . '.php'),['section' => $section]);
        } ?>
    </div>
</div>

<?php
do_action( 'flatsome_after_page' );
get_footer();

}

?>