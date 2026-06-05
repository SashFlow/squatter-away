"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalFloatingButton() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "tenantradar" });
      cal("floatingButton", {
        calLink: "sashflow/tenantradar",
        buttonColor: "#c1b9ff",
        buttonTextColor: "#000000",
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
        },
      });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return null;
}
