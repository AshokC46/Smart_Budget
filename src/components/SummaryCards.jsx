import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const SummaryCards = () => {
  const data = [
    { title: "Total Income", value: "₹126,500" },
    { title: "Total Expense", value: "₹87,500" },
    { title: "Balance", value: "₹39,000" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {data.map((item, index) => (
        <Card
          key={index}
          className="shadow-md rounded-2xl bg-white dark:bg-gray-800"
        >
          <CardContent>
            <Typography
              variant="h5"
              className="font-semibold text-gray-800 dark:text-gray-100"
            >
              {item.value}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-500 dark:text-gray-400"
            >
              {item.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
