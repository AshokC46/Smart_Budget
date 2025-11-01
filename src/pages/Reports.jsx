import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const COLORS = ["#0d9488", "#14b8a6", "#2dd4bf", "#5eead4", "#99f6e4"];

const monthlyDummyData = {
  June: {
    weekly: [
      { week: "Week 1", expense: 3500, savings: 1500 },
      { week: "Week 2", expense: 2700, savings: 1700 },
      { week: "Week 3", expense: 3900, savings: 2100 },
      { week: "Week 4", expense: 3100, savings: 2500 },
    ],
    categories: [
      { name: "Food", value: 1500 },
      { name: "Bills", value: 1000 },
      { name: "Shopping", value: 1200 },
      { name: "Travel", value: 900 },
      { name: "Health", value: 600 },
    ],
  },
  July: {
    weekly: [
      { week: "Week 1", expense: 2800, savings: 900 },
      { week: "Week 2", expense: 4000, savings: 1500 },
      { week: "Week 3", expense: 3500, savings: 2000 },
      { week: "Week 4", expense: 3200, savings: 2100 },
    ],
    categories: [
      { name: "Food", value: 1400 },
      { name: "Bills", value: 1200 },
      { name: "Shopping", value: 1000 },
      { name: "Travel", value: 800 },
      { name: "Health", value: 500 },
    ],
  },
  August: {
    weekly: [
      { week: "Week 1", expense: 3000, savings: 1000 },
      { week: "Week 2", expense: 3200, savings: 1300 },
      { week: "Week 3", expense: 3400, savings: 2000 },
      { week: "Week 4", expense: 2900, savings: 1800 },
    ],
    categories: [
      { name: "Food", value: 1200 },
      { name: "Bills", value: 1100 },
      { name: "Shopping", value: 900 },
      { name: "Travel", value: 700 },
      { name: "Health", value: 400 },
    ],
  },
  September: {
    weekly: [
      { week: "Week 1", expense: 4000, savings: 1300 },
      { week: "Week 2", expense: 4200, savings: 1400 },
      { week: "Week 3", expense: 3800, savings: 1900 },
      { week: "Week 4", expense: 3000, savings: 2100 },
    ],
    categories: [
      { name: "Food", value: 1600 },
      { name: "Bills", value: 1300 },
      { name: "Shopping", value: 1000 },
      { name: "Travel", value: 800 },
      { name: "Health", value: 500 },
    ],
  },
  October: {
    weekly: [
      { week: "Week 1", expense: 3000, savings: 1200 },
      { week: "Week 2", expense: 4200, savings: 1600 },
      { week: "Week 3", expense: 3500, savings: 2000 },
      { week: "Week 4", expense: 2800, savings: 2300 },
    ],
    categories: [
      { name: "Food", value: 1800 },
      { name: "Bills", value: 1200 },
      { name: "Shopping", value: 900 },
      { name: "Travel", value: 700 },
      { name: "Health", value: 400 },
    ],
  },
  November: {
    weekly: [
      { week: "Week 1", expense: 3700, savings: 1400 },
      { week: "Week 2", expense: 3400, savings: 1600 },
      { week: "Week 3", expense: 4000, savings: 1800 },
      { week: "Week 4", expense: 3800, savings: 2200 },
    ],
    categories: [
      { name: "Food", value: 1600 },
      { name: "Bills", value: 1300 },
      { name: "Shopping", value: 1000 },
      { name: "Travel", value: 700 },
      { name: "Health", value: 500 },
    ],
  },
};

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState("October");

  const currentData = monthlyDummyData[selectedMonth];

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <motion.h2
          className="text-2xl font-semibold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Reports & Analytics 📊
        </motion.h2>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Month"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {Object.keys(monthlyDummyData).map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-4 text-gray-700">
            Weekly Expense & Savings ({selectedMonth})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData.weekly}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#0d9488"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-4 text-gray-700">
            Expense Breakdown by Category ({selectedMonth})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={currentData.categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                dataKey="value"
              >
                {currentData.categories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium mb-4 text-gray-700">
            Expense vs Savings Comparison ({selectedMonth})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData.weekly}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="expense" fill="#ef4444" />
              <Bar dataKey="savings" fill="#0d9488" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
