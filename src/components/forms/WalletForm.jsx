import { PropTypes } from "prop-types"
import './form.css';

const WalletForm = ({ addBalance, setAddingToWallet, toggleBalanceForm }) => {
    return (
      <div className="form-overlay">
      <div className="form-content">
        <form onSubmit={addBalance}>
                <h3>Add Balance</h3>
                <div className="form-content_div">
                  <input
                    type="number"
                    onChange={(e) =>
                      setAddingToWallet(parseInt(e.target.value, 10))
                      }
                      placeholder="Income Amount"
                      className="form-content__add-amount"
                      required
                      />
                  <input type="submit" value="Add Balance" className="form-content_input"/>
                  <input onClick={toggleBalanceForm} value='Cancel' type="button" className="form-content_cancel"/>
                </div>
              </form>
      </div>
      </div>
    )
  }

  WalletForm.propTypes = {
    addBalance: PropTypes.func,
    setAddingToWallet: PropTypes.func,
    toggleBalanceForm: PropTypes.func,
}
  
  export default WalletForm