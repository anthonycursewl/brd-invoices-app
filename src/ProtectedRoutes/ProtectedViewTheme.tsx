import { useGlobalState } from "../store/useGlobalState";
interface ProtectedViewThemeProps {
    children: React.ReactNode
}

export default function ProtectedViewTheme({ children }: ProtectedViewThemeProps) {
    const { isDarkMode } = useGlobalState()

    if (isDarkMode === true || isDarkMode === false) {
        return <>{children}</>
    }
}