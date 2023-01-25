import React from "react";
import StaticElementsTableExample from "./elements_table_examples/static";
import ElementsTableWithCheckboxExample from "./elements_table_examples/with_checkbox";
import ElementsTableWithKebabExample from "./elements_table_examples/with_kebab";
import ElementsTableWithCheckboxAndKebabExample from "./elements_table_examples/with_checkbox_and_kebab";
import StaticPropsTableExample from "./props_table_examples/static";
import PropsTableWithCheckboxExample from "./props_table_examples/with_checkbox";
import PropsTableWithKebabExample from "./props_table_examples/with_kebab";
import PropsTableWithCheckboxAndKebabExample from "./props_table_examples/with_checkbox_and_kebab";

const data = [
  {
    name: "Bert Jaskolski Jr.",
    email: "Ona13@hotmail.com",
    permissions: "User",
    status: "Active",
    lastActive: "12/08/2022",
  },
  {
    name: "Fred Kertzmann",
    email: "Nyasia94@yahoo.com",
    permissions: "User",
    status: "Active",
    lastActive: "12/08/2022",
  },
  {
    name: "Oscar Schoen I",
    email: "Tiara75@hotmail.com",
    permissions: "Admin",
    status: "Active",
    lastActive: "12/08/2022",
  },
  {
    name: "Rex Kling",
    email: "Anita66@yahoo.com",
    permissions: "User",
    status: "Active",
    lastActive: "12/08/2022",
  },
  {
    name: "Troy Hills",
    email: "Meggie.Okuneva77@gmail.com",
    permissions: "User",
    status: "Active",
    lastActive: "12/08/2022",
  },
];

function App() {
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [kebabChecked, setKebabChecked] = React.useState(false);

  React.useEffect(() => {
    document.title = "Table Comparison";
  }, []);

  const [dataState, setDataState] = React.useState(() =>
    data.map((value) => ({
      ...value,
      checked: false,
    }))
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl">Tables</h1>
      <div>
        <div className="flex flex-row justify-start items-center">
          <input
            id="checkbox-checkbox"
            type="checkbox"
            checked={checkboxChecked}
            onChange={() => setCheckboxChecked(!checkboxChecked)}
          />
          <label htmlFor="checkbox-checkbox" className="ml-2 inline-block">
            Checkbox
          </label>
        </div>
        <div className="flex flex-row justify-start items-center">
          <input
            id="kebab-checkbox"
            type="checkbox"
            checked={kebabChecked}
            onChange={() => setKebabChecked(!kebabChecked)}
          />
          <label htmlFor="kebab-checkbox" className="ml-2 inline-block">
            Kebab
          </label>
        </div>
      </div>

      <h2 className="mt-8 mb-2 ml-2 text-xl">Elements Table</h2>
      {checkboxChecked && kebabChecked ? (
        <ElementsTableWithCheckboxAndKebabExample
          data={dataState}
          setData={setDataState}
        />
      ) : checkboxChecked ? (
        <ElementsTableWithCheckboxExample
          data={dataState}
          setData={setDataState}
        />
      ) : kebabChecked ? (
        <ElementsTableWithKebabExample
          data={dataState}
          setData={setDataState}
        />
      ) : (
        <StaticElementsTableExample data={dataState} />
      )}

      <h2 className="mt-8 mb-2 ml-2 text-xl">Props Table</h2>
      {checkboxChecked && kebabChecked ? (
        <PropsTableWithCheckboxAndKebabExample
          data={dataState}
          setData={setDataState}
        />
      ) : checkboxChecked ? (
        <PropsTableWithCheckboxExample
          data={dataState}
          setData={setDataState}
        />
      ) : kebabChecked ? (
        <PropsTableWithKebabExample data={dataState} setData={setDataState} />
      ) : (
        <StaticPropsTableExample data={dataState} />
      )}
    </div>
  );
}

export default App;
