import './TopExpenses.css';
const TopExpenses = ({ expenses }) => {
  const processExpenses = () => {
    let entertainmentTotal = 0;
    let foodTotal = 0;
    let travelTotal = 0;

    expenses.forEach(expense => {
      if (expense.category === 'Entertainment') {
        entertainmentTotal += expense.price;
      } else if (expense.category === 'Food') {
        foodTotal += expense.price;
      } else if (expense.category === 'Travel') {
        travelTotal += expense.price;
      }
    });

    const categoryTotals = [
      { category: 'Entertainment', total: entertainmentTotal },
      { category: 'Food', total: foodTotal },
      { category: 'Travel', total: travelTotal },
    ];

    categoryTotals.sort((a, b) => b.total - a.total);

    return categoryTotals;
  };

  const data = processExpenses();
  const maxTotal = Math.max(...data.map(item => item.total));

  return (
    <div>
      <h2>Top Expenses</h2>
      <div className="chart-container">
        <div className='category-labels'>
            {data.map((item, index) => (
                <div className="bar-label" key={index}>{item.category}</div>
            ))}

        </div>
        <div className='bars'>
            {data.map((item, index) => (
                <div
                key={index}
                className="bar"
                style={{ width: `${(item.total / maxTotal) * 100}%` }}
                ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopExpenses;
