import type { ISODateTimeString } from "../types/Timestamp";

/**
 * Get ISO Date Time String
 */
export const getDateTimeString = (): ISODateTimeString =>
  new Date().toISOString();
