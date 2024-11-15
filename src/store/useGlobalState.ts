import { create } from "zustand";
import { getCookie } from "../shared/Cookies/GetCookie";
import { TypeNotification } from "../shared/Interfaces/TypeNotification";


interface GlobalState {
    isDarkMode: boolean
    toggleTheme: (v: boolean) => void
    AuthToken: string | null
    setAuthToken: (v: string) => void
    menuNavStatus: boolean
    setMenuNavStatus: (v: boolean) => void
    signalReload: number
    updateSignalReload: (sg: number) => void,
    isOpenConfirm: boolean,
    setIsOpenConfirm: (v: boolean) => void,
    modalQrBarcode: boolean,
    setModalQrBarcode: (v: boolean) => void,

    // States and values for System Notification
    isNotification: boolean,
    setIsNotification: (v: boolean) => void
    currentNotification: TypeNotification[],
    setCurrentNotification: (v: TypeNotification[]) => void,
    sendNewNotification: (v: TypeNotification, cNotis: TypeNotification[]) => void
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
  signalReload: 0,
  updateSignalReload: (sg: number) => set({ signalReload: sg }),
  isOpenConfirm: false,
  setIsOpenConfirm: (v: boolean) => set({ isOpenConfirm: v }),
  modalQrBarcode: false,
  setModalQrBarcode: (v: boolean) => set({ modalQrBarcode: v }),

  // States and values for System Notification
  isNotification: false,
  setIsNotification: (v: boolean) => set({ isNotification: v }),
  currentNotification: [{ message: '', title: '', type: '' }],
  setCurrentNotification: (v: TypeNotification[]) => set({ currentNotification: v }),
  sendNewNotification: (v: TypeNotification, cNotis: TypeNotification[]) => set({ currentNotification: [...cNotis, v], isNotification: true }),
}));  



