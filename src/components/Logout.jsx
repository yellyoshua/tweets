
export default function LogoutComponent({logout}) {
  return <div>
    <button
      className="bg-red-500 text-sm hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
      onClick={logout}
    >
      Logout
    </button>
  </div>
}
