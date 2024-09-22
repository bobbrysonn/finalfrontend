// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'

export type ActivationEmailState = {
  activationEmail: string
}

export type ActivationEmailActions = {
  setActivationEmail: (email: string) => void
}

export type ActivationEmailStore = ActivationEmailState & ActivationEmailActions

export const defaultInitState: ActivationEmailState = {
  activationEmail: "",
}

export const createActivationEmailStore = (
  initState: ActivationEmailState = defaultInitState,
) => {
  return createStore<ActivationEmailStore>()((set) => ({
    ...initState,
    setActivationEmail: (activationEmail: string) => set(() => ({ activationEmail })),
  }))
}
