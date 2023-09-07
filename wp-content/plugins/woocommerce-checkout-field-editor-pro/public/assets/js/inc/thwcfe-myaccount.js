var thwcfe_public_myaccount = (function( $ ) {
	'use strict';

	function initialize_thwcfe_myaccount(){
		var form_wrapper = $('.woocommerce-MyAccount-content');
		if(form_wrapper){
			thwcfe_public_base.setup_enhanced_select(form_wrapper, 'thwcfe-enhanced-select', thwcfe_public_var);
			thwcfe_public_base.setup_enhanced_select(form_wrapper, 'thwcfe-enhanced-multi-select', thwcfe_public_var);
		    thwcfe_public_base.setup_date_picker(form_wrapper, 'thwcfe-checkout-date-picker', thwcfe_public_var);
		    thwcfe_public_base.setup_time_picker(form_wrapper, 'thwcfe-checkout-time-picker', thwcfe_public_var);
		    thwcfe_public_base.setup_time_picker_linked_date(form_wrapper, 'thwcfe-checkout-date-picker', thwcfe_public_var);
		    
			thwcfe_public_file_upload.setup_file_upload(form_wrapper, thwcfe_public_var);

			/**** CONDITIONAL FIELD SETUP - START ****/
			thwcfe_public_conditions.validate_all_conditions(null);
						
			/**** CHARACTER COUNT - START -----****/
			/*$('.thwcfe-char-count .thwcfe-input-field').keyup(function(){
				thwcfe_public_base.display_char_count($(this), true);
			});
			
			$('.thwcfe-char-left .thwcfe-input-field').keyup(function(){
				thwcfe_public_base.display_char_count($(this), false);
			});*/
		}
	}
	
	/***----- INIT -----***/
	initialize_thwcfe_myaccount();

	return {
		initialize_thwcfe_myaccount : initialize_thwcfe_myaccount,
	};

})( jQuery );
