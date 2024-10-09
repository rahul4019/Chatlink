import { createMessageTable } from "./messageModel";
import { createUserTable } from "./userModel";

export const initializeTables = async (): Promise<void> => {
  await createUserTable();
  await createMessageTable();
};
