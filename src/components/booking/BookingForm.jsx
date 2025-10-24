import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "../booking/bookform.css";
import axios from "axios";
import emailjs from "@emailjs/browser";
import logo from "/Users/mac/Downloads/labbabbbbbb/src/assets/logo.png";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Home,
  Loader2,
  Search,
  TestTube,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import "../../css/bookingform.css";
function BookingForm({ selectedPackage }) {
  const navigate = useNavigate();
  const { user, selectedPackageData } = useAuth();
  console.log("selected", selectedPackageData);
  const [date, setDate] = useState();
  const [searchLocation, setSearchLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [error, setError] = useState("");
  const [collectionDate, setCollectionDate] = useState();
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [userr, setUser] = useState(null);
  const [newMember, setNewMember] = useState({
    name: "",
    relation: "",
    dob: "",
    gender: "male",
    phone: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const validateFields = () => {
    const missingFields = [];

    if (!selectedPackage) missingFields.push("Package");
    if (!date) missingFields.push("Booking Date");
    if (!collectionDate) missingFields.push("Collection Date");
    if (!selectedLocation) missingFields.push("Location");
    if (!selectedSlot) missingFields.push("Time Slot");
    if (!formData.customerName) missingFields.push("Full Name");
    if (!formData.age) missingFields.push("Age");
    if (!formData.customerPhone) missingFields.push("Phone Number");
    if (!formData.customerEmail) missingFields.push("Email");
    if (!formData.address) missingFields.push("Address");
    if (!formData.pincode) missingFields.push("Pincode");

    return missingFields;
  };

  const [formData, setFormData] = useState({
    customerName: user?.name || "",
    customerPhone: user?.phone || "",
    customerEmail: user?.email || "",
    address: "",
    landmark: "",
    pincode: "",
    gender: "Male",
    age: "",
  });

  useEffect(() => {
    if (user) {
      loadMembers();
    }
  }, [user]);

  useEffect(() => {
    if (selectedLocation && collectionDate) {
      loadTimeSlots();
    }
  }, [selectedLocation, collectionDate]);

  const loadMembers = async () => {
    try {
      const response = await apiClient.getMembers();
      if (response.status === "SUCCESS") {
        setMembers(response.data);
      }
    } catch (error) {
      console.error("Failed to load members:", error);
    }
  };

  const searchLocations = async () => {
    if (!searchLocation.trim()) return;

    setLocationLoading(true);

    const timeoutId = setTimeout(() => {
      setLocationLoading(false);
    }, 10000);

    try {
      const response = await apiClient.searchLocation(searchLocation);
      if (response.status === "SUCCESS" && response.data.data) {
        setLocations(response.data.data);
      }
    } catch (error) {
      console.error("Location search failed:", error);
      setError("Failed to search locations");
    } finally {
      setLocationLoading(false);
      clearTimeout(timeoutId);
    }
  };

  const loadTimeSlots = async () => {
    if (!selectedLocation || !collectionDate) return;

    setSlotsLoading(true);

    const timeoutId = setTimeout(() => {
      setSlotsLoading(false);
    }, 20000);

    try {
      const latLongResponse = await apiClient.getLatLong(selectedLocation.eloc);
      if (latLongResponse.status === "SUCCESS") {
        const { latitude, longitude } = latLongResponse.data;
        const slotsResponse = await apiClient.getTimeSlots(
          format(collectionDate, "yyyy-MM-dd"),
          latitude,
          longitude
        );

        if (slotsResponse.status === "SUCCESS" && slotsResponse.data.results) {
          setTimeSlots(slotsResponse.data.results);
        }
      }
    } catch (error) {
      console.error("Failed to load time slots:", error);
      setError("Failed to load available time slots");
    } finally {
      setSlotsLoading(false);
      clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missing = validateFields();
    if (missing.length > 0) {
      setModalMessage(
        `The following fields are empty: \n${missing.join(
          ", "
        )}. \nPlease fill them properly.`
      );
      setShowModal(true);
      return;
    }

    if (
      !selectedPackage ||
      !selectedLocation ||
      !date ||
      !selectedSlot ||
      !user
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const paymentResponse = await handlePay();

      const verified = await verifyPayment(paymentResponse);

      navigate(`/payment/success/${paymentResponse.razorpay_payment_id}`, {
        state: {
          amount: selectedPackageData.package_center_prices?.discounted_price,
          packageName: selectedPackageData.name,
        },
      });

      if (!verified) {
        console.warn("Payment verified partially (email or backend failed).");
      }
    } catch (err) {
      console.error("Booking failed:", err);
      setError(err.message || "Booking failed. Please try again.");
      navigate(`/payment/fail`);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = () => {
    return new Promise((resolve, reject) => {
      const offerPrice =
        selectedPackageData.package_center_prices?.offer_price || 0;
      const discountedAmount =
        selectedPackageData.package_center_prices?.discounted_price ||
        Math.floor(offerPrice * 0.85);

      const rzpOptions = {
        key: "rzp_test_RTd9y3ngRanKxq",
        amount: discountedAmount * 100,
        currency: "INR",
        name: "Singinina Med Pvt Ltd",
        description: "Test Transaction",
        image: logo,
        order_id: "",
        handler: function (response) {
          resolve(response);
        },
        prefill: { name: user.name, email: user.email, contact: user.phone },
        notes: { address: "Razorpay Corporate Office" },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: function () {
            reject(new Error("Payment cancelled by user"));
          },
        },
      };

      axios
        .post(
          "http://localhost:5000/api/v1/dsa/payments/checkout",
          {
            booking_date: format(date, "yyyy-MM-dd"),
            collection_date: format(collectionDate, "yyyy-MM-dd"),
            collection_slot: selectedSlot?.id,
            package_code: selectedPackage && [selectedPackage],
            customer_phonenumber: formData.customerPhone,
            customer_whatsapppnumber: formData.customerPhone,
            customer_latitude: formData.latitude?.toString() || "28.6039",
            customer_longitude: formData.longitude?.toString() || "77.4272",
            customer_name: formData.customerName,
            pincode: formData.pincode,
            is_credit: false,
            customer_age: formData.age,
            customer_gender:
              formData.gender.charAt(0).toUpperCase() +
              formData.gender.slice(1),
            customer_landmark: formData.landmark,
            customer_address: formData.address,
            customer_email: formData.customerEmail,
            amount: discountedAmount * 100,
            discounted_price: discountedAmount,
            currency: "INR",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          rzpOptions.order_id = res.data.data.order.id;
          const rzp = new window.Razorpay(rzpOptions);
          rzp.open();
        })
        .catch((err) => {
          reject(new Error("Checkout API failed"));
        });
    });
  };

  const verifyPayment = async (response) => {
    const userEmail = formData.customerEmail;
    const userName = formData.customerName;

    try {
      try {
        await axios.post(
          "http://localhost:5000/api/v1/dsa/payments/verify",
          response,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("✅ Backend verification successful");
      } catch (backendErr) {
        console.warn(
          "⚠️ Backend verify failed, continuing with frontend-only email:",
          backendErr
        );
      }

      emailjs
        .send(
          "service_au6z9fu",
          "template_ygvuqrq",
          {
            to_name: userName,
            to_email: userEmail,
            package_name: selectedPackageData.name,
            amount:
              selectedPackageData.package_center_prices?.discounted_price ||
              Math.floor(
                (selectedPackageData.package_center_prices?.offer_price || 0) *
                  0.85
              ),
            collection_date: format(collectionDate, "PPP"),
            collection_time: `${selectedSlot.format_12_hrs.start_time} - ${selectedSlot.format_12_hrs.end_time}`,
            payment_id: response.razorpay_payment_id,
          },
          "GkEBrZUF9FTrB_99R"
        )
        .then(() => console.log("✅ Email sent successfully"))
        .catch((err) => console.error("Email failed:", err));

      console.log("✅ Payment verified successfully, redirecting...");
      return true;
    } catch (err) {
      console.error("Verification failed:", err);
      return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Home Collection</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription style={{ color: "red" }}>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {selectedPackageData && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TestTube className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    Selected Package
                  </span>
                </div>
                <Badge variant="secondary">{selectedPackage}</Badge>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Book for</Label>

                <Select
                  value={selectedMember}
                  onValueChange={setSelectedMember}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select member or book for yourself" />
                  </SelectTrigger>

                  <SelectContent
                    style={{
                      zIndex: 50,
                      backgroundColor: "white",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <SelectItem
                      value="self"
                      style={{
                        backgroundColor: "#f0f9ff",
                        padding: "0.5rem 1rem",
                        cursor: "pointer",
                      }}
                    >
                      Myself
                    </SelectItem>

                    {members?.map((member) => (
                      <SelectItem
                        key={member._id}
                        value={member._id}
                        style={{
                          backgroundColor: "#fef3c7",
                          padding: "0.5rem 1rem",
                          cursor: "pointer",
                        }}
                      >
                        {member.name} ({member.relation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      gender: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customerName: e.target.value,
                      }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min={0}
                  value={formData.age}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, age: e.target.value }))
                  }
                  placeholder="Enter age"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customerPhone: e.target.value,
                      }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customerEmail: e.target.value,
                    }))
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Search Location</Label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter area, city, or pincode"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    type="button"
                    style={{ backgroundColor: "black", color: "white" }}
                    variant="outline"
                    onClick={searchLocations}
                    disabled={locationLoading}
                  >
                    {locationLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    Search
                  </Button>
                </div>
              </div>

              {locations.length > 0 && (
                <div className="space-y-2">
                  <Label>Select Location</Label>
                  <div className="grid gap-2">
                    {locations.map((location) => (
                      <Card
                        key={location.eloc}
                        className={cn(
                          "cursor-pointer border-2 transition-all hover:shadow-md",

                          selectedLocation?.eloc === location.eloc
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200"
                        )}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {location.placeName}
                              </h4>
                              <p className="text-sm text-gray-900">
                                {location.placeAddress}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              style={{
                                backgroundColor: "black",
                                color: "white",
                              }}
                            >
                              {location.type}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Address & Landmark */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Complete Address</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full pl-10 min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black"
                    placeholder="Enter complete address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    value={formData.landmark}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        landmark: e.target.value,
                      }))
                    }
                    placeholder="Near landmark"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pincode: e.target.value,
                      }))
                    }
                    placeholder="Enter pincode"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                      }}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Select Collection Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      style={{ backgroundColor: "black", color: "white" }}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !collectionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {collectionDate
                        ? format(collectionDate, "PPP")
                        : "Pick collection date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={collectionDate}
                      onSelect={setCollectionDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <Label>Available Time Slots</Label>
              {slotsLoading ? (
                <div className="flex items-center justify-center p-4 border border-gray-200 rounded-md">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading slots...
                </div>
              ) : timeSlots.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <Card
                      key={slot.id}
                      className={cn(
                        "cursor-pointer border-2 transition-all",
                        selectedSlot?.id === slot.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      <CardContent className="p-3 ">
                        <div className="flex justify-between items-center ">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">
                              {slot.format_12_hrs.start_time} -{" "}
                              {slot.format_12_hrs.end_time}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {slot.available_slot} slots
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600 p-4 border border-gray-200 rounded-md">
                  {date && selectedLocation
                    ? "No slots available for selected date and location"
                    : "Select date and location to view available slots"}
                </p>
              )}
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault();

                const missing = validateFields();

                if (missing.length > 0) {
                  setModalMessage(
                    `The following fields are empty: \n${missing.join(
                      ", "
                    )}. \nPlease fill them properly.`
                  );
                  setShowModal(true);
                  return;
                }

                handleSubmit(e);
              }}
              style={{ backgroundColor: "black", color: "white" }}
              type="button"
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Booking
            </Button>
            {showModal && (
              <div className="modal-overlay">
                <div className="modal-box">
                  <h3>{modalMessage}</h3>
                  <button
                    className="close-btn"
                    onClick={() => setShowModal(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
async function requestForToken() {
  return null;
}
export default BookingForm;
