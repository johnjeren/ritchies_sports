<?php

if ( ! defined( 'ABSPATH' ) ) {
	die( 'You are not allowed to call this page directly.' );
}

class FrmViewsLayoutHelper {

	protected $view;

	/**
	 * @var array $content_by_box string content by box id.
	 */
	protected $content_by_box;

	/**
	 * @var array $styles_by_box array by box id.
	 */
	protected $styles_by_box;

	public function __construct( $view ) {
		$this->view = $view;
	}

	/**
	 * @param string $key unique identifier (currently just "listing" or "detail").
	 * @return string
	 */
	public function get_layout_data( $key ) {
		return $this->get_layout_data_from_database( $key );
	}

	private function get_layout_data_from_database( $key ) {
		$templates = FrmViewsLayout::get_layouts_for_view( $this->view->ID );
		if ( ! $templates ) {
			return $this->get_single_column_layout_data();
		}

		foreach ( $templates as $template ) {
			if ( $key === $template->type ) {
				return json_decode( $template->data );
			}
		}

		return $this->get_single_column_layout_data();
	}

	private function get_single_column_layout_data() {
		return '';
	}

	public function flatten( $unserialized_content, $type ) {
		$layout = FrmViewsLayout::get_layouts_for_view( $this->view->ID, $type );

		if ( ! $layout ) {
			if ( FrmViewsAppHelper::unserialized_content_is_grid_format( $unserialized_content ) ) {
				$layout       = new stdClass();
				$layout->data = '[{"boxes":[{"id":0}],"layout":1}]';
			} else {
				return '';
			}
		}

		$this->index_content_by_box( $unserialized_content );
		$layout_data = json_decode( $layout->data );

		return $this->get_output( $layout_data );
	}

	/**
	 * @param array $layout_data
	 * @return string
	 */
	private function get_output( $layout_data ) {
		$output = '';
		foreach ( $layout_data as $row ) {
			if ( isset( $row->boxes ) ) {
				$output .= $this->get_row_content( $row, true );
			}
		}
		return $output;
	}

	/**
	 * @param object $box
	 * @return string
	 */
	private function get_box_content( $box ) {
		if ( ! isset( $box->id ) ) {
			return '';
		}

		$box_content = '';

		if ( ! empty( $box->rows ) ) {
			foreach ( $box->rows as $row ) {
				$box_content .= $this->get_row_content( $row, false );
			}
		} elseif ( isset( $this->content_by_box[ $box->id ] ) ) {
			$box_content = $this->content_by_box[ $box->id ];
		}

		return $box_content;
	}

	/**
	 * @param object $box
	 * @return string
	 */
	private function get_box_style( $box ) {
		if ( ! isset( $box->id ) ) {
			return '';
		}

		$box_style = '';

		if ( isset( $this->styles_by_box[ $box->id ] ) ) {
			foreach ( $this->styles_by_box[ $box->id ] as $key => $value ) {
				$box_style .= self::convert_camel_case_style( $key ) . ': ' . $value . ';';
			}
		}

		return $box_style;
	}

	/**
	 * @param string $key
	 * @return string
	 */
	private static function convert_camel_case_style( $key ) {
		switch ( $key ) {
			case 'backgroundColor':
				return 'background-color';
			case 'borderColor':
				return 'border-color';
			case 'borderWidth':
				return 'border-width';
			case 'borderRadius':
				return 'border-radius';
			case 'borderStyle':
				return 'border-style';
		}
		return $key;
	}

	/**
	 * @param object $row
	 * @param bool   $top true if we're rendering box id 0 (the top, rather than a nested set).
	 * @return string
	 */
	private function get_row_content( $row, $top ) {
		$row_output = '';
		foreach ( $row->boxes as $box_index => $box ) {
			$wrapper_class = self::get_layout_wrapper_class( $row->layout, $box_index );
			$box_content   = $this->get_box_content( $box );
			$style         = $this->get_box_style( $box );
			$row_output   .= '<div ' . ( $style ? 'style="' . esc_attr( $style ) . '"' : '' ) . ' class="' . esc_attr( $wrapper_class ) . '">' . $box_content . '</div>';
		}

		$style = $top ? 'style="' . $this->get_box_style( $row ) . '"' : '';
		return '<div class="frm_grid_container" ' . $style . '>' . $row_output . '</div>';
	}

	private function index_content_by_box( $content ) {
		$indexed_content = array();
		$indexed_styles  = array();
		foreach ( $content as $box_data ) {
			if ( ! isset( $box_data['box'] ) ) {
				continue;
			}

			if ( ! empty( $box_data['content'] ) ) {
				$indexed_content[ $box_data['box'] ] = $box_data['content'];
			}

			if ( ! empty( $box_data['style'] ) ) {
				$indexed_styles[ $box_data['box'] ] = $box_data['style'];
			}
		}
		$this->content_by_box = $indexed_content;
		$this->styles_by_box  = $indexed_styles;
	}

	private static function get_layout_wrapper_class( $layout, $index ) {
		if ( 1 === $layout ) {
			return 'frm_full';
		}

		if ( 2 === $layout ) {
			return 'frm_half';
		}

		if ( 3 === $layout ) {
			return 'frm_third';
		}

		if ( 4 === $layout ) {
			return 'frm_fourth';
		}

		if ( 5 === $layout ) {
			return 0 === $index ? 'frm_fourth' : 'frm_three_fourths';
		}

		if ( 6 === $layout ) {
			return 0 === $index ? 'frm_three_fourths' : 'frm_fourth';
		}

		if ( 7 === $layout ) {
			return 1 === $index ? 'frm_half' : 'frm_fourth';
		}

		return '';
	}
}
