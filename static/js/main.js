/*
 * Source unique du catalogue. Pour ajouter ou modifier un article, ne changer
 * que ce tableau : les cartes, la recherche et les fiches produit se mettent
 * automatiquement à jour.
 *
 * IMPORTANT : renseigne `shopifyVariantId` pour chaque produit une fois que
 * tu l'as créé dans l'admin Shopify (format 'gid://shopify/ProductVariant/XXXXXXXX').
 * Tant que c'est null, le produit peut être ajouté au panier local mais ne
 * sera pas envoyé au checkout Shopify.
 *
 * Le champ `soldOut` défini ici sert de valeur de secours (affichage immédiat
 * au chargement). Pour les produits qui ont un `shopifyVariantId`, ce statut
 * est ensuite automatiquement écrasé par le vrai stock Shopify via
 * syncStockFromShopify() une fois la page chargée.
 *
 * Tous les produits de catégorie 'streetwear' sont considérés comme faisant
 * partie du "Drop" à venir : ils affichent un bouton verrouillé avec un
 * compte à rebours (identique à celui de la barre de navigation) au lieu du
 * bouton "Ajouter au panier", tant que la date de lancement (voir
 * startLaunchCountdown) n'est pas atteinte.
 */
const PRODUCTS = [
  { 
    id: 'plaque-google-black', 
    category: 'business', 
    name: 'Plaque NFC avis Google BLACK', 
    price: 39.90, 
    oldPrice: 55.90, 
    images: ['static/images/Article1.png', 'static/images/Article1bisbis.png'], 
    description: 'Une plaque élégante qui permet à vos clients de laisser un avis Google en un simple geste.', 
    tags: ['google', 'avis', 'plaque', 'nfc', 'business'],
    features: ['Rien a configurer', 'Boost vos avis', 'Plaque robuste'],
    shopifyVariantId: 'gid://shopify/ProductVariant/54222107246935'
  },
  { 
    id: 'presentoir-google-black', 
    category: 'business', 
    name: 'Présentoir Avis Google BLACK', 
    price: 39.90, 
    oldPrice: 47.90, 
    images: ['static/images/Article3bis.png', 'static/images/Article3.png'], 
    description: 'Présentoir NFC compact pour recueillir davantage d’avis dans votre établissement.', 
    tags: ['google', 'avis', 'présentoir', 'nfc'],
    features: ['Format compact de comptoir', 'Technologie NFC & QR Code', 'Paiement unique sans abonnement'],
    shopifyVariantId: 'gid://shopify/ProductVariant/54222223540567'
  },
  { 
    id: 'plaque-instagram', 
    category: 'business', 
    name: 'Plaque de Comptoir INSTAGRAM', 
    price: 39.90, 
    oldPrice: 54.90, 
    images: ['static/images/Article4bis.png'], 
    description: 'Développez votre communauté Instagram : un contact suffit pour accéder à votre profil.', 
    tags: ['instagram', 'plaque', 'comptoir', 'nfc'],
    features: ['Augmentez vos abonnés', 'Lien modifiable à tout moment', 'Design élégant et moderne'],
    shopifyVariantId: 'gid://shopify/ProductVariant/54222239498583'
  },
  { 
    id: 'plaque-ronde-white', 
    category: 'business', 
    name: 'Plaque NFC Avis Google Ronde WHITE', 
    price: 39.90, 
    oldPrice: 47.90, 
    soldOut: true,
    images: ['static/images/Article5bis.png', 'static/images/Article5.png'], 
    description: 'Une plaque ronde blanche, sobre et prête à être configurée pour vos avis Google.', 
    tags: ['google', 'avis', 'plaque', 'ronde', 'blanche'],
    features: ['S\'intègre à toute décoration', 'Adhésif double face inclus', 'Fonctionne à vie sans batterie'],
    shopifyVariantId: 'gid://shopify/ProductVariant/54222309294423'
  },
  { 
    id: 'plaque-ronde-black', 
    category: 'business', 
    name: 'Plaque NFC Avis Google Ronde BLACK', 
    price: 39.90, 
    oldPrice: 47.90, 
    soldOut: true,
    images: ['static/images/Article7bis.png', 'static/images/Article7.png'], 
    description: 'Une finition noire premium pour inviter vos clients à laisser un avis en quelques secondes.', 
    tags: ['google', 'avis', 'plaque', 'ronde', 'noire'],
    features: ['Finition noire matte premium', 'Adhésif double face inclus', 'Fonctionne à vie sans batterie'],
    shopifyVariantId: 'gid://shopify/ProductVariant/54222325383511'
  },
  { 
    id: 'carte-visite', 
    category: 'business', 
    name: 'Carte de Visite NFC Personnalisée', 
    price: 29.90, 
    oldPrice: 39.90, 
    soldOut: true,
    images: ['static/images/carte.png'], 
    description: 'Partagez vos coordonnées, réseaux et liens essentiels avec une carte NFC personnalisée.', 
    tags: ['carte', 'visite', 'personnalisée', 'nfc'],
    features: ['Remplace vos cartes papier', 'Partage de profil ultra rapide', 'Format carte de crédit pratique'],
    shopifyVariantId: "gid://shopify/ProductVariant/54297861456215"
  },
  { 
    id: 'plaque-google-white', 
    category: 'business', 
    name: 'Plaque NFC avis Google WHITE', 
    price: 39.90, 
    oldPrice: 55.90, 
    images: ['static/images/Article8bis.png', 'static/images/Article1bisbis.png'], 
    description: 'Une plaque élégante qui permet à vos clients de laisser un avis Google en un simple geste.', 
    tags: ['google', 'avis', 'plaque', 'nfc', 'business'],
    features: ['Configuration par nos soins', 'Boost vos avis de +40%', 'Plaque en acrylique'],
    shopifyVariantId: 'gid://shopify/ProductVariant/54222332428631'
  },
  { 
    id: 'presentoir-google-white', 
    category: 'business', 
    name: 'Présentoir Avis Google WHITE', 
    price: 39.90, 
    oldPrice: 47.90, 
    images: ['static/images/Article.png'], 
    description: 'Présentoir NFC compact pour recueillir davantage d’avis dans votre établissement.', 
    tags: ['google', 'avis', 'présentoir', 'nfc'],
    features: ['Format compact de comptoir', 'Technologie NFC & QR Code', 'Paiement unique sans abonnement'],
    shopifyVariantId: 'gid://shopify/ProductVariant/54222343864663'
  },
  { 
    id: 'tshirt-streetwear-1', 
    category: 'streetwear', 
    name: 'T-shirt style Streetwear N°1', 
    price: 39.90, 
    oldPrice: 59.90, 
    images: ['static/images/tshirt2.png', 'static/images/tshirt2bis.png'], 
    description: 'T-shirt en coton lourd bio, pensé pour une coupe streetwear confortable et durable.', 
    tags: ['t-shirt', 'streetwear', 'coton', 'vêtement'],
    features: ['Coupe Oversized Boxy', '100% Coton lourd bio (300g/m²)', 'Imprimé localement en France'],
    shopifyVariantId: "gid://shopify/ProductVariant/54297832096087"
  },
  { 
    id: 'tshirt-streetwear-2', 
    category: 'streetwear', 
    name: 'T-Shirt style Streetwear N°2', 
    price: 39.90, 
    oldPrice: 59.90, 
    images: ['static/images/tshirt1.png', 'static/images/tshirt1bis.png','static/images/tshirt2bis2.png','static/images/tshirt2bis3.png'], 
    description: 'Coupe boxy streetwear avec un patch NFC discret intégré au bas du vêtement.', 
    tags: ['t-shirt', 'oversized', 'streetwear', 'nfc', 'vêtement'],
    features: ['Coupe Oversized Boxy', 'Patch NFC lavable intégré', 'Imprimé localement en France'],
    shopifyVariantId: "gid://shopify/ProductVariant/54297833242967"
  }, 
  { 
    id: 'tshirt-streetwear-3', 
    category: 'streetwear', 
    name: 'T-shirt style Streetwear N°3', 
    price: 39.90, 
    oldPrice: 59.90, 
    images: ['static/images/t-shirt3.png', 'static/images/tshirt3bis.png'], 
    description: 'T-shirt en coton lourd bio, pensé pour une coupe streetwear confortable et durable.', 
    tags: ['t-shirt', 'streetwear', 'coton', 'vêtement'],
    features: ['Coupe Oversized Boxy', '100% Coton lourd bio (300g/m²)', 'Série limitée exclusive'],
    shopifyVariantId: "gid://shopify/ProductVariant/54297836552535"
  },
  { 
    id: 'tshirt-streetwear-4', 
    category: 'streetwear', 
    name: 'T-shirt style Streetwear N°4', 
    price: 39.90, 
    oldPrice: 59.90, 
    images: ['static/images/tshirt4.png', 'static/images/tshirt4bis.png'], 
    description: 'T-shirt en coton lourd bio, pensé pour une coupe streetwear confortable et durable.', 
    tags: ['t-shirt', 'streetwear', 'coton', 'vêtement'],
    features: ['Coupe Oversized Boxy', '100% Coton lourd bio (300g/m²)', 'Imprimé localement en France'],
    shopifyVariantId: "gid://shopify/ProductVariant/54297837306199"
  },
  { 
    id: 'poster-drop-00-N°1', 
    category: 'streetwear', 
    name: 'Affiche — Drop 00 (Art Print)', 
    price: 24.90, 
    oldPrice: 39.00, 
    images: ['static/images/Vraiposter1.png'], 
    description: 'Affiche exclusive Drop 00 imprimée sur un papier mat haute densité.', 
    tags: ['poster', 'affiche', 'art', 'streetwear', 'decoration'],
    features: ['Format A3 (29.7 x 42 cm)', 'Papier mat haute densité', 'Édition limitée exclusive'],
    shopifyVariantId: "gid://shopify/ProductVariant/54296700584279"
  },
  { 
    id: 'poster-drop-00-N°2', 
    category: 'streetwear', 
    name: 'Affiche — Drop 00 (Art Print)', 
    price: 24.90, 
    oldPrice: 39.00, 
    images: ['static/images/poster2.png'], 
    description: 'Plongez dans l’univers visuel de NFC Coconut avec cette affiche collector.', 
    tags: ['poster', 'affiche', 'art', 'streetwear', 'soundwave'],
    features: ['Format A3 (29.7 x 42 cm)', 'Papier mat haute densité', 'Édition limitée exclusive'],
    shopifyVariantId: "gid://shopify/ProductVariant/54297815089495"
  },
  { 
    id: 'poster-drop-00-N°3', 
    category: 'streetwear', 
    name: 'Affiche — Drop 00 (Art Print)', 
    price: 24.90, 
    oldPrice: 39.00, 
    images: ['static/images/poster3.png'], 
    description: 'Plongez dans l’univers visuel de NFC Coconut avec cette affiche collector.', 
    tags: ['poster', 'affiche', 'art', 'streetwear', 'soundwave'],
    features: ['Format A3 (29.7 x 42 cm)', 'Papier mat haute densité', 'Édition limitée exclusive'],
    shopifyVariantId: "gid://shopify/ProductVariant/54297815548247"
  },
  {
    id: 'guide-premium',
    shopifyVariant: '', // ← tu mettras l'ID Shopify
    category: 'digital',
    name: '🎁 Guide Premium NFC Coconut',
    price: 0,
    images: ['static/images/pdf.png'], // ou une image de ton choix
    description: 'Guide offert avec chaque commande de produits NFC.',
    tags: ['guide'],
    features: ['Offert'],
    shopifyVariantId: "gid://shopify/ProductVariant/54349178765655"


},
];

