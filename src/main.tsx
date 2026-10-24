import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import AppToaster from "@/components/organisms/AppToaster";
import AdminLayout from "@/layouts/AdminLayout";
import AdminCategoryPage from "@/pages/AdminCategoryPage";
import AdminCompetitionPage from "@/pages/AdminCompetitionPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminEventSettingsPage from "@/pages/AdminEventSettingsPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthBootstrap from "@/routes/AuthBootstrap";
import ProtectedRoute from "@/routes/ProtectedRoute";

import "./global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AuthBootstrap />}>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/lomba" element={<AdminCompetitionPage />} />
              <Route path="/admin/kategori" element={<AdminCategoryPage />} />
              <Route
                path="/admin/pengaturan"
                element={<AdminEventSettingsPage />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <AppToaster />
    </BrowserRouter>
  </StrictMode>,
);
