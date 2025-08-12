import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "New Page | Xplore25",
  description: "A new page to start building features for Xplore25.",
};

export default function NewPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">New Page</h1>
        <p className="text-gray-300 mb-8">
          You can start building your new page here. This route lives at
          <code className="ml-1 px-2 py-1 rounded bg-white/10 border border-white/20">/new-page</code>.
        </p>

        <div className="space-y-4">
          <section className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Section title</h2>
            <p className="text-gray-300">Add your content and components here.</p>
          </section>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-block px-4 py-2 rounded border border-white/20 bg-white/10 hover:bg-white/20 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}


