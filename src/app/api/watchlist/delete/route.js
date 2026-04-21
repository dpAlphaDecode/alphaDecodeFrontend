import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(req) {
  try {
    const user = await currentUser();

    // ✅ Not signed in
    if (!user) {
      return Response.json(
        { error: "Please sign in or sign up first" },
        { status: 401 }
      );
    }

    // ✅ Proper JSON parsing
    const { id: watchlistId } = await req.json();

    if (!watchlistId) {
      return Response.json(
        { error: "watchlistId is required" },
        { status: 400 }
      );
    }

    // ✅ Get DB user
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return Response.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    // ✅ Find watchlist
    const watchlist = await prisma.watchlist.findUnique({
      where: { id: watchlistId },
    });

    // ✅ Ownership check
    if (!watchlist || watchlist.userId !== dbUser.id) {
      return Response.json(
        { error: "Unauthorized action" },
        { status: 403 }
      );
    }

    // ✅ Delete (items auto-delete via cascade)
    await prisma.watchlist.delete({
      where: { id: watchlistId },
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "Error deleting watchlist" },
      { status: 500 }
    );
  }
}