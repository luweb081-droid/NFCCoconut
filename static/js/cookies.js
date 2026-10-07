/**
 * NFC COCONUT — Consentement cookies (RGPD / CNIL)
 *
 * Fonctionnement :
 *  - Les stockages STRICTEMENT NÉCESSAIRES (panier, infos commerce dans
 *    localStorage) ne demandent pas de consentement : ils sont toujours actifs.
 *  - Tout le reste (mesure d'audience, pixel pub, etc.) est BLOQUÉ tant que le
 *    visiteur n'a pas cliqué sur « Tout accepter ».
 *  - « Tout refuser » est aussi visible que « Tout accepter » (exigence CNIL).
 *  - Le choix est mémorisé 6 mois, puis redemandé.
 *  - Le visiteur peut changer d'avis via le lien « Gérer mes cookies » du pied de page.
 *
 * POUR AJOUTER UN OUTIL DE MESURE PLUS TARD :
 *  Ajoute-le dans OPTIONAL_SCRIPTS ci-dessous. Il ne sera chargé qu'après
 *  consentement. Ne colle JAMAIS le snippet directement dans les pages HTML.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'nfcCoconutConsent';
  var DURATION_MS = 1000 * 60 * 60 * 24 * 180; // ~6 mois

  // ---- Scripts optionnels (chargés uniquement si l'utilisateur accepte) ----
  // Exemple Google Analytics 4 (remplace G-XXXXXXXXXX) :
  //   { src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
  //     onload: function () {
  //       window.dataLayer = window.dataLayer || [];
  //       function gtag(){ dataLayer.push(arguments); }
  //       gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
  //     } }
  var OPTIONAL_SCRIPTS = [];

  // Tant qu'aucun outil optionnel n'est branché, le bandeau n'est PAS obligatoire
  // légalement (le panier en localStorage est exempté). On l'affiche quand même
  // pour être prêt ; passe à false pour le masquer jusqu'à l'ajout d'un tracker.
  var SHOW_WITHOUT_TRACKERS = true;

  // ---------------------------------------------------------------------
  function readConsent() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!data || typeof data.analytics !== 'boolean') return null;
      if (Date.now() - data.date > DURATION_MS) return null; // expiré
      return data;
    } catch (e) { return null; }
  }

  function saveConsent(analytics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: analytics, date: Date.now() }));
    } catch (e) { /* stockage indisponible : on ne bloque pas le site */ }
  }

  var scriptsLoaded = false;
  function loadOptionalScripts() {
    if (scriptsLoaded) return;
    scriptsLoaded = true;
    OPTIONAL_SCRIPTS.forEach(function (conf) {
      var s = document.createElement('script');
      s.src = conf.src;
      s.async = true;
      if (conf.onload) s.onload = conf.onload;
      document.head.appendChild(s);
    });
  }

  function applyConsent(analytics) {
    if (analytics) {
      loadOptionalScripts();
    } else if (scriptsLoaded) {
      // Un script déjà chargé ne peut pas être déchargé proprement :
      // on recharge la page pour repartir sans tracker.
      window.location.reload();
    }
  }

  // ---- Styles (sobre, noir & blanc, comme le reste du site) ----
  var css = '' +
    '#nfc-cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:560px;margin:0 auto;' +
    'background:#fff;color:#111;border:1px solid #111;padding:22px 24px;box-shadow:0 10px 40px rgba(0,0,0,.18);' +
    'font-family:"Montserrat",Arial,sans-serif;font-size:.85rem;line-height:1.55}' +
    '#nfc-cookie-banner h2{margin:0 0 8px;font-family:"Cinzel",Georgia,serif;font-size:1.05rem;letter-spacing:.06em;font-weight:600}' +
    '#nfc-cookie-banner p{margin:0 0 14px;color:#333}' +
    '#nfc-cookie-banner a{color:#111;text-decoration:underline}' +
    '#nfc-cookie-banner .nfc-cookie-actions{display:flex;gap:10px;flex-wrap:wrap}' +
    '#nfc-cookie-banner button{flex:1 1 140px;cursor:pointer;padding:12px 16px;font:inherit;font-weight:600;' +
    'letter-spacing:.05em;text-transform:uppercase;font-size:.75rem;border:1px solid #111;transition:background .2s,color .2s}' +
    '#nfc-cookie-banner button.nfc-accept{background:#111;color:#fff}' +
    '#nfc-cookie-banner button.nfc-refuse{background:#fff;color:#111}' +
    '#nfc-cookie-banner button:hover,#nfc-cookie-banner button:focus-visible{background:#444;color:#fff}' +
    'a.nfc-cookie-settings{cursor:pointer}' +
    '@media(max-width:480px){#nfc-cookie-banner{left:8px;right:8px;bottom:8px;padding:18px}}';

  function injectStyles() {
    if (document.getElementById('nfc-cookie-styles')) return;
    var st = document.createElement('style');
    st.id = 'nfc-cookie-styles';
    st.textContent = css;
    document.head.appendChild(st);
  }

  // ---- Bandeau ----
  function closeBanner() {
    var b = document.getElementById('nfc-cookie-banner');
    if (b) b.remove();
  }

  function openBanner() {
    if (document.getElementById('nfc-cookie-banner')) return;
    injectStyles();

    var b = document.createElement('div');
    b.id = 'nfc-cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-live', 'polite');
    b.setAttribute('aria-label', 'Gestion des cookies');
    b.innerHTML =
      '<h2>Vos cookies</h2>' +
      '<p>Ce site utilise uniquement le stockage nécessaire à son fonctionnement (panier). ' +
      'Avec votre accord, nous pourrons aussi mesurer l\'audience pour améliorer le site. ' +
      'Vous pouvez changer d\'avis à tout moment. ' +
      '<a href="mentions-legales.html#cookies">En savoir plus</a></p>' +
      '<div class="nfc-cookie-actions">' +
      '<button type="button" class="nfc-refuse">Tout refuser</button>' +
      '<button type="button" class="nfc-accept">Tout accepter</button>' +
      '</div>';

    b.querySelector('.nfc-accept').addEventListener('click', function () {
      saveConsent(true); applyConsent(true); closeBanner();
    });
    b.querySelector('.nfc-refuse').addEventListener('click', function () {
      saveConsent(false); applyConsent(false); closeBanner();
    });

    document.body.appendChild(b);
  }

  // ---- Lien « Gérer mes cookies » ajouté automatiquement au footer ----
  function addFooterLink() {
    var footer = document.querySelector('footer');
    if (!footer || footer.querySelector('.nfc-cookie-settings')) return;
    var a = document.createElement('a');
    a.href = '#';
    a.className = 'nfc-cookie-settings';
    a.textContent = 'Gérer mes cookies';
    a.style.cssText = 'color:inherit;text-decoration:underline;margin-left:12px;';
    a.addEventListener('click', function (e) { e.preventDefault(); openBanner(); });
    footer.appendChild(document.createTextNode(' · '));
    footer.appendChild(a);
  }

  // API publique (utile pour d'autres scripts du site)
  window.NFCConsent = {
    hasAnalytics: function () { var c = readConsent(); return !!(c && c.analytics); },
    open: openBanner
  };

  function init() {
    if (!OPTIONAL_SCRIPTS.length && !SHOW_WITHOUT_TRACKERS) return;
    addFooterLink();
    var consent = readConsent();
    if (consent === null) {
      openBanner();               // aucun choix valide → on demande
    } else if (consent.analytics) {
      loadOptionalScripts();      // déjà accepté → on charge les outils optionnels
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();