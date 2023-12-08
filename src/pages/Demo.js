import Sidebar from "../components/Sidebar";
import MaterialTable from 'material-table'
import {Modal, Button} from "react-bootstrap";
import StatusDashboard from "../components/statusDashboard/statusDashboard";
import useFetchTickets from "../hooks/useFetchTicket";
import useFetchUsers from "../hooks/useFetchUser";
import useTicketUpdate from "../hooks/useTicketUpdate";
import useUsersUpdate from "../hooks/userUserUpdate";
import TicketsUpdateModal from "../components/ticketupdatemodal/ticketupdatemodal";
import TicketsTable from '../components/ticketstable/ticketsTable';
import constants from "../utils/constants";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Admin(){

  console.log("inside Admin");

    const location = useLocation();
        const [userDetails, fetchUsers] = useFetchUsers();

      useEffect(()=>{

            const pathName= location.pathname;
            const userId = pathName.split('/')[2];

            if(!userId){
              return;
            }
          
          const user = userDetails.find((user)=>user.userId===userId);

            if(!user){
              return;
            }

            setUserAndOpenModal(user);  
      },[userDetails]);

    const [ticketDetails, fetchTickets] = useFetchTickets();
    const {selectedCurrTicket, ticketUpdateModal , editTicket , closeTicketUpdateModal, updateTicketFn, onTicketUpdate} = useTicketUpdate(fetchTickets);
    const  {usersUpdateModal, selectedCurrUser, setUserAndOpenModal, closeUsersUpdateModal, editUser, changeUserDetails, updateUserFn} = useUsersUpdate();


    


    return (
        <div className="row bg-light" >

            <div className="col-1">
             <Sidebar/>
            </div>

            <div className="col my-4">

                <div className="container">
                    
                 <StatusDashboard ticketDetails={ticketDetails} />

                    <br/>            

            <div style={{  maxWidth: '100%' }}>
                
             <MaterialTable
          columns={[
            { title: 'USER ID', field: 'userId' },
            { title: 'NAME', field: 'name' },
            { title: 'EMAIL', field: 'email' },
            { title: 'ROLE', field: 'userTypes' },
            { title: 'STATUS', field: 'userStatus' },
          ]}

          onRowClick={(event,rowData)=>editUser(rowData)}

          data={userDetails}

          title="USER RECORDS"

          options={{
            exportButton:true,
            sorting:true,
            filtering:true,
            rowStyle:{
                cursor:"pointer"
            }
          }}      
        />

           <Modal show={usersUpdateModal} onHide={closeUsersUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <form onSubmit={updateUserFn}>

                <div className="p-1">
                    <h5 className="card-subtitle mb-2 text-primary">
                     UserId : {selectedCurrUser.userId} 
                      </h5>

                             <h5 className="card-subtitle mb-2 text-primary">
                     UserType : {selectedCurrUser.userTypes} 
                      </h5>
                    <div className="input-group mb-3">
                        <span className="input-group-text" > Name </span>
                        <input type="text" disabled name="user" value={selectedCurrUser.name}  />
                    </div>

                     <div className="input-group mb-3">
                        <span className="input-group-text" > email </span>
                        <input type="text" disabled name="email" value={selectedCurrUser.email}  />
                    </div>

                       <div className="input-group mb-3">
                        <span className="input-group-text" > Status </span>

                        <select name="status" value={selectedCurrUser.userStatus} onChange={changeUserDetails} className="form-select" >

                            <option value="APPROVED"> APPROVED </option>
                            <option value="PENDING" > PENDING </option>
                            <option value="REJECTED" > REJECTED </option>

                        </select>

                    </div>

                 

                </div>

                     <Button variant="secondary" onClick={closeUsersUpdateModal}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
            </form>

        </Modal.Body>
        <Modal.Footer>
     
        </Modal.Footer>
      </Modal>



      </div>

      <hr/>

             <div style={{ maxWidth: '100%' }}>

              <TicketsTable editTicket={editTicket} title={"TICKET RECORDS"}  ticketDetails={ticketDetails}  />
              <TicketsUpdateModal selectedCurrTicket={selectedCurrTicket} onTicketUpdate={onTicketUpdate} ticketUpdateModal={ticketUpdateModal} closeTicketUpdateModal={closeTicketUpdateModal} updateTicketFn={updateTicketFn} />

      </div>


                    </div>

                </div>

            </div>
    );
}