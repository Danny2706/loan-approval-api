import { useState } from "react";
import axios from "axios";

// Import the background image
import loanImage from "./assets/loan.png"; // Adjust path based on your project structure

export default function LoanApproval() {
  const [formData, setFormData] = useState({
    loan_size: "",
    interest_rate: "",
    borrower_income: "",
    debt_to_income: "",
    num_of_accounts: "",
    derogatory_marks: "",
    total_debt: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://loan-approval-api-4.onrender.com/predict",
        {
          loan_size: parseFloat(formData.loan_size),
          interest_rate: parseFloat(formData.interest_rate),
          borrower_income: parseFloat(formData.borrower_income),
          debt_to_income: parseFloat(formData.debt_to_income),
          num_of_accounts: parseInt(formData.num_of_accounts),
          derogatory_marks: parseInt(formData.derogatory_marks),
          total_debt: parseFloat(formData.total_debt),
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setResult({ prediction: "Error", approval_probability: 0 });
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loanImage})` }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md opacity-90">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Loan Approval Prediction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.replace("_", " ").toUpperCase()}
              className="w-full p-2 border rounded"
              required
            />
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Processing..." : "Check Approval"}
          </button>
        </form>
        {result && (
          <div className="mt-4 p-4 bg-gray-50 border rounded text-center">
            <p className="text-lg font-semibold">
              Prediction: {result.prediction}
            </p>
            <p>
              Approval Probability: {result.approval_probability.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
