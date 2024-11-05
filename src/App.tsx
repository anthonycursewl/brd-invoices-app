import { lazy, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createCookie } from "./shared/Cookies/setCookie";

// Componente para protejer las rutas uwu
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import { useGlobalState } from "./store/useGlobalState";

// Auth component like login and stuff like that

const Dashboard = lazy(() => import("./Dashboard/dashboard"));
const Login = lazy(() => import("./Auth/Login/login"));
const Register = lazy(() => import("./Auth/register/register"));
const Payments = lazy(() => import("./Payments/payments"));
const Products = lazy(() => import("./Products/products"));

function App() {
  const { toggleTheme } = useGlobalState();

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    createCookie("theme", prefersDark.matches ? "dark" : "light", 3650);

    const mediaQueryListener = () => {
      createCookie("theme", prefersDark.matches ? "dark" : "light", 3650);
      toggleTheme(prefersDark.matches ? true : false);
    };

    prefersDark.addEventListener("change", mediaQueryListener);

    return () => {
      prefersDark.removeEventListener("change", mediaQueryListener);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={null}>
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            </Suspense>
          }
        />

        <Route
          path="/dashboard/payments/add"
          element={
            <Suspense fallback={null}>
              <ProtectedRoutes>
                <Payments />
              </ProtectedRoutes>
            </Suspense>
          }
        />

        <Route
          path="/dashboard/products/add"
          element={
            <Suspense fallback={null}>
              <ProtectedRoutes>
                <Products />
              </ProtectedRoutes>
            </Suspense>
          }
        />

        <Route
          path="/login"
          element={
            <Suspense fallback={null}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={null}>
              <Register />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
