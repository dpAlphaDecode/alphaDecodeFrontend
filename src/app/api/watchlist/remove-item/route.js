import { prisma } from "@/lib/prisma";
import {currentUser} from "@clerk/nextjs/server";

export async function DELETE(req) {
  try {
    const user_id = await currentUser();

    if (!user_id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { watchlistId, symbol } = await req.json();

    if (!watchlistId || !symbol) {
      return Response.json(
        { error: "watchlistId and symbol are required" },
        { status: 400 }
      );
    }

    // ✅ Get DB user
    const user = await prisma.user.findUnique({
     where: { clerkId: user_id.id },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Verify ownership
    const watchlist = await prisma.watchlist.findUnique({
      where: { id: watchlistId },
    });

    if (!watchlist || watchlist.userId !== user.id) {
      return Response.json(
        { error: "Unauthorized access to watchlist" },
        { status: 403 }
      );
    }

    // ✅ Normalize symbol (VERY IMPORTANT)
    const normalizedSymbol = symbol.toUpperCase();

    // ✅ Delete item
    await prisma.watchlistItem.delete({
      where: {
        watchlistId_symbol: {
          watchlistId,
          symbol: normalizedSymbol,
        },
      },
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "Error removing stock" },
      { status: 500 }
    );
  }
}