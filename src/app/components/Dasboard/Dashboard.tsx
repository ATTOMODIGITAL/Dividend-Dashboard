import React, { useEffect, useRef } from "react";
import GraphicsComponent from "./GraphicsComponent/GraphicsComponent";
import MapComponent from "./AirBnbMapComponent/AirBnbMapComponent";

type PageToShow = "map" | "graphics";

interface DashboardProps {
  pageToShow: PageToShow;
  isSidebarOpen: boolean;
}

function Dashboard({ pageToShow, isSidebarOpen }: DashboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageToShow === "map") {
      containerRef.current?.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pageToShow]);

  return (
    <div
      ref={containerRef}
      className={`
        relative w-full h-full 
        ${pageToShow === "graphics" ? "overflow-auto" : "overflow-hidden"}
      `}
    >
      <div
        className={`
          absolute inset-0 transition-opacity duration-300 px-[54px] pt-[8.3rem]
          ${
            pageToShow === "graphics"
              ? "opacity-100"
              : "opacity-0 -z-10 pointer-events-none"
          }
        `}
      >
        <GraphicsComponent isSidebarOpen={isSidebarOpen} />
      </div>

      <div
        className={`
          absolute inset-0 transition-opacity duration-300
          ${
            pageToShow === "map"
              ? "opacity-100 overflow-hidden"
              : "opacity-0 -z-10 pointer-events-none"
          }
        `}
      >
        <MapComponent />
      </div>
    </div>
  );
}

export default React.memo(Dashboard);
