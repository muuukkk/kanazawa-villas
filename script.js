/* ============================================================
   金沢ヴィラズ — Kanazawa Villas
   script.js  (vanilla JS, no dependencies)
   ============================================================ */

(function () {
  'use strict';

  // ── 0. Force scroll to top on fresh load ─────────────────────
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

  // ── 1. Language switch (UI toggle only, no actual i18n yet) ──
  const langSwitch = document.querySelector('[data-component="lang-switch"]');
  if (langSwitch) {
    const buttons = langSwitch.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

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

    picks.forEach(pick => {
      pick.addEventListener('click', () => {
        const villa = pick.dataset.villa;
        const url = pick.dataset.url;
        const isComingSoon = url === '#';

        // toggle active state + arrow text
        picks.forEach(p => {
          p.classList.remove('active');
          p.querySelector('.arrow-text').textContent = '→';
        });
        pick.classList.add('active');
        pick.querySelector('.arrow-text').textContent = '— selected';

        // update summary title
        if (stayTitle) stayTitle.textContent = villaNames[villa] || 'Select a villa —';

        // update CTA
        if (continueCta) {
          continueCta.href = url;
          if (isComingSoon) {
            continueCta.removeAttribute('target');
            continueCta.removeAttribute('rel');
          } else {
            continueCta.setAttribute('target', '_blank');
            continueCta.setAttribute('rel', 'noopener');
          }
        }
      });
    });
  }

  // ── 4. Booking preview: 14-day calendar ──────────────────────
  const cal = document.querySelector('[data-component="calendar"]');
  if (cal) {
    const dows = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
    const busyDays = [2, 7, 8]; // demo placeholder until real data
    const today = new Date();
    let html = '';
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const busy = busyDays.includes(i) ? ' busy' : '';
      html += `<div class="cal-day${busy}"><div class="dow">${dows[d.getDay()]}</div><div class="num">${d.getDate()}</div></div>`;
    }
    cal.innerHTML = html;
  }

  // ── 5. House rules language toggle (JP / EN) ─────────────────
  const houseLangToggle = document.querySelector('[data-component="house-lang-toggle"]');
  if (houseLangToggle) {
    const buttons = houseLangToggle.querySelectorAll('button');
    const sections = document.querySelectorAll('[data-lang-section]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sections.forEach(s => {
          s.classList.toggle('active', s.dataset.langSection === target);
        });
      });
    });
  }

  // ── 6. Contact form (Formspree submission) ───────────────────
  const contactForm = document.querySelector('[data-component="contact-form"]');
  const formStatus = document.querySelector('[data-component="form-status"]');
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending — 送信中...</span>';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' },
        });
        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = 'お問い合わせを受け付けました。24時間以内にご返信いたします。<br/>Your message has been received. We will respond within 24 hours.';
          contactForm.reset();
        } else {
          throw new Error('Submission failed');
        }
      } catch (err) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = '送信に失敗しました。お手数ですが時間をおいて再度お試しください。<br/>Failed to send. Please try again later.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      }
    });
  }

})();
