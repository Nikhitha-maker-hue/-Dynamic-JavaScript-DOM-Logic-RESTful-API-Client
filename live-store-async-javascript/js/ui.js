export const $ = selector => document.querySelector(selector);

export function showLoading(container, count = 8) {
  container.hidden = false;
  container.innerHTML = Array.from({length: count}, () => '<div class="skeleton"></div>').join("");
}

export function hideLoading(container) {
  container.hidden = true;
  container.innerHTML = "";
}

export function showError(message) {
  const banner = $("#error-banner");
  banner.textContent = message;
  banner.hidden = false;
}

export function hideError() {
  $("#error-banner").hidden = true;
}

export function renderCategories(products, activeCategory, onSelect) {
  const categories = ["all", ...new Set(products.map(p => p.category))];
  const tabs = $("#category-tabs");
  tabs.innerHTML = categories.map(category =>
    `<button class="tab ${category === activeCategory ? "active" : ""}" data-category="${category}">
      ${category === "all" ? "All" : category}
    </button>`
  ).join("");

  tabs.querySelectorAll(".tab").forEach(button => {
    button.addEventListener("click", () => onSelect(button.dataset.category));
  });
}

export function renderProducts(products, onAdd) {
  const grid = $("#product-grid");
  const empty = $("#empty-state");
  empty.hidden = products.length !== 0;

  grid.innerHTML = products.map(product => `
    <article class="card">
      <img src="${product.image}" alt="${escapeHtml(product.title)}" loading="lazy">
      <h3>${escapeHtml(product.title)}</h3>
      <div class="meta">Category: ${escapeHtml(product.category)}</div>
      <div class="meta">Rating: ${product.rating.rate}/5 (${product.rating.count})</div>
      <div class="price">$${product.price.toFixed(2)}</div>
      <button data-id="${product.id}">Add to Cart</button>
    </article>
  `).join("");

  grid.querySelectorAll("button").forEach(button => {
    const product = products.find(p => p.id === Number(button.dataset.id));
    button.addEventListener("click", () => onAdd(product));
  });
}

export function updateCartCount(count) {
  $("#cart-count").textContent = count;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}
