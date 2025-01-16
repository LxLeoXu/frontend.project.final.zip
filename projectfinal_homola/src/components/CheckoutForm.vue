<template>
  <div class="checkout-form">
    <h2>Checkout Form</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input id="firstName" v-model="form.firstName" required />
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input id="lastName" v-model="form.lastName" required />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input id="address" v-model="form.address" required />
      </div>
      <div class="form-group">
        <label for="postalCode">Postal Code</label>
        <input id="postalCode" v-model="form.postalCode" required />
      </div>
      <div class="form-group">
        <label for="cardDetails">Card Details</label>
        <input id="cardDetails" v-model="form.cardDetails" required />
      </div>
      <div class="form-actions">
        <button type="submit" class="confirm-button">Confirm Purchase</button>
        <button type="button" class="cancel-button" @click="$emit('cancel')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CheckoutForm",
  emits: ["submit", "cancel"],
  setup(_, { emit }) {
    const form = ref({
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      cardDetails: "",
    });

    const submitOrder = () => {
      emit("submit", form.value);
    };

    return { form, submitOrder };
  },
};
</script>

<style scoped>
.checkout-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.confirm-button {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: darkgreen;
}

.cancel-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: darkred;
}
</style>