// Ajout de la propriété `showInDesktop` (true par défaut, false pour masquer de la barre principale)
const NAV_LINKS = [
  { label: 'Accueil', href: 'index.html', showInDesktop: true },
  { label: 'Catalogue', href: 'catalogue.html', showInDesktop: true },
  { label: 'Streetwear', href: 'streetwear.html', showInDesktop: true },  
  { label: 'FAQ', href: 'faq.html', showInDesktop: true }, 
  { label: 'Développement Web', href: 'devweb.html', showInDesktop: false },

  { label: 'Contact', href: 'contact.html', showInDesktop: true },
  // Exemple de page visible uniquement dans le menu déroulant mobile :
  
];

const euro = value => `${value.toFixed(2).replace('.', ',')} €`;
const escapeHtml = text => String(text).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const productUrl = product => `produit.html?id=${encodeURIComponent(product.id)}`;

// Bouton d'action d'une carte/fiche produit : pour le streetwear (Drop pas
// encore lancé), un bouton verrouillé avec le compte à rebours remplace
// systématiquement "Ajouter au panier" / "Épuisé".
function productActionButton(product) {
  const isSoldOut = product.soldOut === true;

  if (product.category === 'streetwear') {
    return `<button class="btn-add-cart btn-locked" type="button" disabled aria-label="Disponible au lancement du Drop">
      <i class="fa-solid fa-lock"></i>
      <span class="js-launch-timer">--j --h --m --s</span>
    </button>`;
  }

  return isSoldOut
    ? `<button class="btn-add-cart disabled" type="button" disabled>Épuisé</button>`
    : `<button class="btn-add-cart" type="button" data-add="${product.id}">Ajouter au panier</button>`;
}

