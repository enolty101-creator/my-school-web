const WHATSAPP_NUMBER = ""; // Add the store number with country code, without +, spaces, or punctuation.
const CURRENCY = "USD"; // Set the store's currency before publishing.
const locale = "en-US";

// Replace this starter catalog with verified stock, prices, colors, and specifications before publishing.
const products = [
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    category: "Smartphones",
    badge: "Customer favorite",
    description: "A18 Pro chip · Pro camera system · Titanium design",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=82",
    alt: "Modern smartphone shown from the back",
    specs: "A18 Pro chip, 6.3-inch display, 48MP Pro camera system, titanium design",
    colors: [{ name: "Natural Titanium", hex: "#b8b3a9" }, { name: "Desert Titanium", hex: "#c7a78d" }, { name: "Black Titanium", hex: "#343638" }],
    variants: [{ storage: "128GB", price: 999, compareAt: 1099 }, { storage: "256GB", price: 1099, compareAt: 1199 }, { storage: "512GB", price: 1299, compareAt: 1399 }]
  },
  {
    id: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra",
    category: "Smartphones",
    badge: "Just arrived",
    description: "Galaxy AI · 200MP camera · Built-in S Pen",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=82",
    alt: "Premium Galaxy smartphone",
    specs: "6.9-inch display, 200MP camera, S Pen, Galaxy AI",
    colors: [{ name: "Titanium Silverblue", hex: "#9da9b4" }, { name: "Titanium Black", hex: "#333638" }, { name: "Titanium Gray", hex: "#aaa9a5" }],
    variants: [{ storage: "256GB", price: 1199, compareAt: 1299 }, { storage: "512GB", price: 1319, compareAt: 1419 }, { storage: "1TB", price: 1559, compareAt: 1659 }]
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    category: "Smartphones",
    badge: "Everyday favorite",
    description: "A18 chip · Camera Control · All-day battery",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=900&q=82",
    alt: "Smartphone with a vibrant, colorful finish",
    specs: "A18 chip, 6.1-inch display, 48MP Fusion camera, Camera Control",
    colors: [{ name: "Ultramarine", hex: "#485dba" }, { name: "Pink", hex: "#e8a6af" }, { name: "Black", hex: "#343638" }],
    variants: [{ storage: "128GB", price: 799, compareAt: 899 }, { storage: "256GB", price: 899, compareAt: 999 }, { storage: "512GB", price: 1099, compareAt: 1199 }]
  },
  {
    id: "ipad-air",
    name: "iPad Air",
    category: "Tablets",
    badge: "Versatile pick",
    description: "M3 chip · Liquid Retina display · Apple Pencil ready",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=82",
    alt: "Tablet with a bright, clear screen",
    specs: "M3 chip, 11-inch Liquid Retina display, Apple Pencil Pro support",
    colors: [{ name: "Blue", hex: "#8aabcf" }, { name: "Starlight", hex: "#e0d9c9" }, { name: "Space Gray", hex: "#777a7b" }],
    variants: [{ storage: "128GB", price: 599, compareAt: 649 }, { storage: "256GB", price: 699, compareAt: 749 }, { storage: "512GB", price: 899, compareAt: 949 }]
  },
  {
    id: "macbook-air",
    name: "MacBook Air 13”",
    category: "Laptops",
    badge: "Light & lovely",
    description: "M4 chip · Up to 18-hour battery · Featherlight",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=82",
    alt: "Slim silver laptop open on a desk",
    specs: "M4 chip, 13.6-inch Liquid Retina display, up to 18 hours battery",
    colors: [{ name: "Sky Blue", hex: "#9caebc" }, { name: "Silver", hex: "#c8c9c9" }, { name: "Midnight", hex: "#40444b" }],
    variants: [{ storage: "256GB", price: 1099, compareAt: 1199 }, { storage: "512GB", price: 1299, compareAt: 1399 }, { storage: "1TB", price: 1499, compareAt: 1599 }]
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    category: "Audio",
    badge: "Sound good?",
    description: "Active Noise Cancellation · Personalized Spatial Audio",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=900&q=82",
    alt: "Wireless earbuds and charging case",
    specs: "Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio",
    colors: [{ name: "White", hex: "#f4f3ef" }],
    variants: [{ storage: "USB-C case", price: 249, compareAt: 279 }]
  }
];

