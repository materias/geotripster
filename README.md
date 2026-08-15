# Geotripster

Custom WordPress theme for a Georgian adventure tours website.

## Features

- Custom PHP templates (header, footer, front page, template parts)
- 8 trip cards with real location photography
- Bilingual interface (English / Georgian) — built with a custom i18n JS system, no plugins
- Live weather data per trip via [Open-Meteo Archive API](https://open-meteo.com/)
- Scroll reveal animations, custom CSS design system
- Deployed as a static site → [geotripster.net](https://geotripster.net)
- Booking form wired to a serverless function that notifies Telegram
- AI trip concierge — a chat widget backed by a Claude (Anthropic) API serverless function, grounded in the site's real trip data, that can answer questions and submit a booking request via tool use

## Stack

WordPress · PHP · CSS · JavaScript · Claude API (Anthropic)

## Environment variables

Required in Netlify site settings:

- `ANTHROPIC_API_KEY` — Claude API key, powers the AI concierge
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — booking notifications (form + concierge)
