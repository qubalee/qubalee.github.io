import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // For hash-based in-page navigation, let existing handlers manage scrolling
    if (location.hash) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollToTop;

