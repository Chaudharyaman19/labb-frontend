import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Header from "./components/Header.jsx";
import { Toaster } from "sonner";

import LoginForm from "./components/auth/LoginForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import Sendotp from "./components/auth/Sendotp.jsx";
import Forgotpass from "./components/auth/Forgotpass.jsx";
import PackagesPage from "./pages/PackagesPage.jsx";
import BookAppointmentPage from "./pages/BookAppointmentPage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import Paymentsuccess from "./pages/Paymentsuccess.jsx";
import Paymentfailure from "./pages/Paymentfailure.jsx";
import HomePage from "./pages/HomePage.jsx";
import Homepageweb from "../src/components/website/Landing/Homepageweb.jsx";
import Blog from "../src/components/website/Landing/Blog.jsx";
import Admindashboard from "../src/components/Admin/AdminDashboard.jsx";

import "./App.css";

const AppWrapper = () => {
  const location = useLocation();
  const showHeader = location.pathname === "/lab";

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Homepageweb />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/lab" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/sendotp" element={<Sendotp />} />
          <Route path="/forgotpass" element={<Forgotpass />} />
          <Route path="/payment/success/:id" element={<Paymentsuccess />} />
          <Route path="/payment/fail" element={<Paymentfailure />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
};

export default App;
