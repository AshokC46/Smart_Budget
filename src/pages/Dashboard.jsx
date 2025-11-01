import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const barData = months.map((month) => {
    const monthTxns = transactions.filter(
      (t) => new Date(t.date).getMonth() === months.indexOf(month)
    );
    const totalIncome = monthTxns
      .filter((t) => t.type === "Income")
      .reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = monthTxns
      .filter((t) => t.type === "Expense")
      .reduce((acc, t) => acc + t.amount, 0);
    return { month, Income: totalIncome, Expense: totalExpense };
  });

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        className="text-2xl font-semibold bg-gradient-to-r from-teal-500 to-emerald-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard Overview ✨
      </motion.h1>

      <Grid container spacing={3}>
        {[
          {
            label: "Total Income",
            value: income,
            border: "border-green-500",
            color: "text-green-600",
          },
          {
            label: "Total Expense",
            value: expense,
            border: "border-red-500",
            color: "text-red-600",
          },
          {
            label: "Net Balance",
            value: balance,
            border: "border-teal-500",
            color: "text-teal-600",
          },
        ].map((item, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card
                className={`shadow-md hover:shadow-xl border-l-4 ${item.border} transition-all rounded-xl`}
              >
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    className={item.color}
                  >
                    ₹{item.value.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="shadow-md p-4 rounded-xl">
          <Typography variant="subtitle1" fontWeight="bold" className="mb-4">
            Income vs Expense
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="shadow-md p-4 rounded-xl">
          <Typography variant="subtitle1" fontWeight="bold" className="mb-4">
            Monthly Income & Expense
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#16a34a" />
              <Bar dataKey="Expense" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
