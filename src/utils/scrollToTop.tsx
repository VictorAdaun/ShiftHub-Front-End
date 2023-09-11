import { useEffect } from "react";
import { useLocation } from "react-router-dom";


type ScrollProps = {
  children: React.ReactNode; // 👈️ type children

};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ScrollToTop(props: ScrollProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);

  return null;
}