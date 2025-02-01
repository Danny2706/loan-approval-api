from fastapi import FastAPI
import joblib
import pandas as pd
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Load trained model
model = joblib.load("random_forest_model.pkl")

# Define input data format
class LoanData(BaseModel):
    loan_size: float
    interest_rate: float
    borrower_income: float
    debt_to_income: float
    num_of_accounts: int
    derogatory_marks: int
    total_debt: float

# Prediction endpoint
@app.post("/predict")
def predict(data: LoanData):
    # Convert input JSON to DataFrame
    input_data = pd.DataFrame([data.dict()])
    
    # Make prediction probability
    prob = model.predict_proba(input_data)[0][1]  # Probability of approval
    
    # Apply new decision threshold (lower to 0.4)
    threshold = 0.4
    prediction = "Approved" if prob > threshold else "Not Approved"

    return {"prediction": prediction, "approval_probability": prob}
