// routes
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Router from './routes';
import { Routes, Route, Navigate } from 'react-router-dom';
// theme
import { Provider } from 'react-redux';
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

import DashboardLayout from './layouts/dashboard';
// import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
// import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

import PrivateRoutes from './utils/PrivateRoutes';

import store from './app/store';
// import { AuthProvider } from './utils/auth';
// import Router from './routes';
// ----------------------------------------------------------------------

export default function App() {
  // const token = localStorage.getItem('accessToken');

  // if (!token) {
  //   return (
  //     <ThemeProvider>
  //       <LoginPage />
  //     </ThemeProvider>
  //   );
  // }
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      {/* <Router /> */}
      <Routes>
        <Route path="/movies" element={<DashboardLayout />}>
          <Route index element={<Navigate replace to="/movies/finder" />} />
          <Route
            path="finder"
            element={
              <PrivateRoutes>
                <ProductsPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="fav"
            element={
              <PrivateRoutes>
                <ProductsPage />
              </PrivateRoutes>
            }
          />
          <Route path="blog/:idmovie" element={<BlogPage />} />
        </Route>

        <Route element={<LoginPage />} path="/login" replace />

        <Route path="/logout" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  );
}
