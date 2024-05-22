import { db } from "@repo/database";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { MemoryForm } from "./memory-form";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { userId?: string };
}) {
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
    include: {
      memories: {
        orderBy: {
          timestamp: "desc",
        },
      },
    },
  });

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <Dialog>
        <DialogTrigger>
          Add a memory
          {/* <Button variant="default">Add a memory</Button> */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Memory</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <div className="flex flex-col">
            <MemoryForm userId={user.id} />
          </div>
        </DialogContent>
      </Dialog>
      <ul>
        {user.memories.map((memory) => (
          <li key={memory.id}>
            <h2>{memory.name}</h2>
            <p>{memory.description}</p>
            {memory.image ? (
              <Image
                src={memory.image}
                alt={memory.name}
                width={300}
                height={300}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
