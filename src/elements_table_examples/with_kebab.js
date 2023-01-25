import React from "react";
import * as T from "../components/elements_table";

function ElementsTableWithKebab({ data, setData }) {
  const {
    data: sortedData,
    sortKey,
    setSortKey,
    sortedAsc,
  } = T.useSortData(data, "email");

  const getIndicatorDirection = (key) =>
    sortKey === key && !sortedAsc ? "down" : sortKey === key ? "up" : null;

  return (
    <T.Table>
      <T.TableHead>
        <T.TableHeaderRow>
          <T.TableHeaderCell
            showIndication
            indicationDirection={getIndicatorDirection("name")}
            onClick={() => setSortKey("name")}
          >
            Name
          </T.TableHeaderCell>
          <T.TableHeaderCell
            showIndication
            indicationDirection={getIndicatorDirection("email")}
            onClick={() => setSortKey("email")}
          >
            Email
          </T.TableHeaderCell>
          <T.TableHeaderCell
            showIndication
            indicationDirection={getIndicatorDirection("permissions")}
            onClick={() => setSortKey("permissions")}
          >
            Permissions
          </T.TableHeaderCell>
          <T.TableHeaderCell
            showIndication
            indicationDirection={getIndicatorDirection("status")}
            onClick={() => setSortKey("status")}
          >
            Status
          </T.TableHeaderCell>
          <T.TableHeaderCell
            showIndication
            indicationDirection={getIndicatorDirection("lastActive")}
            onClick={() => setSortKey("lastActive")}
          >
            Last Active
          </T.TableHeaderCell>
          <T.TableHeaderKebab />
        </T.TableHeaderRow>
      </T.TableHead>
      <T.TableBody>
        {sortedData.map((row) => {
          const index = data.findIndex((datum) => datum.name === row.name);
          return (
            <T.TableDataRow key={row.email}>
              <T.TableDataCell>{row.name}</T.TableDataCell>
              <T.TableDataCell>{row.email}</T.TableDataCell>
              <T.TableDataCell>{row.permissions}</T.TableDataCell>
              <T.TableDataCell>{row.status}</T.TableDataCell>
              <T.TableDataCell>{row.lastActive}</T.TableDataCell>
              <T.TableDataKebab
                options={[
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
                ]}
              />
            </T.TableDataRow>
          );
        })}
      </T.TableBody>
    </T.Table>
  );
}

export default ElementsTableWithKebab;