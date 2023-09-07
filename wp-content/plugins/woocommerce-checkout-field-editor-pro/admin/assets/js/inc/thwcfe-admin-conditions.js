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