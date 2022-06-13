import Axios from 'axios';
import React from 'react';
import { useNavigate,Link} from 'react-router-dom';
import './welcome.css'
import {useState,useEffect}  from 'react';
import { useDispatch } from 'react-redux';
import Nav1 from './nav1'



function Mspc(){
    
    const[details,setdetails]=useState({
        value:{},
        flag:false
    });
    useEffect(()=>{
    async function fetchdata(){
        const response=await Axios.get('http://localhost:3000/api/getdetails');
        //console.log(response.data)
        setdetails({value:response.data,flag:true});
    }
    fetchdata()},[]);
    const a= 
    <div className="Mspc">
    <Nav1/>
    <br />
    <h1><i>WELCOME</i></h1>
    <br />
    <br />
    {(details.flag===false)?<h1>...Loading</h1>:<p> Welcome {details.value.name} @ {details.value.mailid} </p>}
    <p>This is a place Where you can schedule your Tasks.</p>
    </div>
    return(
       a
    )
}
export default Mspc;