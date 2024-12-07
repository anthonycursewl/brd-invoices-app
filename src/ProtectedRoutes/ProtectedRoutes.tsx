import { Navigate, useNavigate } from "react-router-dom";
import { secureFetch } from "../shared/Services/secureFetch";
import { useEffect, useState } from "react";
import { deleteCookie } from "../shared/Cookies/DeleteCookie";
import { APP_URLS } from "../api/urls/url";
import { getCookie } from "../shared/Cookies/GetCookie";
import { createCookie } from "../shared/Cookies/setCookie";
import LoadingSession from "./components/LoadingSession";
import { useGlobalState } from "../store/useGlobalState";

interface ProtectedRoutesProps {
  children: React.ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const { setInfoUser } = useGlobalState()

  // @ts-ignore
  const nav = useNavigate();
  useEffect(() => {
    const token = getCookie('AuthTokenBRD');
    setAuthToken(token);
  }, []);
  
  const checkAuth = async () => {
    setLoading(true);
    const { error, result } = await secureFetch(`${APP_URLS.VERIFY_TOKEN}`, 'GET', null, () => {});

    if (error) {
      console.log(error);
      deleteCookie('AuthTokenBRD');
      nav('/login');
    }


    if (result.status === 200) {
      setIsAuth(true);
      console.log(result)
      setInfoUser(result.user)
    }

    setLoading(false);
  };

  useEffect(() => {
      checkAuth();
  }, [authToken]);

  if (loading) {
    return <LoadingSession />
  }

  if (loading === false && isAuth === false) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;

}
