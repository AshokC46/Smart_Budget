import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    { id: 1, date: "2025-11-01", title: "Salary", type: "Income", amount: 45000 },
    { id: 2, date: "2025-11-02", title: "Groceries", type: "Expense", amount: 2500 },
    { id: 3, date: "2025-11-03", title: "Electricity Bill", type: "Expense", amount: 1200 },
    { id: 4, date: "2025-11-04", title: "Freelance Work", type: "Income", amount: 8000 },
  ],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTransaction: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