function productCard(product) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  const isSoldOut = product.soldOut === true;
  const hasLowStock = !isSoldOut && Number.isInteger(product.stockQty) && product.stockQty <= 10;
  const lowStockBadge = hasLowStock ? `<span class="badge-low-stock">Plus que ${product.stockQty} en stock</span>` : '';

  return `<article class="product-item product-item--${product.category}${isSoldOut ? ' is-sold-out' : ''}" data-product-id="${product.id}">
    <a class="product-link" href="${productUrl(product)}" aria-label="Voir ${escapeHtml(product.name)}">
      <div class="product-img-wrapper">
        <img src="${product.images[0]}" alt="${escapeHtml(product.name)}">
        ${isSoldOut ? '<span class="badge-sold-out">Sold Out</span>' : ''}
      </div>
      <h3 class="product-title">${escapeHtml(product.name)}</h3>
    </a>
    <div class="product-price-container">
      <span class="product-price">${euro(product.price)}</span>
      ${product.oldPrice ? `<span class="product-price-old">${euro(product.oldPrice)}</span><span class="badge-discount">-${discount}%</span>` : ''}
      ${lowStockBadge}
    </div>
    <div class="product-actions">
      <a class="btn-details" href="${productUrl(product)}">Voir le produit</a>
      ${productActionButton(product)}
    </div>
  </article>`;
}

function currentFile() {
  const name = window.location.pathname.split('/').pop();
  return name || 'index.html';
}

