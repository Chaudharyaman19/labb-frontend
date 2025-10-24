// API Types for DSA Booking System
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: number;
  languagePreference: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: User & { token: string };
}

export interface Member {
  _id: string;
  userId: string;
  name: string;
  relation: string;
  gender: string;
  dob: string;
  phone: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  type: string;
  eloc: string;
  placeName: string;
  placeAddress: string;
}

export interface TimeSlot {
  id: number;
  available_slot: number;
  format_24_hrs: {
    start_time: string;
    end_time: string;
  };
  format_12_hrs: {
    start_time: string;
    end_time: string;
  };
}

export interface Package {
  name: string;
  code: string;
  data: PackageGroup[];
  parameter: number;
}

export interface PackageGroup {
  name: string;
  package_detail: Array<{ name: string }>;
}

export interface Booking {
  booking_date: string;
  collection_slot: number;
  package_code: string;
  customer_phonenumber: string;
  customer_whatsapppnumber: string;
  customer_latitude: number;
  customer_longitude: number;
  customer_name: string;
  pincode: string;
  is_credit: boolean;
  customer_gender: string;
  customer_landmark: string;
  customer_address: string;
  customer_email: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}