var thwcfe_public_conditions = (function($, window, document) {
	'use strict';

	function ship_to_diff_address(){
		var checked = false;
		var ship_to_diff_address_elm = $('#ship-to-different-address-checkbox');

		if(ship_to_diff_address_elm.length > 0){
			checked = $('#ship-to-different-address-checkbox').is(':checked');
		}

		return checked;
	}

	function is_disabled_shipping_field(elm){
		var ship_to_diff_addr = ship_to_diff_address();

		if(!ship_to_diff_addr && elm.hasClass('thwcfe-shipping-field')){
			return true;
		}

		return false;
	}

	function skip_marking_as_disabled_field(name, ship_to_diff_addr_trgr){
		var def_shipping_fields = ['shipping_first_name', 'shipping_last_name', 'shipping_company', 'shipping_address_1', 'shipping_address_2', 'shipping_country', 'shipping_state', 'shipping_city', 'shipping_postcode'];
		if(ship_to_diff_addr_trgr && def_shipping_fields.includes(name)){
			return true;
		}
		return false;
	}

	function get_input_elm(field){
		var input = null;

		if(field.getType() === 'hidden'){
			input = field;
		}else{
			input = field.find(":input.thwcfe-input-field");
		}

		return input;
	}

	function get_input_id(elm, type){
		var fid = null;

		if(type == "radio"){
			fid = elm.prop('name');
		}else if(type == "checkbox"){
		    fid = elm.prop('name');
		    fid = fid.replace("[]", "");   
		}else{
			fid = elm.prop('id');
		}

		return fid;
	}

	function get_dependant_fields(elm){
		var dep_fields = null;
	    var dep_fields_str = elm.data("fields");

	    if(dep_fields_str){
	    	dep_fields = dep_fields_str.split(",");

	    	if(dep_fields && dep_fields.length > 0){
	    		dep_fields = thwcfe_public_base.remove_duplicates(dep_fields);
			}
	    }

	    return dep_fields;
	}

	function set_field_value(elm, type){
		var value = elm.data('current-value');
		if(value){
			thwcfe_public_base.set_field_value_by_elm(elm, type, value);
		}
	}
	function clear_field_value(elm, type, id){
		elm.data('current-value', thwcfe_public_base.get_field_value(type, elm, id));
		thwcfe_public_base.set_field_value_by_elm(elm, type, '');
	}

	function add_to_disabled(elm, name){
		if(elm && name){
			var dis_names_str = elm.val();
			var dis_names_arr = dis_names_str ? dis_names_str.split(",") : [];
			
			dis_names_arr.push(name); 
			dis_names_str = dis_names_arr.toString();
			elm.val(dis_names_str);
		}
	}

	function remove_from_disabled(elm, name){
		if(elm && name){
			var dis_names_str = elm.val();
			var dis_names_arr = dis_names_str ? dis_names_str.split(",") : [];
			
			dis_names_arr = jQuery.grep(dis_names_arr, function(value) {
			  	return value != name; 
			}); 

			dis_names_str = dis_names_arr.toString();
			elm.val(dis_names_str);
		}
	}

	function add_to_disabled_sections(name){
		var dis_names_elm = $('#thwcfe_disabled_sections');
		add_to_disabled(dis_names_elm, name);
	}
	function remove_from_disabled_sections(name){
		var dis_names_elm = $('#thwcfe_disabled_sections');
		remove_from_disabled(dis_names_elm, name);
	}

	function add_to_disabled_fields(name, ship_to_diff_addr_trgr){
		if(!skip_marking_as_disabled_field(name, ship_to_diff_addr_trgr)){
			var dis_names_elm = $('#thwcfe_disabled_fields');
			add_to_disabled(dis_names_elm, name);
		}
	}
	function remove_from_disabled_fields(name){
		if(name){
			var dis_names_elm = $('#thwcfe_disabled_fields');
			remove_from_disabled(dis_names_elm, name);
		}
	}

	function disable_field_validations(elm){
		var validations = elm.data("validations");
		if(validations) {
			elm.removeClass(validations);
			elm.removeClass('woocommerce-validated woocommerce-invalid woocommerce-invalid-required-field');
		}
	}
	function enable_field_validations(elm){
		var validations = elm.data("validations");
		elm.removeClass('woocommerce-validated woocommerce-invalid woocommerce-invalid-required-field');
		if(validations) {
			elm.addClass(validations);
		}	
	}

	function enable_disable_price_fields(wrapper, enable, trigger_price_calc){
		var price_fields = wrapper.find('.thwcfe-price-field');

		if(price_fields.length){
			if(enable){
				price_fields.removeClass('thwcfe-disabled-shipping-field');
			}else{
				price_fields.addClass('thwcfe-disabled-shipping-field');
			}

			if(trigger_price_calc){
				thwcfe_public_price.may_calculate_extra_cost();
			}
		}
	}
	function enable_price_fields(wrapper, trigger_price_calc){
		enable_disable_price_fields(wrapper, true, trigger_price_calc);
	}
	function disable_price_fields(wrapper, trigger_price_calc){
		enable_disable_price_fields(wrapper, false, trigger_price_calc);
	}
	/***----- Common functions end -----***/
	
	function hide_section(celm, needSetup){
		var sid = celm.prop('id');

		celm.hide();
		celm.addClass('thwcfe-disabled-section');
		
		if(celm.find('.thwcfe-input-field-wrapper').length){
			celm.find('.thwcfe-input-field-wrapper').each(function(){
				disable_field_validations($(this));
			});
		}

		add_to_disabled_sections(sid);

		var trigger_price_calc = false; //needSetup ? false : true;
		disable_price_fields(celm, trigger_price_calc);
	}
	
	function show_section(celm, needSetup){
		var sid = celm.prop('id');

		celm.show();
		celm.removeClass('thwcfe-disabled-section');
		
		if(celm.find('.thwcfe-input-field-wrapper').length){
			celm.find('.thwcfe-input-field-wrapper:not(.thwcfe-disabled-field-wrapper)').each(function(){
				enable_field_validations($(this));
			});
		}

		remove_from_disabled_sections(sid);

		var trigger_price_calc = false; //needSetup ? false : true;
		enable_price_fields(celm, trigger_price_calc);
	}
	
	function hide_field(cfield, needSetup, ship_to_diff_addr_trgr){
		var fid = '';

		if(cfield.hasClass('thwcfe-html-field-wrapper')){
			cfield.hide();
			fid = cfield.data('name');
			
		}else{
			var cinput = get_input_elm(cfield);

			if(cinput.hasClass('thwcfe-disabled-field') && !cinput.is(":visible")){
				return;
			}

			var ftype = cinput.getType();
			fid = get_input_id(cinput, ftype);
			
			cfield.hide();
			clear_field_value(cinput, ftype, fid);

			cinput.addClass('thwcfe-disabled-field');
			cfield.addClass('thwcfe-disabled-field-wrapper');

			var change_event_disabled_fields = thwcfe_public_var.change_event_disabled_fields;
			var change_e_disabled_fields = change_event_disabled_fields ? change_event_disabled_fields.split(",") : [];
			if($.inArray(fid, change_e_disabled_fields) === -1){
				//cinput.change();
				cinput.trigger('change', [{mt:true}]);
			}
			
			if(ftype == "E001" && cfield.attr('data-name')){
				fid = cfield.data('name');
			}

			disable_field_validations(cfield);
		}

		add_to_disabled_fields(fid, ship_to_diff_addr_trgr);
	}

	function show_field(cfield, needSetup){
		var fid = '';

		if(cfield.hasClass('thwcfe-html-field-wrapper')){
			cfield.show();
			fid = cfield.data('name');

		}else{
			var cinput = get_input_elm(cfield);

			if(!cinput.hasClass('thwcfe-disabled-field')){
				return;
			}

			if(is_disabled_shipping_field(cfield)){
				return;
			}

			var ftype = cinput.getType();
			fid = get_input_id(cinput, ftype);
		
			cfield.show();
			set_field_value(cinput, ftype);
			
			cfield.removeClass('thwcfe-disabled-field-wrapper');
			cinput.removeClass('thwcfe-disabled-field');

			var change_event_disabled_fields = thwcfe_public_var.change_event_disabled_fields;
			var change_e_disabled_fields = change_event_disabled_fields ? change_event_disabled_fields.split(",") : [];
			if($.inArray(fid, change_e_disabled_fields) === -1){
				//cinput.change();
				cinput.trigger('change', [{mt:true}]);
			}
			//cfield.find(":input").val('');

			if(ftype == "E001" && cfield.attr('data-name')){
				fid = cfield.data('name');
			}

			enable_field_validations(cfield);
		}

		remove_from_disabled_fields(fid);
	}
	
	function hide_elm(elm, needSetup){
		var elmType = elm.data("rules-elm");

		if(elmType === 'section'){
			hide_section(elm, needSetup);
		}else{
			hide_field(elm, needSetup, false);
		}
	}
	
	function show_elm(elm, needSetup){
		var elmType = elm.data("rules-elm");

		if(elmType === 'section'){
			show_section(elm, needSetup);
		}else{
			show_field(elm, needSetup);
		}
	}

	function enable_disable_shipping_fields(wrapper, enable, ship_to_diff_addr_trgr){
		wrapper.find('.thwcfe-input-field-wrapper').each(function(){
			var cfield = $(this);

			if(enable){
				show_field(cfield, false);
			}else{
				hide_field(cfield, false, ship_to_diff_addr_trgr);
			}

			if(!cfield.hasClass('thwcfe-shipping-field')){
				cfield.addClass('thwcfe-shipping-field');
			}	 
		});
	}
	
	function validate_condition(condition, valid, needSetup, cfield){
		if(condition){
			var operand_type = condition.operand_type;
			var operand = condition.operand;
			var operator = condition.operator;
			var cvalue = condition.value;
			
			if(operand_type === 'field' && operand){
				jQuery.each(operand, function() {
					var field = thwcfe_public_base.getInputField(this);
					
					if(thwcfe_public_base.isInputField(field)){
						var ftype = field.getType();
						var value = thwcfe_public_base.get_field_value(ftype, field, this);

						if(operator === 'empty' && value != ''){
							valid = false;
							
						}else if(operator === 'not_empty' && value == ''){
							valid = false;
							
						}else if(operator === 'value_eq' && value != cvalue){
							valid = false;
							
						}else if(operator === 'value_ne' && value == cvalue){
							valid = false;
							
						}else if(operator === 'value_in'){
							var value_arr = [];
							var cvalue_arr = [];

							if(value){
								value_arr = $.isArray(value) ? value : value.split(',');
							}
							if(cvalue){
								cvalue_arr = $.isArray(cvalue) ? cvalue : cvalue.split(',');
							}
							
							if(thwcfe_public_base.is_empty_arr(value_arr) || !thwcfe_public_base.is_subset_of(cvalue_arr, value_arr)){
								valid = false;
							}
							
						}else if(operator === 'value_cn'){
							var value_arr = [];
							var cvalue_arr = [];

							if(value){
								value_arr = $.isArray(value) ? value : value.split(',');
							}
							if(cvalue){
								cvalue_arr = $.isArray(cvalue) ? cvalue : cvalue.split(',');
							}
							
							if(!thwcfe_public_base.is_subset_of(value_arr, cvalue_arr)){
								valid = false;
							}
							
						}else if(operator === 'value_nc'){
							var value_arr = [];
							var cvalue_arr = [];

							if(value){
								value_arr = $.isArray(value) ? value : value.split(',');
							}
							if(cvalue){
								cvalue_arr = $.isArray(cvalue) ? cvalue : cvalue.split(',');
							}

							var intersection = thwcfe_public_base.array_intersection(cvalue_arr, value_arr);
							if(!thwcfe_public_base.is_empty_arr(intersection)){
								valid = false;
							}
							
						}else if(operator === 'value_gt'){
							if($.isNumeric(value) && $.isNumeric(cvalue)){
								valid = (Number(value) <= Number(cvalue)) ? false : valid;
							}else{
								valid = false;
							}
							
						}else if(operator === 'value_le'){
							if($.isNumeric(value) && $.isNumeric(cvalue)){
								valid = (Number(value) >= Number(cvalue)) ? false : valid;
							}else{
								valid = false;
							}
							
						}else if(operator === 'value_sw' && !value.startsWith(cvalue)){
							valid = false;

						}else if(operator === 'value_nsw' && value.startsWith(cvalue)){
							valid = false;

						}else if(operator === 'date_eq' && !thwcfe_public_base.is_date_eq(field, cvalue)){
							valid = false;
							
						}else if(operator === 'date_ne' && thwcfe_public_base.is_date_eq(field, cvalue)){
							valid = false;
							
						}else if(operator === 'date_gt' && !thwcfe_public_base.is_date_gt(field, cvalue)){
							valid = false;
							
						}else if(operator === 'date_lt' && !thwcfe_public_base.is_date_lt(field, cvalue)){
							valid = false;
							
						}else if(operator === 'day_eq' && !thwcfe_public_base.is_day_eq(field, cvalue)){
							valid = false;
							
						}else if(operator === 'day_ne' && thwcfe_public_base.is_day_eq(field, cvalue)){
							valid = false;
							
						}else if(operator === 'checked'){
							var checked = field.prop('checked');
							valid = checked ? valid : false;
							
						}else if(operator === 'not_checked'){
							var checked = field.prop('checked');
							valid = checked ? false : valid;

						}else if(operator === 'regex'){
							if(cvalue){
								var regex = new RegExp(cvalue);
								if(!regex.test(value)){
									valid = false;
								}
							}
						}
						
						if(needSetup){
							var depFields = field.data("fields");

							if(depFields){
								var depFieldsArr = depFields.split(",");
								depFieldsArr.push(cfield.prop('id'));
								depFields = depFieldsArr.toString();
							}else{
								depFields = cfield.prop('id');
							}

							field.data("fields", depFields);
							add_field_value_change_handler(field);
						}
					}
				});
			}
		}
		return valid;
	}

	function validate_field_condition(cfield, needSetup){
		var conditionalRules = cfield.data("rules");	
		var conditionalRulesAction = cfield.data("rules-action");
		var valid = true;
		var show = true;
		
		if(conditionalRules){
			try{
				jQuery.each(conditionalRules, function() {
					var ruleSet = this;	
					
					jQuery.each(ruleSet, function() {
						var rule = this;
						var validRS = false;
						
						jQuery.each(rule, function() {
							var conditions = this;								   	
							var validCS = true;
							
							jQuery.each(conditions, function() {
								validCS = validate_condition(this, validCS, needSetup, cfield);
							});
							
							validRS = validRS || validCS;
						});
						valid = valid && validRS;
					});
				});
			}catch(err) {
				alert(err);
			}

			if(conditionalRulesAction === 'hide'){
				show = valid ? false : true;
			}else{
				show = valid ? true : false;
			}

			if(show){
				show_elm(cfield, needSetup);
			}else{
				hide_elm(cfield, needSetup);
			}
		}
	}
	
	function conditional_field_value_change_listner(event, data){
		var dep_fields = get_dependant_fields($(this));

	    if(dep_fields && dep_fields.length > 0){
			jQuery.each(dep_fields, function() {
				if(this.length > 0){	
					var cfield = $('#'+this);
					validate_field_condition(cfield, false);	
				}
			});
		}

		if(!(data && data.mt)){
			thwcfe_public_price.may_calculate_extra_cost();
		}
	}
	
	function add_field_value_change_handler(field){
		field.off("change", conditional_field_value_change_listner);
		field.on("change", conditional_field_value_change_listner);
	}

	function validate_all_conditions(wrapper){
		var cfield_elm   = null;
		var csection_elm = null;

		if(wrapper){
			cfield_elm   = wrapper.find('.thwcfe-conditional-field');
			csection_elm = wrapper.find('.thwcfe-conditional-section');
		}else{
			cfield_elm   = $('.thwcfe-conditional-field');
			csection_elm = $('.thwcfe-conditional-section');
		}

		if(cfield_elm.length > 0){
			cfield_elm.each(function(){
				validate_field_condition($(this), true);							 
			});
		}

		if(csection_elm.length > 0){
			csection_elm.each(function(){
				validate_field_condition($(this), true);				 
			});
		}
	}

	function prepare_shipping_conitional_fields(elm, trigger_price_calc){
		var ship_to_different_address_elm = $('#ship-to-different-address-checkbox');
		var shipping_wrapper = $('.woocommerce-shipping-fields');
		var ship_to_different_address = ship_to_different_address_elm.is(':checked');

		//enable_disable_price_fields(shipping_wrapper, ship_to_different_address, false);
		enable_disable_shipping_fields(shipping_wrapper, ship_to_different_address, true);
		enable_disable_price_fields(shipping_wrapper, ship_to_different_address, false);
		
		if(ship_to_different_address){
			validate_all_conditions(shipping_wrapper);
		}

		if(trigger_price_calc){
			thwcfe_public_price.may_calculate_extra_cost();
		}
	}
	
	return {
		validate_field_condition : validate_field_condition,
		validate_all_conditions : validate_all_conditions,
		prepare_shipping_conitional_fields : prepare_shipping_conitional_fields,
		conditional_field_value_change_listner : conditional_field_value_change_listner,
	};
}(window.jQuery, window, document));
