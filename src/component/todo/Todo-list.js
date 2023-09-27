// src/TodoList.js
import React, { useState, useEffect } from 'react';
import style from "./Todo.module.css";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    return savedTodos;
  });

  const [completedTodos, setCompletedTodos] = useState(() => {
    const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];
    return savedCompletedTodos;
  });

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const deleteTodo = (index, isCompleted = false) => {
    if (isCompleted) {
      const updatedCompletedTodos = [...completedTodos];
      updatedCompletedTodos.splice(index, 1);
      setCompletedTodos(updatedCompletedTodos);
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
    } else {
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  const completeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = true;
    setTodos(updatedTodos);
    const completedTodo = updatedTodos.splice(index, 1)[0];
    setCompletedTodos([...completedTodos, completedTodo]);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  };

  const restoreTodo = (index) => {
    const updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos[index].completed = false;
    setCompletedTodos(updatedCompletedTodos);
    const restoredTodo = updatedCompletedTodos.splice(index, 1)[0];
    setTodos([...todos, restoredTodo]);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Save todos and completedTodos to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos]);

  return (
    <div>
      <h1>Todo <span>List</span></h1>
      <div className={style.addTAsk}>
        <input className={style.enterTask}
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className={style.create} onClick={addTodo}>Add</button>
      </div>
      <h2>Active Todos</h2>

      <div className={style.allTask}>
        {todos.map((todo, index) => (
            <div className={style.newTask}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => completeTodo(index)}
            />
            <p className={style.textTodo} 
                style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#5E60CE' : 'white',
                }}
            >{todo.text}</p>
            
            <ion-icon className={style.remove} name="trash-outline" onClick={()=> deleteTodo(index)}></ion-icon>

          
          </div>
        ))}
      </div>


      <h2>Completed Todos</h2>
      <div >
        {completedTodos.map((todo, index) => (
          <div key={index} className={style.newTask} style={{opacity: todo.completed ? '60%' : '0',}}> 
            
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => restoreTodo(index)}
              />
              <p className={style.textTodo}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#5E60CE' : 'black',
                  
                }}
              >
                {todo.text}
              </p>
            
              <ion-icon className={style.remove} name="trash-outline" onClick={()=> deleteTodo(index)}></ion-icon>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
