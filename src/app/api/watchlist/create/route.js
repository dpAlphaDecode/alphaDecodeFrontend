import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const user = await currentUser();

    // ✅ If not signed in
    if (!user) {
      return Response.json(
        { error: "Please sign in or sign up first" },
        { status: 401 }
      );
    }

    const { name } = await req.json();

    // ✅ Find user in DB
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    // ✅ Create user if not exists (proper data, no temp email)
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses?.[0]?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.imageUrl,
        },
      });
    }

    // ✅ Create watchlist
    const watchlist = await prisma.watchlist.create({
      data: {
        name,
        userId: dbUser.id,
      },
    });

    return Response.json(watchlist);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}