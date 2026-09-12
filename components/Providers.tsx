import { StoreProvider } from "@/lib/store";
import { AppChrome } from "@/components/AppChrome";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AppChrome>{children}</AppChrome>
    </StoreProvider>
  );
}
