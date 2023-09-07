var thwcfe_public_file_upload = (function($, window, document) {
	'use strict';
	
	//var currRequest = null;
	var IMG_FILE_TYPES = ["image/jpg", "image/png", "image/gif", "image/jpeg"];
	
	function setup_file_upload(wrapper, data){
		wrapper.find('.thwcfe-checkout-file').on('change', upload_file);
        //wrapper.find('.thwcfe-delete-file').on('click', remove_uploaded);
	}
	
	function upload_file(event){
		var files = event.target.files;
		var parent = $("#" + event.target.id).parent();
		var wrapper = $(this).closest('.thwcfe-input-field-wrapper');
		var input = wrapper.find('.thwcfe-checkout-file-value');
		var field_name = input.attr('name');
		var data = new FormData();
		
		data.append("action", "thwcfe_file_upload");
		data.append("field_name", field_name);

		$.each(files, function(key, value){
			data.append("file[]", value);
		});

		$.ajax({
			type: 'POST',
			url: thwcfe_public_var.ajax_url,
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			beforeSend : function()    {           
				wrapper.find('.thwcfe-file-upload-status').show();
				input.val('');
				clear_message(wrapper);
			},
		})
		.done(function(data, textStatus, jqXHR){
			show_uploaded_files(data, input, wrapper);
		})
		.fail(function(jqXHR, textStatus, error){
		    add_message(wrapper, data, "error");
		    clean_file_input(wrapper);
		})
		.always(function() {
		    wrapper.find('.thwcfe-file-upload-status').hide();
		});
	}

	function show_uploaded_files(data, input, wrapper){
		if( !$.isEmptyObject( data ) ){
			var prev_html = '';
			var filenames_arr = [];
			var filenames = [];
			var uploaded_obj = {};
			var error_data = '';
				
			$.each(data, function(index, rdata ) {
				if(rdata.response == "SUCCESS"){
					var uploaded = rdata.uploaded;

					if(uploaded){
						$(uploaded).each(function(index, uploaded_item){
						    var item_name = uploaded_item.name;
						    if(item_name && $.inArray(item_name, filenames_arr) == -1){
						    	filenames_arr.push(item_name);
						    }
						});

						if(filenames_arr.length){
							filenames.push( filenames_arr.toString() );
						}
						uploaded_obj[uploaded.name] = uploaded;
						prev_html += prepare_preview_html(uploaded);
					}
				}else{
					error_data += '<br>'+index+' - '+rdata.error;
				}
			});

			input.val(JSON.stringify(uploaded_obj));
			input.data('file-name', filenames);

			var remove_btn = wrapper.find('.thwcfe-remove-uploaded');
			remove_btn.show();

			wrapper.find('.thwcfe-upload-preview').html(prev_html);
			wrapper.find('.thwcfe-uloaded-files').show();
			wrapper.find('.thwcfe-checkout-file').hide();
		
			if( error_data != '' ){
				var error_obj = {response: 'ERROR', error: error_data }
				add_message( wrapper, error_obj, "error" );
				if( wrapper.find('.thwcfe-uloaded-file-list').length <= 1 ){
					clean_file_input(wrapper);
					wrapper.find('.thwcfe-checkout-file').show();
					return;
				}
			}

			input.trigger("change");
		}
	}

	function prepare_preview_html(uploaded){
		var file_size = '';
		if($.isNumeric(uploaded.size)){
			file_size = uploaded.size/1000;
			file_size = Math.round(file_size);
			file_size = file_size+' KB';
		}
		
		var prev_html  = '<span class="thwcfe-uloaded-file-list"><span class="thwcfe-uloaded-file-list-item">';
		prev_html += '<span class="thwcfe-columns">';
		
		if($.inArray(uploaded.type, IMG_FILE_TYPES) !== -1){
			prev_html += '<span class="thwcfe-column-thumbnail">';
			prev_html += '<img src="'+ uploaded.url +'" >';
			prev_html += '</span>';
		}

		prev_html += '<span class="thwcfe-column-title">';
		prev_html += '<span title="'+uploaded.name+'" class="title">'+uploaded.name+'</span>';
		if(file_size){
			prev_html += '<span class="size">'+file_size+'</span>';
		}
		prev_html += '</span>';

		prev_html += '<span class="thwcfe-column-actions">';
		//prev_html += '<a href="#" onclick="thwcfeRemoveUploaded(this, event); return false;" class="thwcfe-action-btn thwcfe-remove-uploaded" title="Remove">X</a>';
		prev_html += '<a href="#" onclick="thwcfeRemoveUploaded(this, event); return false;" class="thwcfe-action-btn thwcfe-remove-uploaded" title="Remove" data-file="'+uploaded.file+'">X</a>';
		prev_html += '</span>';

		prev_html += '</span>';
		prev_html += '</span></span>';
		
		return prev_html;
	}

	function remove_uploaded(elm, event) {
		var wrapper = $(elm).closest('.thwcfe-input-field-wrapper');
		var upload_list = $(elm).closest('.thwcfe-uloaded-file-list');
		var file = $(elm).data('file');
		
		var data = {
			action: 'thwcfe_remove_uploaded',
			file: file			 
		};

		$.ajax({
			type: 'POST',
			url: thwcfe_public_var.ajax_url,
			data: data,
			cache: false,
			dataType: 'json',
			beforeSend : function()    {           
				wrapper.find('.thwcfe-uloaded-files').hide();
				wrapper.find('.thwcfe-file-upload-status').show();
				clear_message(wrapper);
			},
		})
		.done(function(data, textStatus, jqXHR){
            if(data.response == "SUCCESS"){
		    	clear_uploaded(elm, wrapper);
			}
		})
		.fail(function(jqXHR, textStatus, error){
			wrapper.find('.thwcfe-uloaded-files').show();
		    add_message(wrapper, error, "error");
		})
		.always(function() {
		    wrapper.find('.thwcfe-file-upload-status').hide();
		});
	}

	function clear_uploaded(elm, wrapper){
		$(elm).data('file', '');
		$(elm).hide();

		if( wrapper.find('.thwcfe-uloaded-file-list').length <= 1 ){
			wrapper.find('.thwcfe-upload-preview').html('');
			wrapper.find('.thwcfe-uloaded-files').hide();
			wrapper.find('.thwcfe-checkout-file').show();

			clean_file_input(wrapper);
		}else{
			wrapper.find('.thwcfe-uloaded-files').show();
			upload_list.remove();
		}
	}

	function change_uploaded(elm, event){
		var wrapper = $(elm).closest('.thwcfe-input-field-wrapper');

		wrapper.find('.thwcfe-remove-uploaded').hide();
		wrapper.find('.thwcfe-input-file').show();
	}
	function cancel_change_uploaded(elm, event){
		var wrapper = $(elm).closest('.thwcfe-input-field-wrapper');

		wrapper.find('.thwcfe-remove-uploaded').show();
		wrapper.find('.thwcfe-cancel-change').show();
		wrapper.find('.thwcfe-input-file').hide();
	}

	function clean_file_input(wrapper){
		var input = wrapper.find('.thwcfe-checkout-file-value');

		wrapper.find('.thwcfe-checkout-file').val('');
		input.val('');
		input.data('file-name', '');
		input.trigger("change");
	}

	function add_message(wrapper, data, type){
		if(data.response && data.error){
			wrapper.find('.thwcfe-file-upload-msg').html(data.error);
			wrapper.find('.thwcfe-file-upload-msg').show();
		}else{
			clear_message(wrapper);
		}
	}

	function clear_message(wrapper){
		wrapper.find('.thwcfe-file-upload-msg').html('');
		wrapper.find('.thwcfe-file-upload-msg').hide();
	}
	
	return {
		setup_file_upload : setup_file_upload,
		remove_uploaded : remove_uploaded,
		change_uploaded : change_uploaded,
		prepare_preview_html : prepare_preview_html,
		clean_file_input : clean_file_input,
	};
}(window.jQuery, window, document));

function thwcfeRemoveUploaded(elm, event){
	thwcfe_public_file_upload.remove_uploaded(elm, event);
}

function thwcfeChangeUploaded(elm, event){
	thwcfe_public_file_upload.change_uploaded(elm, event);
}

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
