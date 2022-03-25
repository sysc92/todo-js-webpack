import { crearTodoHtml } from "../assets/js/componente";
import { Todo } from "./todo.class";

export class TodoList{
    constructor(){
        //console.log(this.cargarLocalStorage());
        this.todos=[]
        //this.todos=this.cargarLocalStorage();
    }

    agregarTodo(todo){
        this.todos.push(todo);
        //crearTodoHtml(todo);
        /*this.todos.forEach(
            (el)=>{crearTodoHtml(el)}
        );*/
       this.guardarLocalStorage();
    }

    eliminar(id){
        this.todos=this.todos.filter(todo=>todo.id!=id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for (const todo of this.todos) {
            if (todo.id==id) {
                todo.completado=!todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    eliminarCompletados(){
        this.todos=this.todos.filter(todo=>!todo.completado);//devuelve un arreglo de los elementos q cumlpan con la condicion
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todos',JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
     
        if (localStorage.getItem('todos')) {
           this.todos= JSON.parse(localStorage.getItem('todos'));
           this.todos=this.todos.map(obj=>Todo.fromJson(obj))
        }else{
            this.todos=[];
        }
        
        
    }

}