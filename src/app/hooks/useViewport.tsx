"use client";
import { useMediaQuery } from "@react-hook/media-query";

export const useViewport = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(min-width: 481px) and (max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 769px)");

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
