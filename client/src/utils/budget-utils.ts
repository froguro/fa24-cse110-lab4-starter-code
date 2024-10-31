import { API_BASE_URL } from "../constants/constants";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`);
	if (!response.ok) {
    	throw new Error('Failed to fetch expenses');
	}

	// Parsing the response to get the data
	const budget = await response.json();

	console.log("response in fetchBudget", budget);
	return budget.data;
};

export const updateBudget = async (newBudget: number): Promise<number> => {
	const response = await fetch(`${API_BASE_URL}/budget`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: newBudget }),
    });

    if (!response.ok) {
        throw new Error('Failed to update budget');
    }

    // Parsing the response to get the updated budget data
    const updatedBudget = await response.json();

    console.log("response in updateBudget", updatedBudget);
    return updatedBudget;
};