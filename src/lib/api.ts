// API Configuration and Helper Functions
const BASE_URL = "http://localhost:5000/api/v1";
const API_KEY = "your-secure-api-key";

export class ApiClient {
  private baseUrl: string;
  private apiKey: string;
  private token?: string;

  constructor() {
    this.baseUrl = BASE_URL;
    this.apiKey = API_KEY;
    this.token = localStorage.getItem("token") || undefined;
  }

  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };

    if (includeAuth && this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  clearToken() {
    this.token = undefined;
    localStorage.removeItem("token");
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = false
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(includeAuth),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Authentication endpoints
  async register(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) {
    return this.request("/userapp/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { phone: string; password: string }) {
    return this.request("/userapp/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser() {
    return this.request("/userapp/auth/me", {}, true);
  }

  async logout() {
    return this.request("/userapp/auth/logout", { method: "POST" }, true);
  }

  async sendOtp(phone: string) {
    return this.request("/userapp/auth/send-otp", {
      method: "PUT",
      body: JSON.stringify({ phone }),
    });
  }

  async forgotPassword(data: {
    phone: string;
    code: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.request("/userapp/auth/forgot-password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Members endpoints
  async getMembers() {
    return this.request("/dsa/members", {}, true);
  }

  async addMember(memberData: {
    name: string;
    relation: string;
    gender: string;
    dob: string;
    phone: string;
  }) {
    return this.request(
      "/dsa/members",
      {
        method: "POST",
        body: JSON.stringify(memberData),
      },
      true
    );
  }

  async updateMember(
    id: string,
    memberData: Partial<{
      name: string;
      relation: string;
      gender: string;
      dob: string;
      phone: string;
    }>
  ) {
    return this.request(
      `/dsa/members/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(memberData),
      },
      true
    );
  }

  async deleteMember(id: string) {
    return this.request(
      `/dsa/members/${id}`,
      {
        method: "DELETE",
      },
      true
    );
  }

  // External Partner endpoints
  async searchLocation(placeQuery: string) {
    return this.request(
      `/dsa/external/eloc?place_query=${encodeURIComponent(placeQuery)}`,
      {},
      true
    );
  }

  async getLatLong(eloc: string) {
    return this.request(`/dsa/external/latlong?eloc=${eloc}`, {}, true);
  }

  async getTimeSlots(
    collectionDate: string,
    latitude: number,
    longitude: number
  ) {
    return this.request(
      `/dsa/external/time-slots?collection_date=${collectionDate}&latitude=${latitude}&longitude=${longitude}`,
      {},
      true
    );
  }

  async createBooking(bookingData: any) {
    return this.request(
      "/dsa/external/bookings",
      {
        method: "POST",
        body: JSON.stringify(bookingData),
      },
      true
    );
  }

  async getPackageDetails(code: string) {
    return this.request(`/dsa/external/package-details?code=${code}`, {}, true);
  }

  async searchPackages(searchTerm: string) {
    return this.request(
      `/dsa/external/package-search?search=${encodeURIComponent(searchTerm)}`,
      {},
      true
    );
  }
  async getBookingList() {
    return this.request(`/dsa/bookings`, {}, true);
  }
  async getBookingConfirmation(bookingId: string) {
    return this.request(
      `/dsa/external/booking-confirmation?booking_id=${bookingId}`
    );
  }

  async getReport(reportId: string) {
    return this.request(`/dsa/external/reports/${reportId}`);
  }
}

export const apiClient = new ApiClient();
