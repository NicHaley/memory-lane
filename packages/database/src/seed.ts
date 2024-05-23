import { db } from "./client";

import type { User } from "@prisma/client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com",
    image:
      "https://ypn44edblhlmrmwr.public.blob.vercel-storage.com/Pwq-1eJc_400x400-XuMV6VOpSU1vghiKAH1n9v7rjCbmGg.jpg",
    blurb: "CEO of Apple Inc.",
  },
  {
    name: "Phil Chiller",
    email: "phil@apple.com",
    image:
      "https://ypn44edblhlmrmwr.public.blob.vercel-storage.com/philip_w_schiller_image.png.og-cq2YK3JxWyhDCRrO9D4RczEmaKhYTz.png",
    blurb: "CMO of Apple Inc.",
  },
] as Array<User>;

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        db.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
})();
