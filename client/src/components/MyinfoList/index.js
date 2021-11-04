import React from "react";

function Myinfolist({me}) {

  return (
    <div>
      <h2 className="col-12">Info</h2>
      <div>
        <h4 className="col-12">Name</h4>
        <p className="col-12">{me.name}</p>
      </div>
      <div>
        <h4 className="col-12">Email</h4>
        <p className="col-12">{me.email}</p>
      </div>
      <div>
        <h4 className="col-12">Phone Number</h4>
        <p className="col-12">{me.phoneNumber}</p>
      </div>
      <div>
        <h4 className="col-12">Address</h4>
        <p className="col-12">{me.address}</p>
      </div>
    </div>
  );
}

export default Myinfolist;