import ReportViewer from "@/components/reports/ReportViewer";
import ProtectedRoute from "@/components/ProtectedRoute";

const ReportsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab Reports</h1>
          <p className="text-lg text-gray-600">
            Access and download your test reports
          </p>
        </div>

        <ReportViewer />
      </div>
    </div>
  );
};
export default ReportsPage;
