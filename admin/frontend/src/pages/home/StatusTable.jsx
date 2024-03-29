import React, { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "./Pagination";
import { axiosGetData } from "../../data/axios";
import { io } from "socket.io-client";
import Button from "../../components/Button";
import useNotification from "../../hooks/useNotification";

const socket = io("ws://localhost:4000")

const columns = [
  {
    field: "organization_id",
    headerName: "Organization Id",
    sortable: false,
    headerClassName: "bg-accent",
    headerAlign: "center",
    flex: 0.5,
    cellClassName: "!justify-center",
  },
  {
    field: "organization_name",
    headerName: "Name",
    sortable: false,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: "!px-2 !justify-center text-center",
    renderCell: (params) => {
      return (
        <span className=" whitespace-normal">{params.row.organization_name}</span>
      )
    }
  },
  {
    field: "email",
    headerName: "Organization E-Mail",
    sortable: false,
    flex: 1,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: "!justify-center",
    renderCell: (params) => {
      return (
        <span>{params.row.email}</span>
      )
    }
  },
  {
    field: "wallet_address",
    headerName: "Wallet Address",
    sortable: false,
    flex: 1,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: "!justify-center ",
    renderCell: (params) => {
      return (
        <span className=" break-all whitespace-normal">{params.row.wallet_address}</span>
      )
    }
  },
  {
    field: "created_at",
    headerName: "Created At",
    sortable: false,
    flex: 0.5,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: "!justify-center",
    renderCell: (params) => {
      return (
        <span className=" whitespace-normal">{new Date(params.row.created_at).toDateString()}</span>
      )
    }
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: (params) => {
      return `!px-2 !justify-center ${params.row.status === "verified" && 'text-success'} ${ params.row.status === "rejected" && 'text-danger'}`
    },
  },
  {
    field: "action",
    headerName: "Action",
    description: "Approve or Rejct",
    sortable: false,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: "!justify-center",
    renderCell: (params) => {
      return (
        <>
          {params.row.status === "pending" && (
            <ActionButton data={params.row} />
          )}
        </>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    organization_id: "535435",
    organization_name: "clg 1",
    email: "clg@gmail.com",
    wallet_address: "0xfsdfdsfsdfds",
    status: "pending",
  },
  {
    id: 2,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
  {
    id: 3,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
  {
    id: 4,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
  {
    id: 5,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
  {
    id: 6,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
  {
    id: 7,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
  {
    id: 8,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
  {
    id: 9,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
  {
    id: 10,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
  {
    id: 11,
    organization_id: "32323",
    organization_name: "clg 1",
    email: "fdsfsd@gmail.com",
    wallet_address: "0xrwerewfdsfsdfds",
    status: "accept",
  },
];

const StatusTable = () => {

  const [data, setData] = useState([]);
  const [toShowAllData, setToShowAllData] = useState(false);

  const pendingData = data.filter(d => d.status === "pending");

  const [notificationMsg, setNotificationMsg] = useNotification();

  useEffect(() => {
    socket?.on("sendPending", (socketData) => {
      const msg = `New Request from ${socketData.organization_name}`;
      setData(prev => [socketData, ...prev])
      setNotificationMsg(msg);
    });
    return () => {
      socket?.off("sendPending")
    }
  }, []);

  useEffect(() => {
    (async function () {
      console.log("in");
      const res = await axiosGetData();
      console.log("res", res);
      setData(res.data);
    })();
  }, []);

  return (
    <div className=" w-11/12 m-auto text-primary">
      <DataGrid
        autoHeight
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          color: "white",
        }}
        rows={toShowAllData ? data : pendingData}
        columns={columns}
        rowHeight={100}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Pagination: Pagination,
        }}
      />
      <Button handleClick={() => {
        setToShowAllData(!toShowAllData);
      }}
      handleCss="m-2"
      >
        {toShowAllData ? "Pending" : "All Data"}
      </Button>
    </div>
  );
};

export default StatusTable;
