<?php
/**
 * The settings import export functionality of the plugin.
 *
 * @link       https://themehigh.com
 * @since      2.9.0
 *
 * @package    woocommerce-checkout-field-editor-pro
 * @subpackage woocommerce-checkout-field-editor-pro/admin
 */
if(!defined('WPINC')){	die; }

if(!class_exists('THWCFE_Admin_Settings_Import_Export')):

class THWCFE_Admin_Settings_Import_Export extends THWCFE_Admin_Settings{
	public function __construct() {
		parent::__construct();
		
	}

	public function render_settings($settings){
		?>
	    <form id="import_export_settings_form" method="post" action="" class="clear">
            <table class="form-table thwcfe-settings-table">
                <tbody>
                	<tr>
						<td colspan="3" class="section-title"><?php THWCFE_i18n::et('Backup and Import Settings'); ?></td>
					</tr>
					<tr>
						<td class="label">
							<span><?php THWCFE_i18n::et('Plugin Settings Data'); ?></span>
							<span class="description"><?php THWCFE_i18n::et('You can tranfer the saved settings data between different installs by copying the text inside the text box. To import data from another install, replace the data in the text box with the one from another install and click "Save Settings".'); ?></span>
						</td>
						<td class="tip"></td>
						<td class="field">
							<textarea name="settings_data" rows="10"><?php echo $settings; ?></textarea>
						</td>
					</tr>				
                </tbody>
                <tfoot>
                	<tr>
						<td colspan="3" class="actions">
							<input type="submit" name="save_plugin_settings" class="button-primary" value="Save Settings">
							<!--<input type="submit" name="import_settings" class="button" value="Import Settings(.txt)" onclick="thwcfeImportSettings()">
							<input type="submit" name="export_settings" class="button" value="Export Settings(.txt)">-->
						</td>
					</tr>
                </tfoot>
            </table>
        </form>
		<?php 
	}

	public function get_posted_settings_data(){
		$settings = THWCFE_Utils::get_posted_value($_POST, 'i_settings_data');
		$settings = $settings ? unserialize(base64_decode($settings)) : '';
		return $settings;
	}

	public function get_imported_settings_data(){
		$file = THWCFE_PATH."wcfe-pro-settings-import.txt";

		$settings = file_get_contents($file, true);
		$settings = $settings ? unserialize(base64_decode($settings)) : '';
		return $settings;
	}

	public function export_settings_data($settings){
		$file = THWCFE_PATH."wcfe-pro-settings.txt";

		$handle = fopen($file, "w") or die("Unable to open file!");
		fwrite($handle, $settings);
		fclose($handle);

		if (file_exists($file)) {
			ob_clean();
		    header('Content-Description: File Transfer');
		    header('Content-Type: application/octet-stream');
		    header('Content-Disposition: attachment; filename="'.basename($file).'"');
		    header('Expires: 0');
		    header('Cache-Control: must-revalidate');
		    header('Pragma: public');
		    header('Content-Length: ' . filesize($file));
		    readfile($file);
		    unlink($file);
		    exit;
		}
	}

	public function prepare_settings_data($settings){
		$settings = $settings ? base64_encode(serialize($settings)) : '';
		return $settings;
	}
	
	public function import_settings(){
	
	}
	
}

endif;