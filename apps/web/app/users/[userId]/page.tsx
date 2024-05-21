import { db } from "@repo/database";
import { Button } from "@repo/ui/components/button";

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
      <Button variant="default">Add a memory</Button>
    </div>
  );
}
