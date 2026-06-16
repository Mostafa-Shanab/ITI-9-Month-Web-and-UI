import Link from "next/link";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

async function getPost(id) {
  try {
    await dbConnect();

    const post = await Post.findOne({ id: Number(id) }).lean();
    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.error(`Error fetching post with ID ${id} from MongoDB:`, error);
    return null;
  }
}

export default async function PostDetail({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
        <div className="text-center max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900/40 shadow-xl">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-slate-200">Post Not Found</h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            {`We couldn't find a post with ID "${id}" in the database. Make sure you seeded the database or checked the correct ID.`}
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition duration-200 font-semibold text-sm border border-slate-700"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      <div>
        <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-25 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg group-hover:bg-blue-500 transition duration-200">
                Shanab
              </div>
            </Link>
            <Link
              href="/"
              className="text-xs font-semibold px-4 py-2 rounded-full border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition duration-200"
            >
              ← Back
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/20 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-y-[100%] translate-x-[-10%] sm:translate-x-0 mr-8 bg-blue-600 text-white font-bold text-2xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
              Post ID: {post.id}
            </div>

            <div className="flex flex-wrap gap-2.5 mb-6">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-2xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-800/80 text-blue-400 border border-slate-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 mb-8 pb-6 border-b border-slate-850">
              <span className="flex items-center gap-1.5">
                👤 User ID:{" "}
                <strong className="text-slate-300 font-semibold">
                  {post.userId}
                </strong>
              </span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="flex items-center gap-1.5">
                📅 Seeded At:{" "}
                <strong className="text-slate-300 font-semibold">
                  {new Date(post.createdAt).toLocaleDateString() ===
                  "Invalid Date"
                    ? "Anytime"
                    : new Date(post.createdAt).toLocaleDateString()}
                </strong>
              </span>
            </div>

            <div className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-4">
              <p>{post.body}</p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-850 flex flex-wrap gap-6 items-center justify-between text-sm">
              <div className="flex flex-wrap items-center gap-4 text-slate-400">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-base">👍</span>
                  <span className="font-semibold text-slate-200">
                    {post.reactions?.likes || 0}
                  </span>
                  <span className="text-xs text-slate-500">Likes</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-base">👎</span>
                  <span className="font-semibold text-slate-200">
                    {post.reactions?.dislikes || 0}
                  </span>
                  <span className="text-xs text-slate-500">Dislikes</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-base">👁️</span>
                  <span className="font-semibold text-slate-200">
                    {post.views || 0}
                  </span>
                  <span className="text-xs text-slate-500">Views</span>
                </div>
              </div>

              <div>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-indigo-650/20 hover:shadow-indigo-600/30 transition-all duration-200 text-xs sm:text-sm"
                >
                  ← All Posts
                </Link>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
