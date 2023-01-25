import React from "react";
import * as T from "../components/elements_table";

function ElementsTableWithCheckbox({ data, setData }) {
  const allChecked = React.useMemo(
    () =>
      data.every(
        ({ checked, permissions }) => permissions === "Admin" || checked
      ),
    [data]
  );
  const toggleAllChecked = () => {
    if (allChecked) {
      setData((currentState) =>
        currentState.map((value) => ({
          ...value,
          checked: false,
        }))
      );
    } else {
      setData((currentState) =>
        currentState.map((value) => ({
          ...value,
          checked: true,
        }))
      );
    }
  };

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
          <T.TableHeaderCheckbox
            checked={allChecked}
            onChange={toggleAllChecked}
          />
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
        {sortedData.map((row) => {
          const index = data.findIndex((datum) => datum.name === row.name);
          return (
            <T.TableDataRow key={row.email}>
              {row.permissions !== "Admin" ? (
                <T.TableDataCheckbox
                  checked={row.checked}
                  onChange={() => {
                    const newState = [...data];
                    newState[index].checked = !row.checked;
                    setData(newState);
                  }}
                />
              ) : (
                <T.TableDataCell />
              )}
              <T.TableDataCell>{row.name}</T.TableDataCell>
              <T.TableDataCell>{row.email}</T.TableDataCell>
              <T.TableDataCell>{row.permissions}</T.TableDataCell>
              <T.TableDataCell>{row.status}</T.TableDataCell>
              <T.TableDataCell>{row.lastActive}</T.TableDataCell>
            </T.TableDataRow>
          );
        })}
      </T.TableBody>
    </T.Table>
  );
}

export default ElementsTableWithCheckbox;
