import { defineStore } from "pinia";
import { ulid } from "ulid";
import { sf } from "simpler-fetch";

import { useGroup } from "./group.store";

import type { Checklist, ChecklistID } from "../types";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * Locally cached checklists
   */
  checklists: Record<ChecklistID, Checklist>;
}

/**
 * Use this store to manage checklists
 */
export const useChecklist = defineStore("checklist", {
  state: (): State => ({ checklists: {} }),

  getters: {
    checklistsArray: (state) => {
      return Object.values(state.checklists);
    },
  },

  actions: {
    async create(): Promise<ChecklistID> {
      const id = ulid();

      this.checklists[id] = { id, name: "untitled", items: [] };

      return id;
    },

    async get(checklistID: ChecklistID): Promise<Checklist> {
      const checklist = this.checklists[checklistID];

      if (checklist === undefined) {
        throw new Error(`Checklist ${checklistID} does not exist.`);
      }

      return checklist;
    },

    async getFromLink(link: string): Promise<Checklist> {
      const { err, res } = await sf.useOnce(link).GET().runJSON<{
        type: "checklist";
        version: 1;
        checklist: Checklist;
      }>();
      // @todo Do zod validation here

      if (err) throw new Error("Failed to fetch checklist");
      if (!res.ok) throw new Error("Failed to fetch checklist");

      return res.data.checklist;
    },

    async delete(checklistID: ChecklistID): Promise<void> {
      if (this.checklists[checklistID] === undefined) {
        throw new Error(`Checklist ${checklistID} does not exist.`);
      } else {
        // Remove checklist from groups before removing it locally
        const groupStore = useGroup();
        await groupStore.removeChecklist(checklistID);
        delete this.checklists[checklistID];
      }
    },
  },

  persist: true,
});
