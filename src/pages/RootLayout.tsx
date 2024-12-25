import { Outlet } from "react-router";

import MainNavigation from "../components/Navgiation/MainNavigation";

const RootLayout = (): JSX.Element => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
