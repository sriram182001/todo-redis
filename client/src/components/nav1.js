import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import {useDispatch} from 'react-redux'
import './nav1.css'
function Nav1()
{
    let navigate=useNavigate();
    const dispatch=useDispatch();
    const logout=async()=>{
        const response=await Axios.get('http://localhost:3000/api/logout');
        console.log(response)
        if(response.data==='loggedout'){
            dispatch({type:'CHECK_LOGIN',loggedIn:false});
            navigate('/signin')
        }
    }

return(
<div className='btn'>
    <button  onClick={logout}>LOGOUT</button>
    <nav>
        <ul>
        <li><Link to="/welcome"><b>Home</b></Link></li>
        <li><Link to="/addTodo"><b>Add</b></Link></li>
        <li><Link to="/getTodo"><b>Your TASKS</b></Link></li>
        
        </ul>
    </nav>
</div>
)};
export default Nav1;

    
