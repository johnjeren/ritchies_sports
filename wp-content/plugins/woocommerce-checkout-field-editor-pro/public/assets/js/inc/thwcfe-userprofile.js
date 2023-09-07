var thwcfe_user_profile = (function( $ ) {
	'use strict';

	function initialize_thwcfe_userprofile(){
		var form_wrapper = $('#your-profile');
		if(form_wrapper){		    
			thwcfe_public_file_upload.setup_file_upload(form_wrapper, thwcfe_public_var);
		}
	}
	
	/***----- INIT -----***/
	initialize_thwcfe_userprofile();

	return {
		initialize_thwcfe_userprofile : initialize_thwcfe_userprofile,
	};

})( jQuery );
