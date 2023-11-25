import type { Checklist, ChecklistID, Group, GroupID } from "../../types";

export type BackupV1 = {
  version: 1;
  checklists: Record<ChecklistID, Checklist>;
  groups: Record<GroupID, Group>;
};
