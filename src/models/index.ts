import { createUserTable } from "./userModel";

export const initializeTables = async () => {
  await createUserTable();
};
