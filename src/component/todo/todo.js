import React, { useEffect, useState } from 'react';
import style from './Todo.module.css'
import rocket from "./rocket.svg";

const Todo = () => {

    const [newTodo, setNewTodo] = useState('');
        // Initialize the todos state with data from Local Storage or an empty array
        const [todos, setTodos] = useState(() => {
          const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
          return savedTodos;
        });

        const [completedTodos, setCompletedTodos] = useState(() => {
            const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];
            return savedCompletedTodos;
          });

          const completeTodo = (index) => {
            const updatedTodos = [...todos];
            updatedTodos[index].completed = true;
            setTodos(updatedTodos);
            const completedTodo = updatedTodos.splice(index, 1)[0];
            setCompletedTodos([...completedTodos, completedTodo]);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
          };
        

    const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


    let getVAlueInput = e => setNewTodo(e.target.value)  /* Returns the value of the input element */

    // You perform the task style when you work and finish
    function finishedTask(e) {
        let element =  e.target.parentElement
        // during work
        if(e.target.name == "ellipse-outline"){
            e.target.name = "checkmark-circle"
            element.children[1].style.textDecoration = 'line-through'
            element.children[1].style.color = '#5E60CE'
            element.style.opacity = '50%'
            e.target.style.color = '#5E60CE'
        }
        // After finish
        else{
            e.target.name = 'ellipse-outline'
            element.children[1].style.textDecoration = 'none'
            element.children[1].style.color = '#F2F2F2'
            element.style.opacity = '100%'
            e.target.style.color = '#4EA8DE'
        }
    }

   
    return (
        <>
        <div className={style.todo}>
            <img src={rocket} style={{marginRight:'12px'}}/>
            <h1>to</h1>
            <h1>do</h1>
        </div>
        <div className={style.father} >
            <div className={style.addTAsk}>
                <input className={style.enterTask} type='text' value={newTodo} placeholder='Enter a new task' onChange={getVAlueInput}/>
                <button className={style.create} type='submit' onClick={addTodo} >Create</button>
            </div>

            <div className={style.allTask}>{todos.map((el, index) => (
                <div className={style.newTask}>
                    <ion-icon name="ellipse-outline" onClick={completeTodo(index)}></ion-icon>
                    <p key={index}>{el}</p>
                    <ion-icon name="trash-outline" onClick={()=> deleteTodo(index)}></ion-icon>
                </div>
    ))}</div>

        </div>

        </>
    );
}

export default Todo;
