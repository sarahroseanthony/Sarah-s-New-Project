export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-3">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
            Coming Soon
          </span>
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            Sarah&apos;s New Project
          </h1>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            Something exciting is being built here. Check back soon for updates.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:sarah@example.com"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Learn More
          </a>
        </div>

        <p className="text-sm text-gray-400">
          Built with care &mdash; stay tuned.
        </p>
      </div>
    </main>
  );
}
