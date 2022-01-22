import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import Axios from 'axios';

import Computer from './computer.jpeg';

function Auth() {
    
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const register= ()=>{
        Axios.post('http://localhost:5000/reg',{      
            username: usernameReg,
            password: passwordReg
        }).then(res=>{
            console.log(res)
        })
    };

    const login =() =>{
        Axios.post('http://localhost:5000/login',{      
            username: usernameReg,
            password: passwordReg
        }).then((response)=>{
            if(response.data.message){
                setLoginStatus(response.data.message)
            }
            else{
                setLoginStatus(response.data[0].username)
            }
        })
    };
        return (
 
            <div className="Auth">
                
                <div className='contain'> 
              
                    <div className='form2'>
                        <div className="pic">
                            <img src={Computer} alt="" className='picco'/>
                        </div>
                        <h1>Registration</h1>
                        <label >username</label>
                        <input className="form-control" type="text" 
                         placeholder='enter your username' onChange={(e)=>{setUsernameReg(e.target.value)}}/>
                        <label >password</label>
                        <input className="form-control" type="text"  
                        placeholder='enter your password' onChange={(e)=>{setPasswordReg(e.target.value)}}/>
                       <div> <a href='/'> <button onClick={register} className='btn btn-primary'> Register </button></a></div>
                    </div>
                   <div className='form1'>
                        <h1>Login</h1>
                   
                        <input className="form-control" type="text" 
                        placeholder='enter your username' onChange={(e)=>{setUsername(e.target.value)}}/>
             
                        <input className="form-control" type="text" 
                        placeholder='enter your password' onChange={(e)=>{setPassword(e.target.value)}}/>
                        <a > <button className='btn btn-primary' onClick={login}> Login </button></a>
                        <p>{loginStatus}</p>
        </div>
                </div>
        
            </div>
    );

}                                                                    
export default Auth;
