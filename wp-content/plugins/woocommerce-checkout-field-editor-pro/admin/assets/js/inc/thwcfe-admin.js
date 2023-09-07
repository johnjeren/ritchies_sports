var thwepo_settings = (function($, window, document) {
	'use strict';

	var MSG_INVALID_NAME = 'NAME/ID must begin with a lowercase letter ([a-z]) and may be followed by any number of lowercase letters, digits ([0-9]) and underscores ("_")';
	
	var OPTION_ROW_HTML  = '<tr>';
        OPTION_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_options_key[]" placeholder="Option Value" style="width:180px;"/></td>';
		OPTION_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_options_text[]" placeholder="Option Text" style="width:180px;"/></td>';
		OPTION_ROW_HTML += '<td style="width:80px;"><input type="text" name="i_options_price[]" placeholder="Price" style="width:70px;"/></td>';
		OPTION_ROW_HTML += '<td style="width:130px;"><select name="i_options_price_type[]" style="width:120px;">';
		OPTION_ROW_HTML += '<option selected="selected" value="">Normal</option><option value="percentage">Percentage</option></select></td>';
		OPTION_ROW_HTML += '<td class="action-cell"><a href="javascript:void(0)" onclick="thwepoAddNewOptionRow(this)" class="btn btn-blue" title="Add new option">+</a></td>';
		OPTION_ROW_HTML += '<td class="action-cell"><a href="javascript:void(0)" onclick="thwepoRemoveOptionRow(this)" class="btn btn-red"  title="Remove option">x</a></td>';
		OPTION_ROW_HTML += '<td class="action-cell sort ui-sortable-handle"></td>';
		OPTION_ROW_HTML += '</tr>';
		
	/* used to holds next request's data (most likely to be transported to server) */
	//this.request = null;
	/* used to holds last operation's response from server */
	//this.response = null;
	/* to prevetn Ajax conflict. */
	//this.ajaxFlaQ = true;
		
   /*------------------------------------
	*---- ON-LOAD FUNCTIONS - SATRT -----	
	*------------------------------------*/
	$(function() {
		var settings_form = $('#thwepo_product_fields_form');
		
		$( "#thwepo_new_section_form_pp" ).dialog({
			modal: true,
			width: 900,
			//height: 400,
			resizable: false,
			autoOpen: false,
			buttons: [
				{
					text: "Cancel",
					click: function() { $( this ).dialog( "close" ); }	
				},
				{
					text: "Save",
					click: function() {
						var form = $("#thwepo_new_section_form");
						var tab_content = $("#thwepo_section_editor_form_new");
						var result = wepo_validate_section_form( form );
						if(result){
							prepare_section_form(tab_content);
							form.submit(); 
						}
					}
				}
			]
		});	
		$( "#thwepo_edit_section_form_pp" ).dialog({
			modal: true,
			width: 900,
			resizable: false,
			autoOpen: false,
			buttons: [
				{
					text: "Cancel",
					click: function() { $( this ).dialog( "close" ); }	
				},
				{
					text: "Save",
					click: function() {
						var form = $("#thwepo_edit_section_form");
						var tab_content = $("#thwepo_section_editor_form_edit");
						var result = wepo_validate_section_form( form );
						if(result){
							prepare_section_form(tab_content);
							form.submit();
						}
					}
				}
			]
		});
		
		$( "#thwepo_new_field_form_pp" ).dialog({
			modal: true,
			width: 900,
			resizable: false,
			autoOpen: false,
			buttons: [{
					text: "Cancel",
					click: function() { $( this ).dialog( "close" ); }	
				},{
					text: "Save Field",
					click: function() {
						var tab_content = $("#thwepo_field_editor_form_new");
						var result = validate_field_form( 'thwepo_new_field_form_pp', tab_content );
						if(result){ 
							prepare_field_form(tab_content);
							$("#thwepo_new_field_form").submit(); 
						}
					}
				}
			]
		});	
		$( "#thwepo_edit_field_form_pp" ).dialog({
			modal: true,
			width: 900,
			resizable: false,
			autoOpen: false,
			buttons: [{
					text: "Cancel",
					click: function() { $( this ).dialog( "close" ); }	
				},{
					text: "Save Field",
					click: function() {
						var tab_content = $("#thwepo_field_editor_form_edit");
						var result = validate_field_form( 'thwepo_edit_field_form_pp', tab_content );
						if(result){ 
							prepare_field_form(tab_content);
							$("#thwepo_edit_field_form").submit(); 
						}
					}
				}
			]
		});
		
		thwepo_base.setupSortableTable(settings_form, '#thwepo_product_fields', '0');
		thwepo_base.setup_tiptip_tooltips();
	});
   /*------------------------------------
	*---- ON-LOAD FUNCTIONS - END -------
	*------------------------------------*/
	 
   /*------------------------------------
	*---- COMMON FUNCTIONS - START ------
	*------------------------------------*/
	function select_all_fields(elm){
		var checkAll = $(elm).prop('checked');
		$('#thwepo_product_fields tbody input:checkbox[name=select_field]').prop('checked', checkAll);
	}
   /*------------------------------------
	*---- COMMON FUNCTIONS - END --------
	*------------------------------------*/

   /*------------------------------------
	*---- SECTION FUNCTIONS - SATRT -----
    *------------------------------------*/	
	var SECTION_FORM_FIELDS = {
		name 	   : {name : 'name', label : 'Name/ID', type : 'text', required : 1},
		position   : {name : 'position', label : 'Display Position', type : 'select', value : 'woo_before_add_to_cart_button', required : 1},
		//box_type : {name : 'box_type', label : 'Box Type', type : 'select'},
		order      : {name : 'order', label : 'Display Order', type : 'text'},
		cssclass   : {name : 'cssclass', label : 'CSS Class', type : 'text'},
		show_title : {name : 'show_title', label : 'Show section title in product page.', type : 'checkbox', value : 'yes', checked : true},
		
		title_cell_with : {name : 'title_cell_with', label : 'Col-1 Width', type : 'text', value : ''},
		field_cell_with : {name : 'field_cell_with', label : 'Col-2 Width', type : 'text', value : ''},
		
		title 		: {name : 'title', label : 'Title', type : 'text'},
		//title_position : {name : 'title_position', label : 'Title Position', type : 'select'},
		title_type 	: {name : 'title_type', label : 'Title Type', type : 'select', value : 'h3'},
		title_color : {name : 'title_color', label : 'Title Color', type : 'colorpicker'},
		title_class : {name : 'title_class', label : 'Title Class', type : 'text'},
		
		subtitle 	   : {name : 'subtitle', label : 'Subtitle', type : 'text'},
		//subtitle_position : {name : 'subtitle_position', label : 'Subtitle Position', type : 'select'},
		subtitle_type  : {name : 'subtitle_type', label : 'Subtitle Type', type : 'select', value : 'h3'},
		subtitle_color : {name : 'subtitle_color', label : 'Subtitle Color', type : 'colorpicker'},
		subtitle_class : {name : 'subtitle_class', label : 'Subtitle Class', type : 'text'},
	};
	
	function open_new_section_form(){
		var form = $("#thwepo_new_section_form");
		var popup = $("#thwepo_new_section_form_pp");
		
		clear_section_form(form);		
	  	popup.dialog( "open" );
		popup.find('.thwepo_tab_general_link').click();
		thwepo_base.setupColorPicker(form);
		thwepo_base.setupEnhancedMultiSelect(form);
	}
	
	function open_edit_section_form(sectionJson){
		var form = $("#thwepo_edit_section_form");
		var popup = $("#thwepo_edit_section_form_pp");
		
		populate_section_form(form, sectionJson, "edit");				
		popup.dialog( "open" );
		popup.find('.thwepo_tab_general_link').click();
		thwepo_base.setupColorPicker(form);
		thwepo_base.setupEnhancedMultiSelect(form);
	}
	
	function open_copy_section_form(sectionJson){
		var form = $("#thwepo_new_section_form");
		var popup = $("#thwepo_new_section_form_pp");
		
		populate_section_form(form, sectionJson, "copy");				
		popup.dialog( "open" );
		popup.find('.thwepo_tab_general_link').click();
		thwepo_base.setupColorPicker(form);
		thwepo_base.setupEnhancedMultiSelect(form);
	}
	
	function remove_section(elm){
		var _confirm = confirm('Are you sure you want to delete this section?.');
		if(_confirm){
			var form = $(elm).closest('form');
			if(form){ form.submit(); }
		}
	}
	
	function set_form_field_values(form, fields, valuesJson){
		var sname = valuesJson ? valuesJson['name'] : '';
		
		$.each( fields, function( fname, field ) {
			var ftype = field['type'];								  
			var fvalue = valuesJson ? valuesJson[fname] : field['value'];
			
			switch(ftype) {
				case 'select':
					form.find("select[name=i_"+fname+"]").val(fvalue);
					break;
					
				case 'checkbox':
					var checked = false;
					if(valuesJson){
						checked = fvalue == 1 ? true : false;
					}else{
						checked = field['checked'] ? true : false;
					}
					form.find("input[name=i_"+fname+"]").prop('checked', checked);
					break;
					
				case 'colorpicker':
					var bg_color = fvalue ? { backgroundColor: fvalue } : {}; 
					form.find("input[name=i_"+fname+"]").val(fvalue);
					form.find("."+fname+"_preview").css(bg_color);
					break;
					
				default:
					form.find("input[name=i_"+fname+"]").val(fvalue);
			}
		});
		
		var prop_form = $('#section_prop_form_'+sname);
		
		var rulesAction = valuesJson['rules_action'];
		var rulesActionAjax = valuesJson['rules_action_ajax'];
		var conditionalRules = prop_form.find(".f_rules").val();
		var conditionalRulesAjax = prop_form.find(".f_rules_ajax").val();
		
		rulesAction = rulesAction != '' ? rulesAction : 'show';
		rulesActionAjax = rulesActionAjax != '' ? rulesActionAjax : 'show';
		
		form.find("select[name=i_rules_action]").val(rulesAction);
		form.find("select[name=i_rules_action_ajax]").val(rulesActionAjax);
		
		thwepo_conditions.populate_conditional_rules(form, conditionalRules, false);	
		thwepo_conditions.populate_conditional_rules(form, conditionalRulesAjax, true);
	}
	
	function clear_section_form(form){
		form.find('.err_msgs').html('');
		set_form_field_values(form, SECTION_FORM_FIELDS, false);
	}
	
	function populate_section_form(form, sectionJson, formType){
		form.find('.err_msgs').html('');
		set_form_field_values(form, SECTION_FORM_FIELDS, sectionJson);
		
		if(formType === 'copy'){
			var sNameCopy = sectionJson ? sectionJson['name'] : '';
			form.find("input[name=i_name]").val("");
			form.find("input[name=s_name_copy]").val(sNameCopy);
		}else{
			form.find("input[name=i_name]").prop("readonly", true);
		}
		form.find("select[name=i_position_old]").val(sectionJson.position);
		
		setTimeout(function(){form.find("select[name=i_position]").focus();}, 1);
	}
	
	function wepo_validate_section_form(form){
		var name  = form.find("input[name=i_name]").val();
		var title = form.find("input[name=i_title]").val();
		var position = form.find("select[name=i_position]").val();
		
		var err_msgs = '';
		if(name.trim() == ''){
			err_msgs = 'Name/ID is required';
		}else if(!thwepo_base.isHtmlIdValid(name)){
			err_msgs = MSG_INVALID_NAME;
		}else if(title.trim() == ''){
			err_msgs = 'Title is required';
		}else if(position == ''){
			err_msgs = 'Please select a position';
		}		
		
		if(err_msgs != ''){
			form.find('.err_msgs').html(err_msgs);
			return false;
		}		
		return true;
	}
	
	function prepare_section_form(form){
		var rules_json = thwepo_conditions.getConditionalRules(form, false);
		var rules_ajax_json = thwepo_conditions.getConditionalRules(form, true);
		
		thwepo_base.set_property_field_value(form, 'hidden', 'rules', rules_json, 0);
		thwepo_base.set_property_field_value(form, 'hidden', 'rules_ajax', rules_ajax_json, 0);
	}
   /*-----------------------------------
	*---- SECTION FUNCTIONS - END ------
	*-----------------------------------*/
	 
   /*------------------------------------
	*---- PRODUCT FIELDS - SATRT --------
	*------------------------------------*/
	var FIELD_FORM_PROPS = {
		name  : {name : 'name', type : 'text'},
		type  : {name : 'type', type : 'select'},
		
		value : {name : 'value', type : 'text'},
		placeholder : {name : 'placeholder', type : 'text'},
		validate    : {name : 'validate', type : 'select', multiple : 1 },
		cssclass    : {name : 'cssclass', type : 'text'},
		maxlength   : {name : 'maxlength', type : 'text'},
		
		title          : {name : 'title', type : 'text'},
		title_type     : {name : 'title_type', type : 'select'},
		title_color    : {name : 'title_color', type : 'text'},
		title_position : {name : 'title_position', type : 'select'},
		title_class    : {name : 'title_class', type : 'text'},
		subtitle          : {name : 'subtitle', type : 'text'},
		subtitle_type     : {name : 'subtitle_type', type : 'select'},
		subtitle_color    : {name : 'subtitle_color', type : 'text'},
		subtitle_position : {name : 'subtitle_position', type : 'select'},
		subtitle_class    : {name : 'subtitle_class', type : 'text'},
		//Price Properties
		is_price_field  : {name : 'is_price_field', type : 'checkbox'},
		price  : {name : 'price', type : 'text'},
		price_unit  : {name : 'price_unit', type : 'text'},
		price_type  : {name : 'price_type', type : 'select', change : 1},
		price_min_unit  : {name : 'price_min_unit', type : 'text'},
		price_prefix  : {name : 'price_prefix', type : 'text'},
		price_sufix  : {name : 'price_sufix', type : 'text'},
		
		checked  : {name : 'checked', type : 'checkbox'},
		required  : {name : 'required', type : 'checkbox'},
		enabled  : {name : 'enabled', type : 'checkbox'},
		
		maxsize : {name : 'maxsize', type : 'text'},
		accept  : {name : 'accept', type : 'text'},
		
		//Date Picker Properties
		default_date : {name : 'default_date', type : 'text'},
		date_format  : {name : 'date_format', type : 'text'},
		min_date   : {name : 'min_date', type : 'text'},
		max_date   : {name : 'max_date', type : 'text'},
		year_range : {name : 'year_range', type : 'text'},
		number_of_months : {name : 'number_of_months', type : 'text'},
		disabled_days  : {name : 'disabled_days', type : 'select', multiple : 1 },
		disabled_dates : {name : 'disabled_dates', type : 'text'},
		
		//Time Picker Properties
		min_time  : {name : 'min_time', type : 'text'},
		max_time  : {name : 'max_time', type : 'text'},
		time_step  : {name : 'time_step', type : 'text'},
		time_format  : {name : 'time_format', type : 'select'},
	};
	
	var OPTION_PROPERTY_DISPLAY_FIELDS = {
		name  		: {name : 'name', type : 'text'},
		type  		: {name : 'type', type : 'select'},
		title 		: {name : 'title', type : 'text'},
		placeholder : {name : 'placeholder', type : 'text'},
		validate 	: {name : 'validate', type : 'select', multiple : 1},
		required 	: {name : 'required', type : 'checkbox', status : 1},
		enabled  	: {name : 'enabled', type : 'checkbox', status : 1},
	};
	
	function clear_field_form_general( form ){
		form.find('.err_msgs').html('');
		form.find("input[name=i_name]").val('');
		form.find("input[name=i_name_old]").val('');
		form.find("select[name=i_type]").prop('selectedIndex',0);
	}
	
	function populate_field_form_general(form, props, rowId){
		var name = props.name;
		var type = props.type;
		
		thwepo_base.set_property_field_value(form, 'text', 'rowid', rowId, 0);
		thwepo_base.set_property_field_value(form, 'text', 'name', name, 0);
		thwepo_base.set_property_field_value(form, 'select', 'type', type, 0);
		thwepo_base.set_property_field_value(form, 'hidden', 'original_type', type, 0);
		thwepo_base.set_property_field_value(form, 'hidden', 'name_old', name, 0);
		
		//form.find("input[name=i_name]").prop('readonly', true);
		//form.find("select[name=i_type]").prop('disabled', false);
	}
	
	function populate_field_form(form, row, props, rowId){
		$.each( FIELD_FORM_PROPS, function( name, field ) {
			if(name == 'name' || name == 'type') {
				return true;
			}
	
			var type  = field['type'];
			var value = props[name];
			
			thwepo_base.set_property_field_value(form, type, name, value, field['multiple']);
			
			if(type == 'select'){
				name = field['multiple'] == 1 ? name+"[]" : name;
				
				if(field['multiple'] == 1 || field['change'] == 1){
					form.find('select[name="i_'+name+'"]').trigger("change");
				}
			}
			
			var showsubtitleElm = form.find("#a_fshowsubtitle");
			if(name == 'subtitle'){
				if(value){
					showsubtitleElm.prop('checked', true);
				}else{
					showsubtitleElm.prop('checked', false);
				}
			}
			showsubtitleElm.trigger("change");
		});
		
		var optionsJson = row.find(".f_options").val();
		populate_options_list(form, optionsJson);
		
		var rulesAction = props['rules_action'];
		var rulesActionAjax = props['rules_action_ajax'];
		var conditionalRules = row.find(".f_rules").val();
		var conditionalRulesAjax = row.find(".f_rules_ajax").val();
		
		rulesAction = rulesAction != '' ? rulesAction : 'show';
		rulesActionAjax = rulesActionAjax != '' ? rulesActionAjax : 'show';
		
		form.find("select[name=i_rules_action]").val(rulesAction);
		form.find("select[name=i_rules_action_ajax]").val(rulesActionAjax);
		
		thwepo_conditions.populate_conditional_rules(form, conditionalRules, false);	
		thwepo_conditions.populate_conditional_rules(form, conditionalRulesAjax, true);
	}
	
	function open_new_field_form(sectionName){
		var popup = $("#thwepo_new_field_form_pp");
		var form  = $("#thwepo_field_editor_form_new");
		
		clear_field_form_general(form);
		form.find("select[name=i_type]").change();	
		
	  	popup.dialog("open");
		popup.find('.thwepo_tab_general_link').click();
	}
	
	function open_edit_field_form(elm, rowId){
		var row = $(elm).closest('tr');
		var popup = $("#thwepo_edit_field_form_pp");
		var form = $("#thwepo_field_editor_form_edit");
		var props_json = row.find(".f_props").val();
		props_json = thwepo_base.decodeHtml(props_json);
		var props = JSON.parse(props_json);
				
		populate_field_form_general(form, props, rowId);
		form.find("select[name=i_type]").change();			
		populate_field_form(form, row, props, rowId);	
		
		popup.dialog("open");
		popup.find('.thwepo_tab_general_link').click();
		thwepo_base.setup_color_pick_preview(form);
	}
	
	function field_type_change_listner(elm){
		var type = $(elm).val();
		var form = $(elm).closest('form');
		
		type = type == null ? 'default' : type;
		if(type == 'label' || type == 'heading'){
			form.find('.thwepo_tab_styles_link').hide();
			form.find('.thpladmin-tab-content-styles :input').prop('disabled', true);
		}else{
			form.find('.thwepo_tab_styles_link').show();
			form.find('.thpladmin-tab-content-styles :input').prop('disabled', false);
		}
		
		form.find('.thwepo_field_form_tab_general_placeholder').html($('#thwepo_field_form_id_'+type).html());
		thwepo_base.setupEnhancedMultiSelect(form);	
		thwepo_base.setupColorPicker(form);
		thwepo_base.setupSortableTable(form, '.thwepo-option-list', '100');
	}
	
	function validate_field_form(containerId, form){
		var err_msgs = '';
		
		var fname  = thwepo_base.get_property_field_value(form, 'text', 'name');
		var ftype  = thwepo_base.get_property_field_value(form, 'select', 'type');
		var ftitle = thwepo_base.get_property_field_value(form, 'text', 'title');
		var foriginalType  = thwepo_base.get_property_field_value(form, 'hidden', 'original_type');
		
		if(ftype == 'heading'){
			if(fname == ''){
				err_msgs = 'Name is required';
			}else if(!thwepo_base.isHtmlIdValid(fname)){
				err_msgs = MSG_INVALID_NAME;
			}else if(ftitle == ''){
				err_msgs = 'Title is required';
			}		
		}else{
			if(ftype == '' ){
				err_msgs = 'Type is required';
			}else if(fname == ''){
				err_msgs = 'Name is required';
			}else if(!thwepo_base.isHtmlIdValid(fname)){
				err_msgs = MSG_INVALID_NAME;
			}
		}	
		
		if(err_msgs != ''){
			form.find('.err_msgs').html(err_msgs);
			$("#"+containerId).find('.thwepo_tab_general_link').click();
			return false;
		}
		return true;
	}
	
	function prepare_field_form(form){
		var options_json = get_options(form);
		var rules_json = thwepo_conditions.getConditionalRules(form, false);
		var rules_ajax_json = thwepo_conditions.getConditionalRules(form, true);
		
		thwepo_base.set_property_field_value(form, 'hidden', 'options', options_json, 0);
		thwepo_base.set_property_field_value(form, 'hidden', 'rules', rules_json, 0);
		thwepo_base.set_property_field_value(form, 'hidden', 'rules_ajax', rules_ajax_json, 0);
	}
	
	function open_copy_field_form(elm, rowId){
		var row = $(elm).closest('tr');
		var popup = $("#thwepo_new_field_form_pp");
		var form = $("#thwepo_field_editor_form_new");
		var props_json = row.find(".f_props").val();
		var props = JSON.parse(props_json);
				
		var name = ''; //props.name+"_copy";
		thwepo_base.set_property_field_value(form, 'text', 'name', name, 0);
		thwepo_base.set_property_field_value(form, 'select', 'type', props.type, 0);
		
		form.find("select[name=i_type]").change();			
		populate_field_form(form, row, props, rowId);	
		
		popup.dialog("open");
		popup.find('.thwepo_tab_general_link').click();
		thwepo_base.setup_color_pick_preview(form);
	}
   /*------------------------------------
	*---- PRODUCT FIELDS - END ----------
	*------------------------------------*/
	
   /*------------------------------------
	*---- OPTIONS FUNCTIONS - SATRT -----
	*------------------------------------*/
	function get_options(form){
		var optionsKey  = form.find("input[name='i_options_key[]']").map(function(){ return $(this).val(); }).get();
		var optionsText = form.find("input[name='i_options_text[]']").map(function(){ return $(this).val(); }).get();
		var optionsPrice = form.find("input[name='i_options_price[]']").map(function(){ return $(this).val(); }).get();
		var optionsPriceType = form.find("select[name='i_options_price_type[]']").map(function(){ return $(this).val(); }).get();
		
		var optionsSize = optionsText.length;
		var optionsArr = [];
		
		for(var i=0; i<optionsSize; i++){
			var optionDetails = {};
			optionDetails["key"] = optionsKey[i];
			optionDetails["text"] = optionsText[i];
			optionDetails["price"] = optionsPrice[i];
			optionDetails["price_type"] = optionsPriceType[i];
			
			optionsArr.push(optionDetails);
		}
		
		var optionsJson = optionsArr.length > 0 ? JSON.stringify(optionsArr) : '';
		optionsJson = encodeURIComponent(optionsJson);
		return optionsJson;
	}
	
	function populate_options_list(form, optionsJson){
		var optionsHtml = "";
		
		if(optionsJson){
			try{
				optionsJson = decodeURIComponent(optionsJson);
				var optionsList = $.parseJSON(optionsJson);
				if(optionsList){
					jQuery.each(optionsList, function() {
						var op1Selected = this.price_type === 'percentage' ? 'selected' : '';
						var price = this.price ? this.price : '';
						
						var html  = '<tr>';
						html += '<td style="width:190px;"><input type="text" name="i_options_key[]" value="'+this.key+'" placeholder="Option Value" style="width:180px;"/></td>';
						html += '<td style="width:190px;"><input type="text" name="i_options_text[]" value="'+this.text+'" placeholder="Option Text" style="width:180px;"/></td>';
						html += '<td style="width:80px;"><input type="text" name="i_options_price[]" value="'+price+'" placeholder="Price" style="width:70px;"/></td>';
						html += '<td style="width:130px;"><select name="i_options_price_type[]" value="'+this.price_type+'" style="width:120px;">';
						html += '<option value="">Normal</option><option value="percentage" '+op1Selected+'>Percentage</option></select></td>';
						html += '<td class="action-cell"><a href="javascript:void(0)" onclick="thwepoAddNewOptionRow(this)" class="btn btn-blue" title="Add new option">+</a></td>';
						html += '<td class="action-cell"><a href="javascript:void(0)" onclick="thwepoRemoveOptionRow(this)" class="btn btn-red"  title="Remove option">x</a></td>';
						html += '<td class="action-cell sort ui-sortable-handle"></td>';
						html += '</tr>';
						
						optionsHtml += html;
					});
				}
			}catch(err) {
				alert(err);
			}
		}
		
		var optionsTable = form.find(".thwepo-option-list tbody");
		if(optionsHtml){
			optionsTable.html(optionsHtml);
		}else{
			optionsTable.html(OPTION_ROW_HTML);
		}
	}
	
	function add_new_option_row(elm){
		var ptable = $(elm).closest('table');
		var optionsSize = ptable.find('tbody tr').size();
			
		if(optionsSize > 0){
			ptable.find('tbody tr:last').after(OPTION_ROW_HTML);
		}else{
			ptable.find('tbody').append(OPTION_ROW_HTML);
		}
	}
	
	function remove_option_row(elm){
		var ptable = $(elm).closest('table');
		$(elm).closest('tr').remove();
		var optionsSize = ptable.find('tbody tr').size();
			
		if(optionsSize == 0){
			ptable.find('tbody').append(OPTION_ROW_HTML);
		}
	}
   /*------------------------------------
	*---- OPTIONS FUNCTIONS - END -------
	*------------------------------------*/
	
	function show_subtitle_options(elm){
		var show = $(elm).prop('checked');
		if(show){
			$('tr.thwepo_subtitle_row').show();
		}else{
			$('tr.thwepo_subtitle_row').hide();
		}		
	}

   /*----------------------------------------
	*---- PRICE FIELD FUNCTIONS - START -----
	*----------------------------------------*/
	function price_type_change_listener(elm){
		var tab = $(elm).closest('table.thwepo_field_form_tab_general_placeholder');
		var row = $(elm).closest('tr');
		var priceType = $(elm).val();
		
		if(priceType === 'dynamic' || priceType === 'dynamic-excl-base-price'){
			row.find("input[name=i_price]").prop('disabled', false);
			row.find("input[name=i_price]").css('width','100px');
			row.find('.thpladmin-dynamic-price-field').show();
			tab.find('.thpladmin-dynamic-price-field').show();
		}else{
			if(priceType === 'custom'){
				row.find("input[name=i_price]").val('');
				row.find("input[name=i_price_unit]").val('');
				row.find("input[name=i_price]").prop('disabled', true);
			}else{
				row.find("input[name=i_price]").prop('disabled', false);
			}
			
			row.find("input[name=i_price]").css('width','250px');
			row.find('.thpladmin-dynamic-price-field').hide();
			tab.find('.thpladmin-dynamic-price-field').hide();
		}
	}
	
	function show_price_fields(elm){
		var show = $(elm).prop('checked');
		if(show){
			$('tr.thwepo_price_row').show();
		}else{
			$('tr.thwepo_price_row').hide();
		}		
	}
   /*--------------------------------------
	*---- PRICE FIELD FUNCTIONS - END -----
	*--------------------------------------*/
	
   /*---------------------------------------
	* Remove fields functions - START
	*----------------------------------------*/
	function remove_selected_fields(){
		$('#thwepo_product_fields tbody tr').removeClass('strikeout');
		$('#thwepo_product_fields tbody input:checkbox[name=select_field]:checked').each(function () {
			var row = $(this).closest('tr');
			if(!row.hasClass("strikeout")){
				row.addClass("strikeout");
			}
			row.find(".f_deleted").val(1);
			row.find(".f_edit_btn").prop('disabled', true);
	  	});	
	}
   /*---------------------------------------
	* Remove fields functions - END
	*----------------------------------------*/
	
   /*---------------------------------------
	* Enable or Disable fields functions - START
	*----------------------------------------*/
	function enable_disable_selected_fields(enabled){
		$('#thwepo_product_fields tbody input:checkbox[name=select_field]:checked').each(function(){
			var row = $(this).closest('tr');
			if(enabled == 0){
				if(!row.hasClass("thpladmin-disabled")){
					row.addClass("thpladmin-disabled");
				}
			}else{
				row.removeClass("thpladmin-disabled");				
			}
			
			row.find(".f_edit_btn").prop('disabled', enabled == 1 ? false : true);
			row.find(".td_enabled").html(enabled == 1 ? '<span class="status-enabled tips">Yes</span>' : '-');
			row.find(".f_enabled").val(enabled);
	  	});	
	}
   /*-----------------------------------------
	* Enable or Disable fields functions - END
	*----------------------------------------*/	
	   				
	return {
		openNewSectionForm : open_new_section_form,
		openEditSectionForm : open_edit_section_form,
		openCopySectionForm : open_copy_section_form,
		removeSection : remove_section,
		openNewFieldForm : open_new_field_form,
		openEditFieldForm : open_edit_field_form,
		openCopyFieldForm : open_copy_field_form,
		removeSelectedFields : remove_selected_fields,
		enableDisableSelectedFields : enable_disable_selected_fields,
		fieldTypeChangeListner : field_type_change_listner,
		selectAllFields : select_all_fields,
		show_subtitle_options : show_subtitle_options,
		show_price_fields : show_price_fields,
		addNewOptionRow : add_new_option_row,
		removeOptionRow : remove_option_row,
		priceTypeChangeListener : price_type_change_listener,
   	};
}(window.jQuery, window, document));	

