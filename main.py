import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any domain (for development)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load the trained model
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
    input_data = pd.DataFrame([data.dict()])
    
    try:
        prob = model.predict_proba(input_data)[0][1]  
        threshold = 0.35
        prediction = "Approved" if prob > threshold else "Not Approved"
        return {"prediction": prediction, "approval_probability": prob}
    except Exception as e:
        return {"error": str(e)}
