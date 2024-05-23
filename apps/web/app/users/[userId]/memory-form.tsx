"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@repo/lib/classnames";
import { Calendar } from "@repo/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import {
  useForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
  zodResolver,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/text-area";
import { Button } from "@repo/ui/components/button";
import { useAction } from "next-safe-action/hooks";
import { createMemorySchema, type CreateMemorySchema } from "./schema";
import { createMemory } from "./actions";
import { toast } from "@repo/ui/components/toaster";
import { Spinner } from "@repo/ui/components/spinner";

interface MemoryFormProps {
  userId: string;
}

export function MemoryForm({ userId }: MemoryFormProps) {
  const memoryForm = useForm<CreateMemorySchema>({
    mode: "onChange",
    resolver: zodResolver(createMemorySchema),
    defaultValues: {
      userId,
    },
  });

  const { execute, status } = useAction(createMemory, {
    onSuccess: () => {
      memoryForm.reset();
      toast("You have a new memory 🧠");
    },
    onError: () => {
      toast("There was an issue creating your memory.");
    },
  });

  /**
   * Workaround to get the proper file object
   */
  const { ref, ...imageField } = memoryForm.register("image");

  const onSubmit = (data: CreateMemorySchema) => {
    console.log(data);

    const formData = new FormData();

    formData.append("image", data.image[0] as File);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("timestamp", data.timestamp.toISOString());
    formData.append("userId", data.userId);

    execute(formData);
  };

  return (
    <Form {...memoryForm}>
      <form className="space-y-4" onSubmit={memoryForm.handleSubmit(onSubmit)}>
        {/* Name */}
        <FormField
          control={memoryForm.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={memoryForm.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={memoryForm.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  ref={ref}
                  {...imageField}
                  type="file"
                  id="image"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of memory */}
        <FormField
          control={memoryForm.control}
          name="timestamp"
          render={({ field }) => (
            <FormItem className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <FormLabel>Date of Memory</FormLabel>
                </PopoverTrigger>
                <FormControl>
                  <FormItem>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !(field.value as Date | null) &&
                            "text-muted-foreground"
                        )}
                        variant="outline"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {(field.value as Date | null) ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        disabled={field.disabled}
                        initialFocus
                        mode="single"
                        onSelect={field.onChange}
                        selected={field.value}
                      />
                    </PopoverContent>
                  </FormItem>
                </FormControl>
                <FormMessage />
              </Popover>
            </FormItem>
          )}
        />
        <div className="pt-2 flex justify-end">
          <Button disabled={status === "executing"} type="submit">
            {status === "executing" ? <Spinner /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
