"use server";

import { type PutBlobResult, put } from "@vercel/blob";
import { db } from "@repo/database";
import { action } from "~/lib/safe-action";
import { revalidatePath } from "next/cache";
import { createMemoryFormDataSchema } from "./schema";
import { getCurrentUser } from "~/lib/auth";

export const createMemory = action(
  createMemoryFormDataSchema,
  async ({ name, description, image, timestamp, userId }) => {
    let blob: PutBlobResult | null = null;

    console.log(22222222, image);

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not found");
    }

    if (currentUser.id !== userId) {
      throw new Error(
        "You are not authorized to create a memory for this user."
      );
    }

    if (image) {
      blob = await put(image.name, image, {
        access: "public",
      });
    }

    await db.memory.create({
      data: {
        name,
        description,
        image: blob?.url,
        timestamp,
        userId: currentUser.id,
      },
    });

    revalidatePath(`/users/${userId}`);
  }
);
