import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";
import { deleteContact, filterContact } from "../redux/feature/contactSlice";

export const contactData = [
  {
    id: 1,
    name: "Mayank Kumar",
    email: "mayankkumar@gmail.com",
    phone: "+91767656526",
    status: "Active",
  },
  {
    id: 2,
    name: "Jitender Kumar",
    email: "jitenderskumar@gmail.com",
    phone: "+918878446746",
    status: "Inactive",
  },
  {
    id: 3,
    name: "James Gun",
    email: "jamesgun@gmail.com",
    phone: "+919768446746",
    status: "Active",
  },
  {
    id: 4,
    name: "James Bond",
    email: "jamesbind@gmail.com",
    phone: "+917768446746",
    status: "Inactive",
  },
];

const Home = () => {

  const {contacts, filter} = useSelector((state) => state.contact)
  console.log("contacts home", contacts)

  const dispatch = useDispatch()
  const onDeleteContact = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      dispatch(deleteContact(id))
      toast.success("Contact deleted successfuly");
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add Contact</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts && contacts.filter((item) => {
            if(filter === "All"){
              return contacts;
            } else {
              return item.status === filter;
            }
          }).map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.status}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDeleteContact(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btn btn-active" onClick={() => dispatch(filterContact("Active"))}> Active </button>
      <button className="btn btn-inactive" onClick={() => dispatch(filterContact("Inactive"))}> Inactive </button>
      <button className="btn btn-reset" onClick={() => dispatch(filterContact("All"))}> All </button>
    </div>
  );
};

export default Home;
