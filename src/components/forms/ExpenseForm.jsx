import { PropTypes } from "prop-types"
import './form1.css';

const ExpenseForm = ({ addExpense, expenseFormData, handleInputChange, toggleExpensesForm }) => {
  return (
    <div>
       <div className="form1-overlay">
       <div className="form1-content">
        <form onSubmit={addExpense}>
              <h3>Add Expenses</h3>
              <div className="form1-content_div">
                <input 
                  type="text" 
                  name="title"
                  placeholder="Title" 
                  value={expenseFormData.title}
                  onChange={handleInputChange} 
                  className="form1-content__add-amount"
                  required 
                />
                <input 
                  type="number" 
                  placeholder="Price" 
                  name="price"
                  value={expenseFormData.price}
                  onChange={handleInputChange}
                  className="form-content__add-amount"
                  required 
                />
                  <select 
                    name="category" 
                    id="categories" 
                    value={expenseFormData.category}
                    onChange={handleInputChange}
                    className="form1-content__add-amount"
                    required
                  >
                    <option value="" disabled hidden>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                  </select>
                <input 
                  type="date" 
                  name="date"
                  placeholder="dd/mm/yyyy" 
                  value={expenseFormData.date}
                  onChange={handleInputChange}
                  className="form-content__add-amount"
                  required 
                />
                <input type="submit" value="Add Expense" className="form1-content_input"/>
                <input onClick={toggleExpensesForm} value='Cancel' type="button" className="form1-content_cancel"/>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

ExpenseForm.propTypes = {
    addExpense: PropTypes.func,
    expenseFormData: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func,
    toggleExpensesForm: PropTypes.func,
}

export default ExpenseForm