
<template>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  .footer {
    width: 100%;
    background-color: #f8f9fa;
    text-align: center;
    padding: 10px 0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    position: relative; /* No fixed positioning */
  }
  
  .footer-content {
    font-size: 0.9rem;
    color: #6c757d;
  }
  </style>
  