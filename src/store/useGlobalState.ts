import { create } from "zustand";
import { getCookie } from "../shared/Cookies/GetCookie";

interface GlobalState {
    isDarkMode: boolean
    toggleTheme: (v: boolean) => void
    AuthToken: string | null
    setAuthToken: (v: string) => void
    menuNavStatus: boolean
    setMenuNavStatus: (v: boolean) => void
}

const isDarkMode = getCookie('theme');
const token = getCookie('AuthTokenBRD');
export const useGlobalState = create<GlobalState>((set) => ({
  isDarkMode: isDarkMode === 'dark' ? true : false,
  toggleTheme: (v: boolean) => set({ isDarkMode: v }),
  AuthToken: token || null,
  setAuthToken: (v: string) => set({ AuthToken: v }),
  menuNavStatus: false,
  setMenuNavStatus: (v: boolean) => set({ menuNavStatus: v }),
}));  



