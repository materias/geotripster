<?php

function geotripster_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
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

// ── Custom Post Type: Trip ────────────────────────────────────────────────────

function geotripster_register_trip_cpt() {
    register_post_type( 'trip', [
        'labels' => [
            'name'               => 'Trips',
            'singular_name'      => 'Trip',
            'add_new_item'       => 'Add New Trip',
            'edit_item'          => 'Edit Trip',
            'new_item'           => 'New Trip',
            'view_item'          => 'View Trip',
            'search_items'       => 'Search Trips',
            'not_found'          => 'No trips found',
            'not_found_in_trash' => 'No trips found in trash',
        ],
        'public'       => true,
        'show_in_rest' => true,
        'menu_icon'    => 'dashicons-location-alt',
        'supports'     => [ 'title', 'thumbnail' ],
        'menu_position'=> 5,
    ] );
}
add_action( 'init', 'geotripster_register_trip_cpt' );

// ── Meta Box ──────────────────────────────────────────────────────────────────

function geotripster_add_trip_meta_box() {
    add_meta_box(
        'trip_details',
        'Trip Details',
        'geotripster_render_trip_meta_box',
        'trip',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'geotripster_add_trip_meta_box' );

function geotripster_render_trip_meta_box( $post ) {
    wp_nonce_field( 'geotripster_save_trip', 'geotripster_trip_nonce' );

    $fields = [
        'trip_dates_display' => 'Display Dates (e.g. 7–9 Nov 2026)',
        'trip_order'         => 'Display Order (1, 2, 3...)',
        'trip_name_ka'       => 'Name (Georgian / KA)',
        'trip_weather_id'    => 'Weather ID (e.g. kazbegi)',
        'trip_lat'           => 'Latitude (e.g. 42.65)',
        'trip_lon'           => 'Longitude (e.g. 44.64)',
        'trip_start_date'    => 'API Start Date (e.g. 2025-11-07)',
        'trip_end_date'      => 'API End Date (e.g. 2025-11-09)',
        'trip_img_position'  => 'Image Position (e.g. center 60%)',
    ];

    $textarea_fields = [
        'trip_desc_en' => 'Description (English)',
        'trip_desc_ka' => 'Description (Georgian / KA)',
    ];

    echo '<style>
        .trip-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; margin-bottom: 16px; }
        .trip-meta-grid label { display: block; font-weight: 600; font-size: 12px; margin-bottom: 4px; color: #555; }
        .trip-meta-grid input { width: 100%; }
        .trip-meta-full { margin-bottom: 12px; }
        .trip-meta-full label { display: block; font-weight: 600; font-size: 12px; margin-bottom: 4px; color: #555; }
        .trip-meta-full textarea { width: 100%; height: 80px; resize: vertical; }
    </style>';

    echo '<div class="trip-meta-grid">';
    foreach ( $fields as $key => $label ) {
        $value = get_post_meta( $post->ID, $key, true );
        echo '<div>';
        echo '<label for="' . esc_attr( $key ) . '">' . esc_html( $label ) . '</label>';
        echo '<input type="text" id="' . esc_attr( $key ) . '" name="' . esc_attr( $key ) . '" value="' . esc_attr( $value ) . '" />';
        echo '</div>';
    }
    echo '</div>';

    foreach ( $textarea_fields as $key => $label ) {
        $value = get_post_meta( $post->ID, $key, true );
        echo '<div class="trip-meta-full">';
        echo '<label for="' . esc_attr( $key ) . '">' . esc_html( $label ) . '</label>';
        echo '<textarea id="' . esc_attr( $key ) . '" name="' . esc_attr( $key ) . '">' . esc_textarea( $value ) . '</textarea>';
        echo '</div>';
    }
}

function geotripster_save_trip_meta( $post_id ) {
    if (
        ! isset( $_POST['geotripster_trip_nonce'] ) ||
        ! wp_verify_nonce( $_POST['geotripster_trip_nonce'], 'geotripster_save_trip' ) ||
        defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ||
        ! current_user_can( 'edit_post', $post_id )
    ) {
        return;
    }

    $all_fields = [
        'trip_dates_display',
        'trip_order',
        'trip_name_ka',
        'trip_desc_en',
        'trip_desc_ka',
        'trip_weather_id',
        'trip_lat',
        'trip_lon',
        'trip_start_date',
        'trip_end_date',
        'trip_img_position',
    ];

    foreach ( $all_fields as $key ) {
        if ( isset( $_POST[ $key ] ) ) {
            update_post_meta( $post_id, $key, sanitize_text_field( $_POST[ $key ] ) );
        }
    }
}
add_action( 'save_post_trip', 'geotripster_save_trip_meta' );
