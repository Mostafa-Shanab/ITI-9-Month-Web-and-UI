import Link from "next/link";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

async function getPosts() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ id: 1 }).lean();
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to fetch posts from MongoDB:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      <div>
        <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
            <div className="w-25 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
              Shanab
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12">
          {posts.length === 0 ? (
            <div className="mt-12 text-center max-w-md mx-auto p-8 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40">
              <h2 className="text-xl font-semibold text-slate-200">
                No posts in the database yet
              </h2>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Your MongoDB collection is empty. Click the button below to seed
                the database with posts from the DummyJSON API.
              </p>
              <div className="mt-6">
                <Link
                  href="/api/posts/seed"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition duration-200"
                >
                  Seed Database Now
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="group flex flex-col justify-between p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 hover:border-slate-700 transition-all duration-300 shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-2xs font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-lg font-bold text-slate-100 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                      {post.body}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        👍 {post.reactions?.likes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        👎 {post.reactions?.dislikes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        👁️ {post.views || 0}
                      </span>
                    </div>

                    <Link
                      href={`/posts/${post.id}`}
                      className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition duration-200 border border-indigo-500/20 hover:border-indigo-600"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
