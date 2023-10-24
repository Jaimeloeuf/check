import { defineStore } from "pinia";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * Boolean flag to control if UI should be fully expanded or limited to a
   * certain width for ultra wide viewports.
   */
  expandFull: boolean;
}

/**
 * Use this 'store' to control settings
 */
export const useSettings = defineStore("settings", {
  state: (): State => ({ expandFull: false }),

  persist: true,
});
