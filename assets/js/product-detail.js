// ============================================================
// KOLEYES - PRODUCT DETAIL LOGIC
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  const products = window.KOOLEYES_PRODUCTS || [];
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || params.get("product") || "origami";

  const product =
    products.find((item) => item.id === productId) ||
    products.find((item) => item.id === "origami") ||
    products[0];

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function renderProductDetail() {
    if (!product) return;

    document.title = `Kooleyes - ${product.name}`;
    setText("breadcrumbProduct", product.name);
    setText("productName", product.name);
    setText("productPrice", product.price);
    setText("productDescription", product.description);
    setText("productSku", product.sku);
    setText("productCategory", product.category);
    setText("productTags", product.tags.join(", "));
    setText("descriptionText", product.longDescription);
    setText("faceShapeTag", product.faceShapeTag);

    const mainImage = document.getElementById("mainProductImage");
    mainImage.src = product.images[0].src;
    mainImage.alt = product.name;

    const thumbnails = document.getElementById("thumbnailList");
    thumbnails.innerHTML = product.images
      .map(
        (image, index) => `
      <button class="thumbnail ${index === 0 ? "active" : ""}" type="button" data-src="${image.src}" data-color="${image.color}">
        <img src="${image.src}" alt="${product.name} ${image.color}" />
      </button>
    `,
      )
      .join("");

    const colors = document.getElementById("colorOptions");
    colors.innerHTML = product.colors
      .map(
        (color, index) => `
      <button class="color-choice ${index === 0 ? "active" : ""}" type="button">${color}</button>
    `,
      )
      .join("");

    thumbnails.querySelectorAll(".thumbnail").forEach((button) => {
      button.addEventListener("click", () => {
        thumbnails
          .querySelectorAll(".thumbnail")
          .forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        mainImage.src = button.dataset.src;

        const targetColor = button.dataset.color;
        colors.querySelectorAll(".color-choice").forEach((cBtn) => {
          if (cBtn.textContent.trim() === targetColor) {
            cBtn.classList.add("active");
          } else {
            cBtn.classList.remove("active");
          }
        });
      });
    });

    colors.querySelectorAll(".color-choice").forEach((button) => {
      button.addEventListener("click", () => {
        colors
          .querySelectorAll(".color-choice")
          .forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        const selectedColor = button.textContent.trim();
        const image = product.images.find(
          (item) => item.color === selectedColor,
        );

        if (image) {
          mainImage.src = image.src;
          thumbnails.querySelectorAll(".thumbnail").forEach((th) => {
            if (th.dataset.color === selectedColor) {
              th.classList.add("active");
            } else {
              th.classList.remove("active");
            }
          });
        }
      });
    });

    const detailImages = document.getElementById("descriptionImages");
    detailImages.innerHTML = product.images
      .slice(0, 2)
      .map(
        (image) =>
          `<img src="${image.src}" alt="${product.name} ${image.color}" />`,
      )
      .join("");

    renderRelatedProducts();
  }

  function renderRelatedProducts() {
    const related = products
      .filter(
        (item) =>
          item.id !== product.id &&
          (item.collection === product.collection ||
            item.category === product.category),
      )
      .slice(0, 4);

    const fallback = products
      .filter((item) => item.id !== product.id)
      .slice(0, 4);
    const list = related.length ? related : fallback;

    document.getElementById("relatedGrid").innerHTML = list
      .map(
        (item) => `
      <a class="product-card" href="product-detail.html?id=${encodeURIComponent(item.id)}">
        <div class="product-image">
          ${item.badge ? `<span class="product-badge ${item.badge === "New" ? "new" : ""}">${item.badge}</span>` : ""}
          <img src="${item.images[0].src}" alt="${item.name}" />
        </div>
        <h3>${item.name}</h3>
        <p>${item.subtitle}</p>
        <div class="price-row"><strong>${item.price}</strong>${item.oldPrice ? `<span>${item.oldPrice}</span>` : ""}</div>
      </a>
    `,
      )
      .join("");
  }

  const quantity = document.getElementById("quantity");
  document.getElementById("decreaseQty")?.addEventListener("click", () => {
    quantity.value = Math.max(1, Number(quantity.value) - 1);
  });

  document.getElementById("increaseQty")?.addEventListener("click", () => {
    quantity.value = Number(quantity.value) + 1;
  });

  const addToCartBtn =
    document.getElementById("addToCartBtn") ||
    document.querySelector(".cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const selectedColor =
        document.querySelector(".color-choice.active")?.textContent.trim() ||
        product.colors?.[0] ||
        "Default";
      const selectedSize =
        document.querySelector(".option-btn.active")?.textContent.trim() ||
        "Default";
      const selectedImage =
        document.getElementById("mainProductImage")?.src ||
        product.images[0].src;
      const qty = Math.max(1, Number(quantity.value) || 1);

      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.priceValue,
          priceText: product.price,
          image: selectedImage,
          color: selectedColor,
          size: selectedSize,
        },
        qty,
      );
    });
  }

  renderProductDetail();
});
