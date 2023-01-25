import * as React from "react";
import PropsTable from "../components/props_table";

const PropsTableWithKebabExample = ({ data, setData }) => {
  return (
    <PropsTable
      columns={[
        { title: "Name", field: "name", sortable: true },
        { title: "Email", field: "email", sortable: true },
        { title: "Permissions", field: "permissions", sortable: true },
        { title: "Status", field: "status", sortable: true },
        { title: "Last Active", field: "lastActive", sortable: true },
      ]}
      data={data.map((row, index) => ({
        key: row.name,
        kebabValues: [
          {
            label: "Resend",
            onClick: () => alert("Resent Invitation"),
          },
          {
            label: "Delete",
            onClick: () => {
              const newData = [
                ...data.slice(0, index),
                ...data.slice(index + 1),
              ];
              setData(newData);
              alert("User Deleted");
            },
          },
        ],
        values: row,
      }))}
    />
  );
};

export default PropsTableWithKebabExample;
