<?php

function theme_scripts_and_styles() {
	wp_enqueue_style( 'global-css', get_template_directory_uri() . '/inc/global.css' );
	wp_enqueue_script( 'global-js', get_template_directory_uri() . '/inc/global.min.js' );
}

function theme_menus() {
	register_nav_menu( 'header', 'Header Menu' );
}

add_action( 'wp_enqueue_scripts', 'theme_scripts_and_styles' );
add_action( 'after_setup_theme', 'theme_menus' );

remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'feed_links', 2 );

function the_page_title() {
	$title = wp_title('', false);
	if( $title ) {
		$title .= ' - ';
	}
	$title .= get_bloginfo( 'name' );
	echo $title;
}

function the_svg_path( $icon ) {
	echo get_template_directory_uri() . '/inc/global.svg#icon-' . $icon;
}
?>
