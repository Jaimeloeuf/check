import type { Checklist, ChecklistID, Group, GroupID } from "../../types";

export type FullBackupV1 = {
  type: "full";
  version: 1;
  checklists: Record<ChecklistID, Checklist>;
  groups: Record<GroupID, Group>;
};
