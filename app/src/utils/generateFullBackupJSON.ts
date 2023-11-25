import { useChecklist } from "../store";
import type { Checklist, ChecklistID } from "../types";

/**
 * Generates JSON backup string after making sure only the schema is saved and
 * not the current checklist progress/status.
 *
 * @todo take a single checklist or a list of checklist, so we can backup
 * individual checklists
 */
export function generateFullBackupJSON() {
  const checklistStore = useChecklist();

  // Reset all the checklist items before converting it to json.
  return JSON.stringify(
    checklistStore.checklistsArray
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
      )
  );
}
