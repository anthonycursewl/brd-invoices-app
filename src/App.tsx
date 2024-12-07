// Global Styles
import './App.css'

import { lazy, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createCookie } from "./shared/Cookies/setCookie";

// Componente para protejer las rutas uwu
const ProtectedRoutes = lazy(() => import("./ProtectedRoutes/ProtectedRoutes"));
import { useGlobalState } from "./store/useGlobalState";
import ConfigUsers from "./Config-users/config.users";
import BrdR from "./BRD-R/brd-r";

// Auth component like login and stuff like that

const Dashboard = lazy(() => import("./Dashboard/dashboard"));
const Login = lazy(() => import("./Auth/Login/login"));
const Register = lazy(() => import("./Auth/register/register"));
const Payments = lazy(() => import("./Payments/payments"));
const Products = lazy(() => import("./Products/products"));
const MainNotification = lazy(() => import("./shared/SystemNotification/main.notification"));
const Profile = lazy(() => import('./Profile/profile'))

function App() {
  const { toggleTheme } = useGlobalState();

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    createCookie("theme", prefersDark.matches ? "dark" : "light", 1000 * 1000, false, false);
    const mediaQueryListener = () => {
      createCookie("theme", prefersDark.matches ? "dark" : "light", 1000 * 1000, false, false);
      toggleTheme(prefersDark.matches ? true : false);
    };

    prefersDark.addEventListener("change", mediaQueryListener);

    return () => {
      prefersDark.removeEventListener("change", mediaQueryListener);
    };
  }, []);

  return (
    <BrowserRouter>

      <Suspense>
        <MainNotification />
      </Suspense>
      
      <Routes>
        <Route 
        path="/"
        element={
          <>
          dashboard para la landing y así
          </>
        }
        />

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
          path="/dashboard/config/:id_user"
          element={
            <Suspense fallback={null}>
              <ProtectedRoutes>
                <ConfigUsers />
              </ProtectedRoutes>
            </Suspense>
          }
        />

        <Route
          path="/dashboard/profile/:id_user"
          element={
            <Suspense fallback={null}>
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            </Suspense>
          }
        />

        <Route
          path="/dashboard/repositories/:id_user"
          element={
            <Suspense fallback={null}>
              <ProtectedRoutes>
                <BrdR />
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
