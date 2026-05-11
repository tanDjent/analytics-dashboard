import { useEffect, useState } from "react";

export const useDelayedLoading = (isLoading: boolean, delay = 1000) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timer = setTimeout(() => setShowLoader(true), 0);
    } else {
      timer = setTimeout(() => setShowLoader(false), delay);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showLoader;
};