function renderNavigation() {
  const file = currentFile();
  
  // Génère les liens de la barre de bureau (uniquement ceux avec showInDesktop: true)
  const desktopLinks = NAV_LINKS
    .filter(link => link.showInDesktop)
    .map(({ label, href }) => `<a href="${href}"${href === file ? ' class="active" aria-current="page"' : ''}>${label}</a>`)
    .join('');
  
  document.querySelectorAll('.top-header').forEach(header => {
    header.innerHTML = `
      <div class="header-left" style="display: flex; align-items: center; gap: 15px;">
        <button id="menuBtn" class="mobile-only-btn" aria-label="Ouvrir le menu"><i class="fa-solid fa-bars"></i></button>
        <nav class="desktop-nav">${desktopLinks}</nav>
        <button id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i><span class="desktop-only">Rechercher</span></button>
      </div>
      <a href="index.html" class="brand-logo" aria-label="NFC Coconut"><img src="static/images/nfccoconut.png" alt="NFC Coconut"></a>
      <div class="header-right" style="display: flex; align-items: center; gap: 15px;">
        <div id="launchCountdown" class="mobile-countdown-wrapper" style="font-size: 0.85rem; font-weight: 600; white-space: nowrap; color: #555;">DROP 00 dans : <span id="timerValue" class="js-launch-timer" style="font-weight: 700;">--j --h --m --s</span></div>
        <a href="https://www.instagram.com/nfc_coconut/?utm_source=ig_web_button_share_sheet" target="_blank" aria-label="Notre page Instagram" class="header-icon-link" style="color: inherit; text-decoration: none; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; font-size: 1.2rem;">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <button id="cartBtn"><i class="fa-solid fa-bag-shopping"></i><span>(0)</span></button>
      </div>`;
  });
  
  // Génère tous les liens pour le menu déroulant mobile (hamburger)
  document.querySelectorAll('.mobile-nav').forEach(nav => { 
    nav.innerHTML = `<ul>${NAV_LINKS.map(({ label, href }) => `<li><a href="${href}"${href === file ? ' class="active"' : ''}>${label}</a></li>`).join('')}</ul>`; 
  });
}

function renderProductGrids() {
  const file = currentFile();
  const pageCategory = file === 'streetwear.html' ? 'streetwear' : 'business';
  const grids = [...document.querySelectorAll('.products-grid')];
  
  if (!grids.length || file === 'produit.html') return;
  
  const target = grids[0];
  const products = file === 'index.html' ? PRODUCTS.filter(p => p.category === 'business').slice(0, 6) : PRODUCTS.filter(p => p.category === pageCategory);
  const catalogLinkCard = file === 'index.html' ? `<article class="product-item view-catalog-card" aria-label="Voir le catalogue complet">
    <div class="catalog-link-icon"><i class="fa-solid fa-grid-2"></i></div>
    <h3>Toute la collection</h3>
    <p>Découvrez l'intégralité de nos solutions et supports connectés.</p>
    <a href="catalogue.html" class="btn-add-cart">Voir le catalogue complet <i class="fa-solid fa-arrow-right"></i></a>
  </article>` : '';
  
  target.innerHTML = products.map(productCard).join('') + catalogLinkCard;
  target.dataset.catalogGrid = 'true';
}

function renderProductPage() {
  const root = document.getElementById('productPage');
  if (!root) return;
  const id = new URLSearchParams(window.location.search).get('id');
  const product = PRODUCTS.find(item => item.id === id);
  
  if (!product) { 
    root.innerHTML = '<div class="page-title"><h1>Produit introuvable</h1><p>Ce produit n’existe pas ou n’est plus disponible.</p><a class="btn-details" href="catalogue.html">Retour au catalogue</a></div>'; 
    return; 
  }
  
  document.title = `${product.name} — NFC COCONUT`;

  const productFeatures = product.features || ['Prêt à l’emploi', 'Technologie NFC intégrée', 'Livraison suivie'];
  const featuresHtml = productFeatures.map(feature => `<li>${escapeHtml(feature)}</li>`).join('');
  const isSoldOut = product.soldOut === true;

  const hasStockInfo = !isSoldOut && Number.isInteger(product.stockQty);
  const isLowStock = hasStockInfo && product.stockQty <= 5;
  const stockText = hasStockInfo
    ? (product.stockQty > 5 ? 'En stock' : (product.stockQty > 0 ? `Plus que ${product.stockQty} en stock` : ''))
    : '';
  const stockInfoHtml = (hasStockInfo && stockText) ? `<p class="stock-info${isLowStock ? ' low' : ''}">${stockText}</p>` : '';

  root.innerHTML = `<a class="back-link" href="${product.category === 'streetwear' ? 'streetwear.html' : 'catalogue.html'}"><i class="fa-solid fa-arrow-left"></i> Retour</a>
  <section class="product-detail">
    <div class="product-gallery">
      <div class="product-img-wrapper" style="position: relative;">
        <img id="mainProductImage" src="${product.images[0]}" alt="${escapeHtml(product.name)}">
        ${isSoldOut ? '<span class="badge-sold-out">Sold Out</span>' : ''}
      </div>
      <div class="product-thumbnails">
        ${product.images.map((image, index) => `<button type="button" class="product-thumbnail${index === 0 ? ' active' : ''}" data-image="${image}" aria-label="Voir la photo ${index + 1}"><img src="${image}" alt=""></button>`).join('')}
      </div>
    </div>
    <div class="product-info">
      <p class="product-category">${product.category === 'streetwear' ? 'Streetwear' : 'NFC Business'}</p>
      <h1>${escapeHtml(product.name)}</h1>
      <div class="detail-price">${euro(product.price)}${product.oldPrice ? `<del>${euro(product.oldPrice)}</del>` : ''}</div>
      ${stockInfoHtml}
      <p class="product-description">${escapeHtml(product.description)}</p>
      
      <ul class="product-features">
        ${featuresHtml}
      </ul>
      
      ${productActionButton(product)}
    </div>
  </section>`;
}

function setupSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const opener = document.getElementById('searchBtn');
  const closer = document.getElementById('closeSearchBtn');
  
  if (!overlay || !input) return;
  
  let results = overlay.querySelector('.search-results');
  if (!results) { 
    results = document.createElement('div'); 
    results.className = 'search-results'; 
    overlay.append(results); 
  }
  
  const search = () => {
    const terms = input.value.toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/\s+/).filter(Boolean);
    const matches = PRODUCTS.filter(product => {
      const haystack = `${product.name} ${product.description} ${product.tags.join(' ')}`.toLocaleLowerCase('fr-FR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return terms.every(term => haystack.includes(term));
    });
    results.innerHTML = !terms.length ? '<p>Recherchez un produit, une matière ou un usage.</p>' : matches.length ? matches.map(p => `<a href="${productUrl(p)}"><img src="${p.images[0]}" alt=""><span>${escapeHtml(p.name)}<small>${euro(p.price)}</small></span></a>`).join('') : '<p>Aucun produit ne correspond à votre recherche.</p>';
  };
  
  const toggle = () => { 
    overlay.classList.toggle('active'); 
    if (overlay.classList.contains('active')) { input.focus(); search(); } 
  };
  
  opener?.addEventListener('click', toggle); 
  closer?.addEventListener('click', toggle); 
  input.addEventListener('input', search);
  window.filterProducts = search;
}

let cart = [];

// Infos commerce du client (nom + adresse), saisies dans le tiroir panier
// et envoyées à Shopify comme attributs de commande
let shopInfo = { name: '', address: '' };
try {
  shopInfo = { ...shopInfo, ...JSON.parse(localStorage.getItem('nfcCoconutShopInfo') || '{}') };
} catch (_) {
  /* Le site fonctionne aussi ouvert directement depuis un fichier. */
}

function saveShopInfo() {
  try {
    localStorage.setItem('nfcCoconutShopInfo', JSON.stringify(shopInfo));
  } catch (_) {
    /* Stockage indisponible : infos conservées pour la page en cours. */
  }
}

// ================= SHOPIFY =================
// Une fois tes produits créés dans l'admin Shopify, remplis :
//   1. SHOPIFY_DOMAIN (déjà fait)
//   2. SHOPIFY_STOREFRONT_TOKEN (Paramètres > Apps et canaux de vente > Développer
//      des apps > API Storefront, scopes unauthenticated_read_product_listings +
//      unauthenticated_write_carts)
//   3. Le champ shopifyVariantId de chaque produit dans PRODUCTS, tout en haut
//      de ce fichier (format 'gid://shopify/ProductVariant/XXXXXXXX')

const SHOPIFY_DOMAIN = "nfc-coconut.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = "fdf11aee476ae0be122f4679ebec2b64";
const SHOPIFY_API_VERSION = "2024-10";

async function shopifyFetch(query, variables = {}) {
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    throw new Error(`Shopify API a répondu avec le statut ${response.status}`);
  }

  const json = await response.json();
  if (json.errors) {
    console.error('Shopify API error:', json.errors);
    throw new Error('Erreur retournée par Shopify.');
  }
  return json.data;
}

async function createShopifyCheckout(cartItems, customerAttributes = {}) {
  const lines = cartItems
    .filter(item => item.shopifyVariantId)
    .map(item => ({ merchandiseId: item.shopifyVariantId, quantity: item.quantity }));

  const missing = cartItems.filter(item => !item.shopifyVariantId);
  if (missing.length) {
    console.warn('Produits sans shopifyVariantId, ignorés du checkout :', missing.map(i => i.name));
  }

  if (!lines.length) {
    alert("Ces produits ne sont pas encore configurés pour le paiement en ligne. Contacte-nous directement pour commander.");
    return;
  }

  // Transforme { 'Nom du commerce': 'Le Petit Café', ... } en tableau d'attributs Shopify
  const attributes = Object.entries(customerAttributes)
    .filter(([, value]) => value && value.trim() !== '')
    .map(([key, value]) => ({ key, value: value.trim() }));

  const mutation = `
    mutation cartCreate($lines: [CartLineInput!], $attributes: [AttributeInput!]) {
      cartCreate(input: { lines: $lines, attributes: $attributes }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }`;

  try {
    const data = await shopifyFetch(mutation, { lines, attributes });
    const result = data?.cartCreate;

    if (result?.userErrors?.length) {
      console.error('Shopify userErrors:', result.userErrors);
      alert("Impossible de créer le panier Shopify. Vérifie les identifiants de variante.");
      return;
    }

    if (result?.cart?.checkoutUrl) {
      window.location.href = result.cart.checkoutUrl;
    } else {
      alert("Erreur lors de la création du panier de paiement.");
    }
  } catch (error) {
    console.error('createShopifyCheckout error:', error);
    alert("Une erreur est survenue lors de la connexion à Shopify. Réessaie dans quelques instants.");
  }
}

