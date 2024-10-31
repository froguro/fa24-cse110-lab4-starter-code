import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { createExpense } from "../../utils/expense-utils";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext);
  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState<number>(0); 

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newExpense: Expense = {
      name, cost,
      id: (expenses.length + 1).toString()
    }
    const newExpenseList = [...expenses, newExpense]
    createExpense(newExpense); // POST to create expense in the backend
    setExpenses(newExpenseList);
    setName("");
    setCost(0);
  };

const handleNameChange = (e: any) => {
  setName(e.target.value);
}
const handleCostChange = (e: any) => {
  const value = e.target.value; 
    const numericValue = Number(value); 

    
    if (!isNaN(numericValue)) {
      setCost(numericValue); 
    } else {
      setCost(0); 
    }

}


  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            // HINT: onChange={}
            onChange={handleNameChange}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost}
            // HINT: onChange={}
            onChange={handleCostChange}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
