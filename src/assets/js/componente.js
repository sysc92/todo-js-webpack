import { Todo } from "../../clases";
import { todoList } from "../../index";

//Referencias al html
const divTodoList =document.querySelector('.todo-list');//retorna el primer elemento con la clase
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletado=document.querySelector('.clear-completed');
const ulFiltros=document.querySelector('.filters');
const anchorFiltros=document.querySelectorAll('.filtro');

export const crearTodoHtml=(todo)=>{
    const htmlTodo=`
    <li data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado?'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div=document.createElement('div');
    div.innerHTML=htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

txtInput.addEventListener('keyup',(e)=>{
    //console.log(e);
    if (e.keyCode===13 && txtInput.value.length>0) {
        const nuevoTodo=new Todo(txtInput.value);
        todoList.agregarTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value='';
    }
});


divTodoList.addEventListener('click',(e)=>{
    console.log(e.target.localName);
    const nombreElemento=e.target.localName;
    const todoElemento=e.target.parentElement.parentElement;
    const todoid=todoElemento.getAttribute('data-id');
    console.log(todoElemento);

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoid);
        todoElemento.classList.toggle('completed');
    }
    if (nombreElemento.includes('button')) {
        todoList.eliminar(todoid);
        divTodoList.removeChild(todoElemento);
        //todoElemento.classList.toggle('completed');
    }

});

btnBorrarCompletado.addEventListener('click',(e)=>{
    todoList.eliminarCompletados();
    for (let index = divTodoList.children.length-1; index >=0; index--) {
        const elemento=divTodoList.children[index];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
        
    }
});

ulFiltros.addEventListener('click',(e)=>{
    const filtro=e.target.text;
    if(!filtro){return;}

    anchorFiltros.forEach((el)=>{el.classList.remove('selected')});
    e.target.classList.add('selected');
    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado=elemento.classList.contains('completed');
        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});