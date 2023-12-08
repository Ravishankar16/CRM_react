import {useEffect, useState} from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {userSignIn, userSignUp} from "../api/auth"

function Login(){

    const[showSignUp, setShowSignUp] =  useState(false)

    const[userId,setUserId] = useState("")
    const[password,setPassword] = useState("")
    const[userName,setUserName] = useState("")
    const[userEmail,setUserEmail] = useState("")
    const[userType,setUserType] = useState("CUSTOMER")
    const[message,setMessage] = useState("")
    const[error,setError] = useState(false)


    // if the user is logged in, also access token and usertype is stored in the local storage
    // we no need to go to the login page after refresh. only when the user logout the local storage(access token) will be deleted
    // later if user need to login new access token is generated and stored in local storage
    // useEffect- everytime the component loads for the first time
    useEffect(()=>{

        const userType = localStorage.getItem("userType")
        const token = localStorage.getItem("token")

        if(!userType || !token){
            return
        }

         if(userType==="ENGINEER"){
                window.location.href="/engineer"
            }
            else if(userType==="CUSTOMER"){
                window.location.href="/customer"
            }
            else {
                window.location.href="/admin"

            }

    },[])

    const toggleSignUp = ()=> {
        clearState()
        setShowSignUp(!showSignUp)
    }

    const clearState =()=> {
        setUserId("");
        setPassword("");
        setUserName("");
        setUserEmail("");
        setError("")
        setMessage("")
    }

    const onSignUp = (e)=> {
        // array of data
        const data =  {
            name:userName,
            userId:userId,
            email:userEmail,
            type:userType,
            password:password
        }
        // to stop reloading when we click login / signup button
        e.preventDefault();

        if(userId.length < 5){
            setError(true)
            setMessage("UserID should be of 5 to 10 characters")
            return
        }

        else if(password.length<5 || password.length>12){
            setError(true)
            setMessage("Password should be of 5 to 12 characters")
            return
        }

        // API call
        userSignUp(data)
        // internally call an API and return promise using then & catch 
        .then(res=>{
            console.log(res)
            setError(false)
            setMessage("Signup Successful")
            window.location.href="/"
        })
        .catch((err)=>{
            if(err.response.status===400){
                setError(true)
                setMessage(err.response.data.message)
            }
        })
    }

    const onLogIn = (e)=>{
        // since userId,password is same so we haven't used colon
        const data = {userId,password}

        e.preventDefault()

        // API call
        userSignIn(data)
        .then(res=>{
            // console.log(res)
            if(res.data.message){
                setError(true)
                setMessage(res.data.message)
                return
            }
            setError(false)
            setMessage("Login Successful!")
            
            // whenever a person login we are storing the information in the local storage
            localStorage.setItem("name",res.data.name)
            localStorage.setItem("userId",res.data.userId)
            localStorage.setItem("email",res.data.email)
            localStorage.setItem("userStatus",res.data.userStatus)
            localStorage.setItem("token",res.data.accessToken)
            localStorage.setItem("userType",res.data.userType)

            if(res.data.userType==="ENGINEER"){
                window.location.href="/engineer"
            }
            else if(res.data.userType==="CUSTOMER"){
                window.location.href="/customer"
            }
            else {
                window.location.href="/admin"

            }
        })
        .catch((err)=>{
            if(err.response.status){
                setError(true)
                setMessage(err.response.data.message)
            }
        })

    }

    // Just using single function to update all the input field
    const updateSignUpData = (e)=> {
        const id=e.target.id;

        if(id==="userId"){
            setUserId(e.target.value)
        }
        else if(id==="password"){
            setPassword(e.target.value)
        }
        else if(id==="userName"){
            setUserName(e.target.value)
        }
        else {
            setUserEmail(e.target.value)
        }
    }

    const handleSelect = (e)=> {
        // console.log(e)
        setUserType(e)
    }

    return(
        <div className="bg-info d-flex justify-content-center align-items-center vh-100">
            <div style={{width:30 + 'rem'}} className="card p-3 rounded-5 shadow-lg text-center">
                <h4 className="text-info">{showSignUp?"Sign Up":"Log In"}</h4>

                <form onSubmit={showSignUp?onSignUp:onLogIn}>
                    <div className="input-group">
                        <input className="form-control m-1" type="text" value={userId} id="userId" onChange={updateSignUpData} placeholder="UserID" />
                    </div>

                    {
                        showSignUp &&
                    
                    <>
                        <div className="input-group">
                            <input className="form-control m-1" type="text" value={userName} id="userName" onChange={updateSignUpData} placeholder="Username" />
                        </div>

                        <div className="input-group">
                            <input className="form-control m-1" type="email" value={userEmail} id="userEmail" onChange={updateSignUpData} placeholder="Email" />
                        </div>
                    </>
                    

                    }


                    <div className="input-group">
                        <input className="form-control m-1" type="password" value={password} id="password" onChange={updateSignUpData} placeholder="password" />
                    </div>

                    {
                        showSignUp && 

                        <>
                        <DropdownButton
                            title={userType}
                            onSelect={handleSelect}
                            id="userType"
                            variant="light">
                                <Dropdown.Item eventKey="CUSTOMER" >CUSTOMER</Dropdown.Item>
                                <Dropdown.Item eventKey="ENGINEER" >ENGINEER</Dropdown.Item>
                        </DropdownButton>
                        </>

                    }

                    

                    <div className="input-group">
                        <input className="btn btn-info form-control text-white m-1 " type="submit" value={showSignUp?"Sign Up":"Log In"} />
                    </div>

                    <div className="text-info" onClick={toggleSignUp}>
                        {
                            showSignUp?"Already have an account ? Log In" : "Don't have an account ? Sign Up"
                        }
                    </div>

                    <div className={error?"text-danger":"text-success"}>
                        {message}
                    </div>

                </form>

            </div>
        </div>
    )

}

export default Login