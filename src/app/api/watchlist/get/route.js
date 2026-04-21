import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return Response.json(
        { error: "Please sign in or sign up first" },
        { status: 401 }
      );
    }

    // ✅ STEP 1: Get internal user
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!dbUser) {
      return Response.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // ✅ STEP 2: Fetch watchlists using userId (FAST + CLEAN)
    const watchlists = await prisma.watchlist.findMany({
      where: {
        userId: dbUser.id,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(watchlists);
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Error fetching watchlists" },
      { status: 500 }
    );
  }
}