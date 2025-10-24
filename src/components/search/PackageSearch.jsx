// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Search, TestTube, Clock, Info } from "lucide-react";
// import { apiClient } from "@/lib/api";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";

// export function PackageSearch() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { handleSelectPackage } = useAuth();

//   const handleSearch = async () => {
//     if (!searchTerm.trim()) return;

//     setLoading(true);
//     setPackages([]);

//     try {
//       const response = await apiClient.searchPackages(searchTerm);
//       if (response.status === "SUCCESS" && response.data?.data?.length) {
//         setPackages(response.data.data);
//       } else {
//         setPackages([]);
//       }
//     } catch (error) {
//       console.error("Search failed:", error);
//       setPackages([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Search Input */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <TestTube className="h-5 w-5 text-blue-600" />
//             Search Lab Packages
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-3">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search for tests, packages, or health conditions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//                 onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//               />
//             </div>
//             <Button
//               onClick={handleSearch}
//               disabled={loading}
//               style={{ backgroundColor: "black", color: "white" }}
//             >
//               {loading ? (
//                 <Clock className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Search className="h-4 w-4" />
//               )}
//               Search
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Loading Skeleton */}
//       {loading && (
//         <div className="space-y-4">
//           {[1, 2, 3].map((i) => (
//             <Card key={i}>
//               <CardContent className="p-6">
//                 <Skeleton className="h-6 w-3/4 mb-2" />
//                 <Skeleton className="h-4 w-1/2 mb-4" />
//                 <div className="flex gap-2">
//                   <Skeleton className="h-6 w-16" />
//                   <Skeleton className="h-6 w-20" />
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Search Results */}
//       {!loading && packages.length > 0 && (
//         <div className="space-y-4">
//           {packages.map((pkg) => (
//             <Card key={pkg.code} className="hover:shadow-lg transition-shadow">
//               <CardContent className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                       {pkg.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 mb-2">
//                       {pkg.description}
//                     </p>
//                     <p className="text-sm text-gray-600 mb-2">
//                       Code: {pkg.code}
//                     </p>
//                     <div className="flex gap-2 flex-wrap mb-3">
//                       <Badge variant="secondary">
//                         {pkg.parameter} Parameters
//                       </Badge>
//                       <Badge variant="outline">
//                         {pkg.category_for_web.length} Categories
//                       </Badge>
//                       <Badge variant="secondary">TAT: {pkg.tat_time}</Badge>
//                       <Badge variant="secondary">
//                         Fasting: {pkg.fasting_time}
//                       </Badge>
//                     </div>
//                     <div className="flex gap-3 items-center">
//                       <span className="text-gray-500 line-through">
//                         ₹{pkg.package_center_prices.package_price}
//                       </span>
//                       <span className="text-blue-600 font-semibold">
//                         ₹{pkg.package_center_prices.offer_price}
//                       </span>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     <Info className="h-4 w-4 mr-2" />
//                     Details
//                   </Button>
//                 </div>

//                 <div className="flex justify-end mt-4">
//                   <Button asChild onClick={() => handleSelectPackage(pkg)}>
//                     <Link to={`/book-appointment?package=${pkg.code}`}>
//                       Book Now
//                     </Link>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* No Results */}
//       {!loading && searchTerm && packages.length === 0 && (
//         <Card>
//           <CardContent className="p-8 text-center">
//             <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No packages found
//             </h3>
//             <p className="text-gray-600">
//               Try searching with different keywords like "glucose", "blood", or
//               "health checkup"
//             </p>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, TestTube, Clock, Info } from "lucide-react";
import { apiClient } from "@/lib/api";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PackageSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleSelectPackage } = useAuth();

  const getDiscountedPrice = (offerPrice) => {
    return Math.floor(offerPrice * 0.85);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setPackages([]);

    try {
      const response = await apiClient.searchPackages(searchTerm);
      if (response.status === "SUCCESS" && response.data?.data?.length) {
        setPackages(response.data.data);
      } else {
        setPackages([]);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-600" />
            Search Lab Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for tests, packages, or health conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading}
              style={{ backgroundColor: "black", color: "white" }}
            >
              {loading ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && packages.length > 0 && (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <Card key={pkg.code} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {pkg.description}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Code: {pkg.code}
                    </p>
                    <div className="flex gap-2 flex-wrap mb-3">
                      <Badge variant="secondary">
                        {pkg.parameter} Parameters
                      </Badge>
                      <Badge variant="outline">
                        {pkg.category_for_web.length} Categories
                      </Badge>
                      <Badge variant="secondary">TAT: {pkg.tat_time}</Badge>
                      <Badge variant="secondary">
                        Fasting: {pkg.fasting_time}
                      </Badge>
                    </div>
                    <div className="flex gap-3 items-center">
                      <span className="text-gray-500 line-through">
                        ₹{pkg.package_center_prices.package_price}
                      </span>

                      <span className="text-blue-600 font-semibold">
                        ₹
                        {getDiscountedPrice(
                          pkg.package_center_prices.offer_price
                        )}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Info className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    asChild
                    onClick={() =>
                      handleSelectPackage({
                        ...pkg,
                        package_center_prices: {
                          ...pkg.package_center_prices,
                          discounted_price: getDiscountedPrice(
                            pkg.package_center_prices.offer_price
                          ),
                        },
                      })
                    }
                  >
                    <Link to={`/book-appointment?package=${pkg.code}`}>
                      Book Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && searchTerm && packages.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No packages found
            </h3>
            <p className="text-gray-600">
              Try searching with different keywords like "glucose", "blood", or
              "health checkup"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default PackageSearch;
