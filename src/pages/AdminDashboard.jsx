import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  CreditCard,
  Home,
  LogOut,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
} from "lucide-react";
import "../css/admindashboard.css";

const API_BASE_URL = "https://labb-backend.vercel.app/api/v1/admin";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("admin_token") || ""
  );
  const [adminProfile, setAdminProfile] = useState(null);

  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [showRegister, setShowRegister] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersSearch, setUsersSearch] = useState("");

  const [bookings, setBookings] = useState([]);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsTotal, setBookingsTotal] = useState(0);
  const [bookingsFilters, setBookingsFilters] = useState({
    status: "",
    paymentStatus: "",
    search: "",
    startDate: "",
    endDate: "",
  });
  const [bookingStats, setBookingStats] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [payments, setPayments] = useState([]);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const [paymentsTotal, setPaymentsTotal] = useState(0);
  const [paymentsFilters, setPaymentsFilters] = useState({
    paymentStatus: "",
    paymentChannel: "",
    search: "",
    startDate: "",
    endDate: "",
  });
  const [paymentStats, setPaymentStats] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (adminToken) {
      setIsLoggedIn(true);
      fetchAdminProfile();
      if (currentView === "dashboard") fetchDashboardData();
    }
  }, [adminToken]);

  useEffect(() => {
    if (isLoggedIn) {
      if (currentView === "users") fetchUsers();
      else if (currentView === "bookings") {
        fetchBookings();
        fetchBookingStats();
      } else if (currentView === "payments") {
        fetchPayments();
        fetchPaymentStats();
        fetchTotalAmount();
      } else if (currentView === "dashboard") fetchDashboardData();
    }
  }, [currentView, isLoggedIn]);

  const apiCall = async (endpoint, method = "GET", body = null) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      };
      if (body) options.body = JSON.stringify(body);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "API request failed");
      return data;
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok && data.data?.token) {
        setAdminToken(data.data.token);
        localStorage.setItem("admin_token", data.data.token);
        setIsLoggedIn(true);
        setSuccess("Login successful!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("Registration successful! Please login.");
        setShowRegister(false);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setAdminToken("");
    localStorage.removeItem("admin_token");
    setIsLoggedIn(false);
    setAdminProfile(null);
    setCurrentView("dashboard");
  };

  const fetchAdminProfile = async () => {
    try {
      const data = await apiCall("/auth/me");
      setAdminProfile(data.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [usersData, bookingsStatsData, paymentsData] = await Promise.all([
        apiCall("/users?page=1&limit=1"),
        apiCall("/bookings/stats"),
        apiCall("/payments/total-amount?paymentStatus=success"),
      ]);

      console.log("Users Data:", usersData);
      console.log("Bookings Stats Data:", bookingsStatsData);
      console.log("Payments Data:", paymentsData);

      setDashboardStats({
        totalUsers: usersData.data?.paginator?.itemCount || 0,
        totalBookings: bookingsStatsData.data?.totalBookings || 0,
        pendingBookings:
          bookingsStatsData.data?.paginator?.pendingBookings || 0,
        totalRevenue: paymentsData.data?.totalAmount || 0,
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to fetch dashboard data");
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiCall(
        `/users?page=${usersPage}&limit=10&search=${usersSearch}`
      );

      console.log("Users API response:", response);

      setUsers(response.data?.data || []);
      setUsersTotal(response.data?.paginator?.total || 0);
    } catch (err) {
      console.error("Users fetch error:", err);
      setError("Failed to fetch users");
    }
    setLoading(false);
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      query.append("page", bookingsPage);
      query.append("limit", 100);

      Object.entries(bookingsFilters).forEach(([key, value]) => {
        if (value) query.append(key, value);
      });

      const data = await apiCall(`/bookings?${query.toString()}`);

      console.log("Bookings API response:", data);

      setBookings(data.data?.data || []);
      setBookingsTotal(data.data?.paginator?.total || 0);
    } catch (err) {
      setError("Failed to fetch bookings");
      console.error(err);
    }
    setLoading(false);
  };

  const fetchBookingStats = async () => {
    try {
      const data = await apiCall("/bookings/stats");
      setBookingStats(data.data);
    } catch (err) {
      console.error("Failed to fetch booking stats");
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    setLoading(true);
    try {
      await apiCall(`/bookings/${bookingId}/status`, "PUT", status);
      setSuccess("Booking updated successfully");
      fetchBookings();
      setSelectedBooking(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update booking");
    }
    setLoading(false);
  };

  // Payments fetch
  const fetchPayments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: paymentsPage,
        limit: 100,
        ...paymentsFilters,
      });

      const response = await apiCall(`/payments?${params.toString()}`);
      console.log("Payments API response:", response);

      setPayments(response.data?.data || []);
      setPaymentsTotal(response.data?.paginator?.total || 0);
    } catch (err) {
      setError("Failed to fetch payments");
      console.error(err);
    }
    setLoading(false);
  };

  // Payment statistics fetch
  const fetchPaymentStats = async () => {
    try {
      const response = await apiCall("/payments/stats");
      console.log("Payment stats response:", response);

      setPaymentStats(response.data || {}); // stats object
    } catch (err) {
      console.error("Failed to fetch payment stats", err);
    }
  };

  // Use effect to call them on component mount
  useEffect(() => {
    fetchPayments();
    fetchPaymentStats();
  }, [paymentsPage, paymentsFilters]);

  const fetchTotalAmount = async () => {
    try {
      const data = await apiCall(
        "/payments/total-amount?paymentStatus=success"
      );
      setTotalAmount(data.data?.totalAmount || 0);
    } catch (err) {
      console.error("Failed to fetch total amount");
    }
  };

  const updatePaymentStatus = async (paymentId, status) => {
    setLoading(true);
    try {
      await apiCall(`/payments/${paymentId}/status`, "PUT", status);
      setSuccess("Payment updated successfully");
      fetchPayments();
      setSelectedPayment(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update payment");
    }
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>DSA Booking Admin</h1>
            <p>Manage your booking system</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {!showRegister ? (
            <form onSubmit={handleLogin} className="login-form">
              <h2>Login</h2>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone"
                  value={loginData.phone}
                  onChange={(e) =>
                    setLoginData({ ...loginData, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="toggle-form">
                Don't have an account?{" "}
                <span onClick={() => setShowRegister(true)}>Register</span>
              </p>
            </form>
          ) : (
            ""
            // <form onSubmit={handleRegister} className="login-form">
            //   <h2>Register</h2>
            //   <div className="form-group">
            //     <label>Full Name</label>
            //     <input
            //       type="text"
            //       placeholder="Enter your name"
            //       value={registerData.name}
            //       onChange={(e) =>
            //         setRegisterData({ ...registerData, name: e.target.value })
            //       }
            //       required
            //     />
            //   </div>
            //   <div className="form-group">
            //     <label>Phone Number</label>
            //     <input
            //       type="tel"
            //       placeholder="Enter your phone"
            //       value={registerData.phone}
            //       onChange={(e) =>
            //         setRegisterData({ ...registerData, phone: e.target.value })
            //       }
            //       required
            //     />
            //   </div>
            //   <div className="form-group">
            //     <label>Email</label>
            //     <input
            //       type="email"
            //       placeholder="Enter your email"
            //       value={registerData.email}
            //       onChange={(e) =>
            //         setRegisterData({ ...registerData, email: e.target.value })
            //       }
            //       required
            //     />
            //   </div>
            //   <div className="form-group">
            //     <label>Password</label>
            //     <input
            //       type="password"
            //       placeholder="Enter your password"
            //       value={registerData.password}
            //       onChange={(e) =>
            //         setRegisterData({
            //           ...registerData,
            //           password: e.target.value,
            //         })
            //       }
            //       required
            //     />
            //   </div>
            //   <button
            //     type="submit"
            //     className="btn btn-primary"
            //     disabled={loading}
            //   >
            //     {loading ? "Registering..." : "Register"}
            //   </button>
            //   <p className="toggle-form">
            //     Already have an account?{" "}
            //     <span onClick={() => setShowRegister(false)}>Login</span>
            //   </p>
            // </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>ADMIN_PANNEL </h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-itemm ${
              currentView === "dashboard" ? "active" : ""
            }`}
            onClick={() => setCurrentView("dashboard")}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-itemm ${currentView === "users" ? "active" : ""}`}
            onClick={() => setCurrentView("users")}
          >
            <Users size={20} />
            <span>Users</span>
          </button>
          <button
            className={`nav-itemm ${
              currentView === "bookings" ? "active" : ""
            }`}
            onClick={() => setCurrentView("bookings")}
          >
            <Calendar size={20} />
            <span>Bookings</span>
          </button>
          <button
            className={`nav-itemm ${
              currentView === "payments" ? "active" : ""
            }`}
            onClick={() => setCurrentView("payments")}
          >
            <CreditCard size={20} />
            <span>Payments</span>
          </button>
        </nav>
        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">
              {adminProfile?.name?.charAt(0) || "A"}
            </div>
            <div className="admin-details">
              <p className="admin-name">{adminProfile?.name || "Admin"}</p>
              <p className="admin-email">{adminProfile?.email || ""}</p>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <h1>{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h1>
        </header>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {currentView === "dashboard" && (
          <div className="dashboard-view">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users-icon">
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Total Users</p>
                  <h3 className="stat-value">{dashboardStats.totalUsers}</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon bookings-icon">
                  <Calendar size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Total Bookings</p>
                  <h3 className="stat-value">{dashboardStats.totalBookings}</h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon revenue-icon">
                  <DollarSign size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Total Revenue</p>
                  <h3 className="stat-value">
                    ₹{dashboardStats.totalRevenue.toLocaleString()}
                  </h3>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon pending-icon">
                  <Clock size={24} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Pending Bookings</p>
                  <h3 className="stat-value">
                    {dashboardStats.pendingBookings}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === "users" && (
          <div className="users-view">
            <div className="view-controls">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={usersSearch}
                  onChange={(e) => setUsersSearch(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchUsers()}
                />
              </div>
              <button className="btn btn-primary" onClick={fetchUsers}>
                Search
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading users...</div>
            ) : (
              <>
                <div className="table-container">
                  <table className="data-table kaju">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <button
                    className="btn btn-secondary"
                    disabled={usersPage === 1}
                    onClick={() => {
                      setUsersPage(usersPage - 1);
                      fetchUsers();
                    }}
                  >
                    Previous
                  </button>
                  <span className="page-info">
                    Page {usersPage} of {Math.ceil(usersTotal / 10)}
                  </span>
                  <button
                    className="btn btn-secondary"
                    disabled={usersPage >= Math.ceil(usersTotal / 10)}
                    onClick={() => {
                      setUsersPage(usersPage + 1);
                      fetchUsers();
                    }}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {currentView === "bookings" && (
          <div className="bookings-view">
            {bookingStats && (
              <div className="stats-row">
                <div className="stat-mini">
                  <TrendingUp size={20} />
                  <div>
                    <p>Total</p>
                    <h4>{bookingStats.totalBookings}</h4>
                  </div>
                </div>
                <div className="stat-mini">
                  <CheckCircle size={20} />
                  <div>
                    <p>Confirmed</p>
                    <h4>{bookingStats.confirmedBookings}</h4>
                  </div>
                </div>
                <div className="stat-mini">
                  <Clock size={20} />
                  <div>
                    <p>Pending</p>
                    <h4>{bookingStats.pendingBookings}</h4>
                  </div>
                </div>
              </div>
            )}

            <div className="view-controls">
              <div className="filters">
                <select
                  value={bookingsFilters.status}
                  onChange={(e) =>
                    setBookingsFilters({
                      ...bookingsFilters,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={bookingsFilters.paymentStatus}
                  onChange={(e) =>
                    setBookingsFilters({
                      ...bookingsFilters,
                      paymentStatus: e.target.value,
                    })
                  }
                >
                  <option value="">All Payments</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
                <input
                  type="text"
                  placeholder="Search..."
                  value={bookingsFilters.search}
                  onChange={(e) =>
                    setBookingsFilters({
                      ...bookingsFilters,
                      search: e.target.value,
                    })
                  }
                />
              </div>
              <button className="btn btn-primary" onClick={fetchBookings}>
                <Filter size={18} />
                Apply Filters
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading bookings...</div>
            ) : (
              <>
                <div className="table-container">
                  <table className="data-table kaju">
                    <thead>
                      <tr>
                        <th>Booking_Id</th>
                        <th>User_Id</th>
                        <th>Users</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>{booking._id}</td>
                          <td>{booking.bookingId}</td>
                          <td>{booking.customer?.name || "N/A"}</td>
                          <td>
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </td>
                          <td>
                            <span
                              className={`badge badge-${booking.bookingStatus}`}
                            >
                              {booking.bookingStatus}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge badge-${booking.paymentStatus}`}
                            >
                              {booking.paymentStatus}
                            </span>
                          </td>
                          <td>
                            ₹
                            {booking.discountedPrice?.final_total_price ||
                              booking.totalAmount}
                          </td>
                          <td>
                            <button
                              className="btn-icon"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Edit size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <button
                    className="btn btn-secondary"
                    disabled={bookingsPage === 1}
                    onClick={() => {
                      setBookingsPage(bookingsPage - 1);
                      fetchBookings();
                    }}
                  >
                    Previous
                  </button>
                  <span className="page-info">
                    Page {bookingsPage} of {Math.ceil(bookingsTotal / 10)}
                  </span>
                  <button
                    className="btn btn-secondary"
                    disabled={bookingsPage >= Math.ceil(bookingsTotal / 10)}
                    onClick={() => {
                      setBookingsPage(bookingsPage + 1);
                      fetchBookings();
                    }}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {currentView === "payments" && (
          <div className="payments-view">
            {paymentStats && (
              <div className="stats-row">
                <div className="stat-mini">
                  <DollarSign size={20} />
                  <div>
                    <p>Total Amount</p>
                    <h4>₹{totalAmount.toLocaleString()}</h4>
                  </div>
                </div>
                <div className="stat-mini">
                  <CheckCircle size={20} />
                  <div>
                    <p>Successful</p>
                    <h4>{paymentStats.successfulPayments}</h4>
                  </div>
                </div>
                <div className="stat-mini">
                  <XCircle size={20} />
                  <div>
                    <p>Failed</p>
                    <h4>{paymentStats.failedPayments}</h4>
                  </div>
                </div>
              </div>
            )}

            <div className="view-controls">
              <div className="filters">
                <select
                  value={paymentsFilters.paymentStatus}
                  onChange={(e) =>
                    setPaymentsFilters({
                      ...paymentsFilters,
                      paymentStatus: e.target.value,
                    })
                  }
                >
                  <option value="">All Status</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <select
                  value={paymentsFilters.paymentChannel}
                  onChange={(e) =>
                    setPaymentsFilters({
                      ...paymentsFilters,
                      paymentChannel: e.target.value,
                    })
                  }
                >
                  <option value="">All Channels</option>
                  <option value="razorpay">Razorpay</option>
                  <option value="stripe">Stripe</option>
                  <option value="cash">Cash</option>
                </select>
                <input
                  type="text"
                  placeholder="Search..."
                  value={paymentsFilters.search}
                  onChange={(e) =>
                    setPaymentsFilters({
                      ...paymentsFilters,
                      search: e.target.value,
                    })
                  }
                />
              </div>
              <button className="btn btn-primary" onClick={fetchPayments}>
                <Filter size={18} />
                Apply Filters
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading payments...</div>
            ) : (
              <>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Payment_ID</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td>{payment.order_id}</td>
                          <td>{payment.payment_id}</td>

                          <td>
                            <span
                              className={`badge badge-${payment.paymentStatus}`}
                            >
                              {payment.paymentStatus}
                            </span>
                          </td>
                          <td>
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              className="btn-icon"
                              onClick={() => setSelectedPayment(payment)}
                            >
                              <Edit size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <button
                    className="btn btn-secondary"
                    disabled={paymentsPage === 1}
                    onClick={() => {
                      setPaymentsPage(paymentsPage - 1);
                      fetchPayments();
                    }}
                  >
                    Previous
                  </button>
                  <span className="page-info">
                    Page {paymentsPage} of {Math.ceil(paymentsTotal / 10)}
                  </span>
                  <button
                    className="btn btn-secondary"
                    disabled={paymentsPage >= Math.ceil(paymentsTotal / 10)}
                    onClick={() => {
                      setPaymentsPage(paymentsPage + 1);
                      fetchPayments();
                    }}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {selectedBooking && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedBooking(null)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Update Booking Status</h2>
              <div className="modal-body">
                <div className="form-group">
                  <label>Booking Status</label>
                  <select
                    value={selectedBooking.bookingStatus}
                    onChange={(e) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        bookingStatus: e.target.value,
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Status</label>
                  <select
                    value={selectedBooking.paymentStatus}
                    onChange={(e) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        paymentStatus: e.target.value,
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    rows="3"
                    placeholder="Add notes..."
                    value={selectedBooking.notes || ""}
                    onChange={(e) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedBooking(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    updateBookingStatus(selectedBooking.id, {
                      bookingStatus: selectedBooking.bookingStatus,
                      paymentStatus: selectedBooking.paymentStatus,
                      notes: selectedBooking.notes,
                    })
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedPayment && (
          <div
            className="modal-overlay"
            onClick={() => setSelectedPayment(null)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Update Payment Status</h2>
              <div className="modal-body">
                <div className="form-group">
                  <label>Payment Status</label>
                  <select
                    value={selectedPayment.paymentStatus}
                    onChange={(e) =>
                      setSelectedPayment({
                        ...selectedPayment,
                        paymentStatus: e.target.value,
                      })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    rows="3"
                    placeholder="Add notes..."
                    value={selectedPayment.notes || ""}
                    onChange={(e) =>
                      setSelectedPayment({
                        ...selectedPayment,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedPayment(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    updatePaymentStatus(selectedPayment.id, {
                      paymentStatus: selectedPayment.paymentStatus,
                      notes: selectedPayment.notes,
                    })
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