// Synchronise le statut "Épuisé" des produits avec le vrai stock Shopify.
// Ne concerne que les produits qui ont un shopifyVariantId renseigné :
// les autres gardent leur valeur `soldOut` codée en dur dans PRODUCTS.
async function syncStockFromShopify() {
  const idsToCheck = [...new Set(PRODUCTS.filter(p => p.shopifyVariantId).map(p => p.shopifyVariantId))];
  if (!idsToCheck.length) return;

  const query = `
    query getVariantsStock($ids: [ID!]!) {
      nodes(ids: $ids) {
        ... on ProductVariant {
          id
          availableForSale
          quantityAvailable
        }
      }
    }`;

  try {
    const data = await shopifyFetch(query, { ids: idsToCheck });
    const stockMap = {};
    (data?.nodes || []).forEach(node => {
      if (node) stockMap[node.id] = node;
    });

    let changed = false;
    PRODUCTS.forEach(product => {
      if (product.shopifyVariantId && product.shopifyVariantId in stockMap) {
        const info = stockMap[product.shopifyVariantId];
        const nowSoldOut = !info.availableForSale;
        const nowStockQty = typeof info.quantityAvailable === 'number' ? info.quantityAvailable : null;
        if (product.soldOut !== nowSoldOut || product.stockQty !== nowStockQty) changed = true;
        product.soldOut = nowSoldOut;
        product.stockQty = nowStockQty;
      }
    });

    // Réaffiche dès qu'un statut OU une quantité a changé (y compris au tout
    // premier chargement, où stockQty passe de "inconnu" à sa vraie valeur)
    if (changed) {
      renderProductGrids();
      renderProductPage();
    }
  } catch (error) {
    console.error('syncStockFromShopify error:', error);
    // En cas d'échec réseau/API, on garde les valeurs soldOut définies en dur
  }
}

// ==========================================

try { 
  cart = JSON.parse(localStorage.getItem('nfcCoconutCart') || '[]'); 
} catch (_) { 
  /* Le site fonctionne aussi ouvert directement depuis un fichier. */ 
}

// Nettoyage : si un ancien panier contient le guide offert sans aucun produit
// NFC ("business") associé, on retire le guide (il ne doit accompagner que
// les commandes de produits NFC, jamais le streetwear seul).
(function pruneGiftIfIneligible() {
  const hasBusinessProduct = cart.some(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return p && p.category === 'business';
  });
  if (!hasBusinessProduct) {
    cart = cart.filter(item => item.id !== 'guide-premium');
  }
})();

function saveCart() { 
  try { 
    localStorage.setItem('nfcCoconutCart', JSON.stringify(cart)); 
  } catch (_) { 
    /* Stockage indisponible : panier conservé pour la page en cours. */ 
  } 
}

function updateCart() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('#cartBtn span').forEach(el => { el.textContent = `(${total})`; });
  
  const container = document.querySelector('.cart-items-container'); 
  const empty = document.querySelector('.drawer-empty-msg');
  
  if (container) {
    container.innerHTML = cart.map((item, index) => `<div class="cart-item"><img src="${item.image}" alt=""><div class="cart-item-details"><div class="cart-item-title">${escapeHtml(item.name)}</div><div class="cart-item-price">${item.quantity} × ${euro(item.price)}</div></div><button class="cart-item-remove" data-remove="${index}" aria-label="Retirer"><i class="fa-solid fa-xmark"></i></button></div>`).join('');
  }
  
  if (empty) empty.style.display = cart.length ? 'none' : 'block';

  // Réinjecte les infos commerce sauvegardées dans les champs, sans écraser
  // ce que le client est en train de taper
  const shopNameInput = document.getElementById('shopName');
  const shopAddressInput = document.getElementById('shopAddress');
  if (shopNameInput && document.activeElement !== shopNameInput) shopNameInput.value = shopInfo.name;
  if (shopAddressInput && document.activeElement !== shopAddressInput) shopAddressInput.value = shopInfo.address;
  
  document.querySelectorAll('.btn-checkout').forEach(button => { 
    button.textContent = `Commander (${euro(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))})`; 
  });
}

