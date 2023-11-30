import {useState} from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Login(){

    const[showSignUp, setShowSignUp] =  useState(true)

    const[userId,setUserId] = useState("")
    const[password,setPassword] = useState("")
    const[userName,setUserName] = useState("")
    const[userEmail,setUserEmail] = useState("")
    const[userType,setUserType] = useState("CUSTOMER")

    const toggleSignUp = ()=> {
        setShowSignUp(!showSignUp)
    }

    return(
        <div className="bg-info d-flex justify-content-center align-items-center vh-100">
            <div style={{width:30 + 'rem'}} className="card p-3 rounded-5 shadow-lg">
                <h4 className="text-info">{showSignUp?"Sign Up":"Log In"}</h4>
                <form className="d">

                    <div className="input-group">
                        <input className="form-control m-1" type="text" value={userId} placeholder="UserID" />
                    </div>

                    {
                        showSignUp &&
                    
                    <>
                        <div className="input-group">
                            <input className="form-control m-1" type="text" value={userName} placeholder="Username" />
                        </div>

                        <div className="input-group">
                            <input className="form-control m-1" type="email" value={userEmail} placeholder="Email" />
                        </div>
                    </>
                    

                    }


                    <div className="input-group">
                        <input className="form-control m-1" type="password" value={password} placeholder="password" />
                    </div>

                    {
                        showSignUp && 

                        <>
                        <DropdownButton
                            title={userType}
                            id="userType"
                            variant="light">
                                <Dropdown.Item eventKey="CUSTOMER" >CUSTOMER</Dropdown.Item>
                                <Dropdown.Item eventKey="ENGINEER" >ENGINEER</Dropdown.Item>
                        </DropdownButton>
                        </>

                    }

                    

                    <div className="input-group">
                        <input className="btn btn-info form-control text-white m-1 " type="submit" value={showSignUp?"Sign Up":"Log In"} placeholder= ""/>
                    </div>

                    <div className="text-info" onClick={toggleSignUp}>
                        {
                            showSignUp?"Already have an account ? Log In" : "Don't have an account ? Sign Up"
                        }
                    </div>

                </form>

            </div>
        </div>
    )

}

export default Login