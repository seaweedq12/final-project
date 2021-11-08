import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import "../style/myaccount.css";

import Myinfobar from '../components/Myinfobar';
import Myinfolist from '../components/MyinfoList';
import Orderlist from '../components/OrderList';

import { QUERY_ME } from '../utils/queries';

const MyAccount = () => {
  const { loading , data } = useQuery(QUERY_ME);
  const me = data?.me || [];
  const [currentPage, setCurrentPage] = useState('Myinfo');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Myinfo') {
      return <Myinfolist me={me}/>;
    }
    if (currentPage === 'Order') {
      return <Orderlist me={me}/>;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <main>
      <div className="flex-row ">
        <div className="col-md-2 col-12 accnav">
          <Myinfobar currentPage={currentPage} handlePageChange={handlePageChange}/>
        </div>
        <div className="col-md-10 col-12">
          {renderPage()}
        </div>    
      </div>
    </main>
  );
};

export default MyAccount;