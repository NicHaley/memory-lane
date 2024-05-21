import { db } from "@repo/database";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Uploader } from "~/components/uploader";

export default async function Page({ params }: { params: { userId: string } }) {
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
          <Button variant="default">Add a memory</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Memory</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <div className="h-[200px] flex flex-col">
            <Uploader />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
