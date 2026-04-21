import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/getDbUser";

export async function POST(req) {
  try {
    const { watchlistId, symbol } = await req.json();

    if (!watchlistId || !symbol) {
      return Response.json(
        { error: "watchlistId and symbol required" },
        { status: 400 }
      );
    }

    const dbUser = await getDbUser();

    if (!dbUser) {
      return Response.json(
        { error: "Please sign in" },
        { status: 401 }
      );
    }

    const watchlist = await prisma.watchlist.findFirst({
      where: {
        id: watchlistId,
        userId: dbUser.id,
      },
    });

    if (!watchlist) {
      return Response.json(
        { error: "Invalid watchlist" },
        { status: 403 }
      );
    }

    const item = await prisma.watchlistItem.create({
      data: {
        watchlistId,
        symbol,
      },
    });

    return Response.json(item);
  } catch (err) {
    console.error(err);

    if (err.code === "P2002") {
      return Response.json(
        { error: "Already exists" },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Error adding stock" },
      { status: 500 }
    );
  }
}