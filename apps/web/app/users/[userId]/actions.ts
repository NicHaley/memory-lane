"use server";

import { type PutBlobResult, put } from "@vercel/blob";
import { db } from "@repo/database";
import { action } from "~/lib/safe-action";
import { revalidatePath } from "next/cache";
import { createMemorySchema } from "./schema";

export async function uploadImage(formData: FormData) {
  const imageFile = formData.get("image") as File;
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });
  revalidatePath("/");
  return blob;
}

export const createMemory = action(
  createMemorySchema,
  async ({ name, description, image, timestamp }) => {
    let blob: PutBlobResult | null = null;

    if (image) {
      blob = await put(image.name, image, {
        access: "public",
      });

      console.log(11111, blob);
    }

    await db.memory.create({
      data: {
        name,
        description,
        image: blob?.url,
        timestamp,
      },
    });
  }
);
