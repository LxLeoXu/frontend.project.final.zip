<template>
    <nav class="navbar">
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/articles">Articles</RouterLink>
        </li>
        <li>
          <RouterLink to="/shop">Shop</RouterLink>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Header',
  };
  </script>
  
  <style>
  .navbar {
    display: flex;
    justify-content: space-around;
    background: #007bff;
    padding: 10px;
  }
  
  .navbar a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  
  .navbar a:hover {
    text-decoration: underline;
  }
  </style>
  