function thwepoOpenNewSectionForm(){
	thwepo_settings.openNewSectionForm();		
}

function thwepoOpenEditSectionForm(section){
	thwepo_settings.openEditSectionForm(section);		
}

function thwepoOpenCopySectionForm(section){
	thwepo_settings.openCopySectionForm(section);		
}

function thwepoRemoveSection(elm){
	thwepo_settings.removeSection(elm);	
}

function thwepoOpenNewFieldForm(sectionName){
	thwepo_settings.openNewFieldForm(sectionName);		
}

function thwepoOpenEditFieldForm(elm, rowId){
	thwepo_settings.openEditFieldForm(elm, rowId);		
}
	
function thwepoRemoveSelectedFields(){
	thwepo_settings.removeSelectedFields();
}

function thwepoEnableSelectedFields(){
	thwepo_settings.enableDisableSelectedFields(1);
}

function thwepoDisableSelectedFields(){
	thwepo_settings.enableDisableSelectedFields(0);
}

function thwepoFieldTypeChangeListner(elm){	
	thwepo_settings.fieldTypeChangeListner(elm);
}
	
function thwepoSelectAllProductFields(elm){
	thwepo_settings.selectAllFields(elm);
}

function thwepo_show_subtitle_options(elm){
	thwepo_settings.show_subtitle_options(elm);
}

function thwepo_show_price_fields(elm){
	thwepo_settings.show_price_fields(elm);
}

function thwepoAddNewOptionRow(elm){
	thwepo_settings.addNewOptionRow(elm);
}
function thwepoRemoveOptionRow(elm){
	thwepo_settings.removeOptionRow(elm);
}

function thwepoPriceTypeChangeListener(elm){
	thwepo_settings.priceTypeChangeListener(elm);
}

function thwepoOpenCopyFieldForm(elm, rowId){
	thwepo_settings.openCopyFieldForm(elm, rowId);		
}