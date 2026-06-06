<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Conscious adventures and hikes in the wild places of the world." />
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

  <header id="header">
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">Geo<span>tripster</span></a>

    <nav>
      <a href="#about">About</a>
      <a href="#hikes">Adventures</a>
      <a href="#hikes">Hikes</a>
      <a href="#reviews">Reviews</a>
      <a href="#newsletter">Newsletter</a>
    </nav>

    <div class="header-right">
      <div class="social-links">
        <a href="#" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" stroke-width="2.5"/>
          </svg>
        </a>
        <a href="#" aria-label="Telegram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
          </svg>
        </a>
      </div>
      <span class="lang-toggle">RU</span>
      <a href="#" class="btn-cta" onclick="openModal(event)">Go Out</a>
      <div class="burger" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </div>
    </div>
  </header>
