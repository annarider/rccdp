/**
 * RCCDP — components.js
 * Injects shared header (nav) and footer into every page.
 * Also sets the active nav state based on current URL.
 */

(function () {
  // ── Navigation HTML ────────────────────────────────────────────
  const NAV_HTML = `
    <a class="skip-link" href="#main">Skip to main content</a>
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <div class="nav__inner">

        <a href="/" class="nav__logo" aria-label="RCCDP Home">
          <img src="/assets/images/cropped-RCCDP-logo_v2b_blue_text.png"
               alt="Redwood City Child Development Program logo"
               width="46" height="46"
               onerror="this.style.display='none'">
          <span class="nav__logo-text">Redwood City Child Development Program</span>
        </a>

        <ul class="nav__links" role="list">

          <li class="nav__item">
            <a href="/" class="nav__link" data-path="/">Home</a>
          </li>

          <li class="nav__item nav__item--dropdown">
            <a href="/about/" class="nav__link nav__dropdown-toggle" data-path="/about"
               aria-haspopup="true" aria-expanded="false">About</a>
            <ul class="nav__dropdown" role="list">
              <li><a href="/about/">About RCCDP</a></li>
              <li><a href="/about/board/">Board of Directors</a></li>
              <li><a href="/about/staff/">Management &amp; Staff</a></li>
              <li><a href="/about/annual-reports/">Annual Reports</a></li>
            </ul>
          </li>

          <li class="nav__item nav__item--dropdown">
            <a href="/programs/curriculum/" class="nav__link nav__dropdown-toggle" data-path="/programs"
               aria-haspopup="true" aria-expanded="false">Programs</a>
            <ul class="nav__dropdown" role="list">
              <li><a href="/programs/curriculum/">Curriculum</a></li>
              <li><a href="/programs/schedules/">Classroom Schedules</a></li>
              <li><a href="/programs/nutrition/">Nutrition</a></li>
              <li><a href="/policies/">Policies &amp; Procedures</a></li>
              <li><a href="/enroll/">Tuition &amp; Apply</a></li>
            </ul>
          </li>

          <li class="nav__item">
            <a href="/gallery/" class="nav__link" data-path="/gallery">Gallery</a>
          </li>

          <li class="nav__item nav__item--dropdown">
            <a href="/contact/" class="nav__link nav__dropdown-toggle" data-path="/contact"
               aria-haspopup="true" aria-expanded="false">Contact</a>
            <ul class="nav__dropdown" role="list">
              <li><a href="/contact/">Contact Us</a></li>
              <li><a href="/resources/">Resources &amp; Links</a></li>
              <li><a href="/privacy-policy/">Privacy Policy</a></li>
            </ul>
          </li>

          <li class="nav__item">
            <a href="https://www.facebook.com/rccdp"
               class="nav__link nav__link--social"
               target="_blank" rel="noopener noreferrer"
               aria-label="RCCDP on Facebook">
              <svg class="nav__fb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="currentColor"/>
              </svg>
            </a>
          </li>

          <li class="nav__item">
            <a href="https://givebutter.com/rccdp"
               class="nav__link nav__link--donate"
               target="_blank" rel="noopener noreferrer">Donate</a>
          </li>

        </ul>

        <!-- Hamburger (mobile) -->
        <button class="nav__hamburger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav">
          <span></span><span></span><span></span>
        </button>

      </div><!-- /.nav__inner -->

      <!-- Mobile nav -->
      <div id="mobile-nav" class="nav__mobile" aria-hidden="true">
        <ul class="nav__mobile-list" role="list">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about/">About</a>
            <ul class="nav__mobile-sub">
              <li><a href="/about/board/">Board of Directors</a></li>
              <li><a href="/about/staff/">Management &amp; Staff</a></li>
              <li><a href="/about/annual-reports/">Annual Reports</a></li>
            </ul>
          </li>
          <li>
            <a href="/programs/curriculum/">Programs</a>
            <ul class="nav__mobile-sub">
              <li><a href="/programs/curriculum/">Curriculum</a></li>
              <li><a href="/programs/schedules/">Classroom Schedules</a></li>
              <li><a href="/programs/nutrition/">Nutrition</a></li>
              <li><a href="/policies/">Policies &amp; Procedures</a></li>
              <li><a href="/enroll/">Tuition &amp; Apply</a></li>
            </ul>
          </li>
          <li><a href="/gallery/">Gallery</a></li>
          <li>
            <a href="/contact/">Contact</a>
            <ul class="nav__mobile-sub">
              <li><a href="/resources/">Resources &amp; Links</a></li>
              <li><a href="/privacy-policy/">Privacy Policy</a></li>
            </ul>
          </li>
        </ul>
        <div class="nav__mobile-actions">
          <a href="https://www.facebook.com/rccdp"
             class="nav__mobile-social"
             target="_blank" rel="noopener noreferrer"
             aria-label="RCCDP on Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="20" height="20">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="currentColor"/>
            </svg>
            Facebook
          </a>
          <a href="https://givebutter.com/rccdp"
             class="nav__mobile-donate"
             target="_blank" rel="noopener noreferrer">Donate</a>
        </div>
      </div>

    </nav>
  `;

  // ── Footer HTML ────────────────────────────────────────────────
  const FOOTER_HTML = `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">

          <div class="footer__brand">
            <a href="/" class="nav__logo" aria-label="RCCDP Home">
              <span class="nav__logo-text">Redwood City Child Development Program</span>
            </a>
            <p class="footer__tagline">Learn. Grow. Play.<br>Serving children ages 1–5 since 1985.</p>
          </div>

          <div class="footer__col">
            <h4>About</h4>
            <ul>
              <li><a href="/about/">About RCCDP</a></li>
              <li><a href="/about/board/">Board of Directors</a></li>
              <li><a href="/about/staff/">Management &amp; Staff</a></li>
              <li><a href="/about/annual-reports/">Annual Reports</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4>Programs</h4>
            <ul>
              <li><a href="/programs/curriculum/">Curriculum</a></li>
              <li><a href="/programs/schedules/">Classroom Schedules</a></li>
              <li><a href="/programs/nutrition/">Nutrition</a></li>
              <li><a href="/policies/">Policies &amp; Procedures</a></li>
              <li><a href="/enroll/">Tuition &amp; Apply</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+16507807520">(650) 780-7520</a></li>
              <li><a href="mailto:info@rccdp.org">info@rccdp.org</a></li>
              <li><a href="/contact/">2600 Middlefield Rd<br>Redwood City, CA 94063</a></li>
              <li style="margin-top:.5rem"><a href="/gallery/">Photo Gallery</a></li>
              <li><a href="/resources/">Resources &amp; Links</a></li>
            </ul>
          </div>

        </div>

        <div class="footer__social">
          <a href="https://www.facebook.com/rccdp"
             class="footer__social-link"
             target="_blank" rel="noopener noreferrer"
             aria-label="RCCDP on Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="24" height="24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="currentColor"/>
            </svg>
          </a>
        </div>

        <div class="footer__bottom">
          <span>&copy; ${new Date().getFullYear()} Redwood City Child Development Program &middot; Non-profit 501(c)(3)</span>
          <span>
            <a href="/privacy-policy/">Privacy Policy</a>
            &nbsp;&middot;&nbsp;
            License #414005232
          </span>
        </div>
      </div>
    </footer>
  `;

  // ── Inject ─────────────────────────────────────────────────────
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = NAV_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  // ── Active nav state ───────────────────────────────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav__link[data-path]').forEach(link => {
    const lp = link.getAttribute('data-path');
    if (lp === '/' ? path === '/' : path.startsWith(lp)) {
      link.classList.add('active');
    }
  });

  // ── Mobile hamburger ───────────────────────────────────────────
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!open));
      mobileNav.setAttribute('aria-hidden', String(open));
      mobileNav.classList.toggle('open', !open);
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        mobileNav.classList.remove('open');
      }
    });
  }

})();
