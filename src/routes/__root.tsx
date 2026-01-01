import GlobalTimer from "@/components/global-timer";
import { BackgroundSelector } from "@/components/background-selector";
import { GlobalTimerProvider } from "@/context/global-timer-context";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, rootRouteWithContext } from "@tanstack/react-router";

export const Route = rootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <GlobalTimerProvider>
      <div className="container">
        <div className="min-h-screen">
          <Outlet />
        </div>

        <GlobalTimer />
        <BackgroundSelector />
      </div>
    </GlobalTimerProvider>
  );
}
