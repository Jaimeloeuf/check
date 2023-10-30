import { useChecklist } from "../store";
import type { Checklist, ChecklistID } from "../types";

/**
 * Imports checklists in a JSON backup string into the local checklist store.
 */
export function importJSONBackup(jsonBackup: string) {
  const checklistStore = useChecklist();

  const checklists = JSON.parse(jsonBackup) as Record<ChecklistID, Checklist>;

  for (const [checklistID, checklist] of Object.entries(checklists)) {
    if (checklistStore.checklists[checklistID] !== undefined) {
      // @todo should not just replace it directly
    }

    checklistStore.checklists[checklistID] = checklist;
  }
}
