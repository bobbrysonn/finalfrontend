"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type ActivationEmailStore,
  createActivationEmailStore,
} from "@/stores/activationemail-store";

export type ActivationEmailStoreApi = ReturnType<
  typeof createActivationEmailStore
>;

export const ActivationEmailStoreContext = createContext<
  ActivationEmailStoreApi | undefined
>(undefined);

export interface ActivationEmailStoreProviderProps {
  children: ReactNode;
}

export const ActivationEmailStoreProvider = ({
  children,
}: ActivationEmailStoreProviderProps) => {
  const storeRef = useRef<ActivationEmailStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createActivationEmailStore();
  }

  return (
    <ActivationEmailStoreContext.Provider value={storeRef.current}>
      {children}
    </ActivationEmailStoreContext.Provider>
  );
};

export const useActivationEmailStore = <T,>(
  selector: (store: ActivationEmailStore) => T
): T => {
  const activationEmailStoreContext = useContext(ActivationEmailStoreContext);

  if (!activationEmailStoreContext) {
    throw new Error(
      `useActivationEmailStore must be used within ActivationEmailStoreProvider`
    );
  }

  return useStore(activationEmailStoreContext, selector);
};
