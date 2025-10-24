import { useParams, useLocation, useNavigate } from "react-router-dom";

const Paymentsuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const amount = location.state?.amount;
  const packageName = location.state?.packageName;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        {id && (
          <p className="text-gray-700 mb-2">
            Transaction ID: <span className="font-semibold">{id}</span>
          </p>
        )}
        {packageName && (
          <p className="text-gray-700 mb-2">
            Package: <span className="font-semibold">{packageName}</span>
          </p>
        )}
        {amount && (
          <p className="text-gray-700 mb-4">
            Amount Paid: <span className="font-semibold">₹{amount}</span>
          </p>
        )}
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Paymentsuccess;
