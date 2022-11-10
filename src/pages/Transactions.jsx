import React, { useState, useRef, useEffect } from "react";
import DataTable from 'react-data-table-component';

import { useParams } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import _ from "lodash";
import axios from "axios";
import { useSelector } from "react-redux";
import { success_notify,fail_notify, numberWithCommas } from "../utils/Utilfunctions";

export default function Transactions() {

    const get_transactions = useSelector((state)=>state?.user?.transactions)
   const [pending, setPending] = useState(true);

const columns = [
    {
        name: 'Name',
        selector: row => row.custDetails.name,
        sortable: true,
        
    },
    {
        name: 'Order ID',
        selector: row => row.transac_Details.ORDERID,
        sortable: true,
    },

    {
        name: 'Amount',
        selector: row => row.amount,
        sortable: true,
    },

    {
        name: 'Date',
        selector: row => new Date(row.created_At).toDateString(),
        sortable: true,
    },

    {
        name: 'Status',
        selector: row => row.payment_status,
        sortable: true,
    },
];

const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontWeight:"bold",
            fontSize:18
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontSize:16
        },
    },
};

useEffect(()=>{

    if(!_.isEmpty(get_transactions)){
        setPending(false)
    }
     
}, [get_transactions])
  return (


    <div className="container mb-5">  <DataTable
    direction="auto"
    fixedHeaderScrollHeight="300px"
    pagination
    responsive
    subHeaderAlign="right"
    subHeaderWrap
    striped
    columns={columns}
    data={get_transactions}
    customStyles={customStyles}
    progressPending={pending}
/></div>
  )
}
