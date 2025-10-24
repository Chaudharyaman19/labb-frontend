import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Search,
  Calendar,
  User,
  Phone,
  Loader2,
} from "lucide-react";
import { apiClient } from "@/lib/api";
const ReportViewer = () => {
  const [reportId, setReportId] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null); // ✅ any removed
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!reportId.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await apiClient.getReport(reportId);
      setReport(response);
    } catch (err) {
      setError("Report not found or access denied");
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // Implementation for downloading report
    console.log("Downloading report:", reportId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            View Lab Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="reportId" className="sr-only">
                Report ID
              </Label>
              <Input
                id="reportId"
                placeholder="Enter booking ID or report ID"
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              style={{ backgroundColor: "black", color: "white" }}
              disabled={loading || !reportId.trim()}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Report Display */}
      {report && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Lab Report</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Report ID: {reportId}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Completed</Badge>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Patient Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span>John Doe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span>+91 9999999999</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span>Sample collected: 20 Sept 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                  <span>Report generated: 21 Sept 2025</span>
                </div>
              </div>
            </div>

            {/* Test Results Preview */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Test Results Summary
              </h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Blood Glucose Fasting</span>
                    <span className="text-green-600 font-medium">Normal</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Value: 95 mg/dL (Normal range: 70-100 mg/dL)
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Cholesterol</span>
                    <span className="text-yellow-600 font-medium">
                      Borderline High
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Value: 210 mg/dL (Normal range: &lt;200 mg/dL)
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">HDL Cholesterol</span>
                    <span className="text-green-600 font-medium">Normal</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Value: 45 mg/dL (Normal range: &gt;40 mg/dL for men)
                  </p>
                </div>
              </div>
            </div>

            {/* Doctor's Notes */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Doctor's Recommendations
              </h3>
              <p className="text-sm text-blue-800">
                Your glucose levels are within normal range. However,
                cholesterol levels are slightly elevated. Consider dietary
                modifications and regular exercise. Follow up in 3 months.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <p>
            • Your booking ID was sent via SMS and email after booking
            confirmation
          </p>
          <p>
            • Reports are typically available 1-2 days after sample collection
          </p>
          <p>• For assistance, contact our support team at +91-1800-XXX-XXXX</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default ReportViewer;
