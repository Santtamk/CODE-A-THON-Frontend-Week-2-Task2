import { CiPizza } from "react-icons/ci";
import { SlPresent } from "react-icons/sl";
import { CiRollingSuitcase } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { PropTypes } from "prop-types";
import "./RecentTranscations.css";
import { useState } from "react";
import Pagination from "./Pagination";

const RecentTranscations = ({ expenses, deleteExpense, editExpense }) => {
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  //per page
  const currentRecords = expenses.slice(indexOfFirstRecord, indexOfLastRecord);

  //the number of pages
  const nPages = Math.ceil(expenses.length / recordsPerPage)


  //icons for displaying on recent transactions
  const images = [
    { id: 0, category: "Food", icon: <CiPizza /> },
    { id: 1, category: "Entertainment", icon: <SlPresent /> },
    { id: 2, category: "Travel", icon: <CiRollingSuitcase /> },
  ];

  return (
    <div>
      <div>
        <h2>Recent Transactions</h2>
        <div className="transactions">
          {currentRecords.map((expense) => {
            const findImage = images.find(
              (image) => image.category === expense.category
            );

            return (
              <div key={expense.id}>
                <div>
                  <div className="transactions_item">
                    <div className="transactions_item-imagetitle">
                      {findImage && <div className="icons iconImage">{findImage.icon}</div>}
                      <div className="transactions_item-title">
                        <p>{expense.title}</p>
                        <p>{expense.date}</p>
                      </div>
                    </div>
                    <div className="transactions_item-selection">
                      <p>₹{expense.price}</p>
                      <p className="icons deleteImage">
                        <TiDeleteOutline
                          onClick={() => deleteExpense(expense.id)}
                        />
                      </p>
                      <p className="icons editImage">
                        <CiEdit onClick={() => editExpense(expense.id)} />
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
          <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentTranscations;

RecentTranscations.propTypes = {
  deleteExpense: PropTypes.func,
  editExpense: PropTypes.func,
  expenses: PropTypes.array.required,
};
