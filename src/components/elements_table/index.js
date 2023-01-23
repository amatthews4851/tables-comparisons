import * as React from "react";
import { sortBy } from "lodash";

// Base Table
export const Table = ({ children, ...rest }) => {
  return (
    <div className="rounded border border-slate-300 overflow-hidden">
      <table className="w-full" {...rest}>
        {children}
      </table>
    </div>
  );
};

// Table Head Components
export const TableHead = ({ children, ...rest }) => {
  return (
    <thead className="bg-slate-700" {...rest}>
      {children}
    </thead>
  );
};

export const TableHeaderRow = ({ children, ...rest }) => {
  return (
    <tr className="" {...rest}>
      {children}
    </tr>
  );
};

export const TableHeaderCell = ({
  children,
  showIndication,
  indicationDirection,
  ...rest
}) => {
  return (
    <th className="first:pl-4 last:pr-4 py-2 text-white text-left" {...rest}>
      {children}{" "}
      {showIndication && indicationDirection === "up" ? (
        <>&#8593;</>
      ) : showIndication && indicationDirection === "down" ? (
        <>&#8595;</>
      ) : showIndication ? (
        <>&#8597;</>
      ) : null}
    </th>
  );
};

// Table Body Components
export const TableBody = ({ children, ...rest }) => {
  return (
    <tbody className="" {...rest}>
      {children}
    </tbody>
  );
};

export const TableDataRow = ({ children, ...rest }) => {
  return (
    <tr className="hover:bg-slate-100 hover:text-blue-800" {...rest}>
      {children}
    </tr>
  );
};

export const TableDataCell = ({ children, ...rest }) => {
  return (
    <td className="first:pl-4 last:pr-4 py-2" {...rest}>
      {children}
    </td>
  );
};

// Misc Components
export const TableHeaderCheckbox = ({ checked, onChange }) => {
  return (
    <TableHeaderCell>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </TableHeaderCell>
  );
};
export const TableDataCheckbox = ({ checked, onChange }) => {
  return (
    <TableDataCell>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </TableDataCell>
  );
};

export const TableHeaderKebab = () => {
  return <TableHeaderCell></TableHeaderCell>;
};
export const TableDataKebab = ({ options }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <TableDataCell>
      <div onClick={() => setOpen(!open)} className="relative">
        <div className="text-center rotate-90">...</div>
        {open && (
          <div className="absolute right-1/2 top-1/2 bg-white border border-slate-300 rounded p-4 z-10">
            {options.map((option) => (
              <div
                key={option.label}
                onClick={() => {
                  setOpen(false);
                  option.onClick();
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </TableDataCell>
  );
};

// utilities
/**
 * @type {(
 *   <A>(data: A[], initialSortKey?: string | null) => {
 *     data: A[],
 *     sortedAsc: boolean,
 *     sortKey: string,
 *     setSortKey: (key: string) => void
 *   }
 * )}
 */
export const useSortData = (data, initialSortKey = null) => {
  const [sortKey, setSortKey] = React.useState(initialSortKey);
  const [sortedAsc, setSortedAsc] = React.useState(true);
  const [sortedData, setSortedData] = React.useState(() =>
    sortKey ? sortBy(data, [sortKey]) : data
  );

  React.useEffect(() => {
    setSortedData(
      sortKey
        ? sortedAsc
          ? sortBy(data, [sortKey]).reverse()
          : sortBy(data, [sortKey])
        : data
    );
  }, [data, sortKey, sortedAsc]);

  return {
    data: sortedData,
    sortedAsc,
    sortKey,
    setSortKey: (key) => {
      if (key === sortKey) {
        setSortedAsc(!sortedAsc);
      } else {
        setSortKey(key);
        setSortedAsc(true);
      }
    },
  };
};
