// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import TodoBanner from './TodoBanner';

function App() {
  const [userName] = useState("Raveena");

   // const changeStateData = () => {
   //   setUserName(prevName => (prevName === "Raveena" ? "Ruby" : "Raveena"));
   // };

  const [todoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false }
  ]);

  return (
    <div>
      <TodoBanner userName={userName} todoItems={todoItems} />
      <div style={{ padding: "50px" }}>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Action</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {todoItems.map((item, index) => (
              <tr key={index}>
                <td>{item.action}</td>
                <td>{item.done ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
