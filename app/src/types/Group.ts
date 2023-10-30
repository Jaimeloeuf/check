import type { ChecklistID } from "./Checklist";
import type { ISODateTimeString } from "./Timestamp";

export interface Group {
  /**
   * Unique ID for this Group
   */
  id: string;

  createdAt: ISODateTimeString;

  name: string;

  checklists: Array<ChecklistID>;
}

/**
 * Type alias for `Group["id"]` where all groupIDs will follow the same type.
 */
export type GroupID = Group["id"];
