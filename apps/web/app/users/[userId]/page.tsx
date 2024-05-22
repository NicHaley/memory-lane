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
import { Button } from "@repo/ui/components/button";

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
    <div className="flex gap-32">
      <div className="">
        {user.image ? (
          <div className="rounded-full overflow-hidden h-[200px] w-[200px] shadow">
            <Image
              src={user.image}
              alt={user.name}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ) : null}
        <div className="prose">
          <h1 className="mt-6 mb-2">{user.name}</h1>
          {user.blurb ? (
            <p className="text-xl text-gray-600 mt-2">{user.blurb}</p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="ml-auto mb-16">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add a memory</Button>
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
        </div>
        {user.memories.length ? (
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
        ) : (
          <div className="flex justify-center items-center bg-gray-100 text-gray-600 rounded-lg shadow h-[200px]">
            <p>No memories yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
