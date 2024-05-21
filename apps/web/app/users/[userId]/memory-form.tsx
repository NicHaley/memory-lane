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
import { Button } from "@repo/ui/components/button";
import { useAction } from "next-safe-action/hooks";
import { createMemorySchema, type CreateMemorySchema } from "./schema";
import { createMemory } from "./actions";
import { toast } from "@repo/ui/components/toaster";

interface MemoryFormProps {}

export function MemoryForm({}: MemoryFormProps) {
  const memoryForm = useForm<CreateMemorySchema>({
    mode: "onChange",
    resolver: zodResolver(createMemorySchema),
    defaultValues: {},
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

  return (
    <Form {...memoryForm}>
      <form onSubmit={memoryForm.handleSubmit(execute)}>
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
                <Input placeholder="" {...field} />
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
                {/* @ts-expect-error -- Correct type */}
                <Input placeholder="" {...field} type="file" />
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