const selectedVariants = new Map(products.map(product => [product.id, { storage: product.variants[0].storage, color: product.colors[0].name }]));
const comparedProducts = new Set();
const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const sortSelect = document.querySelector("#product-sort");
const compareBar = document.querySelector("#compare-bar");
const compareDialog = document.querySelector("#compare-dialog");
const compareTable = document.querySelector("#compare-table");
const toast = document.querySelector("#toast");
const themeToggle = document.querySelector(".theme-toggle");
let activeCategory = "All";
let toastTimer;

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeToggle.querySelector("span").textContent = `${isDark ? "Light" : "Dark"} mode`;
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#171c23" : "#f7f8fa";
}

const savedTheme = localStorage.getItem("arab-gadgets-theme");
setTheme(savedTheme === "dark" ? "dark" : "light");
themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("arab-gadgets-theme", theme);
  setTheme(theme);
});

function formatPrice(amount) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: CURRENCY, maximumFractionDigits: 0 }).format(amount);
}

function currentVariant(product) {
  const selected = selectedVariants.get(product.id);
  return product.variants.find(variant => variant.storage === selected.storage) || product.variants[0];
}

function safeText(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getVisibleProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = !query || [product.name, product.category, product.description, product.specs].some(value => value.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
  if (sortSelect.value === "price-low") visible.sort((a, b) => currentVariant(a).price - currentVariant(b).price);
  if (sortSelect.value === "price-high") visible.sort((a, b) => currentVariant(b).price - currentVariant(a).price);
  return visible;
}

function productCard(product) {
  const selected = selectedVariants.get(product.id);
  const variant = currentVariant(product);
  const isCompared = comparedProducts.has(product.id);
  const compareDisabled = comparedProducts.size >= 3 && !isCompared;
  const storageOptions = product.variants.map(option => `
    <button class="storage-option${option.storage === selected.storage ? " active" : ""}" type="button"
      data-action="storage" data-product="${product.id}" data-storage="${safeText(option.storage)}"
      aria-pressed="${option.storage === selected.storage}">${safeText(option.storage)}</button>`).join("");
  const colorOptions = product.colors.map(color => `
    <button class="color-swatch${color.name === selected.color ? " active" : ""}" type="button"
      data-action="color" data-product="${product.id}" data-color="${safeText(color.name)}"
      style="background-color:${safeText(color.hex)}" aria-label="${safeText(color.name)}"
      aria-pressed="${color.name === selected.color}" title="${safeText(color.name)}"></button>`).join("");
  return `
    <article class="product-card" data-product-card="${product.id}">
      <div class="product-image">
        <img src="${safeText(product.image)}" alt="${safeText(product.alt)}" loading="lazy">
        <span class="product-badge">${safeText(product.badge)}</span>
        <button class="compare-check${isCompared ? " selected" : ""}" type="button" data-action="compare"
          data-product="${product.id}" aria-pressed="${isCompared}" ${compareDisabled ? "disabled" : ""}>
          <span aria-hidden="true">${isCompared ? "✓" : "+"}</span> ${isCompared ? "Selected" : "Compare"}
        </button>
      </div>
      <div class="product-info">
        <p class="product-category">${safeText(product.category)}</p>
        <div class="product-name-row"><h3 class="product-name">${safeText(product.name)}</h3><span class="product-rating"><span aria-label="Rated ${product.rating} out of 5">★</span> ${product.rating}</span></div>
        <p class="product-description">${safeText(product.description)}</p>
        <div class="variant-row"><span class="variant-label">Storage</span><div class="storage-options">${storageOptions}</div></div>
        <div class="variant-row"><span class="variant-label">Color</span><div class="color-options">${colorOptions}</div></div>
        <div class="product-footer">
          <div class="price-block"><span class="product-price">${formatPrice(variant.price)}</span><span class="product-compare-price">${formatPrice(variant.compareAt)}</span></div>
          <button class="button button-dark product-order" type="button" data-action="order" data-product="${product.id}">
            Order on WhatsApp <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();
  productGrid.innerHTML = visibleProducts.map(productCard).join("");
  document.querySelector("#results-count").textContent = `${String(visibleProducts.length).padStart(2, "0")} ${visibleProducts.length === 1 ? "thoughtfully picked gadget" : "thoughtfully picked gadgets"}`;
  document.querySelector("#empty-state").hidden = visibleProducts.length > 0;
  productGrid.hidden = visibleProducts.length === 0;
  updateCompareBar();
}

function updateCompareBar() {
  const count = comparedProducts.size;
  compareBar.hidden = count === 0;
  document.querySelector("#compare-count").textContent = count;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3000);
}

function orderOnWhatsApp(product) {
  if (!WHATSAPP_NUMBER) {
    showToast("Please add the store's WhatsApp number in app.js to enable ordering.");
    return;
  }
  const selected = selectedVariants.get(product.id);
  const variant = currentVariant(product);
  const message = [
    "Hello Arab Gadgets Store! I'd like to order:",
    `${product.name}`,
    `Storage: ${selected.storage}`,
    `Color: ${selected.color}`,
    `Price: ${formatPrice(variant.price)}`
  ].join("\n");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function updateCompareSelection(productId) {
  if (comparedProducts.has(productId)) {
    comparedProducts.delete(productId);
  } else if (comparedProducts.size < 3) {
    comparedProducts.add(productId);
  } else {
    showToast("You can compare up to three gadgets at a time.");
  }
  renderProducts();
}

function renderComparison() {
  const selected = products.filter(product => comparedProducts.has(product.id));
  const rows = [
    ["Price", product => `<span class="compare-price">${formatPrice(currentVariant(product).price)}</span>`],
    ["Storage", product => safeText(selectedVariants.get(product.id).storage)],
    ["Color", product => safeText(selectedVariants.get(product.id).color)],
    ["Category", product => safeText(product.category)],
    ["Key details", product => safeText(product.specs)]
  ];
  compareTable.innerHTML = `
    <table class="compare-table">
      <thead><tr><th scope="col">Compare</th>${selected.map(product => `
        <th scope="col"><div class="compare-product-image"><img src="${safeText(product.image)}" alt=""></div>${safeText(product.name)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(([label, value]) => `<tr><th scope="row">${label}</th>${selected.map(product => `<td>${value(product)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>`;
}

productGrid.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button || button.disabled) return;
  const product = products.find(item => item.id === button.dataset.product);
  if (!product) return;

  if (button.dataset.action === "storage") {
    selectedVariants.get(product.id).storage = button.dataset.storage;
    renderProducts();
  } else if (button.dataset.action === "color") {
    selectedVariants.get(product.id).color = button.dataset.color;
    renderProducts();
  } else if (button.dataset.action === "order") {
    orderOnWhatsApp(product);
  } else if (button.dataset.action === "compare") {
    updateCompareSelection(product.id);
  }
});

document.querySelector(".category-tabs").addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll(".category-tab").forEach(tab => {
    const isActive = tab === button;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
});

searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

document.querySelector("#clear-filters").addEventListener("click", () => {
  activeCategory = "All";
  searchInput.value = "";
  sortSelect.value = "featured";
  document.querySelectorAll(".category-tab").forEach(tab => {
    const isActive = tab.dataset.category === "All";
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
});

document.querySelector("#compare-open").addEventListener("click", () => {
  renderComparison();
  compareDialog.showModal();
});
document.querySelector(".dialog-close").addEventListener("click", () => compareDialog.close());
compareDialog.addEventListener("click", event => {
  if (event.target === compareDialog) compareDialog.close();
});
document.querySelector("#compare-clear").addEventListener("click", () => {
  comparedProducts.clear();
  renderProducts();
});
document.querySelector(".menu-toggle").addEventListener("click", event => {
  const button = event.currentTarget;
  const open = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(open));
  document.querySelector(".main-nav").classList.toggle("open", open);
});
document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".main-nav").classList.remove("open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  });
});
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelectorAll(".category-tab").forEach(tab => tab.setAttribute("aria-pressed", String(tab.classList.contains("active"))));
renderProducts();
