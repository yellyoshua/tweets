import ProfileComponent from "../components/Profile";
import LogoutComponent from "../components/Logout";
import { withSession } from "../HOC/withSession";

const ProfileWithSession = withSession(ProfileComponent);
const LogoutWithSession = withSession(LogoutComponent);

export default function TopBar({appTitle = "Tweets Deploy"}) {
  return (
    <div className="flex items-center w-full justify-between mt-10 mb-3">
      <h1 className='text-lg font-bold font-mono whitespace-nowrap'>{appTitle}</h1>
      <div className="flex items-center w-full justify-end">
        <ProfileWithSession />
        <LogoutWithSession />
      </div>
    </div>
  );
}
