<template>
  <div class="shopping-cart">
    <h2>Shopping Cart</h2>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" :alt="item.name" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>{{ item.name }}</h3>
          <p>Price: {{ item.price }} €</p>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
        <button @click="removeItem(item)">Remove</button>
      </div>
      <div class="cart-summary">
        <p>Total Items: {{ totalItems }}</p>
        <p>Total Amount: {{ totalAmount }} €</p>
        <!--<button @click="goToCheckout">Pay Now</button>-->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

export default {
  name: "ShoppingCart",
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();

    const removeItem = (item) => {
      cartStore.removeFromCart(item.id, item.type);
    };

    const goToCheckout = () => {
      router.push("/shop/checkout");
    };

    return {
      cartItems: computed(() => cartStore.items),
      totalAmount: computed(() => cartStore.totalAmount),
      totalItems: computed(() => cartStore.totalItems),
      removeItem,
      goToCheckout,
    };
  },
};
</script>

<style scoped>
.shopping-cart {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.cart-item-image {
  width: 100px;
  height: auto;
  margin-right: 15px;
}

.cart-item-details {
  flex-grow: 1;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.cart-summary {
  margin-top: 20px;
  text-align: right;
}
</style>
