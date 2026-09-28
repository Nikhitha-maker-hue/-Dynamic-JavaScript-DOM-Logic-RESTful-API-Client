import { fetchProducts } from "./api.js";
import { state, addToCart, getCartCount } from "./state.js";
import { $, showLoading, hideLoading, showError, hideError, renderCategories, renderProducts, updateCartCount } from "./ui.js";

const productGrid = $("#product-grid");
const loading = $("#loading");
const searchInput = $("#search-input");
const sortSelect = $("#sort-select");

function applyFilters() {
  let products = [...state.products];

  if (state.activeCategory !== "all") {
    products = products.filter(product => product.category === state.activeCategory);
  }

  const term = state.searchTerm.trim().toLowerCase();
  if (term) {
    products = products.filter(product =>
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }

  switch (state.sortBy) {
    case "price-asc": products.sort((a,b) => a.price - b.price); break;
    case "price-desc": products.sort((a,b) => b.price - a.price); break;
    case "rating-desc": products.sort((a,b) => b.rating.rate - a.rating.rate); break;
    case "name-asc": products.sort((a,b) => a.title.localeCompare(b.title)); break;
  }

  state.filteredProducts = products;
  renderProducts(products, handleAddToCart);
}

function selectCategory(category) {
  state.activeCategory = category;
  renderCategories(state.products, state.activeCategory, selectCategory);
  applyFilters();
}

function handleAddToCart(product) {
  addToCart(product);
  updateCartCount(getCartCount());
}

async function init() {
  showLoading(loading);
  hideError();

  try {
    state.products = await fetchProducts();
    renderCategories(state.products, state.activeCategory, selectCategory);
    applyFilters();
  } catch (error) {
    console.error(error);
    showError("Sorry, we couldn't load the products. Please check your internet connection and try again.");
    productGrid.innerHTML = "";
  } finally {
    hideLoading(loading);
  }
}

searchInput.addEventListener("input", event => {
  state.searchTerm = event.target.value;
  applyFilters();
});

sortSelect.addEventListener("change", event => {
  state.sortBy = event.target.value;
  applyFilters();
});

updateCartCount(getCartCount());
init();
