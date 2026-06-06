<?php

function geotripster_setup() {
    add_theme_support( 'title-tag' );
}
add_action( 'after_setup_theme', 'geotripster_setup' );

function geotripster_scripts() {
    wp_enqueue_style( 'geotripster-style', get_stylesheet_uri(), [], '1.0.0' );
    wp_enqueue_script( 'geotripster-js', get_template_directory_uri() . '/js/theme.js', [], '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'geotripster_scripts' );

function geotripster_fonts() { ?>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<?php }
add_action( 'wp_head', 'geotripster_fonts', 2 );

add_filter( 'document_title_separator', fn() => '—' );
