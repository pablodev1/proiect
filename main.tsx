import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Importurile paginilor
import App from './App.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.tsx';
import { UpdatePasswordPage } from './pages/UpdatePasswordPage.tsx';
import { DashboardPage } from './pages/client/DashboardPage.tsx';
import { ProfilePage } from './pages/client/ProfilePage.tsx';
import { NewTicketPage } from './pages/client/NewTicketPage.tsx';
import { ViewTicketPage } from './pages/client/ViewTicketPage.tsx';
import { TicketHistoryPage } from './pages/client/TicketHistoryPage.tsx'; // <-- IMPORT NOU
import { ErrorPage } from './pages/ErrorPage.tsx';

// LINIA ESENȚIALĂ CARE ADUCE DESIGNUL
import './index.css';

// Structura completă a router-ului
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "servicii", element: <ServicesPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "update-password", element: <UpdatePasswordPage /> },
      {
        path: "client",
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "new-ticket", element: <NewTicketPage /> },
          { path: "ticket/:ticketId", element: <ViewTicketPage /> },
          { path: "history", element: <TicketHistoryPage /> }, // <-- RUTA NOUĂ
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);