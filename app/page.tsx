export default function Home() {
  return (
    // <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          Welcome to LMS 🚀
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-100">
          Manage your institute with ease. Start your journey today!
        </p>
        <a
          href="/register"
          className="inline-block mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </div>
    /* </main> */
  );
}
