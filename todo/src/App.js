// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import TodoBanner from './TodoBanner';
import TodoRow from './TodoRow';
import TodoCreator from './TodoCreator';
import VisibilityControl from './VisibilityControl';

function App() {
  const [userName, setUserName] = useState("Raveena");

  const [todoItems, setTodoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: true },
    { action: "Call Joe", done: false }
  ]);

   const createNewTodo = (task) => {
    if (!todoItems
      .find((item) => item.action === task))    
    {
      const updatedTodos = [...todoItems, {action: task, done: false}];
      setTodoItems(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const toggleTodo = (todo) => {
    const updatedTodos = todoItems.map((item) =>    
      item.action === todo.action
      ? { ...item, done: !item.done }
      : item
    );
    setTodoItems(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (todo) => {
  if (todo.done) {
    const updatedTodos = todoItems.filter(item => item.action !== todo.action);
    setTodoItems(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
};


  const [showCompleted, setShowCompleted] = useState(true);
  
  //const todoTableRows = (doneValue) => todoItems.filter(item => item.done === doneValue).map(item =>
   // <TodoRow key={ item.action } item={ item } toggle={ toggleTodo } />
  //)

    useEffect(() => {
    try {
      const data = localStorage.getItem("todos");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setTodoItems(parsedData);
        }
      } else {
        setUserName("Raveena");
        setTodoItems([
          { action: "Buy Flowers", done: false },
          { action: "Get Shoes", done: false },
          { action: "Collect Tickets", done: true },
          { action: "Call Joe", done: false }
        ]);
        setShowCompleted(true);
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
    }
  }, []);

  return (
    <div className="container mt-3">
      <TodoBanner userName={userName} todoItems={todoItems} />

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th style={{width: "75%"}}>Action</th>
            <th style={{width: "25%"}}>Done</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.filter(item => !item.done).map(item => (
            <TodoRow
              key={item.action}
              item={item}
              toggle={toggleTodo}
              // no deleteTodo prop passed here
            />
          ))}
        </tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)} />
      </div>

      { showCompleted &&
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{width: "60%"}}>Action</th>
            <th style={{width: "20%"}}>Done</th>
            <th style={{width: "20%"}}>Delete</th>
          </tr>
        </thead>
        <tbody>
          { todoItems.filter(item => item.done).map(item => (
              <TodoRow
                key={item.action}
                item={item}
                toggle={toggleTodo}
                deleteTodo={deleteTodo}   // pass deleteTodo callback
              />
          ))}
        </tbody>
      </table>
      }
      <div className="m-3" style={{width: "25%"}}>
        <TodoCreator callback={createNewTodo} />
      </div>
    </div>
  );
}

export default App;
