<template>
  <div class="pc-builder">
    <h1>Postav si svoj počítač</h1>

    <!-- Výber komponentov -->
    <div class="component-selection" v-if="componentsLoaded">
      <ComponentSelector
        v-for="(components, type) in pcBuilderStore.components"
        :key="type"
        :title="getComponentTitle(type)"
        :components="components"
        @select="(part) => addComponentToCart(type, part)"
      />
    </div>

    <!-- Načítavanie -->
    <div v-else class="loading">
      <p>Načítavam komponenty...</p>
    </div>

    <!-- Výsledky -->
    <div class="results" v-if="selectedPartsWithComponents.length > 0">
      <h2>Výsledky</h2>
      <table>
        <thead>
          <tr>
            <th>Komponent</th>
            <th>Vybrané</th>
            <th>Cena</th>
            <th>Výkon</th>
            <th>Akcie</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(component, type) in selectedPartsWithComponents" :key="type">
            <td>{{ getComponentTitle(type) }}</td>
            <td>{{ component.name }}</td>
            <td>{{ component.price }} €</td>
            <td>{{ component.performance || (type === 'motherboard' || type === 'case' ? '-' : 0) }}</td>
            <td>
              <button @click="addToCart(component)">Pridať do košíka</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Ak nie sú vybrané žiadne komponenty -->
    <div class="no-components" v-else-if="componentsLoaded">
      <p>Žiadne komponenty nie sú zatiaľ vybrané.</p>
    </div>
  </div>
</template>

<script>
import { usePcBuilderStore } from "@/stores/pcBuilder";
import { useCartStore } from "@/stores/cart";
import ComponentSelector from "@/components/ComponentSelector.vue";
import { computed, onMounted } from "vue";

export default {
  name: "PcBuilderView",
  components: { ComponentSelector },
  setup() {
    const pcBuilderStore = usePcBuilderStore();
    const cartStore = useCartStore();

    // Načítanie komponentov pri načítaní stránky
    const componentsLoaded = computed(() => Object.keys(pcBuilderStore.components).length > 0);

    onMounted(async () => {
      if (!componentsLoaded.value) {
        await pcBuilderStore.loadComponents();
      }
    });

    // Vybrané komponenty
    const selectedPartsWithComponents = computed(() =>
      Object.entries(pcBuilderStore.selectedParts)
        .filter(([_, part]) => part !== null)
        .map(([type, part]) => ({
          type,
          ...part,
        }))
    );

    // Overenie kompatibility medzi procesorom a základnou doskou
    const checkCompatibility = (component, type) => {
      if (type === "processor" && pcBuilderStore.selectedParts.motherboard) {
        return pcBuilderStore.selectedParts.motherboard.socket === component.socket;
      }
      if (type === "motherboard" && pcBuilderStore.selectedParts.processor) {
        return pcBuilderStore.selectedParts.processor.socket === component.socket;
      }
      return true;
    };

    // Pridať komponent do konfigurácie
    const addComponentToCart = (type, component) => {
      if (!checkCompatibility(component, type)) {
        alert(`Komponent "${component.name}" nie je kompatibilný s aktuálnou konfiguráciou.`);
        return;
      }
      pcBuilderStore.selectPart(type, component);
    };

    // Pridať komponent do košíka
    const addToCart = (component) => {
      cartStore.addToCart(component);
      alert(`Komponent "${component.name}" bol pridaný do košíka.`);
    };

    const getComponentTitle = (type) => {
      const titles = {
        processors: "Procesor",
        motherboards: "Základná doska",
        graphicsCards: "Grafická karta",
        memory: "Pamäť (RAM)",
        storage: "Pevný disk",
        powerSupplies: "Zdroj",
        cases: "Skrinka",
      };
      return titles[type] || "Komponent";
    };

    return {
      pcBuilderStore,
      cartStore,
      componentsLoaded,
      selectedPartsWithComponents,
      addToCart,
      addComponentToCart,
      getComponentTitle,
    };
  },
};
</script>

<style scoped>
/* Štýl pre PC Builder */
.pc-builder {
  padding: 20px;
  background: #f9f9f9;
  color: #333;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.pc-builder h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #007bff;
}
.component-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
}
.results {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.results h2 {
  text-align: center;
  margin-bottom: 20px;
}
.results table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.results th,
.results td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.results th {
  background-color: #007bff;
  color: white;
}
.results tr:nth-child(even) {
  background-color: #f2f2f2;
}
.results tr:hover {
  background-color: #d1ecf1;
}
</style>
