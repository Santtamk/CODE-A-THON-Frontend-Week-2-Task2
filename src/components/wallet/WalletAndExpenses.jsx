import { PropTypes } from "prop-types"
import './WalletAndExpenses.css';

const WalletAndExpenses = ({ amount, color, buttonText, title, toggleForm, backgroundColor }) => {

  return (
    <div className="card">
        <div>{title}:<span style={{ color: color }}>₹{amount}</span></div>
        <button style={{ background: backgroundColor }} onClick={toggleForm}> {buttonText} </button>
    </div>
  )
}

WalletAndExpenses.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number,
    color: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    toggleForm: PropTypes.func,
}

export default WalletAndExpenses