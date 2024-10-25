import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyBudgetTracker } from "./views/MyBudgetTracker";
import {} from 'react';
import { AppContext } from "./context/AppContext";
import { Expense } from "./types/types";

describe("Create an expense", () => {
  test("Verify that a new expense is correctly added to the expense list.", () => {
    const mockSetExpenses = jest.fn();
    const mockSetBudget = jest.fn();
    const mockExpenses: Expense[] = [];
    const mockBudget = 1000; 

    render(
      <AppContext.Provider
        value={{
          expenses: mockExpenses,
          setExpenses: mockSetExpenses,
          budget: mockBudget,
          setBudget: mockSetBudget,
        }}
      >
        <MyBudgetTracker />
      </AppContext.Provider>
    );

    expect(screen.getByText(/Budget: \$1000/i)).toBeInTheDocument(); 

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Groceries" } });
    fireEvent.change(screen.getByLabelText(/cost/i), { target: { value: 100 } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockSetExpenses).toHaveBeenCalledWith([
      ...mockExpenses,
      { name: "Groceries", cost: 100, id: expect.any(String) }, 
    ]);
  });
    
  test("Ensure the total Spent so far and Remaining update accordingly.", () => {
    const mockSetExpenses = jest.fn();
    const mockSetBudget = jest.fn();
    const mockContextValue = {
      expenses: [{ id: "1", name: "Shopping", cost: 400 }],
      budget: 1000,
      setExpenses: mockSetExpenses,
      setBudget: mockSetBudget
    };
  
    render(
      <AppContext.Provider value={mockContextValue}>
        <MyBudgetTracker />
      </AppContext.Provider>
    );
  
    expect(screen.getByText(/Remaining: \$600/i)).toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$400/i)).toBeInTheDocument();

  });
  



});

describe("Delete an expense", () => {
    test("", () => {
        const mockSetExpenses = jest.fn();
    const mockSetBudget = jest.fn();
    const mockContextValue = {
      expenses: [{ id: "1", name: "Shopping", cost: 400 }],
      budget: 1000,
      setExpenses: mockSetExpenses,
      setBudget: mockSetBudget
    };
  
    render(
      <AppContext.Provider value={mockContextValue}>
        <MyBudgetTracker />
      </AppContext.Provider>
    );
    })
});