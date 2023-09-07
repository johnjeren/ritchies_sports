var thwcfe_settings_advanced = (function($, window, document) {
   /*------------------------------------
	*---- ON-LOAD FUNCTIONS - SATRT -----
	*------------------------------------*/
	$(function() {
		var advanced_settings_form = $('#advanced_settings_form');
		if(advanced_settings_form[0]) {
			thwepo_base.setupEnhancedMultiSelectWithValue(advanced_settings_form);
		}
	});
   /*------------------------------------
	*---- ON-LOAD FUNCTIONS - END -----
	*------------------------------------*/
	
   /*------------------------------------
	*---- Custom Validations - SATRT -----
	*------------------------------------*/
	var VALIDATOR_ROW_HTML  = '<tr>';
        VALIDATOR_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_validator_name[]" placeholder="Validator Name" style="width:180px;"/></td>';
		VALIDATOR_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_validator_label[]" placeholder="Validator Label" style="width:180px;"/></td>';
		VALIDATOR_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_validator_pattern[]" placeholder="Validator Pattern" style="width:180px;"/></td>';
		VALIDATOR_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_validator_message[]" placeholder="Validator Message" style="width:180px;"/></td>';
		VALIDATOR_ROW_HTML += '<td class="action-cell">';
		VALIDATOR_ROW_HTML += '<a href="javascript:void(0)" onclick="thwcfeAddNewValidatorRow(this, 0)" class="dashicons dashicons-plus" title="Add new validator"></a></td>';
		VALIDATOR_ROW_HTML += '<td class="action-cell">';
		VALIDATOR_ROW_HTML += '<a href="javascript:void(0)" onclick="thwcfeRemoveValidatorRow(this, 0)" class="dashicons dashicons-no-alt" title="Remove validator"></a></td>';
		VALIDATOR_ROW_HTML += '</tr>';
		
	var CNF_VALIDATOR_ROW_HTML  = '<tr>';
        CNF_VALIDATOR_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_cnf_validator_name[]" placeholder="Validator Name" style="width:180px;"/></td>';
		CNF_VALIDATOR_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_cnf_validator_label[]" placeholder="Validator Label" style="width:180px;"/></td>';
		CNF_VALIDATOR_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_cnf_validator_pattern[]" placeholder="Field Name" style="width:180px;"/></td>';
		CNF_VALIDATOR_ROW_HTML += '<td style="width:190px;"><input type="text" name="i_cnf_validator_message[]" placeholder="Validator Message" style="width:180px;"/></td>';
		CNF_VALIDATOR_ROW_HTML += '<td class="action-cell">';
		CNF_VALIDATOR_ROW_HTML += '<a href="javascript:void(0)" onclick="thwcfeAddNewValidatorRow(this, 1)" class="dashicons dashicons-plus" title="Add new validator"></a></td>';
		CNF_VALIDATOR_ROW_HTML += '<td class="action-cell">';
		CNF_VALIDATOR_ROW_HTML += '<a href="javascript:void(0)" onclick="thwcfeRemoveValidatorRow(this, 1)" class="dashicons dashicons-no-alt" title="Remove validator"></a></td>';
		CNF_VALIDATOR_ROW_HTML += '</tr>';
		
	addNewValidatorRow = function addNewValidatorRow(elm, prefix){
		var ptable = $(elm).closest('table');
		var rowsSize = ptable.find('tbody tr').size();
		
		var ROW_HTML = VALIDATOR_ROW_HTML;
		if(prefix == 1){
			ROW_HTML = CNF_VALIDATOR_ROW_HTML;
		}
			
		if(rowsSize > 0){
			ptable.find('tbody tr:last').after(ROW_HTML);
		}else{
			ptable.find('tbody').append(ROW_HTML);
		}
	}
	
	removeValidatorRow = function removeValidatorRow(elm, prefix){
		var ptable = $(elm).closest('table');
		$(elm).closest('tr').remove();
		var rowsSize = ptable.find('tbody tr').size();
		
		var ROW_HTML = VALIDATOR_ROW_HTML;
		if(prefix == 1){
			ROW_HTML = CNF_VALIDATOR_ROW_HTML;
		}
			
		if(rowsSize == 0){
			ptable.find('tbody').append(ROW_HTML);
		}
	}
   /*------------------------------------
	*---- Custom Validations - END -----
	*------------------------------------*/

	function import_settings(){

	}
				
	return {
		addNewValidatorRow : addNewValidatorRow,
		removeValidatorRow : removeValidatorRow,
		import_settings : import_settings,
   	};
}(window.jQuery, window, document));	

/* Advance Settings */
function thwcfeAddNewValidatorRow(elm, prefix){
	thwcfe_settings_advanced.addNewValidatorRow(elm, prefix);
}
function thwcfeRemoveValidatorRow(elm, prefix){
	thwcfe_settings_advanced.removeValidatorRow(elm, prefix);
}
function thwcfeImportSettings(){
	thwcfe_settings_advanced.import_settings();
}

