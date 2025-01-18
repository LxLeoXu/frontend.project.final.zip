<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">✕</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Modal",
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
    },
    emits: ["close"],
    methods: {
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    border-radius: 10px;
    padding: 20px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  </style>
  