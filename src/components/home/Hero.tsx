import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br  via-blue-700 to-teal-600 text-white bg-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Health Testing Made
                <span className="text-teal-300"> Simple</span>
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-center">
              <Button
                size="lg"
                asChild
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Link to="/packages">
                  <Search className="mr-2 h-5 w-5" />
                  Search Tests
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-blue "
                asChild
              >
                <Link to="/book-appointment">Book Appointment</Link>
              </Button>
            </div>

            {/* Features */}
          </div>

          {/* Image/Graphic */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
              <div className="bg-white rounded-xl p-6 text-gray-900">
                <h3 className="font-semibold text-lg mb-4">
                  Popular Test Packages
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">
                      Complete Blood Count
                    </span>
                    <span className="text-sm text-gray-600">₹299</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Lipid Profile</span>
                    <span className="text-sm text-gray-600">₹499</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Diabetes Panel</span>
                    <span className="text-sm text-gray-600">₹799</span>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-4" asChild>
                  <Link to="/packages">View All Packages</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
