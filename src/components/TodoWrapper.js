import React, {useState} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4} from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    const addTodo = (todo) => {
        setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
        console.log(todos)
    } 

    const toggleComplete = (id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }

      const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !==id))
      }

      const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? 
            {...todo, isEditing: !todo.isEditing} : todo ))
      }
      
      const editTask = (task,id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} 
            : todo))
      }

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
                <button className='todo-btn' Click={() => setFilter('all')}>All</button>
                <button className='todo-btn' onClick={() => setFilter('completed')}>Completed</button>
                <button className='todo-btn' onClick={() => setFilter('notCompleted')}>Not Completed</button>
            </div>
            {filteredTodos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo}/>
                ) : ( 
                    <Todo task={todo} key={index}   
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}/>
                )
            ))}
        </div>
    );
}