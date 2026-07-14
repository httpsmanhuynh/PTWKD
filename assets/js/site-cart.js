// KOLEYES - CART LOGIC

function getCart() {
  return JSON.parse(localStorage.getItem("kooleyesCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("kooleyesCart", JSON.stringify(cart));
}

function addToCart(product, quantity = 1, color = null) {
  const cart = getCart();
  const itemColor = color || product.color || "Default";
  const itemPrice = product.priceValue || product.price || 0;

  const existingItem = cart.find(
    (item) => item.id === product.id && item.color === itemColor,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: itemPrice,
      priceText: product.priceText || product.price,
      image: product.image,
      color: itemColor,
      quantity: quantity,
    });
  }

  saveCart(cart);
  renderCartDrawer();
  openCartDrawer();
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartDrawer();
}

function getPriceNumber(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  return Number(String(value).replace(/[^\d]/g, ""));
}

function formatPrice(price) {
  return getPriceNumber(price).toLocaleString("vi-VN") + " đ";
}

function renderCartDrawer() {
  const cart = getCart();
  const cartItems = document.getElementById("cartDrawerItems");
  const cartSubtotal = document.getElementById("cartDrawerSubtotal");

  if (!cartItems || !cartSubtotal) return;

  cartItems.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    cartSubtotal.textContent = "0 đ";
    return;
  }

  cart.forEach((item, index) => {
    const itemPrice = getPriceNumber(item.price);
    subtotal += itemPrice * item.quantity;

    cartItems.innerHTML += `
      <div class="drawer-item">
        <div class="drawer-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="drawer-item-info">
          <h3>${item.name}</h3>
          <p>${item.quantity}x ${item.color || "Default"}</p>
          <strong>${formatPrice(item.price)}</strong>
        </div>
        <button type="button" class="remove-item" onclick="removeFromCart(${index})">×</button>
      </div>
    `;
  });

  cartSubtotal.textContent = formatPrice(subtotal);
}

function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (!drawer || !overlay) return;
  drawer.classList.add("active");
  overlay.classList.add("active");
  renderCartDrawer();
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (!drawer || !overlay) return;
  drawer.classList.remove("active");
  overlay.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
  renderCartDrawer();

  const openBtn = document.getElementById("openCartDrawer");
  const closeBtn = document.getElementById("closeCartDrawer");
  const overlay = document.getElementById("cartOverlay");

  if (openBtn) {
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openCartDrawer();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeCartDrawer);
  if (overlay) overlay.addEventListener("click", closeCartDrawer);
});
