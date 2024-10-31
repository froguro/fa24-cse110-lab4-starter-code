import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyBudgetTracker } from "./views/MyBudgetTracker";
import {} from "react";
import { AppContext } from "./context/AppContext";
import { Expense } from "./types/types";
import App from "./App";

describe("Create an expense", () => {
  test("Verify that a new expense is correctly added to the expense list.", () => {
    // render the component
    render(<App />);

    // adding an example item
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(screen.getByLabelText(/cost/i), {
      target: { value: 100 },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    // expect that the example item is created and exists in the DOM
    expect(screen.getByText(/groceries/i)).toBeInTheDocument();
    
  });

  test("Ensure the total Spent so far and Remaining update accordingly.", () => {
    const mockSetExpenses = jest.fn();
    const mockSetBudget = jest.fn();
    const mockContextValue = {
      expenses: [{ id: "1", name: "Shopping", cost: 400 }],
      budget: 1000,
      setExpenses: mockSetExpenses,
      setBudget: mockSetBudget,
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
  test("Confirm that an expense is successfully removed from the list", () => {
    // render the component
    render(<App />);

    // adding an example item
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(screen.getByLabelText(/cost/i), {
      target: { value: 100 },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    // expect that the example item is created and exists in the DOM
    expect(screen.getByText(/Remaining: \$900/i)).toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$100/i)).toBeInTheDocument();
    expect(screen.getByText(/groceries/i)).toBeInTheDocument();
    // Find the delete button and click it
    const deleteButton = screen.getByRole("button", { name: "x" });
    fireEvent.click(deleteButton);

    // Ensure the item is no longer in the document
    expect(screen.queryByText(/groceries/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Remaining: \$1000/i)).toBeInTheDocument();
    expect(screen.getByText(/Spent so far: \$0/i)).toBeInTheDocument();
  });
});

test("Budget balance verification", () => {
  render(<App />);

  // Initial budget setup (you might get this from context)
  const initialBudget = 1000;

  // Verify initial values
  expect(screen.getByText(/remaining: \$1000/i)).toBeInTheDocument(); // Assuming this is your initial UI state
  expect(screen.getByText(/spent so far: \$0/i)).toBeInTheDocument();

  // Add an expense
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Groceries" },
  });
  fireEvent.change(screen.getByLabelText(/cost/i), {
    target: { value: 100 },
  });
  fireEvent.click(screen.getByRole("button", { name: /save/i }));

  // Calculate total expenditure and remaining balance
  const totalExpenditureAfterAdd = 100; // We know we just added $100
  const remainingBalanceAfterAdd = initialBudget - totalExpenditureAfterAdd;

  // Verify values after addition
  expect(screen.getByText(/remaining: \$900/i)).toBeInTheDocument();
  expect(screen.getByText(/spent so far: \$100/i)).toBeInTheDocument();
  expect(initialBudget).toBe(
    remainingBalanceAfterAdd + totalExpenditureAfterAdd
  ); // Validate equation

  // Remove the expense
  const deleteButton = screen.getByRole("button", { name: "x" });
  fireEvent.click(deleteButton);

  // Check values after deletion
  const totalExpenditureAfterDelete = 0; // No expenses now
  const remainingBalanceAfterDelete = initialBudget; // Should be back to original budget

  expect(screen.getByText(/remaining: \$1000/i)).toBeInTheDocument();
  expect(screen.getByText(/spent so far: \$0/i)).toBeInTheDocument();
  expect(initialBudget).toBe(
    remainingBalanceAfterDelete + totalExpenditureAfterDelete
  ); // Validate equation
});
