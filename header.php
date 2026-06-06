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
      <a href="#about" data-i18n="nav-about">About</a>
      <a href="#hikes" data-i18n="nav-trips">Trips</a>
      <a href="#reviews" data-i18n="nav-reviews">Reviews</a>
      <a href="#newsletter" data-i18n="nav-newsletter">Newsletter</a>
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
      <div class="lang-dropdown">
        <button class="lang-current" onclick="toggleLangDropdown(event)">
          EN <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
        <ul class="lang-options" id="langOptions">
          <li onclick="setLanguage('en')" class="active">EN</li>
          <li onclick="setLanguage('ka')">KA</li>
        </ul>
      </div>
      <a href="#newsletter" class="btn-cta" data-i18n="btn-cta">Go Out</a>
      <div class="burger" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </div>
    </div>
  </header>
