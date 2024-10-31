import { AppContext } from "../../context/AppContext"
import { useContext, useEffect } from "react"
import { fetchBudget, updateBudget } from "../../utils/budget-utils";


const Budget = () => {
  
  const {budget, setBudget} = useContext(AppContext)


  useEffect(() => {
    fetchTheBudget();
  }, [])

  const fetchTheBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  }


  const handleBudgetChange = (e: any) => {
    setBudget(e.target.value);
  }


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // PUT
    updateBudget(budget)
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <form onSubmit={(event) => onSubmit(event)}>
        <div>
          Budget: ${budget.toString()}
          <input
              required
              type="number"
              className="form-control"
              id="name"
              value={budget}
              onChange={handleBudgetChange}
            ></input>

            <button type="submit" className="btn btn-primary mt-3">
              Save
            </button>
        </div>
      </form>
    </div>
  );
};

export default Budget;
