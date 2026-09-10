/**
 * RCCDP — lightbox.js
 * Handles two lightbox modes:
 *   1. PDF preview — triggered by <a data-lightbox data-title="..."> links
 *   2. Image viewer — triggered by <button class="gallery-thumb" data-src="..." data-title="...">
 *
 * On mobile, PDFs fall back to opening in a new tab if iframe rendering fails.
 * No dependencies.
 */

(function () {
  'use strict';

  // ── PDF Lightbox ─────────────────────────────────────────────

  const pdfOverlay  = document.getElementById('pdf-lightbox');
  const pdfIframe   = document.getElementById('lightbox-iframe');
  const pdfTitle    = document.getElementById('lightbox-title');
  const pdfClose    = document.getElementById('lightbox-close');
  const pdfFallback = document.getElementById('lightbox-fallback');
  const pdfDlLink   = document.getElementById('lightbox-download');

  function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  function openPDF(href, title) {
    if (isMobile()) {
      // On mobile, open PDF in new tab — iframes are unreliable
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (!pdfOverlay) return;

    pdfTitle.textContent  = title || 'Document Preview';
    pdfIframe.src         = href;
    pdfIframe.style.display = 'block';
    if (pdfFallback) pdfFallback.style.display = 'none';
    if (pdfDlLink)   pdfDlLink.href = href;

    pdfOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // If iframe fails to load after 5s, show fallback download link
    let timer = setTimeout(() => {
      if (pdfFallback) {
        pdfIframe.style.display = 'none';
        pdfFallback.style.display = 'block';
      }
    }, 5000);

    pdfIframe.onload = () => clearTimeout(timer);
    pdfClose && pdfClose.focus();
  }

  function closePDF() {
    if (!pdfOverlay) return;
    pdfOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (pdfIframe) pdfIframe.src = '';
  }

  // Wire up all [data-lightbox] anchors on this page
  document.querySelectorAll('a[data-lightbox]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openPDF(link.href, link.getAttribute('data-title') || link.textContent.trim());
    });
  });

  // Close button
  pdfClose && pdfClose.addEventListener('click', closePDF);

  // Click outside box
  pdfOverlay && pdfOverlay.addEventListener('click', e => {
    if (e.target === pdfOverlay) closePDF();
  });

  // ── Image Lightbox ───────────────────────────────────────────

  const imgOverlay = document.getElementById('img-lightbox');
  const imgEl      = document.getElementById('lightbox-img');
  const imgTitle   = imgOverlay && imgOverlay.querySelector('#lightbox-title');
  const imgClose   = imgOverlay && imgOverlay.querySelector('#lightbox-close');

  function openImage(src, title, alt) {
    if (!imgOverlay || !imgEl) return;
    imgEl.src = src;
    imgEl.alt = alt || title || '';
    if (imgTitle) imgTitle.textContent = title || '';
    imgOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    imgClose && imgClose.focus();
  }

  function closeImage() {
    if (!imgOverlay) return;
    imgOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (imgEl) imgEl.src = '';
  }

  document.querySelectorAll('.gallery-thumb[data-src]').forEach(btn => {
    btn.addEventListener('click', () => {
      openImage(
        btn.getAttribute('data-src'),
        btn.getAttribute('data-title') || btn.getAttribute('aria-label') || '',
        btn.querySelector('img') ? btn.querySelector('img').alt : ''
      );
    });
  });

  imgClose  && imgClose.addEventListener('click', closeImage);
  imgOverlay && imgOverlay.addEventListener('click', e => {
    if (e.target === imgOverlay) closeImage();
  });

  // ── Keyboard (Escape to close) ───────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closePDF();
      closeImage();
    }
  });

})();
