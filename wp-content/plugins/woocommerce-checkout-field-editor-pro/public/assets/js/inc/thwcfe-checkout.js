var thwcfe_public_checkout = (function( $ ) {
	'use strict';

	var rpRefreshed = false;

	function initialize_thwcfe_checkout(){
		var checkout_form = $('form[name="checkout"]');

		if(checkout_form){
			init_thwcfe_checkout_form(checkout_form);

			$(document).on('updated_checkout', function(){
				init_thwcfe_order_review_panel();
			});

			$(document).on('country_to_state_changed', function(){
				checkout_form = $('form[name="checkout"]');
				var statebox = checkout_form.find( '#billing_state, #shipping_state' );
				if(statebox){
					statebox.addClass('thwcfe-input-field');
				}
			});

			/*$(document.body).on('country_to_state_changing', function(){
				thwcfe_public_conditions.validate_all_conditions(null);
			});*/

			setup_update_totals_on_change(checkout_form);

			setTimeout(function() { 
				thwcfe_public_conditions.validate_all_conditions(null);
				thwcfe_public_conditions.prepare_shipping_conitional_fields(null, false);
				thwcfe_public_price.may_calculate_extra_cost();
			}, 500);
		}
	}

	function init_thwcfe_checkout_form(checkout_form){
		//var checkout_form = $('form[name="checkout"]');
		if(checkout_form){
			thwcfe_public_base.setup_enhanced_select(checkout_form, 'thwcfe-enhanced-select', thwcfe_public_var);
			thwcfe_public_base.setup_enhanced_select(checkout_form, 'thwcfe-enhanced-multi-select', thwcfe_public_var);
		    thwcfe_public_base.setup_date_picker(checkout_form, 'thwcfe-checkout-date-picker', thwcfe_public_var);
		    thwcfe_public_base.setup_time_picker(checkout_form, 'thwcfe-checkout-time-picker', thwcfe_public_var);
		    thwcfe_public_base.setup_time_picker_linked_date(checkout_form, 'thwcfe-checkout-date-picker', thwcfe_public_var);
		    
		    thwcfe_public_file_upload.setup_file_upload(checkout_form, thwcfe_public_var);

			thwcfe_public_price.setup_price_fields(checkout_form, thwcfe_public_var);

			$('#ship-to-different-address-checkbox').click(function(){
				thwcfe_public_conditions.prepare_shipping_conitional_fields(this, true);
			});

			thwcfe_public_address_i18n.locale_override_fix();

			//thwcfe_public_repeat.prepare_repeat_section_fields(checkout_form);
		}
	}

	function init_thwcfe_order_review_panel(){
		var review_wrapper = $('#order_review');
		if(review_wrapper){
			thwcfe_public_base.setup_enhanced_select(review_wrapper, 'thwcfe-enhanced-select', thwcfe_public_var);
			thwcfe_public_base.setup_enhanced_select(review_wrapper, 'thwcfe-enhanced-multi-select', thwcfe_public_var);
		    thwcfe_public_base.setup_date_picker(review_wrapper, 'thwcfe-checkout-date-picker', thwcfe_public_var);
		    thwcfe_public_base.setup_time_picker(review_wrapper, 'thwcfe-checkout-time-picker', thwcfe_public_var);

		    thwcfe_public_file_upload.setup_file_upload(review_wrapper, thwcfe_public_var);
			
			/*if(!rpRefreshed){
				rpRefreshed = true;
				
				if(thwcfe_public_var.rebind_all_cfields){
					thwcfe_public_conditions.validate_all_conditions(null);
				}else{
					thwcfe_public_conditions.validate_all_conditions(review_wrapper);
				}
			}else{
				rpRefreshed = false;
				may_rebind_all_cfields();
			}*/

			if(thwcfe_public_var.rebind_all_cfields){
				thwcfe_public_conditions.validate_all_conditions(null);
				//thwcfe_public_conditions.prepare_shipping_conitional_fields(null, false);
			}else{
				thwcfe_public_conditions.validate_all_conditions(review_wrapper);
			}
			
			thwcfe_public_price.setup_price_fields(review_wrapper, thwcfe_public_var);
		}
	}

	function may_rebind_all_cfields(){
		if(thwcfe_public_var.rebind_all_cfields && $('.thwcfe-price-field').length == 0){
			thwcfe_public_conditions.validate_all_conditions(null);
		}
	}

	function setup_update_totals_on_change(wrapper){
		wrapper.find('.thwcfe_update_totals_on_change').change(function(){
			$(this).trigger('update_checkout');
		});
	}
	
	/***----- INIT -----***/
	initialize_thwcfe_checkout();

	return {
		initialize_thwcfe_checkout : initialize_thwcfe_checkout,
	};

})( jQuery );
