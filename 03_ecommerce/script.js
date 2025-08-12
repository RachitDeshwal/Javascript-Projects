document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "Product 1", price: 10.0 },
    { id: 2, name: "Product 2", price: 20.0 },
    { id: 3, name: "Product 3", price: 30.0 },
  ];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutbtn = document.getElementById("checkout-btn");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "product";
    productItem.innerHTML = `
      <span>product.name</span>
      <span>$${product.price.toFixed(2)}</span>
      <button  data-id="${product.id}">Add to Cart

    `;
    productList.appendChild(productItem);
  });
  productList.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      if (cart.find((p) => p.id === productId)) {
        return; // Prevent adding the same product again
      }
      cart.push(product);
      saveCart();
      console.log(cart);
      renderCart();
    }
  });
  function renderCart() {
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartItems.innerHTML = "";
      cartItems.classList.remove("hidden");
      let total = 0;
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        total += item.price;
        cartItem.innerHTML = `
          <span>${item.name}</span>
          <span>$${item.price.toFixed(2)}</span>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });
      if (total > 0) {
        cartTotal.classList.remove("hidden");
      }
      totalPrice.textContent = total.toFixed(2);
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartItems.classList.add("hidden");
    }
    cartItems.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
        const productId = parseInt(event.target.getAttribute("data-id"));
        cart = cart.filter((item) => item.id !== productId);
        saveCart();
        renderCart();
      }
    });
  }
  checkoutbtn.addEventListener("click", function () {
    if (cart.length > 0) {
      alert(`Checkout successful! Total: $${totalPrice.textContent}`);
      cart.length = 0; // Clear the cart
      renderCart(); // Re-render the cart
    } else {
      alert("Your cart is empty!");
    }
  });
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
