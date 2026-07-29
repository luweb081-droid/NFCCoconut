document.addEventListener('DOMContentLoaded', () => {
    // Éléments pour le Panier & Menu (Drawer)
    const drawerOverlay = document.getElementById('drawerOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartBtn = document.getElementById('cartBtn');
    const menuBtn = document.getElementById('menuBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');

    // Éléments pour la Recherche Overlay
    const searchOverlay = document.getElementById('searchOverlay');
    const searchBtn = document.getElementById('searchBtn');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchInput = document.getElementById('searchInput');

    // Éléments pour la Vidéo
    const video = document.getElementById('bgVideo');
    const togglePlayBtn = document.getElementById('togglePlayBtn');
    const playIcon = document.getElementById('playIcon');
    const playStateText = document.getElementById('playStateText');
    const toggleMuteBtn = document.getElementById('toggleMuteBtn');
    const muteIcon = document.getElementById('muteIcon');

    // --- RECHERCHE OVERLAY & FILTRAGE ---
    function toggleSearch() {
        if (!searchOverlay) return;
        searchOverlay.classList.toggle('active');
        if (searchOverlay.classList.contains('active') && searchInput) {
            searchInput.focus();
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', toggleSearch);
    if (closeSearchBtn) closeSearchBtn.addEventListener('click', toggleSearch);

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // --- DRAWER (PANIER / MENU) ---
    function openDrawer() {
        if (drawerOverlay && cartDrawer) {
            drawerOverlay.classList.add('active');
            cartDrawer.classList.add('active');
        }
    }

    function closeDrawer() {
        if (drawerOverlay && cartDrawer) {
            drawerOverlay.classList.remove('active');
            cartDrawer.classList.remove('active');
        }
    }

    if (cartBtn) cartBtn.addEventListener('click', openDrawer);
    if (menuBtn) menuBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // --- CONTRÔLES VIDÉO ---
    if (togglePlayBtn && video) {
        togglePlayBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                if (playIcon) playIcon.className = 'fa-solid fa-pause';
                if (playStateText) playStateText.innerText = 'PAUSE';
            } else {
                video.pause();
                if (playIcon) playIcon.className = 'fa-solid fa-play';
                if (playStateText) playStateText.innerText = 'PLAY';
            }
        });
    }

    if (toggleMuteBtn && video) {
        toggleMuteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (muteIcon) {
                muteIcon.className = video.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
            }
        });
    }

    // --- CARROUSEL PACKS ---
    const track = document.getElementById('packsCarouselTrack');
    const prevBtn = document.getElementById('prevPackBtn');
    const nextBtn = document.getElementById('nextPackBtn');

    if (track) {
        const getScrollAmount = () => {
            const firstCard = track.querySelector('.pack-card');
            if (!firstCard) return 345;
            const cardWidth = firstCard.getBoundingClientRect().width;
            return cardWidth + 25; // Largeur carte + 25px de gap
        };

        const autoScrollDelay = 3000;
        let autoScrollInterval = null;

        const scrollNext = () => {
            const scrollAmount = getScrollAmount();
            if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 10) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        const scrollPrev = () => {
            const scrollAmount = getScrollAmount();
            if (track.scrollLeft <= 0) {
                track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        };

        const startAutoScroll = () => {
            if (!autoScrollInterval) {
                autoScrollInterval = setInterval(scrollNext, autoScrollDelay);
            }
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        };

        const resetTimer = () => {
            stopAutoScroll();
            startAutoScroll();
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                scrollNext();
                resetTimer();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                scrollPrev();
                resetTimer();
            });
        }

        track.addEventListener('mouseenter', stopAutoScroll);
        track.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll();
    }
});

// --- GESTION DU PANIER ---
let cart = [];

function addToCart(title, price, imgSrc) {
    const existingIndex = cart.findIndex(item => item.title === title);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ title, price, imgSrc, quantity: 1 });
    }

    updateCartUI();
    openCartDrawer();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartCountBtn = document.querySelector('#cartBtn span');
    const emptyMsg = document.querySelector('.drawer-empty-msg');
    const checkoutBtn = document.querySelector('.btn-checkout');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBtn) cartCountBtn.textContent = `(${totalItems})`;

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (checkoutBtn) {
        checkoutBtn.textContent = `Commander (${totalPrice.toFixed(2).replace('.', ',')} €)`;
    }

    let container = document.querySelector('.cart-items-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'cart-items-container';
        if (emptyMsg && emptyMsg.parentNode) {
            emptyMsg.parentNode.insertBefore(container, emptyMsg);
        }
    }

    if (cart.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'block';
        container.innerHTML = '';
    } else {
        if (emptyMsg) emptyMsg.style.display = 'none';
        container.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.imgSrc}" alt="${item.title}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.quantity} x ${item.price.toFixed(2).replace('.', ',')} €</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `).join('');
    }
}

function openCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('drawerOverlay');
    if (drawer && overlay) {
        drawer.classList.add('active');
        overlay.classList.add('active');
    }
}

// --- FONCTION DE FILTRAGE DES PRODUITS ---
function filterProducts() {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const filter = input.value.toLowerCase().trim();
    const products = document.querySelectorAll('.product-item');
    const productsGrid = document.querySelector('.products-grid');
    let hasResults = false;

    products.forEach(product => {
        const titleElement = product.querySelector('.product-title');
        
        if (titleElement) {
            const titleText = titleElement.textContent || titleElement.innerText;
            
            if (titleText.toLowerCase().includes(filter)) {
                product.style.display = "";
                hasResults = true;
            } else {
                product.style.display = "none";
            }
        }
    });

    let noResultMsg = document.getElementById('noResultsMessage');
    if (!hasResults && filter !== "") {
        if (!noResultMsg && productsGrid) {
            noResultMsg = document.createElement('p');
            noResultMsg.id = 'noResultsMessage';
            noResultMsg.style.textAlign = 'center';
            noResultMsg.style.padding = '30px 10px';
            noResultMsg.style.gridColumn = '1 / -1';
            noResultMsg.style.width = '100%';
            noResultMsg.textContent = 'Aucun produit ne correspond à votre recherche.';
            productsGrid.appendChild(noResultMsg);
        }
    } else if (noResultMsg) {
        noResultMsg.remove();
    }
}