import { useSearchParams } from "react-router-dom";
import BookingForm from "@/components/booking/BookingForm";
import ProtectedRoute from "@/components/ProtectedRoute";

const BookAppointmentPage = () => {
  const [searchParams] = useSearchParams();
  const selectedPackage = searchParams.get("package");

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Home Collection
            </h1>
            <p className="text-lg text-gray-600">
              Schedule a convenient time for sample collection at your location
            </p>
          </div>

          <BookingForm selectedPackage={selectedPackage || undefined} />
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default BookAppointmentPage;
