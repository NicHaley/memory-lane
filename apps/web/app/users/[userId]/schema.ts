import { z } from "zod";
import { zfd } from "zod-form-data";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createMemorySchema = z.object({
  name: z.string().min(3).max(64),
  description: z.string(),
  timestamp: z.date(),
  userId: z.string(),
  image: z
    .any()
    .refine((files) => {
      const file = files[0];
      return file?.size <= MAX_FILE_SIZE;
    })
    .refine((files) => {
      const file = files[0];
      return ACCEPTED_IMAGE_TYPES.includes(file?.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported.")
    .optional(),
});

export const createMemoryFormDataSchema = zfd.formData({
  name: zfd.text(z.string().min(3).max(64)),
  description: zfd.text(z.string()),
  timestamp: zfd.text(z.string()),
  userId: zfd.text(z.string()),
  image: zfd.file(
    z
      .any()
      .refine((file) => {
        return file?.size <= MAX_FILE_SIZE;
      })
      .refine((file) => {
        return ACCEPTED_IMAGE_TYPES.includes(file?.type);
      })
      .optional()
  ),
});

export type CreateMemorySchema = z.infer<typeof createMemorySchema>;
