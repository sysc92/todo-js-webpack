
import { Todo,TodoList } from './clases';
import {crearTodoHtml} from './assets/js/componente';
import './style.css';

export const todoList=new TodoList();
todoList.cargarLocalStorage();
todoList.todos.forEach(todo => {
    crearTodoHtml(todo);
});