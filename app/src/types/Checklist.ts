export interface Checklist {
  /**
   * Unique ID for this Checklist
   */
  id: string;

  name: string;

  items: Array<{
    title: string;
    done: boolean;
  }>;
}

/**
 * Type alias for `Checklist["id"]` where all checklistIDs will follow the same
 * type.
 */
export type ChecklistID = Checklist["id"];