// ===== Autocomplétion d'adresse (API Adresse — gouvernement français) =====
// Gratuite, sans clé API. Utilisée pour fiabiliser la saisie de l'adresse
// du commerce dans le tiroir panier (champ #shopAddress).
function setupAddressAutocomplete() {
  let debounceTimer;
  let currentResults = [];

  const closeSuggestions = () => {
    const box = document.getElementById('shopAddressSuggestions');
    if (box) box.innerHTML = '';
  };

  document.addEventListener('input', event => {
    if (event.target.id !== 'shopAddress') return;

    const input = event.target;
    const box = document.getElementById('shopAddressSuggestions');
    if (!box) return;

    clearTimeout(debounceTimer);
    const query = input.value.trim();

    if (query.length < 3) { closeSuggestions(); return; }

    debounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        currentResults = data.features || [];

        box.innerHTML = currentResults.map((feature, index) =>
          `<div class="address-suggestion-item" data-index="${index}">${escapeHtml(feature.properties.label)}</div>`
        ).join('');
      } catch (error) {
        console.error('Erreur autocomplétion adresse :', error);
      }
    }, 300); // attend 300ms après la dernière frappe avant d'interroger l'API
  });

  document.addEventListener('click', event => {
    const item = event.target.closest('.address-suggestion-item');
    if (item) {
      const feature = currentResults[Number(item.dataset.index)];
      if (feature) {
        const input = document.getElementById('shopAddress');
        input.value = feature.properties.label;
        shopInfo.address = feature.properties.label;
        saveShopInfo();
      }
      closeSuggestions();
      return;
    }
    // Ferme la liste si on clique ailleurs sur la page
    if (!event.target.closest('.address-autocomplete-wrapper')) closeSuggestions();
  });
}

// ===== Tiroir PANIER (séparé du menu mobile) =====
function setupCartAndDrawer() {
  const overlay = document.getElementById('drawerOverlay'); 
  const drawer = document.getElementById('cartDrawer');
  
  if (drawer && !drawer.querySelector('.cart-items-container')) {
    const container = document.createElement('div');
    container.className = 'cart-items-container';
    drawer.querySelector('.drawer-empty-msg')?.before(container);
  }

  // Crée les champs "Nom du commerce" / "Adresse de la boutique" dans le drawer
  // s'ils n'existent pas déjà dans le HTML (voir note plus bas si tu préfères
  // les coder toi-même directement dans le HTML). L'adresse est associée à un
  // conteneur "wrapper" positionné en relatif afin d'y ancrer la liste de
  // suggestions d'autocomplétion.
  if (drawer && !drawer.querySelector('.cart-shop-info')) {
    const shopInfoBlock = document.createElement('div');
    shopInfoBlock.className = 'cart-shop-info';
    shopInfoBlock.innerHTML = `
      <label for="shopName">Nom de votre commerce</label>
      <input type="text" id="shopName" placeholder="Ex : Le Petit Café">
      <label for="shopAddress">Adresse de votre boutique</label>
      <div class="address-autocomplete-wrapper" style="position: relative;">
        <input type="text" id="shopAddress" placeholder="Ex : 12 rue des Fleurs, 81000 Albi" autocomplete="off">
        <div id="shopAddressSuggestions" class="address-suggestions"></div>
      </div>
    `;
    const checkoutBtn = drawer.querySelector('.btn-checkout');
    (checkoutBtn ? checkoutBtn.before(shopInfoBlock) : drawer.appendChild(shopInfoBlock));
  }
  
  const close = () => { overlay?.classList.remove('active'); drawer?.classList.remove('active'); };
  const open = () => { overlay?.classList.add('active'); drawer?.classList.add('active'); };
  
  // Le panier s'ouvre UNIQUEMENT via le bouton panier, plus via le hamburger
  document.getElementById('cartBtn')?.addEventListener('click', open); 
  document.getElementById('closeDrawerBtn')?.addEventListener('click', close); 
  overlay?.addEventListener('click', close);

  // Sauvegarde en direct les infos commerce à chaque frappe
  document.addEventListener('input', event => {
    if (event.target.id === 'shopName') { shopInfo.name = event.target.value; saveShopInfo(); }
    if (event.target.id === 'shopAddress') { shopInfo.address = event.target.value; saveShopInfo(); }
  });
  
  document.addEventListener('click', event => { 
    const add = event.target.closest('[data-add]'); 
    const remove = event.target.closest('[data-remove]'); 
    const checkout = event.target.closest('.btn-checkout');
    
    if (add) { 
      const product = PRODUCTS.find(p => p.id === add.dataset.add); 
      if (!product || product.soldOut) return; 
      
      const line = cart.find(item => item.id === product.id);

      if (line) {
      line.quantity++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
        shopifyVariantId: product.shopifyVariantId   // ← ligne à ajouter
      });
    }

      // ---------- Cadeau automatique (uniquement pour les produits NFC/business) ----------
      // Le guide premium n'est offert qu'à l'achat d'un produit NFC. Il ne doit
      // jamais être ajouté pour un article streetwear.
      if (product.category === 'business') {
        const gift = PRODUCTS.find(p => p.id === "guide-premium");
        if (gift && !cart.find(item => item.id === gift.id)) {
          cart.push({
            id: gift.id,
            name: gift.name,
            price: 0,
            image: gift.images[0],
            quantity: 1,
            shopifyVariantId: gift.shopifyVariantId   // ← ligne à ajouter
          });
        }
      }
      saveCart(); 
      updateCart(); 
      open(); 
    } 
    
    if (remove) { 
      const index = Number(remove.dataset.remove);

      if (cart[index].id === "guide-premium") {
        return;
      }

      cart.splice(index, 1);

      // Si plus aucun produit NFC ("business") n'est présent dans le panier,
      // le guide offert n'a plus lieu d'être : on le retire (sans toucher
      // aux éventuels articles streetwear encore présents).
      const hasBusinessProduct = cart.some(item => {
        const p = PRODUCTS.find(pr => pr.id === item.id);
        return p && p.category === 'business';
      });
      if (!hasBusinessProduct) {
        cart = cart.filter(item => item.id !== 'guide-premium');
      }

      saveCart(); 
      updateCart(); 
    }

    if (checkout) {
      if (!cart.length) return;

      const shopNameInput = document.getElementById('shopName');
      const shopAddressInput = document.getElementById('shopAddress');
      const name = (shopNameInput?.value || shopInfo.name || '').trim();
      const address = (shopAddressInput?.value || shopInfo.address || '').trim();

      if (!name || !address) {
        alert("Merci de renseigner le nom de votre commerce et l'adresse de votre boutique avant de commander.");
        (name ? shopAddressInput : shopNameInput)?.focus();
        return;
      }

      shopInfo = { name, address };
      saveShopInfo();

      checkout.disabled = true;
      const originalText = checkout.textContent;
      checkout.textContent = 'Redirection en cours...';
      createShopifyCheckout(cart, {
        'Nom du commerce': name,
        'Adresse de la boutique': address
      }).finally(() => {
        checkout.disabled = false;
        checkout.textContent = originalText;
      });
    }
  });
  
  updateCart();
}

