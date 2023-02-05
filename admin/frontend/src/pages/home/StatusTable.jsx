import React from "react";
import ActionButton from "./ActionButton";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "./Pagination";

const columns = [
  {
    field: "id",
    headerName: "ID",
    sortable: false,
    flex: 1,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: '!justify-center'
  },
  {
    field: "organization_id",
    headerName: "Organization Id",
    sortable: false,
    flex: 1,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: '!justify-center',
  },
  {
    field: "organization_name",
    headerName: "Organization name",
    sortable: false,
    flex: 1,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: '!justify-center',
  },
  {
    field: "email",
    headerName: "Organization E-Mail",
    sortable: false,
    flex: 1,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: '!justify-center',
  },
  {
    field: "wallet_address",
    headerName: "Wallet Address",
    sortable: false,
    flex: 1,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: '!justify-center',
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    flex: 1,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: '!justify-center',
  },
  {
    field: "action",
    headerName: "Action",
    description: "Approve or Rejct",
    sortable: false,
    headerClassName: "bg-accent",
    headerAlign: "center",
    cellClassName: '!justify-center',
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
  return (
    <div className="h-[600px] w-10/12 m-auto text-primary">
      <DataGrid
        sx={{
          color: "white",
        }}
        rows={rows}
        columns={columns}
        rowHeight={100}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
            Pagination: Pagination
        }}
      />
    </div>
  );
};

export default StatusTable;
