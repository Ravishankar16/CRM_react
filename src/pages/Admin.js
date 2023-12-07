import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { getAllTickets } from "../api/tickets";
import MaterialTable from "material-table";
import { getAllUsers } from "../api/user";
import { Modal, Button } from "react-bootstrap";

function Admin(){
    const Username = localStorage.getItem("name")

    const [ticketDetails, setTicketDetails] = useState([])
    const [ticketStatusCount, setTicketStatusCount] = useState({})
    const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
    const [ticketUpdateModal, setTicketUpdateModal] = useState(false)
    const [userDetails, setUserDetails] = useState([])

    useEffect(()=> {
        fetchTickets()
        fetchUsers()
    },[])

    const fetchTickets = ()=> {
        getAllTickets()
        .then(res=>{
            // console.log(res.data)
            setTicketDetails(res.data)
            updateTicketCount(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

    }

    const fetchUsers = ()=> {
        getAllUsers()
        .then(res=>{
            // console.log(res.data)
            setUserDetails(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

    }

    const updateTicketCount = (tickets) => {

        const data = {
            pending:0,
            progress:0,
            closed:0,
            blocled:0
        }

        tickets.forEach(ticket => {
            if(ticket.status==="OPEN"){
                data.pending += 1;
            }
            else if(ticket.status==="INPROGRESS"){
                data.progress += 1;
            }
            else if (ticket.status==="BLOCKED"){
                data.blocked +=1;
            }
            else {
                data.closed += 1
            }
            
        });

        setTicketStatusCount({...data})

    }

    const editTicket=(ticketDetail)=>{
        setTicketUpdateModal(true)
        setSelectedCurrTicket(ticketDetail)
    }

    const closeticketUpdateModal = ()=> {
        setTicketUpdateModal(false)
    }

    return(
        <div className="row bg-light">
            <div className="col-1">
                <Sidebar/>
            </div>
            <div className="col ">
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
                                                <h1 className="text-dark mx-4">{ticketStatusCount.pending}</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:50, height:50}}>
                                                    <CircularProgressbar value={ticketStatusCount.pending} styles={buildStyles({pathColor:"red"})}/>
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
                                                <h1 className="text-dark mx-4">{ticketStatusCount.progress}</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:50, height:50}}>
                                                    <CircularProgressbar value={ticketStatusCount.progress} styles={buildStyles({pathColor:"#AA6C39"})}/>
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
                                                <h1 className="text-dark mx-4">{ticketStatusCount.closed}</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:50, height:50}}>
                                                    <CircularProgressbar value={ticketStatusCount.closed} styles={buildStyles({pathColor:"green"})}/>
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
                                                <h1 className="text-dark mx-4">{ticketStatusCount.blocked}</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:50, height:50}}>
                                                    <CircularProgressbar value={ticketStatusCount.blocked} styles={buildStyles({pathColor:"black"})}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ maxWidth: '100%' }}>

                                <MaterialTable
                                columns={[
                                    { title: 'USER ID', field: 'userId' },
                                    { title: 'NAME', field: 'name' },
                                    { title: 'EMAIL', field: 'email' },
                                    { title: 'ROLE', field: 'userTypes' },
                                    { title: 'STATUS', field: 'userStatus' }
                                ]}
                                title="USER RECORDS"

                                // to print all the user details
                                data={userDetails}

                                options = {{
                                    // filtering:true,
                                    sorting:true,
                                    rowStyle: {
                                        // backgroundColor:"red"
                                    }
                                }}
                                />
                        </div>

                        <hr/>

                        <div style={{ maxWidth: '100%' }}>

                                <MaterialTable
                                // built in functionality onRowClick
                                onRowClick={(event,rowData)=>editTicket(rowData)}

                                columns={[
                                    { title: 'TICKET ID', field: '_id' },
                                    { title: 'TITLE', field: 'title' },
                                    { title: 'DESCRIPTION', field: 'description' },
                                    { title: 'REQUESTOR', field: 'requestor' },
                                    { title: 'ASSIGNEE', field: 'assignee' },
                                    { title: 'STATUS', field: 'status' }
                                ]}
                                title="TICKET RECORDS"
                                data={ticketDetails}

                                options = {{
                                    // filtering:true,
                                    sorting:true,
                                    rowStyle: {
                                        // backgroundColor:"red"
                                        cursor:"pointer"
                                    }
                                }}
                                />
                                 <Modal show={ticketUpdateModal} onHide={closeticketUpdateModal}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>Edit Details</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>

                                        <form>

                                            <div className="p-1">
                                                <h5> TicketId : {selectedCurrTicket._id} </h5>
                                            </div>

                                        </form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={closeticketUpdateModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={()=>{}}>
                                        Update
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;