var thwepo_base = (function($, window, document) {
	'use strict';
	
	/* convert string to url slug */
	/*function sanitizeStr( str ) {
		return str.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_');
	};	 
	
	function escapeQuote( str ) {
		str = str.replace( /[']/g, '&#39;' );
		str = str.replace( /["]/g, '&#34;' );
		return str;
	}
	
	function unEscapeQuote( str ) {
		str = str.replace( '&#39;', "'" );
		str = str.replace( '&#34;', '"' );
		return str;
	}*/
	
	function escapeHTML(html) {
	   var fn = function(tag) {
		   var charsToReplace = {
			   '&': '&amp;',
			   '<': '&lt;',
			   '>': '&gt;',
			   '"': '&#34;'
		   };
		   return charsToReplace[tag] || tag;
	   }
	   return html.replace(/[&<>"]/g, fn);
	}

	function escapeHtml_1(str) {
	    var map = {
	        '&': '&amp;',
	        '<': '&lt;',
	        '>': '&gt;',
	        '"': '&quot;',
	        "'": '&#039;'
	    };
	    return str.replace(/[&<>"']/g, function(m) {return map[m];});
	}

	function decodeHtml(str) {
	   	var map = {
        	'&amp;': '&',
        	'&lt;': '<',
        	'&gt;': '>',
        	'&quot;': '"',
        	'&#039;': "'"
    	};
    	return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});
	}
	 	 
	function isHtmlIdValid(id) {
		//var re = /^[a-z]+[a-z0-9\_]*$/;
		var re = /^[a-z\_]+[a-z0-9\_]*$/;
		return re.test(id.trim());
	}
	
	function isValidHexColor(value) {      
		if ( preg_match( '/^#[a-f0-9]{6}$/i', value ) ) { // if user insert a HEX color with #     
			return true;
		}     
		return false;
	}
	
	function setup_tiptip_tooltips(){
		var tiptip_args = {
			'attribute': 'data-tip',
			'fadeIn': 50,
			'fadeOut': 50,
			'delay': 200
		};

		$('.tips').tipTip( tiptip_args );
	}
	
	function setup_enhanced_multi_select(parent){
		parent.find('select.thwepo-enhanced-multi-select').each(function(){
			if(!$(this).hasClass('enhanced')){
				$(this).select2({
					minimumResultsForSearch: 10,
					allowClear : true,
					placeholder: $(this).data('placeholder')
				}).addClass('enhanced');
			}
		});
	}
	
	function setup_enhanced_multi_select_with_value(parent){
		parent.find('select.thwepo-enhanced-multi-select').each(function(){
			if(!$(this).hasClass('enhanced')){
				$(this).select2({
					minimumResultsForSearch: 10,
					allowClear : true,
					placeholder: $(this).data('placeholder')
				}).addClass('enhanced');
				
				var value = $(this).data('value');
				value = value.split(",");
				
				$(this).val(value);
				$(this).trigger('change');
			}
		});
	}
	
	function setup_color_picker(form){
		form.find('.thpladmin-colorpick').iris({
			change: function( event, ui ) {
				$( this ).parent().find( '.thpladmin-colorpickpreview' ).css({ backgroundColor: ui.color.toString() });
			},
			hide: true,
			border: true
		}).click( function() {
			$('.iris-picker').hide();
			$(this ).closest('td').find('.iris-picker').show();
		});
	
		$('body').click( function() {
			$('.iris-picker').hide();
		});
	
		$('.thpladmin-colorpick').click( function( event ) {
			event.stopPropagation();
		});
	}
	
	function setup_color_pick_preview(form){
		form.find('.thpladmin-colorpick').each(function(){
			$(this).parent().find('.thpladmin-colorpickpreview').css({ backgroundColor: this.value });
		});
	}
	
	function setup_popup_tabs(form){
		$(".thpladmin-tabs-menu a").click(function(event) {
			event.preventDefault();
			$(this).parent().addClass("current");
			$(this).parent().siblings().removeClass("current");
			var tab = $(this).attr("href");
			$(".thpladmin-tab-content").not(tab).css("display", "none");
			$(tab).fadeIn();
		});
	}
	
	function open_form_tab(elm, tab_id, form_type){
		var tabs_container = $(elm).closest("#thwepo-tabs-container_"+form_type);
		
		$(elm).parent().addClass("current");
		$(elm).parent().siblings().removeClass("current");
		var tab = $("#"+tab_id+"_"+form_type);
		tabs_container.find(".thpladmin-tab-content").not(tab).css("display", "none");
		$(tab).fadeIn();
	}
	
	function prepare_field_order_indexes(elm) {
		$(elm+" tbody tr").each(function(index, el){
			$('input.f_order', el).val( parseInt( $(el).index(elm+" tbody tr") ) );
		});
	}
	
	function setup_sortable_table(parent, elm, left){
		parent.find(elm+" tbody").sortable({
			items:'tr',
			cursor:'move',
			axis:'y',
			handle: 'td.sort',
			scrollSensitivity:40,
			helper:function(e,ui){
				ui.children().each(function(){
					$(this).width($(this).width());
				});
				ui.css('left', left);
				return ui;
			}		
		});	
		
		$(elm+" tbody").on("sortstart", function( event, ui ){
			ui.item.css('background-color','#f6f6f6');										
		});
		$(elm+" tbody").on("sortstop", function( event, ui ){
			ui.item.removeAttr('style');
			prepare_field_order_indexes(elm);
		});
	}
	
	function get_property_field_value(form, type, name){
		var value = '';
		
		switch(type) {
			case 'select':
				value = form.find("select[name=i_"+name+"]").val();
				value = value == null ? '' : value;
				break;
				
			case 'checkbox':
				value = form.find("input[name=i_"+name+"]").prop('checked');
				value = value ? 1 : 0;
				break;
				
			default:
				value = form.find("input[name=i_"+name+"]").val();
				value = value == null ? '' : value;
		}	
		
		return value;
	}
	
	function set_property_field_value(form, type, name, value, multiple){
		switch(type) {
			case 'select':
				if(multiple == 1 && typeof(value) === 'string'){
					value = value.split(",");
					name = name+"[]";
				}
				form.find('select[name="i_'+name+'"]').val(value);
				break;
				
			case 'checkbox':
				value = value == 1 ? true : false;
				form.find("input[name=i_"+name+"]").prop('checked', value);
				break;
				
			default:
				form.find("input[name=i_"+name+"]").val(value);
		}	
	}
		
	return {
		escapeHTML : escapeHTML,
		isHtmlIdValid : isHtmlIdValid,
		isValidHexColor : isValidHexColor,
		setup_tiptip_tooltips : setup_tiptip_tooltips,
		setupEnhancedMultiSelect : setup_enhanced_multi_select,
		setupEnhancedMultiSelectWithValue : setup_enhanced_multi_select_with_value,
		setupColorPicker : setup_color_picker,
		setup_color_pick_preview : setup_color_pick_preview,
		setupSortableTable : setup_sortable_table,
		setupPopupTabs : setup_popup_tabs,
		openFormTab : open_form_tab,
		get_property_field_value : get_property_field_value,
		set_property_field_value : set_property_field_value,
   	};
}(window.jQuery, window, document));

/* Common Functions */
function thwepoSetupEnhancedMultiSelectWithValue(elm){
	thwepo_base.setupEnhancedMultiSelectWithValue(elm);
}

function thwepoSetupSortableTable(parent, elm, left){
	thwepo_base.setupSortableTable(parent, elm, left);
}

function thwepoSetupPopupTabs(parent, elm, left){
	thwepo_base.setupPopupTabs(parent, elm, left);
}

function thwepoOpenFormTab(elm, tab_id, form_type){
	thwepo_base.openFormTab(elm, tab_id, form_type);
}
var thwepo_conditions = (function($, window, document) {
	'use strict';
	
	var RULE_OPERATOR_SET = {"equals" : "Equals to/ In", "not_equals" : "Not Equals to/ Not in"};
	var RULE_OPERATOR_SET_NO_TYPE = [];
	var RULE_OPERAND_TYPE_SET = {"product" : "Product", "category" : "Category", "user_role" : "User role"};
	
	var OP_AND_HTML  = '<label class="thpl_logic_label">AND</label>';
		OP_AND_HTML += '<a href="javascript:void(0)" onclick="thwepoRemoveRuleRow(this)" class="thpl_delete_icon dashicons dashicons-no" title="Remove"></a>';
	var OP_OR_HTML   = '<tr class="thpl_logic_label_or"><td colspan="4" align="center">OR</td></tr>';
	
	var OP_HTML  = '<a href="javascript:void(0)" class="thpl_logic_link" onclick="thwepoAddNewConditionRow(this, 1)" title="">AND</a>';
		OP_HTML += '<a href="javascript:void(0)" class="thpl_logic_link" onclick="thwepoAddNewConditionRow(this, 2)" title="">OR</a>';
		OP_HTML += '<a href="javascript:void(0)" class="thpl_delete_icon dashicons dashicons-no" onclick="thwepoRemoveRuleRow(this)" title="Remove"></a>';
	
	var CONDITION_HTML = '', CONDITION_SET_HTML = '', CONDITION_SET_HTML_WITH_OR = '', RULE_HTML = '', RULE_SET_HTML = '';
	
	$(function() {
	    CONDITION_HTML  = '<tr class="thwepo_condition">';
		CONDITION_HTML += '<td width="25%">'+ prepareRuleOperandTypeSet('') +'</td>';	
		CONDITION_HTML += '<td width="25%">'+ prepareRuleOperatorSet('') +'</td>';
		CONDITION_HTML += '<td width="25%" class="thpladmin_rule_operand"><input type="text" name="i_rule_operand" style="width:200px;"/></td>';
		CONDITION_HTML += '<td>'+ OP_HTML +'</td></tr>';
		
	    CONDITION_SET_HTML  = '<tr class="thwepo_condition_set_row"><td>';
		CONDITION_SET_HTML += '<table class="thwepo_condition_set" width="100%" style=""><tbody>'+CONDITION_HTML+'</tbody></table>';
		CONDITION_SET_HTML += '</td></tr>';
		
	    CONDITION_SET_HTML_WITH_OR  = '<tr class="thwepo_condition_set_row"><td>';
		CONDITION_SET_HTML_WITH_OR += '<table class="thwepo_condition_set" width="100%" style=""><thead>'+OP_OR_HTML+'</thead><tbody>'+CONDITION_HTML+'</tbody></table>';
		CONDITION_SET_HTML_WITH_OR += '</td></tr>';
	
	    RULE_HTML  = '<tr class="thwepo_rule_row"><td>';
		RULE_HTML += '<table class="thwepo_rule" width="100%" style=""><tbody>'+CONDITION_SET_HTML+'</tbody></table>';
		RULE_HTML += '</td></tr>';	
		
	    RULE_SET_HTML  = '<tr class="thwepo_rule_set_row"><td>';
		RULE_SET_HTML += '<table class="thwepo_rule_set" width="100%"><tbody>'+RULE_HTML+'</tbody></table>';
		RULE_SET_HTML += '</td></tr>';
	});
	
	function prepareRuleOperandTypeSet(value){
		var html = '<select name="i_rule_operand_type" style="width:200px;" onchange="thwepoRuleOperandTypeChangeListner(this)" value="'+ value +'">';
		html += '<option value=""></option>';
		for(var index in RULE_OPERAND_TYPE_SET) {
			var selected = index === value ? "selected" : "";
			html += '<option value="'+index+'" '+selected+'>'+RULE_OPERAND_TYPE_SET[index]+'</option>';
		}
		html += '</select>';
		return html;
	}
	
	function prepareRuleOperatorSet(value){
		var html = '<select name="i_rule_operator" style="width:200px;" value="'+ value +'">';
		html += '<option value=""></option>';
		for(var index in RULE_OPERATOR_SET) {
			var selected = index === value ? "selected" : "";
			html += '<option value="'+index+'" '+selected+'>'+RULE_OPERATOR_SET[index]+'</option>';
		}
		html += '</select>';
		return html;
	}
	
	function prepareRuleOperandSet(operand_type, operand){
		var html = '<input type="hidden" name="i_rule_operand_hidden" value="'+operand+'"/>';
		if(operand_type === "product"){
			html += $("#thwepo_product_select").html();
			
		}else if(operand_type === "category"){
			html += $("#thwepo_product_cat_select").html();
			
		}else if(operand_type === "user_role"){
			html += $("#thwepo_user_role_select").html();
			
		}else{
			html += '<input type="text" name="i_rule_operand" style="width:200px;" value="'+operand+'"/>';
		}
		return html;
	}
	
	function is_condition_with_no_operand_type(operator){
		if(operator && $.inArray(operator, RULE_OPERATOR_SET_NO_TYPE) > -1){
			return true;
		}
		return false;
	}
	
	function is_valid_condition(condition){
		if(condition["operand_type"] && condition["operator"]){
			return true;
		}
		return false;
	}
	
	function rule_operand_type_change_listner(elm){
		var operand_type = $(elm).val();
		var condition_row = $(elm).closest("tr.thwepo_condition");
		var target = condition_row.find("td.thpladmin_rule_operand");
		
		if(operand_type === 'product'){
			target.html( $("#thwepo_product_select").html() );
			
		}else if(operand_type === 'category'){
			target.html( $("#thwepo_product_cat_select").html() );
			
		}else if(operand_type === 'user_role'){
			target.html( $("#thwepo_user_role_select").html() );
			
		}else{
			target.html( '<input type="text" name="i_rule_operand" style="width:200px;" value=""/>' );
		}
		
		thwepo_base.setupEnhancedMultiSelect(condition_row);		
	}
	
	function add_new_rule_row(elm, op){
		var condition_row = $(elm).closest('tr');
		var condition = {};
		condition["operand_type"] = condition_row.find("select[name=i_rule_operand_type]").val();
		condition["operator"] = condition_row.find("select[name=i_rule_operator]").val();
		condition["operand"] = condition_row.find("select[name=i_rule_operand]").val();
		
		if(is_condition_with_no_operand_type(condition["operator"])){
			condition["operand_type"] = '';
			//condition["operand"] = condition_row.find("input[name=i_rule_operand]").val();
			if(condition["operator"] != "user_role_eq" && condition["operator"] != "user_role_ne"){
				condition["operand"] = condition_row.find("input[name=i_rule_operand]").val();
			}
		}
		
		if(!is_valid_condition(condition)){
			alert('Please provide a valid condition.');
			return;
		}
		
		if(op == 1){
			var conditionSetTable = $(elm).closest('.thwepo_condition_set');
			var conditionSetSize  = conditionSetTable.find('tbody tr.thwepo_condition').size();
			
			if(conditionSetSize > 0){
				$(elm).closest('td').html(OP_AND_HTML);
				conditionSetTable.find('tbody tr.thwepo_condition:last').after(CONDITION_HTML);
			}else{
				conditionSetTable.find('tbody').append(CONDITION_HTML);
			}
		}else if(op == 2){
			var ruleTable = $(elm).closest('.thwepo_rule');
			var ruleSize  = ruleTable.find('tbody tr.thwepo_condition_set_row').size();
			
			if(ruleSize > 0){
				ruleTable.find('tbody tr.thwepo_condition_set_row:last').after(CONDITION_SET_HTML_WITH_OR);
			}else{
				ruleTable.find('tbody').append(CONDITION_SET_HTML);
			}
		}	
	}
	
	function remove_rule_row(elm){
		var ctable = $(elm).closest('table.thwepo_condition_set');
		var rtable = $(elm).closest('table.thwepo_rule');
		
		$(elm).closest('tr.thwepo_condition').remove();
		
		var cSize = ctable.find('tbody tr.thwepo_condition').size();
		if(cSize == 0){
			ctable.closest('tr.thwepo_condition_set_row').remove();
		}else{
			ctable.find('tbody tr.thwepo_condition:last').find('td.actions').html(OP_HTML);	
		}
		
		var rSize = rtable.find('tbody tr.thwepo_condition_set_row').size();
		if(cSize == 0 && rSize == 0){
			rtable.find('tbody').append(CONDITION_SET_HTML);
		}
	}
	
	function get_conditional_rules(elm, ajaxFlag){
		var rulesTable;
		if(ajaxFlag){
			rulesTable = $(elm).find(".thwepo_conditional_rules_ajax tbody");
		}else{
			rulesTable = $(elm).find(".thwepo_conditional_rules tbody");	
		}
		
		var conditionalRules = [];
		var ruleSet = [];
		var rule = [];
		var conditions = [];
		var condition = {};
		
		rulesTable.find("tr.thwepo_rule_set_row").each(function() {
			ruleSet = [];
			$(this).find("table.thwepo_rule_set tbody tr.thwepo_rule_row").each(function() {
				rule = [];															 
				$(this).find("table.thwepo_rule tbody tr.thwepo_condition_set_row").each(function() {
					conditions = [];
					$(this).find("table.thwepo_condition_set tbody tr.thwepo_condition").each(function() {
						condition = {};
						if(ajaxFlag){
							var cvalue = $(this).find("input[name=i_rule_value]").val();
							var cvalue_arr = $.map(cvalue.split(","), $.trim);
							cvalue = cvalue_arr ? cvalue_arr.join() : '';
							
							condition["operand_type"] = $(this).find("input[name=i_rule_operand_type]").val();
							condition["value"] = cvalue ? cvalue.trim(): cvalue;
						}else{
							condition["operand_type"] = $(this).find("select[name=i_rule_operand_type]").val();	
						}
						condition["operator"] = $(this).find("select[name=i_rule_operator]").val();
						condition["operand"] = $(this).find("select[name=i_rule_operand]").val();
						
						if(is_valid_condition(condition)){
							conditions.push(condition);
						}
					});
					if(conditions.length > 0){
						rule.push(conditions);
					}
				});
				if(rule.length > 0){
					ruleSet.push(rule);
				}
			});
			if(ruleSet.length > 0){
				conditionalRules.push(ruleSet);
			}
		});
		
		var conditionalRulesJson = conditionalRules.length > 0 ? JSON.stringify(conditionalRules) : '';
		conditionalRulesJson = encodeURIComponent(conditionalRulesJson);
		//conditionalRulesJson = conditionalRulesJson.replace(/"/g, "'");
		
		return conditionalRulesJson;
	}
		
	function populate_conditional_rules(form, conditionalRulesJson, ajaxFlag){
		var conditionalRulesHtml = "";
		if(conditionalRulesJson){
			try{
				conditionalRulesJson = decodeURIComponent(conditionalRulesJson);
				var conditionalRules = $.parseJSON(conditionalRulesJson);
				if(conditionalRules){
					jQuery.each(conditionalRules, function() {
						var ruleSet = this;	
						var rulesHtml = '';
						
						jQuery.each(ruleSet, function() {
							var rule = this;
							var conditionSetsHtml = '';
							
							var y=0;
							var ruleSize = rule.length;
							jQuery.each(rule, function() {
								var conditions = this;								   	
								var conditionsHtml = '';
								
								var x=1;
								var size = conditions.length;
								jQuery.each(conditions, function() {
									var lastRow = (x==size) ? true : false;
									var conditionHtml = populate_condition_html(this, lastRow, ajaxFlag);
									if(conditionHtml){
										conditionsHtml += conditionHtml;
									}
									x++;
								});
								
								var firstRule = (y==0) ? true : false;
								var conditionSetHtml = populate_condition_set_html(conditionsHtml, firstRule);
								if(conditionSetHtml){
									conditionSetsHtml += conditionSetHtml;
								}
								y++;
							});
							
							var ruleHtml = populate_rule_html(conditionSetsHtml);
							if(ruleHtml){
								rulesHtml += ruleHtml;
							}
						});
						
						var ruleSetHtml = populate_rule_set_html(rulesHtml);
						if(ruleSetHtml){
							conditionalRulesHtml += ruleSetHtml;
						}
					});
				}
			}catch(err) {
				alert(err);
			}
		}
		
		var conditionalRulesTable;
		if(ajaxFlag){
			conditionalRulesTable = form.find(".thwepo_conditional_rules_ajax tbody");
		}else{
			conditionalRulesTable = form.find(".thwepo_conditional_rules tbody");
		}
		
		if(conditionalRulesHtml){
			conditionalRulesTable.html(conditionalRulesHtml);
			thwepo_base.setupEnhancedMultiSelect(conditionalRulesTable);
			
			conditionalRulesTable.find('tr.thwepo_condition').each(function(){
				var operantVal = $(this).find("input[name=i_rule_operand_hidden]").val();	
				operantVal = operantVal.split(",");
				$(this).find("select[name=i_rule_operand]").val(operantVal).trigger("change");
			});
			
			//conditionalRulesTable.find("select[name=i_rule_operator]").change();
			conditionalRulesTable.find("select[name=i_rule_operator]").each(function(){
				ruleOperatorChangeAction($(this), true);	
			});
		}else{
			if(ajaxFlag){
				conditionalRulesTable.html(RULE_SET_HTML_AJAX);
			}else{
				conditionalRulesTable.html(RULE_SET_HTML);
			}
			thwepo_base.setupEnhancedMultiSelect(conditionalRulesTable);
		}
	}
	
	function populate_rule_set_html(ruleHtml){
		var html = '';
		if(ruleHtml){
			html += '<tr class="thwepo_rule_set_row"><td><table class="thwepo_rule_set" width="100%"><tbody>';
			html += ruleHtml;
			html += '</tbody></table></td></tr>';
		}
		return html;
	}
	
	function populate_rule_html(conditionSetHtml){
		var html = '';
		if(conditionSetHtml){
			html += '<tr class="thwepo_rule_row"><td><table class="thwepo_rule" width="100%" style=""><tbody>';
			html += conditionSetHtml;
			html += '</tbody></table></td></tr>';
		}
		return html;
	}
	
	function populate_condition_set_html(conditionsHtml, firstRule){
		var html = '';
		if(conditionsHtml){
			if(firstRule){
				html += '<tr class="thwepo_condition_set_row"><td><table class="thwepo_condition_set" width="100%" style=""><tbody>';
				html += conditionsHtml;
				html += '</tbody></table></td></tr>';
			}else{
				html += '<tr class="thwepo_condition_set_row"><td><table class="thwepo_condition_set" width="100%" style=""><thead>'+OP_OR_HTML+'</thead><tbody>';
				html += conditionsHtml;
				html += '</tbody></table></td></tr>';
			}
		}
		return html;
	}
	
	function populate_condition_html(condition, lastRow, ajaxFlag){
		var html = '';
		if(condition){
			if(ajaxFlag){
				var actionsHtml = lastRow ? OP_HTML_AJAX : OP_AND_HTML_AJAX;
				
				html += '<tr class="thwepo_condition">';
				html += '<td width="25%">'+ prepareRuleOperandSetAjax(condition.operand) +'</td>';
				html += '<td width="25%">'+ prepareRuleOperatorSetAjax(condition.operator) +'</td>';
				html += '<td width="25%">'+ prepareRuleValueSetAjax(condition.value) +'</td>';
				html += '<td>'+ actionsHtml+'</td></tr>';
			}else{
				var actionsHtml = lastRow ? OP_HTML : OP_AND_HTML;
			
				html += '<tr class="thwepo_condition">';
				html += '<td width="25%">'+ prepareRuleOperandTypeSet(condition.operand_type) +'</td>';
				html += '<td width="25%">'+ prepareRuleOperatorSet(condition.operator) +'</td>';
				html += '<td width="25%" class="thpladmin_rule_operand">'+ prepareRuleOperandSet(condition.operand_type, condition.operand) +'</td>';
				html += '<td>'+ actionsHtml+'</td></tr>';			
			}
		}
		return html;
	}
	
	function ruleOperatorChangeAction(elm, ignoreUserRole){
		var operator = $(elm).val();
		var condition_row = $(elm).closest("tr.thwepo_condition");
		var operandType = condition_row.find("select[name=i_rule_operand_type]");
		var ruleValuElm = condition_row.find("input[name=i_rule_value]");
		
		if(operator === 'user_role_eq' || operator === 'user_role_ne'){
			if(ignoreUserRole){
				operandType.val('');
				operandType.prop("disabled", true);
			}else{
				operandType.val('');
				operandType.change();
				operandType.prop("disabled", true);
				
				var target = condition_row.find("td.thpladmin_rule_operand");
				target.html( $("#thwcfe_user_role_select").html() );
				setup_enhanced_multi_select(condition_row);
			}
		}else if(is_condition_with_no_operand_type(operator)){
			operandType.val('');
			operandType.change();
			operandType.prop("disabled", true);
		}else{
			operandType.prop("disabled", false);
		}	
	}
	
	/*---------------------------------------------------
	*---- CONDITIONAL RULES FUNCTIONS AJAX - SATRT -----
	*---------------------------------------------------*/
	var RULE_OPERATOR_SET_AJAX = {
		"empty" : "Is empty", "not_empty" : "Is not empty",
		"value_eq" : "Value equals to", "value_ne" : "Value not equals to", "value_in" : "Value in", 
		"value_cn" : "Contains", "value_nc" : "Not contains", "value_gt" : "Value greater than", "value_le" : "Value less than",
		"value_sw" : "Value starts with", "value_nsw" : "Value not starts with",
		"date_eq" : "Date equals to", "date_ne" : "Date not equals to", "date_gt" : "Date after", "date_lt" : "Date before", 
		"day_eq" : "Day equals to", "day_ne" : "Day not equals to",
		"checked" : "Is checked", "not_checked" : "Is not checked", "regex" : "Match expression"
	};
	
	var OP_AND_HTML_AJAX  = '<label class="thpl_logic_label">AND</label>';
		OP_AND_HTML_AJAX += '<a href="javascript:void(0)" onclick="thwepoRemoveRuleRowAjax(this)" class="thpl_delete_icon dashicons dashicons-no" title="Remove"></a>';
	
	var OP_HTML_AJAX  = '<a href="javascript:void(0)" class="thpl_logic_link" onclick="thwepoAddNewConditionRowAjax(this, 1)" title="">AND</a>';
		OP_HTML_AJAX += '<a href="javascript:void(0)" class="thpl_logic_link" onclick="thwepoAddNewConditionRowAjax(this, 2)" title="">OR</a>';
		OP_HTML_AJAX += '<a href="javascript:void(0)" class="thpl_delete_icon dashicons dashicons-no" onclick="thwepoRemoveRuleRowAjax(this)" title="Remove"></a>';
	
	var CONDITION_HTML_AJAX = '', CONDITION_SET_HTML_AJAX = '', CONDITION_SET_HTML_WITH_OR_AJAX = '', RULE_HTML_AJAX = '', RULE_SET_HTML_AJAX = '';
	
	$(function() {
	    CONDITION_HTML_AJAX  = '<tr class="thwepo_condition">';
		CONDITION_HTML_AJAX += '<td width="25%">'+ prepareRuleOperandSetAjax('') +'</td>';
		CONDITION_HTML_AJAX += '<td width="25%">'+ prepareRuleOperatorSetAjax('') +'</td>';	
		CONDITION_HTML_AJAX += '<td width="25%"><input type="text" name="i_rule_value" style="width:200px;"/></td>';
		CONDITION_HTML_AJAX += '<td>'+ OP_HTML_AJAX +'</td></tr>';
		
	    CONDITION_SET_HTML_AJAX  = '<tr class="thwepo_condition_set_row"><td>';
		CONDITION_SET_HTML_AJAX += '<table class="thwepo_condition_set" width="100%" style=""><tbody>'+CONDITION_HTML_AJAX+'</tbody></table>';
		CONDITION_SET_HTML_AJAX += '</td></tr>';
		
	    CONDITION_SET_HTML_WITH_OR_AJAX  = '<tr class="thwepo_condition_set_row"><td>';
		CONDITION_SET_HTML_WITH_OR_AJAX += '<table class="thwepo_condition_set" width="100%" style=""><thead>'+OP_OR_HTML+'</thead><tbody>'+CONDITION_HTML_AJAX+'</tbody></table>';
		CONDITION_SET_HTML_WITH_OR_AJAX += '</td></tr>';
	
	    RULE_HTML_AJAX  = '<tr class="thwepo_rule_row"><td>';
		RULE_HTML_AJAX += '<table class="thwepo_rule" width="100%" style=""><tbody>'+CONDITION_SET_HTML_AJAX+'</tbody></table>';
		RULE_HTML_AJAX += '</td></tr>';	
		
	    RULE_SET_HTML_AJAX  = '<tr class="thwepo_rule_set_row"><td>';
		RULE_SET_HTML_AJAX += '<table class="thwepo_rule_set" width="100%"><tbody>'+RULE_HTML_AJAX+'</tbody></table>';
		RULE_SET_HTML_AJAX += '</td></tr>';
	});
	
	function prepareRuleOperatorSetAjax(value){
		var html = '<select name="i_rule_operator" style="width:200px;" value="'+ value +'" onchange="thwepoRuleOperatorChangeListnerAjax(this)" >';
		html += '<option value=""></option>';
		for(var index in RULE_OPERATOR_SET_AJAX) {
			var selected = index === value ? "selected" : "";
			html += '<option value="'+index+'" '+selected+'>'+RULE_OPERATOR_SET_AJAX[index]+'</option>';
		}
		html += '</select>';
		return html;
	}
	
	function prepareRuleOperandSetAjax(value){
		var html = '<input type="hidden" name="i_rule_operand_type" value="field"/>';
		html += '<input type="hidden" name="i_rule_operand_hidden" value="'+value+'"/>';
		html += $("#thwepo_product_fields_select").html();
		return html;
	}
	
	function prepareRuleValueSetAjax(value){
		var html = '<input type="text" name="i_rule_value" style="width:200px;" value="'+value+'" />';
		return html;
	}
	
	function isValidConditionAjax(condition){
		if(condition["operand_type"] && condition["operator"]){
			return true;
		}
		return false;
	}
	
	function add_new_rule_row_ajax(elm, op){
		var condition_row = $(elm).closest('tr');
		
		var condition = {};
		condition["operand_type"] = condition_row.find("input[name=i_rule_operand_type]").val();
		condition["operator"] = condition_row.find("select[name=i_rule_operator]").val();
		condition["operand"] = condition_row.find("select[name=i_rule_operand]").val();
		condition["value"] = condition_row.find("input[name=i_rule_value]").val();
		
		if(!isValidConditionAjax(condition)){
			alert('Please provide a valid condition.');
			return;
		}
		
		if(op == 1){
			var conditionSetTable = $(elm).closest('.thwepo_condition_set');
			var conditionSetSize  = conditionSetTable.find('tbody tr.thwepo_condition').size();
			
			if(conditionSetSize > 0){
				$(elm).closest('td').html(OP_AND_HTML_AJAX);
				conditionSetTable.find('tbody tr.thwepo_condition:last').after(CONDITION_HTML_AJAX);
			}else{
				conditionSetTable.find('tbody').append(CONDITION_HTML_AJAX);
			}
			
			thwepo_base.setupEnhancedMultiSelect(conditionSetTable);
			
		}else if(op == 2){
			var ruleTable = $(elm).closest('.thwepo_rule');
			var ruleSize  = ruleTable.find('tbody tr.thwepo_condition_set_row').size();
			
			if(ruleSize > 0){
				ruleTable.find('tbody tr.thwepo_condition_set_row:last').after(CONDITION_SET_HTML_WITH_OR_AJAX);
			}else{
				ruleTable.find('tbody').append(CONDITION_SET_HTML_AJAX);
			}
			
			thwepo_base.setupEnhancedMultiSelect(ruleTable);
		}
	}
	
	function remove_rule_row_ajax(elm){
		var ctable = $(elm).closest('table.thwepo_condition_set');
		var rtable = $(elm).closest('table.thwepo_rule');
		
		$(elm).closest('tr.thwepo_condition').remove();
		
		var cSize = ctable.find('tbody tr.thwepo_condition').size();
		if(cSize == 0){
			ctable.closest('tr.thwepo_condition_set_row').remove();
		}else{
			ctable.find('tbody tr.thwepo_condition:last').find('td.actions').html(OP_HTML_AJAX);	
		}
		
		var rSize = rtable.find('tbody tr.thwepo_condition_set_row').size();
		if(cSize == 0 && rSize == 0){
			rtable.find('tbody').append(CONDITION_SET_HTML_AJAX);
		}
		
		thwepo_base.setupEnhancedMultiSelect(rtable);
	}
		
	function rule_operator_change_listner_ajax(elm){
		var operator = $(elm).val();
		var condition_row = $(elm).closest("tr.thwepo_condition");
		var ruleValuElm = condition_row.find("input[name=i_rule_value]");
		
		if(operator === 'empty' || operator === 'not_empty' || operator === 'checked' || operator === 'not_checked'){
			ruleValuElm.val('');
			ruleValuElm.prop("readonly", true);
		}else{
			ruleValuElm.prop("readonly", false);
		}	
	}
   /*---------------------------------------------------
	*---- CONDITIONAL RULES FUNCTIONS AJAX - END -------
	*---------------------------------------------------*/
	
	return {
		populate_conditional_rules : populate_conditional_rules,
		ruleOperandTypeChangeListner : rule_operand_type_change_listner,
		ruleOperatorChangeListnerAjax : rule_operator_change_listner_ajax,
		//selectAllFields : _selectAllFields,
		addNewRuleRow : add_new_rule_row,
		removeRuleRow : remove_rule_row,
		addNewRuleRowAjax : add_new_rule_row_ajax,
		removeRuleRowAjax : remove_rule_row_ajax,
		getConditionalRules : get_conditional_rules,
   	};
	
}(window.jQuery, window, document));

function thwepoRuleOperandTypeChangeListner(elm){
	thwepo_conditions.ruleOperandTypeChangeListner(elm);
}

function thwepoRuleOperatorChangeListnerAjax(elm){
	thwepo_conditions.ruleOperatorChangeListnerAjax(elm);
}

function thwepoAddNewConditionRow(elm, op){
	thwepo_conditions.addNewRuleRow(elm, op);
}
function thwepoRemoveRuleRow(elm){
	thwepo_conditions.removeRuleRow(elm);
}

function thwepoAddNewConditionRowAjax(elm, op){
	thwepo_conditions.addNewRuleRowAjax(elm, op);
}
function thwepoRemoveRuleRowAjax(elm){
	thwepo_conditions.removeRuleRowAjax(elm);
}
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