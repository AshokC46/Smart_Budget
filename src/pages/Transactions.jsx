import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab,
  IconButton,
  Grid,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import toast from "react-hot-toast";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({
    date: "",
    title: "",
    amount: "",
    type: "Income",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const fetchTransactions = async () => {
    try {
      const res = await axiosInstance.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      toast.error("Failed to load transactions!");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (!form.date || !form.title || !form.amount) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const res = await axiosInstance.post("/transactions", {
        ...form,
        amount: Number(form.amount),
      });
      setTransactions([...transactions, res.data]);
      setForm({ date: "", title: "", amount: "", type: "Income" });
      setOpen(false);
      toast.success("Transaction added successfully!");
    } catch (err) {
      toast.error("Error adding transaction!");
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/transactions/${selectedId}`);
      setTransactions(transactions.filter((t) => t.id !== selectedId));
      setDeleteOpen(false);
      toast.success("Transaction deleted!");
    } catch (err) {
      toast.error("Error deleting transaction!");
    }
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchType = typeFilter === "All" || txn.type === typeFilter;
    const matchSearch =
      txn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.amount.toString().includes(searchTerm);
    return matchType && matchSearch;
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Transactions</h1>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search by title or amount"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            label="Filter by Type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Card className="shadow-md">
        <CardContent sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount (₹)</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => (
                  <TableRow key={txn.id} hover>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.title}</TableCell>
                    <TableCell>
                      <span
                        className={`px-1 py-1 rounded-full text-sm font-medium ${
                          txn.type === "Income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {txn.type}
                      </span>
                    </TableCell>
                    <TableCell>{txn.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => confirmDelete(txn.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <span className="text-gray-500 italic">
                      No matching transactions found.
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#0d9488",
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent className="space-y-4 mt-2">
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAdd}
            variant="contained"
            sx={{ backgroundColor: "#0d9488" }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Transaction?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Transactions;
