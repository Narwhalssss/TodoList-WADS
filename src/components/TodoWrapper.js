import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { db } from '../firebase';
import { collection, addDoc, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const q = query(collection(db, "todos"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const todosArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setTodos(todosArray);
        });

        return () => unsubscribe(); // Clean up on unmount
    }, []);

    const addTodo = async (todo) => {
        try {
            await addDoc(collection(db, "todos"), {
                task: todo,
                completed: false,
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const toggleComplete = async (id) => {
        const todoRef = doc(db, "todos", id);
        const todo = todos.find(todo => todo.id === id);
        try {
            await updateDoc(todoRef, {
                completed: !todo.completed
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const deleteTodo = async (id) => {
        const todoRef = doc(db, "todos", id);
        try {
            await deleteDoc(todoRef);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const editTask = async (task, id) => {
        const todoRef = doc(db, "todos", id);
        try {
            await updateDoc(todoRef, {
                task: task,
                isEditing: false
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const setEditingTodo = (id) => {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: true } : todo));
    };

    const handleImageUpload = () => {
      // Logic to handle image upload
  };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'notCompleted') return !todo.completed;
        return true; 
    });

    return (
        <div className='TodoWrapper'>
            <h1>Lets Get it!</h1>
            <TodoForm addTodo={addTodo}/>
            <div>
                <button className='todo-btn' onClick={() => setFilter('all')}>All</button>
                <button className='todo-btn' onClick={() => setFilter('completed')}>Completed</button>
                <button className='todo-btn' onClick={() => setFilter('notCompleted')}>Not Completed</button>
            </div>
            {filteredTodos.map((todo, index) => (
                todo.isEditing ? (
                  <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
                ) : ( 
                    <Todo  
                    task={todo}
                    key={todo.id}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    setEditingTodo={setEditingTodo} /> 
                )
            ))}
        </div>
    );
};
