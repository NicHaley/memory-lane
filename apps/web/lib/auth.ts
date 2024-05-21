import { db } from "@repo/database";

/**
 * Since I am not implementing authentication in this project, I am just
 * hard-coding the user for demostration.
 */
export async function getCurrentUser() {
  // This returns Tim Apple
  return db.user.findUnique({
    where: {
      id: "clwgrnvwz0000tvdgnl069vem",
    },
  });
}
