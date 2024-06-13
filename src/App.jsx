import { useEffect, useState } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import "./App.css";
import WalletForm from "./components/forms/WalletForm";
import ExpenseForm from "./components/forms/ExpenseForm";
import WalletAndExpenses from "./components/wallet/WalletAndExpenses";
import ExpensesPieChart from "./components/charts/ExpensePieChart.jsx";

import { v4 as uuidv4 } from 'uuid';
import RecentTranscations from "./components/transactions/RecentTranscations.jsx";
import TopExpenses from "./components/topexpenses/TopExpenses.jsx";


function App() {
  //balance update
  const [balance, setBalance] = useState(() => {
    try {
      const savedBalance = localStorage.getItem("balance");
      return savedBalance !== null ? JSON.parse(savedBalance) : 5000;
    } catch (e) {
      console.error("this is the error message on balance", e);
      return 5000;
    }
  });

  const [expenses, setExpenses] = useState(() => {
    try {
      const savedExpenses = localStorage.getItem("expenses");
      return savedExpenses !== null ? JSON.parse(savedExpenses) : [];
    } catch (e) {
      console.error("this is the error message on expense", e);
      return [];
    }
  });

  //state of the wallet & expense value in form
  const [addingToWallet, setAddingToWallet] = useState(0);
  const [expenseFormData, setExpenseFormData] = useState({
    id:"",
    title: "",
    price: "",
    category: "",
    date: "",
  });

  //form toggle state change
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [totalExpenses, setTotalExpenses] = useState();

  

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [balance, expenses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const toggleBalanceForm = () => {
    setShowIncomeForm(!showIncomeForm);
    if (showExpenseForm) setShowIncomeForm(false);
  };

  const toggleExpensesForm = () => {
    setShowExpenseForm(!showExpenseForm);
    if (showIncomeForm) setShowExpenseForm(false);
    setExpenseFormData({
      id: "",
      title: "",
      price: "",
      category: "",
      date: "",
    });
  };

  const addBalance = (e) => {
    e.preventDefault();
    const amountToAdd = parseInt(addingToWallet, 10);
    setBalance((prevBalance) => prevBalance + amountToAdd);
    setAddingToWallet(0);
    toggleBalanceForm();
  };

  useEffect(() => {
    setTotalExpenses(
      expenses.reduce((total, expense) => total + expense.price, 0)
    );
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();

    //form data
    const id = expenseFormData.id; 
    const title = expenseFormData.title;
    const price = parseFloat(expenseFormData.price);
    const category = expenseFormData.category;
    const date = expenseFormData.date;

    const parsedDate = new Date(date).toDateString();

    // Check if the expense is greater than the balance
    const newTotalExpenses = totalExpenses + price;
    if (newTotalExpenses > balance) {
      enqueueSnackbar("Your expense is greater than your balance", {
        variant: "error",
      });
      return;
    }
    
    if (id) {
      // Edit existing expense
      const updatedExpenses = expenses.map((expense) =>
        expense.id === id ? { ...expense, title, price, category, date } : expense
      );
      setExpenses(updatedExpenses);
    } else {
      // Add new expense
      const newExpense = {
        id: uuidv4(),
        title,
        price,
        category,
        date:parsedDate,
      };
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }

    //reset form fields
    setExpenseFormData({
      id:"",
      title: "",
      price: "",
      category: "",
      date: "",
    });

    toggleExpensesForm();
  };

  const clearAll = () => {
    //Reset state
    setBalance(5000);
    setExpenses([]);
    //clear local storage
    localStorage.removeItem("balance");
    localStorage.removeItem("expenses");
  };

  const deleteExpense = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
  };

  const editExpense = (id) => {
    toggleExpensesForm()
    const findExpense = expenses.find((expense) => expense.id === id);
    setExpenseFormData(findExpense)
  }

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <div>
          <h1>Expense Tracker</h1>
          <div className="top_add">
            <WalletAndExpenses
              title="Wallet Balance"
              amount={balance}
              color="#9DFF5B"
              backgroundColor="linear-gradient(90deg, #B5DC52 0%, #89E148 100%)"
              buttonText="+ Add Income"
              toggleForm={toggleBalanceForm}
            />
            <WalletAndExpenses
              title="Expenses"
              amount={totalExpenses}
              color="#F4BB4A"
              backgroundColor="linear-gradient(90deg, #FF9595 0%, #FF4747 80%, #FF3838 100%)"
              buttonText="+ Add Expense"
              toggleForm={toggleExpensesForm}
            />
            <ExpensesPieChart expenses={expenses} />
          </div>
          <div>
            {showIncomeForm && (
              <WalletForm
                addBalance={addBalance}
                setAddingToWallet={setAddingToWallet}
                toggleBalanceForm={toggleBalanceForm}
              />
            )}
            {showExpenseForm && (
              <ExpenseForm
                addExpense={addExpense}
                expenseFormData={expenseFormData}
                handleInputChange={handleInputChange}
                toggleExpensesForm={toggleExpensesForm}
              />
            )}
          </div>
        </div>
        {/* top body ends here */}
      </SnackbarProvider>
      <button onClick={clearAll}>Clear All</button>
      <div className="second-body">
        <div>
          <RecentTranscations  expenses={expenses} deleteExpense={deleteExpense} editExpense={editExpense } />
        </div>
        <div>
          <TopExpenses expenses={expenses}/>
        </div>
      </div>
    </>
  );
}

export default App;
