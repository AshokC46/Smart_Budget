# 💰 Smart Budget — Personal Finance Tracker

Smart Budget is a **React-based personal finance web app** that helps users track their income, expenses, and savings in a clean and interactive way.
It’s designed to make money management simple, visual, and efficient — perfect for anyone who wants to stay on top of their finances.

---

## ✨ Features

* 🧾 **Add, Edit & Delete Transactions** — Manage your daily income and expenses easily
* 📊 **Dynamic Dashboard** — Get a visual overview of total income, expenses & balance
* 📅 **Filter by Date Range** — Track your spending over specific periods
* 📈 **Responsive Charts** — Beautiful pie and bar charts for spending insights
* ☁️ **Persistent Data** — Local storage support to save your transactions
* 🌗 **Modern UI** — Built with Material UI and Tailwind for a clean, responsive design

---

## 🧠 Tech Stack

| Technology          | Purpose                  |
| ------------------- | ------------------------ |
| React (Vite)        | Front-end framework      |
| Redux Toolkit       | State management         |
| Material UI         | Modern UI components     |
| Tailwind CSS        | Styling and layout       |
| Chart.js / Recharts | Data visualization       |
| React Hot Toast     | Notifications            |
| Local Storage       | Persistent data handling |

---

## 🚀 Live Demo

🔗 **View Website:** [Smart Budget on GitHub Pages](https://ashokc46.github.io/Smart_Budget/)

---

## 🧩 Folder Structure

```
SmartBudget/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionList.jsx
│   │   ├── SummaryCard.jsx
│   │   └── Charts.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Reports.jsx
│   │   └── Goals.jsx
│   │
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   │       └── transactionSlice.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── vite.config.js
```

---

## ⚙️ Installation & Setup

Follow these steps to run the app locally:

```bash
# 1️⃣ Clone this repository
git clone https://github.com/AshokC46/SmartBudget.git

# 2️⃣ Navigate to the folder
cd SmartBudget

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deployment

The app is deployed on **GitHub Pages** using the `gh-pages` package.

To deploy manually:

```bash
npm run build
npm run deploy
```

This automatically publishes your `/dist` build to the `gh-pages` branch.

---

## 📸 Screenshots

| Dashboard                                                        | Transactions                                                           |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![Dashboard](https://via.placeholder.com/400x200?text=Dashboard) | ![Transactions](https://via.placeholder.com/400x200?text=Transactions) |

---

## 🧑‍💻 Author

**Ashok C**
Front-End React Developer | Skilled in Redux, Tailwind, Material UI & REST APIs
📫 Connect on [LinkedIn](https://linkedin.com/in/ashokchavala)

---

## 💬 Feedback

If you have any feedback or suggestions, feel free to open an issue or reach out — I’m always open to improving this project further!

---
