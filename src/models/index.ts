import { createUserTable } from "./userModel";
import { createUserSessionTable } from "./userSessionModel";

export const initializeTables = async () => {
  await createUserTable();
  await createUserSessionTable()
};
