import React, { useEffect } from 'react';
import { useState, useRef } from "react";
import "./todo.css";
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { IoMdDoneAll } from 'react-icons/io';

function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(() => {
    const data = JSON.parse(localStorage.getItem('myTodo'))
    return (data || "")
  })
  const [editId, setEditId] = useState(0)


  const addTodo = () => {
    if (todo !== '') {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }])
      localStorage.setItem('myTodo', JSON.stringify(todos))
      setTodo('');
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId)
      const updateTodo = todos.map((TODO) => TODO.id === editTodo.id
        ? (TODO = { id: TODO.id, list: todo })
        : (TODO = { id: TODO.id, list: TODO.list }));
      setTodos(updateTodo)
      setEditId(0);
      setTodo('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const inputRef = useRef('null')
  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem('myTodo', JSON.stringify(todos))

  }, [todos])

  const onDelete = (id) => {
    setTodos(todos.filter((items) => items.id !== id))
  }

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return ({ ...list, status: !list.status })
      }
      return list
    })
    setTodos(complete)
  }

  const onEdit = (id) => {
    const editTodo = todos.find((items) => items.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)
  }

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="formGroup" onSubmit={handleSubmit}>
        <input type="text" value={todo} placeholder="Enter your note" ref={inputRef} className="formControl" onChange={(event) => { setTodo(event.target.value) }} />
        <button onClick={addTodo}  > {editId ? 'EDIT' : 'ADD'} </button>
      </form>
      <div className="list">
        <ul>
          {
            todos.length===0?(
              <h1>No todos available</h1>
            ) :
            
            (
              
                todos.map((items) => (
                  <li className='list-items'>
                    <div className='list-items-list' id={items.status ? 'list-item' : ""}> {items.list} </div>
                    <span>
                      <IoMdDoneAll className='list-items-icons' id='complete' title='Complete' onClick={() => onComplete(items.id)} />
                      <FiEdit className='list-items-icons' id='edit' title='Edit' onClick={() => onEdit(items.id)} />
                      <MdDelete className='list-items-icons' id='delete' title='Delete' onClick={() => onDelete(items.id)} />
                    </span>
                  </li>
                ))
    
              
            )

            
          }
         
        </ul>
      </div>
    </div>
  )
}

export default Todo;