// ===== Tiroir MENU MOBILE (totalement séparé du panier) =====
function setupMobileMenu() {
  let overlay = document.getElementById('mobileMenuOverlay');
  let drawer = document.getElementById('mobileMenuDrawer');

  // Crée le tiroir dédié au menu s'il n'existe pas déjà. On ne touche pas au
  // HTML existant : tout est injecté ici, une seule fois.
  if (!drawer) {
    overlay = document.createElement('div');
    overlay.id = 'mobileMenuOverlay';
    overlay.className = 'drawer-overlay';

    drawer = document.createElement('div');
    drawer.id = 'mobileMenuDrawer';
    drawer.className = 'drawer mobile-menu-drawer';
    drawer.innerHTML = `
      <div class="drawer-header">
        <h3>Menu</h3>
        <button id="closeMobileMenuBtn" class="drawer-close" aria-label="Fermer le menu"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `;

    document.body.append(overlay, drawer);
  }

  // Déplace le(s) bloc(s) .mobile-nav (déjà remplis par renderNavigation)
  // à l'intérieur de ce tiroir dédié, pour qu'ils ne soient plus mélangés
  // avec le contenu du panier.
  document.querySelectorAll('.mobile-nav').forEach(nav => {
    if (!drawer.contains(nav)) drawer.appendChild(nav);
  });

  const close = () => { overlay.classList.remove('active'); drawer.classList.remove('active'); };
  const open = () => { overlay.classList.add('active'); drawer.classList.add('active'); };

  // Délégation d'événements : fonctionne même si le header est régénéré
  document.addEventListener('click', event => {
    if (event.target.closest('#menuBtn')) { open(); }
    if (event.target.closest('#closeMobileMenuBtn')) { close(); }
    if (event.target === overlay) { close(); }
  });
}

function setupGallery() { 
  document.addEventListener('click', event => { 
    const button = event.target.closest('[data-image]'); 
    if (!button) return; 
    document.getElementById('mainProductImage').src = button.dataset.image; 
    document.querySelectorAll('.product-thumbnail').forEach(item => item.classList.toggle('active', item === button)); 
  }); 
}

// Compte à rebours du lancement/Drop : met à jour TOUS les éléments portant
// la classe .js-launch-timer (barre de navigation + boutons "verrouillés"
// des produits streetwear), en une seule boucle, à chaque seconde.
function startLaunchCountdown() {
  const targetDate = new Date('2026-09-01T00:00:00').getTime();

  const tick = () => {
    const timerEls = document.querySelectorAll('.js-launch-timer');
    if (!timerEls.length) return;

    const now = new Date().getTime();
    const distance = targetDate - now;

    let text;
    if (distance < 0) {
      text = "C'est ouvert !";
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      text = `${days}j ${hours}h ${minutes}m ${seconds}s`;
    }

    timerEls.forEach(el => { el.textContent = text; });
  };

  tick();
  setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', () => { 
  renderNavigation(); 
  renderProductGrids(); 
  renderProductPage(); 
  setupSearch(); 
  setupCartAndDrawer(); 
  setupMobileMenu();
  setupGallery(); 
  startLaunchCountdown();
  setupAddressAutocomplete(); // Autocomplétion d'adresse (API Adresse gouv.fr)
  syncStockFromShopify(); // Met à jour le statut "Épuisé" avec le vrai stock Shopify
});