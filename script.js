/* ============================================================
   金沢ヴィラズ — Kanazawa Villas
   script.js  (vanilla JS, no dependencies)
   ============================================================ */

(function () {
  'use strict';

  // ── 0. Inject site footer (single source of truth) ───────────
  // Determine path prefix based on current page depth:
  //  - root pages (index.html, contact.html) use ""
  //  - language subpages (en/index.html, ja/index.html) use "../"
  //  - legal subpages (legal/*.html) use "../"
  // Also detect language to render the footer in JP or EN.
  const footerEl = document.querySelector('[data-component="site-footer"]');
  if (footerEl) {
    const path = window.location.pathname;
    const isLegal = path.includes('/legal/') || path.endsWith('legal/');
    const isLangSubdir = /\/(en|ja)\/?($|index\.html)/.test(path);
    const root = (isLegal || isLangSubdir) ? '../' : '';

    // Detect current language: prefer html[lang], fall back to URL.
    const htmlLang = (document.documentElement.lang || '').toLowerCase();
    const isJa = htmlLang === 'ja' || /\/ja\//.test(path);

    // Cross-language link param helps subpages (contact, legal) auto-toggle.
    const langParam = isJa ? '?lang=ja' : '';

    // i18n strings for footer
    const t = isJa ? {
      tag: '三つの家、ひとつの金沢。',
      desc: '野町・白菊町・堀川町に構える、合同会社IMK 直営の三棟。一棟貸しで、住人のように、しばし。',
      site: 'サイト',
      villas: '物件',
      concept: 'コンセプト',
      faq: 'FAQ',
      contact: 'お問い合わせ',
      book: '予約',
      nomachiDirect: '野町邸 · 直接予約',
      shiragikuAirbnb: '白菊町邸 · Airbnb',
      horikawaNotify: '堀川町邸 · 開業のお知らせ',
      legal: '法令',
      langOther: 'English',
      langOtherUrl: root + 'en/',
      copy: '© 2026 Kanazawa Villas / 合同会社IMK ／ 旅館業法 簡易宿所営業',
      poweredBy: '予約システム提供：Beds24',
      // Internal page anchors point to the language-appropriate index.
      indexHref: isLangSubdir ? './' : (root + 'ja/'),
    } : {
      tag: 'Three houses, one Kanazawa.',
      desc: 'Three privately operated houses in Kanazawa — Nomachi, Shiragiku, and (from 2026) Horikawa. Whole-house stays for residents, briefly.',
      site: 'Site',
      villas: 'Villas',
      concept: 'Concept',
      faq: 'FAQ',
      contact: 'Contact',
      book: 'Book',
      nomachiDirect: 'Nomachi · Direct',
      shiragikuAirbnb: 'Shiragiku · Airbnb',
      horikawaNotify: 'Horikawa · Notify me',
      legal: 'Legal',
      langOther: '日本語',
      langOtherUrl: root + 'ja/',
      copy: '© 2026 Kanazawa Villas / 合同会社IMK ／ Licensed simple lodging',
      poweredBy: 'Booking powered by Beds24',
      indexHref: isLangSubdir ? './' : (root + 'en/'),
    };

    footerEl.innerHTML = `
      <div class="footer-top">
        <div>
          <div class="footer-brand-mark">Kanazawa Villas</div>
          <div class="footer-brand-tag">${t.tag}</div>
          <p class="footer-brand-desc">${t.desc}</p>
        </div>
        <div>
          <h5>${t.site}</h5>
          <ul>
            <li><a href="${t.indexHref}#villas">${t.villas}</a></li>
            <li><a href="${t.indexHref}#concept">${t.concept}</a></li>
            <li><a href="${t.indexHref}#faq">${t.faq}</a></li>
            <li><a href="${root}contact.html${langParam}">${t.contact}</a></li>
            <li><a href="${t.langOtherUrl}" hreflang="${isJa ? 'en' : 'ja'}">${t.langOther}</a></li>
          </ul>
        </div>
        <div>
          <h5>${t.book}</h5>
          <ul>
            <li><a href="https://beds24.com/booking2.php?propid=261406" target="_blank" rel="noopener">${t.nomachiDirect}</a></li>
            <li><a href="https://airbnb.jp/h/shiragiku-villa" target="_blank" rel="noopener">${t.shiragikuAirbnb}</a></li>
            <li><a href="${root}contact.html?topic=horikawa${isJa ? '&lang=ja' : ''}">${t.horikawaNotify}</a></li>
          </ul>
        </div>
        <div>
          <h5>${t.legal}</h5>
          <ul class="legal-links">
            <li><a href="${root}legal/tokushoho.html">特定商取引法に基づく表記</a></li>
            <li><a href="${root}legal/privacy.html${langParam}">${isJa ? 'プライバシーポリシー' : 'Privacy Policy'}</a></li>
            <li><a href="${root}legal/terms.html${langParam}">${isJa ? '宿泊約款' : 'Accommodation Agreement'}</a></li>
            <li><a href="${root}legal/house-rules.html${langParam}">${isJa ? 'ハウスルール' : 'House Rules'}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>${t.copy}</div>
        <div>${t.poweredBy}</div>
      </div>
    `;
  }

  // ── 0b. Force scroll to top on fresh load ─────────────────────
  // iOS Safari sometimes restores a stale scroll position or treats
  // a bare "#" href as a fragment. Reset position on initial load
  // (but only when there's no real anchor like #villas).
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.addEventListener('load', () => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  });

  // ── 1. Language switch ───────────────────────────────────────
  // Header lang switcher uses native <a> tags pointing to /en/ or /ja/,
  // so no JS handling is needed here. Active state is set in HTML.

  // ── 1b. Mobile menu toggle ───────────────────────────────────
  const menuToggle = document.querySelector('[data-component="menu-toggle"]');
  const drawer = document.querySelector('[data-component="header-drawer"]');
  if (menuToggle && drawer) {
    const closeMenu = () => {
      drawer.removeAttribute('data-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };
    menuToggle.addEventListener('click', () => {
      const isOpen = drawer.getAttribute('data-open') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        drawer.setAttribute('data-open', 'true');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
      }
    });
    // close drawer when nav link is tapped
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    // close on viewport resize back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  // ── 2. FAQ accordion ─────────────────────────────────────────
  const faqList = document.querySelector('[data-component="faq"]');
  if (faqList) {
    const items = faqList.querySelectorAll('.faq-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  // ── 3. Booking preview: villa picker + CTA ───────────────────
  const booking = document.querySelector('[data-component="booking"]');
  if (booking) {
    const picks = booking.querySelectorAll('.pick');
    const stayTitle = booking.querySelector('[data-component="stay-title"]');
    const continueCta = booking.querySelector('[data-component="continue-cta"]');

    const villaNames = {
      nomachi: 'Nomachi Villa',
      shiragiku: 'Shiragiku Villa',
      horikawa: 'Horikawa Villa',
    };

    // CTA configuration for each booking target type
    const targetConfig = {
      beds24: {
        ctaLabel: 'Continue on Beds24',
        desc: "You'll be taken to Beds24 to pick exact dates, guests, and complete payment securely.",
        external: true,
      },
      airbnb: {
        ctaLabel: 'Book on Airbnb',
        desc: "Currently bookable via Airbnb while we prepare full direct booking.",
        external: true,
      },
      notify: {
        ctaLabel: 'Notify me when ready',
        desc: "Opening Jul 2026. Leave your email and we'll let you know when bookings open.",
        external: false,
      },
    };

    const stayDesc = booking.querySelector('[data-component="stay-desc"]');
    const ctaLabelSpan = continueCta ? continueCta.querySelector('[data-component="cta-label"]') : null;

    picks.forEach(pick => {
      pick.addEventListener('click', () => {
        const villa = pick.dataset.villa;
        const url = pick.dataset.url;
        const target = pick.dataset.target || 'beds24';
        const config = targetConfig[target] || targetConfig.beds24;

        // toggle active state + arrow text
        picks.forEach(p => {
          p.classList.remove('active');
          p.querySelector('.arrow-text').textContent = '→';
        });
        pick.classList.add('active');
        pick.querySelector('.arrow-text').textContent = '— selected';

        // update summary title
        if (stayTitle) stayTitle.textContent = villaNames[villa] || 'Select a villa —';

        // update summary description
        if (stayDesc) stayDesc.textContent = config.desc;

        // update CTA label + behavior
        if (continueCta) {
          continueCta.href = url;
          if (ctaLabelSpan) ctaLabelSpan.textContent = config.ctaLabel;
          if (config.external) {
            continueCta.setAttribute('target', '_blank');
            continueCta.setAttribute('rel', 'noopener');
          } else {
            continueCta.removeAttribute('target');
            continueCta.removeAttribute('rel');
          }
        }
      });
    });
  }

  // ── 4. (Removed) Booking preview demo calendar
  //    Kept as a placeholder reference. Section was simplified to a
  //    "Why book direct" benefits list; no calendar is rendered.

  // ── 5. Legal/House rules language toggle (JP / EN) ───────────
  // Supports both legacy [data-component="house-lang-toggle"] and
  // generic [data-component="legal-lang-toggle"] for any subpage.
  const langToggles = document.querySelectorAll('[data-component="house-lang-toggle"], [data-component="legal-lang-toggle"]');
  langToggles.forEach(toggle => {
    const buttons = toggle.querySelectorAll('button');
    const sections = document.querySelectorAll('[data-lang-section]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sections.forEach(s => {
          s.classList.toggle('active', s.dataset.langSection === target);
        });
        // Sync URL hash so users can bookmark a language preference (optional)
        if (target === 'en') {
          history.replaceState(null, '', '#en');
        } else {
          history.replaceState(null, '', window.location.pathname);
        }
      });
    });
    // Auto-switch based on URL: prefer ?lang=ja|en query param,
    // fall back to legacy #en hash for backward compatibility.
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = (urlParams.get('lang') || '').toLowerCase();
    if (langParam === 'ja' || langParam === 'jp') {
      const jpBtn = toggle.querySelector('button[data-target="jp"]');
      if (jpBtn) jpBtn.click();
    } else if (langParam === 'en' || window.location.hash === '#en') {
      const enBtn = toggle.querySelector('button[data-target="en"]');
      if (enBtn) enBtn.click();
    }
  });

  // ── 6. Contact form (Formspree submission) ───────────────────
  const contactForm = document.querySelector('[data-component="contact-form"]');
  const formStatus = document.querySelector('[data-component="form-status"]');

  // 6a. Auto-populate topic and villa from URL parameters
  // e.g. contact.html?topic=horikawa → preselect horikawa option
  if (contactForm) {
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get('topic');
    const villaParam = params.get('villa');
    if (topicParam) {
      const topicSelect = contactForm.querySelector('[data-component="topic-select"]');
      if (topicSelect) {
        const matching = topicSelect.querySelector(`option[value="${topicParam}"]`);
        if (matching) topicSelect.value = topicParam;
      }
    }
    if (villaParam) {
      const villaSelect = contactForm.querySelector('[data-component="villa-select"]');
      if (villaSelect) {
        const matching = villaSelect.querySelector(`option[value="${villaParam}"]`);
        if (matching) villaSelect.value = villaParam;
      }
    }
    // If user came via topic=horikawa, also set villa = horikawa
    if (topicParam === 'horikawa') {
      const villaSelect = contactForm.querySelector('[data-component="villa-select"]');
      if (villaSelect) villaSelect.value = 'horikawa';
    }
  }

  // ── 7. GA4 Event Tracking ────────────────────────────────────
  // Helper that safely calls gtag if available.
  // Defined here (before contact form handler) so it can be used inside it.
  function track(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  }

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      // GA4 event: track every submission attempt (regardless of outcome)
      const eventParams = {
        topic: contactForm.querySelector('[name="topic"]')?.value || '',
        villa: contactForm.querySelector('[name="villa"]')?.value || '',
      };
      track('contact_submit_attempt', eventParams);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' },
        });
        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = 'Your message has been received. We will respond within 24 hours.';
          contactForm.reset();
          // GA4: success
          track('contact_submit_success', eventParams);
        } else {
          throw new Error('Submission failed: HTTP ' + response.status);
        }
      } catch (err) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = 'Failed to send. Please try again later.';
        // GA4: error (with reason for debugging)
        track('contact_submit_error', {
          ...eventParams,
          error: (err && err.message) ? err.message.slice(0, 100) : 'unknown',
        });
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      }
    });
  }

  // ── 7b. Other tracked interactions ──────────────────────────
  // Identify Beds24 links by URL pattern, then determine context (villa, location)
  document.querySelectorAll('a[href*="beds24.com/booking"]').forEach(link => {
    link.addEventListener('click', () => {
      const text = (link.textContent || '').trim().toLowerCase();
      const propMatch = link.href.match(/propid=(\d+)/);
      const propId = propMatch ? propMatch[1] : '';

      // Map prop IDs to villa names (extend as more villas open)
      const villaByProp = {
        '261406': 'nomachi',
      };
      const villa = villaByProp[propId] || 'unknown';

      // Identify which CTA was clicked based on its text content
      let cta = 'book_direct';
      if (text.includes('check dates')) cta = 'check_dates';
      else if (text.includes('view villa')) cta = 'view_villa';
      else if (text.includes('continue on beds24')) cta = 'continue_beds24';
      else if (text.includes('explore the villas')) cta = 'explore_villas';

      track('beds24_click', {
        cta_label: cta,
        villa: villa,
        prop_id: propId,
        page: window.location.pathname,
      });
    });
  });

  // 7b. Villa picker selection (BookingPreview section)
  document.querySelectorAll('[data-component="booking"] .pick').forEach(btn => {
    btn.addEventListener('click', () => {
      track('villa_select', {
        villa: btn.dataset.villa || '',
        page: window.location.pathname,
      });
    });
  });

  // 7c. Mobile menu open
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpening = menuToggle.getAttribute('aria-expanded') === 'true';
      // We listen *after* the toggle handler runs, so the state has flipped
      track('mobile_menu_toggle', { state: isOpening ? 'open' : 'close' });
    });
  }

  // 7d. Footer legal link clicks (helpful for compliance audit)
  document.querySelectorAll('.legal-links a').forEach(link => {
    link.addEventListener('click', () => {
      track('legal_link_click', {
        link_text: (link.textContent || '').trim(),
        href: link.getAttribute('href'),
      });
    });
  });

})();
