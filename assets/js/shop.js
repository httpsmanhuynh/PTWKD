const products = window.KOOLEYES_PRODUCTS || [];
const grid = document.getElementById("productGrid");
const resultText = document.getElementById("resultText");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function productCard(product) {
  const badge = product.badge
    ? `<span class="product-badge ${product.badge === "New" ? "new" : ""}">${product.badge}</span>`
    : "";
  const oldPrice = product.oldPrice ? `<span>${product.oldPrice}</span>` : "";
  return `
    <a class="product-card" href="product-detail.html?id=${encodeURIComponent(product.id)}">
      <div class="product-image">
        ${badge}
        <img src="${product.images[0].src}" alt="${product.name}" />
      </div>
      <h3>${product.name}</h3>
      <p>${product.subtitle}</p>
      <div class="price-row"><strong>${product.price}</strong>${oldPrice}</div>
    </a>
  `;
}

function renderProducts(list) {
  grid.innerHTML = list.map(productCard).join("");
  resultText.textContent = `Showing 1–${list.length} of ${products.length} results`;
}

function getFilteredProducts() {
  const keyword = searchInput.value.trim().toLowerCase();
  let list = products.filter((product) => {
    const text =
      `${product.name} ${product.subtitle} ${product.collection} ${product.category}`.toLowerCase();
    return text.includes(keyword);
  });

  if (sortSelect.value === "low") {
    list.sort((a, b) => a.priceValue - b.priceValue);
  } else if (sortSelect.value === "high") {
    list.sort((a, b) => b.priceValue - a.priceValue);
  } else if (sortSelect.value === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

function updateProducts() {
  renderProducts(getFilteredProducts());
}

searchInput.addEventListener("input", updateProducts);
sortSelect.addEventListener("change", updateProducts);

renderProducts(products);
