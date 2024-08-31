import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import BottomMenu from "./BottomMenu";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-stretch flex-1">
        <SideBar />
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </div>
      <BottomMenu />
    </>
  );
};
export default Layout;
