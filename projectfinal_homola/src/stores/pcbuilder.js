import { defineStore } from "pinia";

export const usePcBuilderStore = defineStore("pcBuilder", {
  state: () => ({
    components: {}, // Komponenty budú dynamicky načítané
    selectedParts: {
      processor: null,
      motherboard: null,
      graphicsCard: null,
      memory: null,
      storage: null,
      powerSupply: null,
      case: null,
    },
  }),
  getters: {
    totalCost(state) {
      return Object.values(state.selectedParts).reduce(
        (total, part) => total + (part?.price || 0),
        0
      );
    },
    totalPerformance(state) {
      return Object.values(state.selectedParts).reduce(
        (total, part) => total + (part?.performance || 0),
        0
      );
    },
    filteredMotherboards(state) {
      if (!state.selectedParts.processor)
        return state.components.motherboards || [];
      const socket = state.selectedParts.processor.socket;
      return (state.components.motherboards || []).filter(
        (board) => board.socket === socket
      );
    },
  },
  actions: {
    async loadComponents() {
      try {
        const response = await fetch("/data/data3.json");
        if (!response.ok) {
          throw new Error(`Failed to load components: ${response.status}`);
        }
        const data = await response.json();
        this.components = data; // Uloženie načítaných komponentov do state
      } catch (error) {
        console.error("Error loading components:", error);
      }
    },
    selectPart(type, part) {
      if (part.stock > 0) {
        this.selectedParts[type] = part;

        // Odstránenie nekompatibilnej základnej dosky
        if (type === "processor" && this.selectedParts.motherboard) {
          const socket = part.socket;
          if (this.selectedParts.motherboard.socket !== socket) {
            this.selectedParts.motherboard = null;
          }
        }
      } else {
        console.warn(`${part.name} nie je na sklade a nemôže byť vybraný.`);
      }
    },
  },
});
