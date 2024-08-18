"use client";

import { ReactNode } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

interface IChakraContextProviderProps {
  children: ReactNode;
}

export default function ChakraContextProvider({
  children,
}: IChakraContextProviderProps) {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
}
