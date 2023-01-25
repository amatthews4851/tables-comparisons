import * as React from "react";
import PropsTable from "../components/props_table";

const StaticPropsTableExample = ({ data }) => {
  return (
    <PropsTable
      columns={[
        { title: "Name", field: "name", sortable: true },
        { title: "Email", field: "email", sortable: true },
        { title: "Permissions", field: "permissions", sortable: true },
        { title: "Status", field: "status", sortable: true },
        { title: "Last Active", field: "lastActive", sortable: true },
      ]}
      data={data.map((row) => ({
        key: row.name,
        values: row,
      }))}
    />
  );
};

export default StaticPropsTableExample;
