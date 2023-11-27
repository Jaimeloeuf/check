import { useChecklist, useGroup } from "../../store";
import type { FullBackupV1 } from "./type";

/**
 * Import backup from JSON string into the local stores.
 */
export function importJSONBackup(jsonBackup: string) {
  const checklistStore = useChecklist();
  const groupStore = useGroup();

  const backup = JSON.parse(jsonBackup) as FullBackupV1;

  for (const [checklistID, checklist] of Object.entries(backup.checklists)) {
    if (checklistStore.checklists[checklistID] !== undefined) {
      // @todo should not just replace it directly
    }

    checklistStore.checklists[checklistID] = checklist;
  }

  for (const [groupID, group] of Object.entries(backup.groups)) {
    if (groupStore.groups[groupID] !== undefined) {
      // @todo should not just replace it directly
    }

    // @todo ensure that only the checklists whose ID are valid will be imported

    groupStore.groups[groupID] = group;
  }
}
