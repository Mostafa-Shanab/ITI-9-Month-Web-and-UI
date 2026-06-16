import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ id: 1 });
    return NextResponse.json({ success: true, count: posts.length, posts });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts from database", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.title || !body.body) {
      return NextResponse.json(
        { error: "Title and Body are required fields" },
        { status: 400 },
      );
    }

    const lastPost = await Post.findOne().sort({ id: -1 });
    const nextId = lastPost ? lastPost.id + 1 : 1;

    const newPost = new Post({
      id: nextId,
      title: body.title,
      body: body.body,
      userId: body.userId || 1,
      tags: body.tags || [],
      reactions: {
        likes: body.reactions?.likes || 0,
        dislikes: body.reactions?.dislikes || 0,
      },
      views: body.views || 0,
    });

    await newPost.save();
    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create new post", details: error.message },
      { status: 500 },
    );
  }
}
