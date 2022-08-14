import SpinnerComponent from "./Spinner";

export default function AuthComponent({isAuthenticated, isLoading, login, children}) {
  return (
    <div className="max-w-3xl mx-auto">
      {isLoading
        ? <SpinnerComponent />
        : isAuthenticated
          ? children
          : login
      }
    </div>
  );
}
