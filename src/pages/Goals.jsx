import React, { useState } from "react";
import {
  Card,
  CardContent,
  LinearProgress,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";

const Goals = () => {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState([
    { id: 1, title: "New Laptop", target: 80000, saved: 45000 },
    { id: 2, title: "Trip to Manali", target: 30000, saved: 12000 },
    { id: 3, title: "Emergency Fund", target: 50000, saved: 35000 },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    saved: "",
  });

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.saved) {
      alert("Please fill all fields!");
      return;
    }

    const newGoalData = {
      id: Date.now(),
      title: newGoal.title,
      target: parseInt(newGoal.target),
      saved: parseInt(newGoal.saved),
    };

    setGoals([...goals, newGoalData]);
    setNewGoal({ title: "", target: "", saved: "" });
    setOpen(false);
  };

  const getProgressColor = (percent) => {
    if (percent < 40) return "text-red-600";
    if (percent < 80) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-500 to-pink-400 bg-clip-text text-transparent">
          Savings Goals 🎯
        </h2>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            background: "linear-gradient(to right, #6366f1, #ec4899)",
          }}
          onClick={() => setOpen(true)}
        >
          Add New Goal
        </Button>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {goals.map((goal) => {
          const progress = Math.min((goal.saved / goal.target) * 100, 100);
          return (
            <motion.div
              key={goal.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="shadow-md hover:shadow-xl transition-all border border-gray-100 rounded-2xl">
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Saved: ₹{goal.saved.toLocaleString()} / ₹
                    {goal.target.toLocaleString()}
                  </p>

                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        background: `linear-gradient(to right, ${
                          progress < 40
                            ? "#ef4444"
                            : progress < 80
                            ? "#facc15"
                            : "#22c55e"
                        }, #10b981)`,
                      },
                    }}
                  />

                  <motion.p
                    className={`mt-2 text-sm font-medium ${getProgressColor(
                      progress
                    )}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {Math.round(progress)}% Completed
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: { borderRadius: 20, padding: "4px 0" },
        }}
      >
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent className="space-y-4">
          <TextField
            label="Goal Title"
            fullWidth
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <TextField
            label="Target Amount (₹)"
            type="number"
            fullWidth
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
          />
          <TextField
            label="Amount Saved (₹)"
            type="number"
            fullWidth
            value={newGoal.saved}
            onChange={(e) => setNewGoal({ ...newGoal, saved: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddGoal}
            variant="contained"
            sx={{
              textTransform: "none",
              background: "linear-gradient(to right, #3b82f6, #10b981)",
            }}
          >
            Add Goal
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Goals;
