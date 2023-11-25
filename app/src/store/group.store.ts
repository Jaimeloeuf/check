import { defineStore } from "pinia";
import { ulid } from "ulid";

import type { Group, GroupID, ChecklistID } from "../types";
import { getDateTimeString } from "../utils/getISODateTimeString";

/**
 * Type of this pinia store's state.
 */
interface State {
  /**
   * Locally cached groups
   */
  groups: Record<GroupID, Group>;
}

/**
 * Use this store to manage groups
 */
export const useGroup = defineStore("group", {
  state: (): State => ({ groups: {} }),

  getters: {
    groupsArray: (state) => {
      return Object.values(state.groups);
    },
  },

  actions: {
    async create(): Promise<GroupID> {
      const id = ulid();

      this.groups[id] = {
        id,
        createdAt: getDateTimeString(),
        name: "untitled group",
        checklists: [],
      };

      return id;
    },

    async get(groupID: GroupID): Promise<Group> {
      const group = this.groups[groupID];

      if (group === undefined) {
        throw new Error(`Checklist Group ${groupID} does not exist.`);
      }

      return group;
    },

    async delete(groupID: GroupID): Promise<void> {
      if (this.groups[groupID] === undefined) {
        throw new Error(`Checklist Group ${groupID} does not exist.`);
      } else {
        delete this.groups[groupID];
      }
    },

    async toggleChecklist(
      groupID: GroupID,
      checklistID: ChecklistID
    ): Promise<void> {
      const group = await this.get(groupID);
      const checklistIndex = group.checklists.indexOf(checklistID);

      if (checklistIndex === -1) group.checklists.push(checklistID);
      else group.checklists.splice(checklistIndex, 1);
    },

    /**
     * Remove a checklist from all groups before it is deleted.
     */
    async removeChecklist(checklistID: ChecklistID): Promise<void> {
      for (const group of Object.values(this.groups)) {
        const checklistIndex = group.checklists.indexOf(checklistID);
        if (checklistIndex !== -1) group.checklists.splice(checklistIndex, 1);
      }
    },
  },

  persist: true,
});
