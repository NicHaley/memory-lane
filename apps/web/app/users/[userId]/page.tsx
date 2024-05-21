import { db } from "@repo/database";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { uploadImage } from "./actions";

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
          <div className="flex flex-col">
            <form action={uploadImage}>
              <label htmlFor="image">Image</label>
              <input type="file" id="image" name="image" required />
              <button>Upload</button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
