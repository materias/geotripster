  <footer>
    <div class="footer-top">
      <div>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-logo">Geo<span>tripster</span></a>
        <p class="footer-tagline">Conscious adventures in the wild places of the world.</p>
      </div>
      <nav class="footer-nav">
        <div class="footer-nav-col">
          <h4>Explore</h4>
          <a href="#">Home</a>
          <a href="#hikes">Hikes</a>
          <a href="#hikes">Adventures</a>
        </div>
        <div class="footer-nav-col">
          <h4>Company</h4>
          <a href="#about">About Us</a>
          <a href="#reviews">Reviews</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
        <div class="footer-nav-col">
          <h4>Contact</h4>
          <a href="#">Instagram</a>
          <a href="#">Telegram</a>
          <a href="#">Email Us</a>
          <a href="#" onclick="openModal(event)">Book Now</a>
        </div>
      </nav>
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">© <?php echo date( 'Y' ); ?> Geotripster. All rights reserved.</p>
      <div class="footer-social">
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
    </div>
  </footer>

  <!-- BOOKING MODAL -->
  <div class="modal-overlay" id="modal">
    <div class="modal">
      <button class="modal-close" onclick="closeModal()">×</button>
      <h2>Book Your Adventure</h2>
      <p>Fill in the form and we'll get back to you within 24 hours.</p>
      <form onsubmit="handleBooking(event)">
        <div class="form-group">
          <label>Your Name</label>
          <input type="text" placeholder="Jane Smith" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="jane@example.com" required />
        </div>
        <div class="form-group">
          <label>Choose a Route</label>
          <select>
            <option>Borjomi–Kharagauli — Jun 14–16</option>
            <option>Kazbegi Ridge — Jul 5–9</option>
            <option>Svaneti Traverse — Jul 20–28</option>
            <option>Lagodekhi Reserve — Aug 8–10</option>
            <option>Tusheti High Road — Sep 6–13</option>
          </select>
        </div>
        <div class="form-group">
          <label>Message (optional)</label>
          <textarea placeholder="Any questions or special requests…"></textarea>
        </div>
        <button type="submit" class="btn-primary" style="width:100%;text-align:center">Send Request</button>
      </form>
    </div>
  </div>

  <?php wp_footer(); ?>
</body>
</html>
