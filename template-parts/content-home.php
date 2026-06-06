  <!-- HERO -->
  <section class="hero" id="home">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <span class="hero-tag" data-i18n="hero-tag">Outdoor Adventures</span>
      <h1 data-i18n-html="hero-title">We do <em>big</em> and small adventures</h1>
      <p data-i18n="hero-subtitle">Exploring the wild places of Georgia with a small, passionate crew.</p>
      <div class="hero-actions">
        <a href="#hikes" class="btn-primary" data-i18n="btn-trips">See Trips</a>
        <a href="#about" class="btn-outline" data-i18n="btn-story">Our Story</a>
      </div>
    </div>
    <div class="hero-image">
      <img
        src="<?php echo get_template_directory_uri(); ?>/images/stepantsminda.jpg"
        alt="Stepantsminda, Georgia"
        loading="eager"
      />
    </div>
  </section>

  <!-- TRIPS -->
  <section class="hikes" id="hikes">
    <div class="hikes-header">
      <div>
        <span class="section-tag" data-i18n="hikes-tag">Featured Routes</span>
        <h2 class="section-title" data-i18n="hikes-title">Upcoming Trips</h2>
        <p class="section-subtitle" data-i18n="hikes-subtitle">Carefully curated routes for every level of adventurer.</p>
      </div>
    </div>

    <div class="hikes-grid">

      <?php
      $trips = new WP_Query( [
          'post_type'      => 'trip',
          'posts_per_page' => -1,
          'meta_key'       => 'trip_order',
          'orderby'        => 'meta_value_num',
          'order'          => 'ASC',
      ] );

      $delay_classes = [ '', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3' ];
      $i = 0;

      if ( $trips->have_posts() ) :
          while ( $trips->have_posts() ) : $trips->the_post();
              $id           = get_the_ID();
              $name_en      = get_the_title();
              $name_ka      = get_post_meta( $id, 'trip_name_ka', true );
              $desc_en      = get_post_meta( $id, 'trip_desc_en', true );
              $desc_ka      = get_post_meta( $id, 'trip_desc_ka', true );
              $dates        = get_post_meta( $id, 'trip_dates_display', true );
              $weather_id   = get_post_meta( $id, 'trip_weather_id', true );
              $lat          = get_post_meta( $id, 'trip_lat', true );
              $lon          = get_post_meta( $id, 'trip_lon', true );
              $start        = get_post_meta( $id, 'trip_start_date', true );
              $end          = get_post_meta( $id, 'trip_end_date', true );
              $img_position = get_post_meta( $id, 'trip_img_position', true );
              $thumb_url    = get_the_post_thumbnail_url( $id, 'large' );
              $delay        = $delay_classes[ $i % 4 ];
      ?>
      <div class="hike-card reveal <?php echo esc_attr( $delay ); ?>">
          <img class="hike-img"
              src="<?php echo esc_url( $thumb_url ); ?>"
              alt="<?php echo esc_attr( $name_en ); ?>"
              loading="<?php echo $i === 0 ? 'eager' : 'lazy'; ?>"
              <?php if ( $img_position ) echo 'style="object-position: ' . esc_attr( $img_position ) . ';"'; ?> />
          <div class="hike-info"
              data-weather="<?php echo esc_attr( $weather_id ); ?>"
              data-lat="<?php echo esc_attr( $lat ); ?>"
              data-lon="<?php echo esc_attr( $lon ); ?>"
              data-start="<?php echo esc_attr( $start ); ?>"
              data-end="<?php echo esc_attr( $end ); ?>">
              <div class="hike-dates"><?php echo esc_html( $dates ); ?></div>
              <div class="hike-name"
                  data-name-en="<?php echo esc_attr( $name_en ); ?>"
                  data-name-ka="<?php echo esc_attr( $name_ka ); ?>">
                  <?php echo esc_html( $name_en ); ?>
              </div>
              <p class="hike-desc"
                  data-desc-en="<?php echo esc_attr( $desc_en ); ?>"
                  data-desc-ka="<?php echo esc_attr( $desc_ka ); ?>">
                  <?php echo esc_html( $desc_en ); ?>
              </p>
              <a href="#newsletter" class="link-more" data-i18n="link-learn-more">Learn more</a>
          </div>
      </div>
      <?php
              $i++;
          endwhile;
          wp_reset_postdata();
      endif;
      ?>

    </div>
  </section>

  <!-- STATS -->
  <section class="stats">
    <div class="stats-grid">
      <div class="reveal">
        <div class="stat-number">200<span>+</span></div>
        <div class="stat-label" data-i18n="stat-people">People trust us and come back for more adventures</div>
      </div>
      <div class="reveal reveal-delay-1">
        <div class="stat-number">26</div>
        <div class="stat-label" data-i18n="stat-routes">Checked and well-known routes in our library</div>
      </div>
      <div class="reveal reveal-delay-2">
        <div class="stat-number">∞</div>
        <div class="stat-label" data-i18n="stat-smiles">Smiles and wow-s in our adventures</div>
      </div>
    </div>
  </section>

  <!-- OUR STORY -->
  <section class="story" id="about">
    <div class="story-text reveal">
      <span class="section-tag" data-i18n="story-tag">Our Story</span>
      <h2 class="section-title" data-i18n="story-title">Born on a wrong turn in Tusheti</h2>
      <p data-i18n="story-p1">In the summer of 2019, Nino Kvaratskhelia took a wrong turn on the Abano Pass and ended up camping with strangers above the clouds. She woke up to a view that made her cry — and realised she wanted to share exactly that feeling with the world.</p>
      <p data-i18n="story-p2">Geotripster started as a WhatsApp group of friends. It grew into something larger: a small crew of guides, photographers, and mountain obsessives who believe Georgia is the most underrated adventure destination on earth.</p>
      <p data-i18n="story-p3">We keep groups small, food local, and routes honest. No shortcuts, no tourist traps — just the real Georgia.</p>
    </div>
    <div class="story-image reveal reveal-delay-1">
      <img src="<?php echo get_template_directory_uri(); ?>/images/tusheti-rainbow.jpg" alt="Rainbow over Tusheti" />
    </div>
  </section>

  <!-- PHILOSOPHY -->
  <section class="philosophy">
    <span class="section-tag" data-i18n="philosophy-tag">Our Approach</span>
    <h2 class="section-title reveal" data-i18n-html="philosophy-title">Meticulous organization,<br><em>delicious food</em>, and a friendly vibe</h2>
    <p class="section-subtitle reveal reveal-delay-1" data-i18n="philosophy-subtitle">We believe every trip should feel effortless for you — that means sweating the logistics so you can just show up, breathe the mountain air, and be present.</p>

    <div class="philosophy-features">
      <div class="reveal">
        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 17l4-8 4 5 3-3 4 6"/><circle cx="19" cy="5" r="2"/>
        </svg>
        <div class="feature-title" data-i18n="feature-safety-title">Safety First</div>
        <p class="feature-text" data-i18n="feature-safety-text">Every route is scouted, weather-monitored, and equipped with first-aid and emergency protocols.</p>
      </div>
      <div class="reveal reveal-delay-1">
        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <div class="feature-title" data-i18n="feature-groups-title">Small Groups</div>
        <p class="feature-text" data-i18n="feature-groups-text">Groups of 6–12 people mean a personal experience, flexible pace, and real connection.</p>
      </div>
      <div class="reveal reveal-delay-2">
        <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 12s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
        <div class="feature-title" data-i18n="feature-vibes-title">Good Vibes Only</div>
        <p class="feature-text" data-i18n="feature-vibes-text">Camp cooking, camp fires, honest conversations — the best friendships start on a trail.</p>
      </div>
    </div>
  </section>

  <!-- REVIEWS -->
  <section class="reviews" id="reviews">
    <div class="reviews-header">
      <span class="section-tag" data-i18n="reviews-tag">Testimonials</span>
      <h2 class="section-title" data-i18n="reviews-title">What our guests say</h2>
    </div>

    <div class="reviews-grid">
      <div class="review-card reveal">
        <div class="stars">★★★★★</div>
        <p class="review-text" data-i18n="review-1">"The organization was flawless — route, food, gear, pace. The views from the ridge on day two genuinely made me cry. I booked the next trip before we even got back to Tbilisi."</p>
        <div class="review-author">
          <div>
            <div class="review-name">Anna K.</div>
            <div class="review-trip" data-i18n="review-1-trip">Mravaltskaro, June 2025</div>
          </div>
        </div>
      </div>

      <div class="review-card reveal reveal-delay-1">
        <div class="stars">★★★★★</div>
        <p class="review-text" data-i18n="review-2">"I was worried as a solo traveler. By the second evening around the fire, it felt like I'd known the group for years. The guides adjusted the pace without ever making it feel like a compromise."</p>
        <div class="review-author">
          <div>
            <div class="review-name">Dmitri V.</div>
            <div class="review-trip" data-i18n="review-2-trip">Kazbegi Ridge, August 2025</div>
          </div>
        </div>
      </div>

      <div class="review-card reveal">
        <div class="stars">★★★★★</div>
        <p class="review-text" data-i18n="review-3">"Local food at every stop, fascinating stories about the villages, and no rush — we actually had time to sit and absorb each place. Absolutely life-changing."</p>
        <div class="review-author">
          <div>
            <div class="review-name">Maria S.</div>
            <div class="review-trip" data-i18n="review-3-trip">Svaneti Traverse, July 2025</div>
          </div>
        </div>
      </div>

      <div class="review-card reveal reveal-delay-1">
        <div class="stars">★★★★★</div>
        <p class="review-text" data-i18n="review-4">"Camp dinners were genuinely restaurant-level. I left feeling like I could take on anything. Already planning to come back for Tusheti."</p>
        <div class="review-author">
          <div>
            <div class="review-name">Elena P.</div>
            <div class="review-trip" data-i18n="review-4-trip">Martvili Canyon, September 2025</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- NEWSLETTER -->
  <section class="newsletter" id="newsletter">
    <span class="section-tag" style="color:rgba(255,255,255,0.7)" data-i18n="newsletter-tag">Stay Updated</span>
    <h2 class="section-title reveal" data-i18n-html="newsletter-title">Get the next adventure<br>in your inbox</h2>
    <p class="reveal reveal-delay-1" data-i18n="newsletter-subtitle">New routes, early-bird spots, and field notes — straight from the trail to you.</p>

    <form class="newsletter-form reveal reveal-delay-2" onsubmit="handleSubscribe(event)">
      <input type="email" data-i18n-placeholder="newsletter-placeholder" placeholder="your@email.com" required />
      <button type="submit" data-i18n="newsletter-btn">Subscribe</button>
    </form>
    <div class="newsletter-policy reveal reveal-delay-2">
      <input type="checkbox" id="policy" required />
      <label for="policy" data-i18n-html="newsletter-policy">I agree to the <a href="#" style="color:inherit">Privacy Policy</a></label>
    </div>
  </section>
