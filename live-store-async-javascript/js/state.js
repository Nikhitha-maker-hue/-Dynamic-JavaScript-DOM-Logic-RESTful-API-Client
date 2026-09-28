const CART_KEY = "live-store-cart";

export const state = {
  products: [],
  filteredProducts: [],
  activeCategory: "all",
  searchTerm: "",
  sortBy: "default",
  cart: loadCart()
};

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
}

export function addToCart(product) {
  const existing = state.cart.find(item => item.id === product.id);
  if (existing) existing.quantity += 1;
  else state.cart.push({ id: product.id, title: product.title, price: product.price, quantity: 1 });
  saveCart();
}

export function getCartCount() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}
