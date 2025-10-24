import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Phone,
  TestTube,
  CheckCircle,
  Truck,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api";

const BookingStatus = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await apiClient.getBookingList();
        const apiData = res.data?.data || [];
        console.log("apiDaata", apiData);

        const transformed = apiData.map((item) => ({
          id: item._id,
          bookingDate: item.bookingDate,
          packageName: item.packages?.[0]?.name || "N/A",
          packageCode: item.packages?.[0]?.code || "N/A",
          status: mapStatus(item.bookingStatus),
          customerName: item.customer?.name,
          customerPhone: item.customer?.phone,
          address: item.customer?.landmark || item.customer?.address || "N/A",
          timeSlot: item.slot?.slotTime || "N/A",
          collectionDate: item.collectionDate,
        }));

        setBookings(transformed);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const mapStatus = (status) => {
    switch ((status || "").toLowerCase()) {
      case "order booked":
        return "confirmed";
      case "sample collected":
        return "sample_collected";
      case "processing":
        return "processing";
      case "completed":
        return "completed";
      default:
        return "confirmed";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "sample_collected":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-orange-100 text-orange-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <Calendar className="h-4 w-4" />;
      case "sample_collected":
        return <Truck className="h-4 w-4" />;
      case "processing":
        return <TestTube className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MoreHorizontal className="h-4 w-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "sample_collected":
        return "Sample Collected";
      case "processing":
        return "Processing";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
        <Button asChild style={{ backgroundColor: "black", color: "white" }}>
          <a href="/book-appointment">Book New Test</a>
        </Button>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 mb-4">
              You haven't booked any tests yet. Start by searching for available
              packages.
            </p>
            <Button
              asChild
              style={{ backgroundColor: "black", color: "white" }}
            >
              <a href="/packages">Browse Packages</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="h-[680px] overflow-y-scroll space-y-4">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {booking.packageName}
                      </h3>
                      <Badge
                        className={cn(
                          "flex items-center gap-1",
                          getStatusColor(booking.status)
                        )}
                      >
                        {getStatusIcon(booking.status)}
                        {getStatusText(booking.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 text-start">
                      Booking ID:{" "}
                      <span className="font-mono">{booking.id}</span>
                    </p>
                  </div>

                  {booking.status === "completed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Report
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span>{booking.customerName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span>{booking.customerPhone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span>
                      Booked:{" "}
                      {format(new Date(booking.bookingDate), "dd MMM yyyy")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="truncate">{booking.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span>{booking.timeSlot}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <TestTube className="h-4 w-4 text-gray-600" />
                    <span>
                      Collection:{" "}
                      {format(new Date(booking.collectionDate), "dd MMM yyyy")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default BookingStatus;
