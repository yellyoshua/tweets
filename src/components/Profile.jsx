
export default function ProfileComponent({session}) {
  return <div>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://twitter.com/${session.username}`}
    >
      <img
        src={session.profile_image_url || "https://via.placeholder.com/150"}
        alt={session.username}
        className='rounded-full mr-2 border-2 border-blue-500 h-12 w-12'
      />
    </a>
  </div>
}
