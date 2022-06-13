import Axios from 'axios';
import React from 'react';
import {useState,useEffect}  from 'react';
import Nav1 from './nav1'
import './addTodo.css'

function AddTodo(){
    const [state,setState]=useState({
        task:''
    });
    function HandleChange(e){
        setState({task:e.target.value})
    }
    //console.log(state);
    async function HandleSubmit(e){
        e.preventDefault();
        const response=await Axios.post('http://localhost:3000/api/addtask', {state})
        console.log(response.data);
        if(response.data==='added'){
           document.getElementById('msg').innerHTML='Task Added!';
           setTimeout(()=>{
            document.getElementById('msg').innerHTML='';
           },1000)
        }
    }

    return(
      <div className='AddTodo'>
          <Nav1/>
        <div className='forms'> 
        <form  onSubmit={HandleSubmit} action='' className="form-control1">
          <label htmlFor="user" ><b>TASK:</b></label>
          <br />
          <input id="user" name="Task" type="text" placeholder='Enter a task' onChange={HandleChange}required />      
          <br />
          <br />
          <br />
          <input id='sub' type="submit" value="ADD"/>
        </form> 
        <br />
        <h4 id='msg' style={{color:'white',textAlign:'center'}}></h4>
        </div> 
       
      </div>
    )
};
export default AddTodo;