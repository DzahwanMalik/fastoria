import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import AppToaster from "@/components/organisms/AppToaster";
import AdminLayout from "@/layouts/AdminLayout";
import AdminCategoryPage from "@/pages/AdminCategoryPage";
import AdminCompetitionPage from "@/pages/AdminCompetitionPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { initAuth } from "@/store/authStore";

import "./global.css";

initAuth();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/lomba" element={<AdminCompetitionPage />} />
            <Route path="/admin/kategori" element={<AdminCategoryPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AppToaster />
    </BrowserRouter>
  </StrictMode>,
);
