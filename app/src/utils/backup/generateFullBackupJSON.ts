import { useChecklist, useGroup } from "../../store";
import type { Checklist, ChecklistID } from "../../types";

/**
 * Generates JSON backup string for all user data.
 */
export function generateFullBackupJSON() {
  const checklistStore = useChecklist();
  const groupStore = useGroup();

  // Reset all the checklist items before converting it to json.
  return JSON.stringify(
    {
      type: "full",
      version: 1,

      checklists: checklistStore.checklistsArray
        .map((checklist) => ({
          id: checklist.id,
          name: checklist.name,
          // Create a new items array without the current done status.
          items: checklist.items.map((item) => ({ title: item.title })),
        }))
        .reduce(
          (checklists, checklist) => (
            (checklists[checklist.id] = checklist), checklists
          ),
          {} as Record<ChecklistID, Checklist>
        ),

      groups: groupStore.groups,
    },
    null,
    2
  );
}
