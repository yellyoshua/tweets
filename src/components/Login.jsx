import Link from "next/link";

export default function LoginComponent() {
  return (
    <div className="bg-slate-800 rounded-lg p-5 flex flex-col items-center max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-3 select-none">🔥Authentication</h1>
      <p className="text-center text-xs bg-slate-900 p-1 rounded-sm">Before send tweets. <br/><br/>Need permission to post it!</p>
      <div className="mt-5 select-none">
        <Link
          href="/api/auth"
        >
          <a className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            Login with Twitter
          </a>
        </Link>
      </div>
    </div>
  )
}
