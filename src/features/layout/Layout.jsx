import { Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import SkeletonContentPage from "../../skeletons/SkeletonContentPage";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  setCategories,
  setDescriptions,
  setSelectedDescriptions,
} from "../globals/globalsSlice";
import {
  useLazyGetCategoriesQuery,
  useLazyGetDescriptionsQuery,
  useLazyGetProfileQuery,
} from "../globals/globalsApiSlice";
import { selectAuth } from "../auth/authSlice";

const Layout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const [getDescriptions, { data: desc, isSuccess: isSuccessDesc }] =
    useLazyGetDescriptionsQuery();

  const [
    getCategories,
    { data: cat, isLoading, isError, isSuccess: isSuccessCat },
  ] = useLazyGetCategoriesQuery();

  const [getProfile, { data: userDescriptions, isSuccess: isSuccessProfile }] =
    useLazyGetProfileQuery();

  useEffect(() => {
    if (auth?.username) {
      getCategories();
      getDescriptions();
      getProfile();
    }
  }, [auth]);

  useEffect(() => {
    if (isSuccessProfile && Array.isArray(userDescriptions)) {
      dispatch(setSelectedDescriptions(userDescriptions));
    }
  }, [userDescriptions]);

  useEffect(() => {
    if (location.pathname.includes("addItems") && (!desc || !cat)) {
      getCategories();
      getDescriptions();
      getProfile();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isSuccessDesc && Array.isArray(desc)) {
      dispatch(setDescriptions(desc));
    }
  }, [desc]);

  useEffect(() => {
    if (isSuccessCat && Array.isArray(cat)) {
      dispatch(setCategories(cat));
    }
  }, [cat]);

  return (
    <>
      <Navbar />
      <div className="flex items-stretch flex-1">
        <SideBar />
        <Suspense fallback={<SkeletonContentPage />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};
export default Layout;
