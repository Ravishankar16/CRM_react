import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { getAllTickets } from "../api/tickets";

function Admin(){
    const Username = localStorage.getItem("name")

    const [ticketDetails, setTicketDetails] = useState([])

    useEffect(()=> {
        fetchTickets()
    },[])

    const fetchTickets = ()=> {
        getAllTickets()
        .then(res=>{
            // console.log(res.data)
            setTicketDetails(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

    }

    return(
        <div className="row bg-light">
            <div className="col-1">
                <Sidebar/>
            </div>
            <div className="col vh-100">
                <div className="container">
                    <div>
                        <h3 className="text-primary text-center">Welcome, {Username}</h3>
                        <p className="text-muted text-center">Take a quick look at your admin status below</p>
                        <div className="row">
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow bg-primary text-dark bg-opacity-25 border border-primary">
                                    <div className="card-body">
                                        <h5 className="mb-2">
                                            <i className="text-primary bu bi-pencil mx-2"></i>
                                            Open
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4">8</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:50, height:50}}>
                                                    <CircularProgressbar value={80} styles={buildStyles({pathColor:"red"})}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow bg-warning text-dark bg-opacity-25 border border-warning">
                                    <div className="card-body">
                                        <h5 className="mb-2">
                                            <i className="text-warning bi bi-lightning-charge mx-2"></i>
                                            Progress
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4">4</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:50, height:50}}>
                                                    <CircularProgressbar value={40} styles={buildStyles({pathColor:"#AA6C39"})}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow bg-success text-dark bg-opacity-25 border border-success">
                                    <div className="card-body">
                                        <h5 className="mb-2">
                                            <i className="text-success bu bi-check-circle mx-2"></i>
                                            Closed
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4">7</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:50, height:50}}>
                                                    <CircularProgressbar value={70} styles={buildStyles({pathColor:"green"})}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow bg-secondary text-dark bg-opacity-25 border border-secondary">
                                    <div className="card-body">
                                        <h5 className="mb-2">
                                            <i className="text-dark bu bi-slash-circle mx-2"></i>
                                            Blocked
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4">4</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:50, height:50}}>
                                                    <CircularProgressbar value={40} styles={buildStyles({pathColor:"black"})}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;