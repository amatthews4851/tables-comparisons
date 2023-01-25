import React from "react";
import * as T from "../components/elements_table";

function StaticElementsTable({ data }) {
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
        </T.TableHeaderRow>
      </T.TableHead>
      <T.TableBody>
        {sortedData.map((row) => (
          <T.TableDataRow key={row.email}>
            <T.TableDataCell>{row.name}</T.TableDataCell>
            <T.TableDataCell>{row.email}</T.TableDataCell>
            <T.TableDataCell>{row.permissions}</T.TableDataCell>
            <T.TableDataCell>{row.status}</T.TableDataCell>
            <T.TableDataCell>{row.lastActive}</T.TableDataCell>
          </T.TableDataRow>
        ))}
      </T.TableBody>
    </T.Table>
  );
}

export default StaticElementsTable;
