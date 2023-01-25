import * as React from "react";
import PropsTable from "../components/props_table";

const PropsTableWithCheckboxExample = ({ data, setData }) => {
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
        isChecked: row.checked,
        setIsChecked: (value) => {
          const newState = [...data];
          newState[index].checked = value;
          setData(newState);
        },
        values: row,
      }))}
    />
  );
};

export default PropsTableWithCheckboxExample;
