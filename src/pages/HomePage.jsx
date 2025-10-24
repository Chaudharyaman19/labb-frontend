import Hero from "@/components/home/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Health Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                name: "Complete Health Checkup",
                code: "PL183",
                tests: 45,
                price: "₹1,999",
                rating: 4.8,
                popular: true,
              },
              {
                name: "Diabetes Panel",
                code: "PL184",
                tests: 12,
                price: "₹899",
                rating: 4.7,
                popular: false,
              },
              {
                name: "Heart Health Package",
                code: "PL185",
                tests: 28,
                price: "₹1,499",
                rating: 4.9,
                popular: true,
              },
            ].map((pkg) => (
              <Card
                key={pkg.code}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <p className="text-sm text-gray-600">Code: {pkg.code}</p>
                    </div>
                    {pkg.popular && (
                      <Badge className="bg-orange-100 text-orange-800">
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {pkg.tests} tests included
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {pkg.price}
                    </span>
                    <Button
                      size="sm"
                      asChild
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      <Link to={`/book-appointment?package=${pkg.code}`}>
                        Book Now
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              asChild
              style={{ backgroundColor: "black", color: "white" }}
            >
              <Link to="/packages">
                View All Packages
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
