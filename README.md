# Loan Approval Prediction API

Overview

This project uses machine learning algorithms (e.g., Random Forest, XGBoost) to predict loan approval status based on a variety of features such as:

Loan size
Interest rate
Borrower's income
Debt-to-income ratio
Number of accounts
Derogatory marks
Total debt
The model's output will be either Approved (1) or Rejected (0).

Dataset
The dataset for this project includes various features related to loan applications. Below is a brief description of the columns in the dataset:

loan_size: The total size of the loan applied for.
interest_rate: The rate of interest on the loan.
borrower_income: The income of the borrower.
debt_to_income: The ratio of the borrower's total debt to income.
num_of_accounts: The number of accounts held by the borrower.
derogatory_marks: Number of derogatory marks on the borrower's credit history.
total_debt: Total outstanding debt of the borrower.
loan_status: The target variable indicating whether the loan was approved (1) or rejected (0).
You can upload the dataset in .csv format, for example, loan_data.csv.

This project provides a **Loan Approval Prediction API** built using **FastAPI** and a **Random Forest model**. The model predicts whether a loan will be approved based on features such as loan size, interest rate, borrower income, and more.

The API can be used to predict loan approval by sending a POST request with the necessary features.

## **Table of Contents**

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Usage](#api-usage)
  - [Predict Endpoint](#predict-endpoint)
- [Model](#model)
- [Deployment](#deployment)
- [Contributing](#contributing)

## **Technologies Used**

- **FastAPI** - A modern Python web framework for building APIs.
- **Uvicorn** - ASGI server for running FastAPI applications.
- **Scikit-learn** - Machine learning library used to train the Random Forest model.
- **Pandas** - Data manipulation library.
- **Joblib** - Used to serialize the trained model.
- **Python 3.x** - Programming language.

## **Installation**

To get started with the project, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/Danny2706/loan-approval-api.git

   ```

2. API Usage:

Once the API is running, you can use the POST endpoint to predict loan approval.

Predict Endpoint:

> URL: /predict

> Method: POST

> Request Body (JSON):
> {
> "loan_size": 20000.0,
> "interest_rate": 12.5,
> "borrower_income": 15000.0,
> "debt_to_income": 0.45,
> "num_of_accounts": 3,
> "derogatory_marks": 2,
> "total_debt": 8000.0
> }

Response
{
"prediction": "Approved",
"approval_probability": 0.3624
}
{
"loan_size": 25000.0,
"interest_rate": 0.032,
"borrower_income": 45000.0,
"debt_to_income": 0.31,
"num_of_accounts": 4,
"derogatory_marks": 0,
"total_debt": 15000.0
}

Response
{
"prediction": "Not Approved",
"approval_probability": 0.32833333333333337
}
Description:
The model predicts whether the loan will be approved or not based on the given features. It returns the prediction ("Approved" or "Not Approved") and the approval probability.

Model:

The model is built using a Random Forest Classifier and trained on a dataset containing information about loans. The model is serialized using joblib and can be loaded in the API for prediction.

Feature Importances:
interest_rate and borrower_income are the most important features for predicting loan approval.
The model also considers features like total_debt, loan_size, and debt_to_income.

Deployment:

To run the API locally:

uvicorn main:app --reload
You can access the API at http://127.0.0.1:8000.

To run the API live:

https://loan-approval-api-4.onrender.com
