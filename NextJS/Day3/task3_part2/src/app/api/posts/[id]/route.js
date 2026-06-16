import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const postId = Number(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "Invalid ID parameter" },
        { status: 400 },
      );
    }

    const post = await Post.findOne({ id: postId });

    if (!post) {
      return NextResponse.json(
        { error: `Post with ID ${postId} not found` },
        { status: 404 },
      );
    }
    console.log("Shanab Say: Post ID is here ", post.id);
    console.log("Shanab Say: Post is here ", post);

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Fetch post by ID error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post", details: error.message },
      { status: 500 },
    );
  }
}
