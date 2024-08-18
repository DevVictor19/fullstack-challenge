import { ReactNode } from "react";
import MuiContextProvider from "./MuiContextProvider";
import QueryProvider from "./QueryProvider";

interface IProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: IProvidersProps) {
  return (
    <QueryProvider>
      <MuiContextProvider>{children}</MuiContextProvider>
    </QueryProvider>
  );
}
