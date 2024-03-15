import { useHistory } from "react-router-dom";
import React, { useCallback, useEffect } from "react";

export function useHashRouterLegacy() {
  const history = useHistory();

  const onHashChange = useCallback(
    (event) => {
      let url = event.newURL.split("#").pop() ?? "/";

      if (url[0] === "/") {
        history && history.replace(url);
      }
    },
    [history]
  );

  useEffect(() => {
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [onHashChange]);

  useEffect(() => {
    if (!history) {
      return;
    }
    const currentUrl = window.location.href;

    if (currentUrl.includes("#")) {
      const path = currentUrl.split("#")[1];
      history.replace(path);
    }
  }, [history]);
}