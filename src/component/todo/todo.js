import React, { useState } from 'react';
import style from './Todo.module.css'
import rocket from "./rocket.svg";

const Todo = () => {

    let [inputValue, setInputValue] = useState('') 
    let [tasks, setTasks] = useState([])

    let getVAlueInput = e => setInputValue(e.target.value)  /* Returns the value of the input element */

// Adds inputVAlue to the task set
    let appendTheTAsk = () => {
        if(inputValue.trim() !== ''){
            setTasks([...tasks, inputValue])
            setInputValue('')
        }
    }

    // Create a new item using the inputValue
    let todo = tasks.map((el, index) => (
                <div className={style.newTask} key={index}>
                    <ion-icon name="ellipse-outline" onClick={finishedTask}></ion-icon>
                    <p key={index}>{el}</p>
                    <ion-icon name="trash-outline" onClick={removeTask}></ion-icon>
                </div>
    ))

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

    // Delete the task
    function removeTask(e) {
        let element =  e.target.parentElement
        element.remove()
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
                <input className={style.enterTask} type='text' value={inputValue} placeholder='Enter a new task' onChange={getVAlueInput}/>
                <button type='submit' onClick={ appendTheTAsk}>Create</button>
            </div>

            <div className={style.allTask}>{todo}</div>

        </div>

        </>
    );
}

export default Todo;
