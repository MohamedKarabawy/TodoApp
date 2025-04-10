import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { getDecryptedCookie } from "../utils/cookieUtils";

export default function Layout() {
const userName = getDecryptedCookie('data')?.user?.name;

  return (
    <>
      <Header userName={userName} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
