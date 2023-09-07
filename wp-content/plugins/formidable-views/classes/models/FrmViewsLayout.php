<?php

if ( ! defined( 'ABSPATH' ) ) {
	die( 'You are not allowed to call this page directly.' );
}

class FrmViewsLayout {

	private static $table_name = 'frm_view_layouts';

	/**
	 * @param int          $view_id
	 * @param string|false $type 'listing' or 'detail'.
	 * @return array|object|false
	 */
	public static function get_layouts_for_view( $view_id, $type = false ) {
		$where = array(
			'view_id' => $view_id,
		);
		if ( $type ) {
			$where['type'] = $type;
		}
		$layouts = self::get_layouts( $where );
		if ( $type ) {
			return self::check_layouts( $layouts, $type );
		}
		return $layouts;
	}

	/**
	 * @param array  $where
	 * @param string $select
	 * @return array
	 */
	private static function get_layouts( $where, $select = '*' ) {
		if ( self::maybe_create_layout_table() ) {
			return array();
		}
		return FrmDb::get_results( self::$table_name, $where, $select );
	}

	/**
	 * @return bool true if the table needs to be generated
	 */
	private static function maybe_create_layout_table() {
		if ( self::already_created_layout_table() ) {
			return false;
		}
		self::create_layout_table();
		return true;
	}

	/**
	 * @return bool
	 */
	private static function already_created_layout_table() {
		return get_option( 'frm_views_layout_table_exists' );
	}

	/**
	 * Create the table for view layouts (custom "my templates" and layouts assigned to views are both stored here)
	 */
	private static function create_layout_table() {
		global $wpdb;

		if ( ! function_exists( 'dbDelta' ) ) {
			require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		}

		$table_name = $wpdb->prefix . self::$table_name;
		$sql        = "
			CREATE TABLE `{$table_name}` (
				id INT (11) NOT NULL auto_increment,
				name VARCHAR(255) NULL DEFAULT NULL,
				view_id INT (11) NULL DEFAULT NULL,
				type ENUM ('listing', 'detail') NULL DEFAULT NULL,
				data LONGTEXT NOT NULL,
				created_at DATETIME NOT NULL,
				PRIMARY KEY (id),
				KEY view_id (view_id)
			);
		";

		$collation = $wpdb->has_cap( 'collation' ) ? $wpdb->get_charset_collate() : '';
		dbDelta( $sql . $collation );

		update_option( 'frm_views_layout_table_exists', true, 'no' );
	}

	/**
	 * Check an array of layouts for a specific type.
	 *
	 * @param array  $layouts
	 * @param string $type 'listing' or 'detail'.
	 * @return object|false
	 */
	private static function check_layouts( $layouts, $type ) {
		foreach ( $layouts as $layout ) {
			if ( $type === $layout->type ) {
				return $layout;
			}
		}
		return false;
	}
}
