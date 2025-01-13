<template>
    <v-card>
      <v-img :src="image" height="200px"></v-img>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="$emit('add-to-cart')">Add to Cart</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      description: String,
      image: String,
    },
  };
  </script>
  