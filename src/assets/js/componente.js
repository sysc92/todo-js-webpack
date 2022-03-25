
import '../css/componente.css';
import webpacklogo from '../img/webpack-logo.png';

export const saludar = (nombre)=>{
    console.log('Creando h1');
    const h1=document.createElement('h1');
    h1.innerHTML=`Hola, ${nombre}`;
    document.body.appendChild(h1);

    const img=document.createElement('img');
    img.src=webpacklogo;
    document.body.appendChild(img);
}