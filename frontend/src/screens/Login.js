import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [credentials, setcredentials] = useState({email:"",password:""})
  let navigate=useNavigate()
    const handleSubmit=async(e)=>{                                               //function which exexutes when form is submitted
        e.preventDefault();
        const response =await fetch("http://localhost:6001/api/loginuser",{              //connecting to backend
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
         //body se backend me data jyega 

    });
    const json=await response.json()      //getting response from backend
    console.log(json);

    if(!json.success){
    alert("Enter Valid credentials")
  }
    if(json.success)
    localStorage.setItem("userEmail",credentials.email);
    localStorage.setItem("authToken",json.authToken) ; //login screen pe cache store krne ke liye
    console.log(localStorage.getItem("authToken"))
    navigate("/");


    }

    const onChange=(event)=>{                            //function bnaye h jisse onchange in any field will set its new value
        setcredentials({...credentials,[event.target.name]:event.target.value})     //... se puurana wla chej restored rehta
    }
  return (
    <div>
      <div className='container'>
<form onSubmit={handleSubmit}>

<div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control"name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"name='password' value={credentials.password}onChange={onChange} id="exampleInputPassword1"/>
</div>

<button type="submit" className="m-3 btn btn-success">Submit</button>
<Link to="/createuser" className='m-3 btn btn-danger'>New user ?</Link>
</form>
</div>
    </div>
  )
}

export default Login