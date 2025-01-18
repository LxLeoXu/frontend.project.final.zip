import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

//import { BootstrapVueNext } from 'bootstrap-vue-next';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Nastavenie Vuetify
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#ffffff',
          surface: '#ffffff',
          primary: '#007bff',
          secondary: '#6c757d',
          error: '#dc3545',
          success: '#28a745',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1e1e1e',
          primary: '#007bff',
          secondary: '#6c757d',
          error: '#dc3545',
          success: '#28a745',
        },
      },
    },
  },
});

// Vytvorenie aplikácie
const app = createApp(App);

// Použitie pluginov
app.use(createPinia());
app.use(router);
app.use(vuetify);

// Montáž aplikácie
app.mount('#app');
