import { db } from "@repo/database";

/**
 * Since I am not implementing authentication in this project, I am just
 * hard-coding the user for demostration.
 */
export async function getCurrentUser() {
  // This returns Tim Apple
  return db.user.findUnique({
    where: {
      id: "clwjlnc090000z2wudjo0h2f3",
    },
  });
}
