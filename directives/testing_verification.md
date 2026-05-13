# Directive: Testing & Verification

## Goal
Verify the integrity of the InvestorBabu platform, ensuring the environment is correctly configured, the API is reachable, and the frontend builds successfully.

## 1. Environment Validation
**Tools**: `execution/validate_env.py`
**Task**: Check that all required keys in `.env` are present and formatted correctly without exposing values.
**Expected Output**: Success/Failure report for each key.

## 2. API Connectivity
**Tools**: `execution/test_api_connection.py`
**Task**: Ping `https://api.investorbabu.com` endpoints and verify JSON response structure.
**Endpoints to test**:
- `/api/status`
- `/api/dashboard/summary`
- `/api/stocks`

## 3. Frontend Integrity
**Task**: Run linting and build checks.
**Commands**:
- `npm run lint`
- `npm run build`

## 4. Signal Logic Simulation
**Tools**: `execution/simulate_signal.py`
**Task**: Mock a TradingView signal and run it through the detection logic (if available in the current codebase) or simulate the data flow to the dashboard.
