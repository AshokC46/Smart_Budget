import React, { useState } from "react";
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
  Paper,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction, deleteTransaction } from "../redux/transactionsSlice";

const Transactions = () => {
  const transactions = useSelector((state) => state.transactions.list);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

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

  const handleAdd = () => {
    if (!form.date || !form.title || !form.amount) {
      toast.error("Please fill all fields!");
      return;
    }

    const newTxn = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };
    dispatch(addTransaction(newTxn));
    setForm({ date: "", title: "", amount: "", type: "Income" });
    setOpen(false);
    toast.success("Transaction added!");
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteTransaction(selectedId));
    setDeleteOpen(false);
    toast.success("Transaction deleted!");
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchType = typeFilter === "All" || txn.type === typeFilter;
    const matchSearch =
      txn.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.amount.toString().includes(searchTerm);
    return matchType && matchSearch;
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Transactions</h1>

      {/* Search & Filter */}
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

      {/* Responsive Section */}
      <Card className="shadow-md">
        <CardContent sx={{ overflowX: "auto" }}>
          {isMobile ? (
            // --------- Mobile Card Layout ---------
            <Grid container spacing={2}>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => (
                  <Grid item xs={12} key={txn.id}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: "#f9fafb",
                        "&:hover": { boxShadow: 3 },
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <strong>Date:</strong>
                        </Grid>
                        <Grid item xs={6}>
                          {txn.date}
                        </Grid>

                        <Grid item xs={6}>
                          <strong>Title:</strong>
                        </Grid>
                        <Grid item xs={6}>
                          {txn.title}
                        </Grid>

                        <Grid item xs={6}>
                          <strong>Type:</strong>
                        </Grid>
                        <Grid item xs={6}>
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                              txn.type === "Income"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {txn.type}
                          </span>
                        </Grid>

                        <Grid item xs={6}>
                          <strong>Amount:</strong>
                        </Grid>
                        <Grid item xs={6}>
                          ₹{txn.amount.toLocaleString()}
                        </Grid>

                        <Grid item xs={12} className="flex justify-end">
                          <IconButton onClick={() => confirmDelete(txn.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))
              ) : (
                <p className="text-center text-gray-500 italic py-6">
                  No matching transactions found.
                </p>
              )}
            </Grid>
          ) : (
            // --------- Desktop Table Layout ---------
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
          )}
        </CardContent>
      </Card>

      {/* Floating Add Button */}
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

      
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
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
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            select
            fullWidth
            label="Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0d9488" }}
            onClick={handleAdd}
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
