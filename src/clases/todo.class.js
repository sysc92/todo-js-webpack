export class Todo{
    static fromJson({id,tarea,completado,creado}){
        const todotmp= new Todo(tarea);
        todotmp.id=id;
        todotmp.completado=completado;
        todotmp.creado=creado;
        return todotmp;
    }

    constructor(tarea){
        this.tarea=tarea;
        this.id=new Date().getTime();//5462167987
        this.completado=false;
        this.creado=new Date();
    }
}