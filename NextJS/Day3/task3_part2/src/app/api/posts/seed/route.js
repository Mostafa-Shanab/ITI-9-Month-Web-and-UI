import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export async function GET() {
  try {
    await dbConnect();

    const res = await fetch("https://dummyjson.com/posts", {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from DummyJSON: ${res.statusText}` },
        { status: 500 },
      );
    }

    const data = await res.json();
    const externalPosts = data.posts || [];

    if (externalPosts.length === 0) {
      return NextResponse.json(
        { error: "No posts fetched from DummyJSON" },
        { status: 500 },
      );
    }

    await Post.deleteMany({});

    const postsToInsert = externalPosts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
      tags: post.tags,
      reactions: {
        likes: post.reactions?.likes || 0,
        dislikes: post.reactions?.dislikes || 0,
      },
      views: post.views || 0,
    }));

    const seededPosts = await Post.insertMany(postsToInsert);

    return NextResponse.json({
      success: true,
      message: `Database successfully seeded with ${seededPosts.length} posts!`,
      count: seededPosts.length,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error during database seeding",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
