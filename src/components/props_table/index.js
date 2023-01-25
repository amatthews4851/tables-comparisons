import * as React from "react";
import { sortBy } from "lodash";

/**
 * @type {(
 *   (props: {
 *     columns: { title: string, field: string, sortable?: boolean }[],
 *     data: {
 *       key: string,
 *       isChecked?: boolean,
 *       setIsChecked?: (value: boolean) => void,
 *       kebabValues?: { label: string, onClick: () => void},
 *       expandableContent?: React.ReactNode,
 *       values: any
 *     }[],
 *     setEveryRowIsSelected?: (value: boolean) => void,
 *   }) => JSX.Element
 * )}
 */
const PropsTable = ({ columns, data, setEveryRowIsSelected }) => {
  const {
    data: sortedData,
    sortKey,
    setSortKey,
    sortedAsc,
  } = useSortData(data, "email");

  const Indicator = ({ column }) =>
    column.sortable && sortKey === column.field && sortedAsc ? (
      <>&#8593;</>
    ) : column.sortable && sortKey === column.field && !sortedAsc ? (
      <>&#8595;</>
    ) : column.sortable ? (
      <>&#8597;</>
    ) : null;

  const everyRowIsSelected = React.useMemo(
    () => data.every((datum) => datum.isChecked ?? true),
    [data]
  );
  const hasSelectableRows = React.useMemo(
    () => data.some((datum) => datum.setIsChecked),
    [data]
  );
  const hasKebabMenu = React.useMemo(
    () => data.some((datum) => !!datum.kebabValues),
    [data]
  );

  const [openMenu, setOpenMenu] = React.useState(null);

  return (
    <div className="rounded border border-slate-300 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-700">
          <tr>
            {hasSelectableRows && (
              <th className="first:pl-4 last:pr-4 py-2 text-white text-left">
                <input
                  type="checkbox"
                  checked={everyRowIsSelected}
                  onChange={() => setEveryRowIsSelected(!everyRowIsSelected)}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.title}
                onClick={() => setSortKey(column.field)}
                className="first:pl-4 last:pr-4 py-2 text-white text-left"
              >
                {column.title} <Indicator column={column} />
              </th>
            ))}
            {hasKebabMenu && (
              <th className="first:pl-4 last:pr-4 py-2 text-white text-left" />
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((datum, index) => (
            <tr
              key={datum.key}
              className="hover:bg-slate-100 hover:text-blue-800"
            >
              {datum.setIsChecked ? (
                <td className="first:pl-4 last:pr-4 py-2">
                  <input
                    type="checkbox"
                    checked={datum.isChecked}
                    onChange={() => datum.setIsChecked(!datum.isChecked)}
                  />
                </td>
              ) : hasSelectableRows ? (
                <td className="first:pl-4 last:pr-4 py-2" />
              ) : null}
              {columns.map((column) => (
                <td key={column.field} className="first:pl-4 last:pr-4 py-2">
                  {datum.values[column.field]}
                </td>
              ))}
              {datum.kebabValues && (
                <td className="first:pl-4 last:pr-4 py-2">
                  <div
                    onClick={() =>
                      setOpenMenu(openMenu === index ? null : index)
                    }
                    className="relative"
                  >
                    <div className="text-center rotate-90">...</div>
                    {openMenu === index && (
                      <div className="absolute right-1/2 top-1/2 bg-white border border-slate-300 rounded p-4 z-10">
                        {datum.kebabValues.map((option) => (
                          <div
                            key={option.label}
                            onClick={() => {
                              setOpenMenu(null);
                              option.onClick();
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;

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
const useSortData = (data, initialSortKey = null) => {
  const [sortKey, setSortKey] = React.useState(initialSortKey);
  const [sortedAsc, setSortedAsc] = React.useState(true);
  const [sortedData, setSortedData] = React.useState(() =>
    sortKey ? sortBy(data, [sortKey]) : data
  );

  React.useEffect(() => {
    setSortedData(
      sortKey
        ? sortedAsc
          ? sortBy(data, (v) => v.values[sortKey]).reverse()
          : sortBy(data, (v) => v.values[sortKey])
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
