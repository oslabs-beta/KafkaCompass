import React, { useEffect } from "react";

const TableData = (props) => {
  let tableRows = [];
  let oneRow = <></>;
  for (let row of props.tableData) {
    oneRow = (
      <tr key={row.name}>
        <td>{row.name}</td>
        <td>
          <div class="scrollable">{row.description}</div>
        </td>
        <td>{row.value}</td>
      </tr>
    );
    tableRows.push(oneRow);
  }

  useEffect(() => {}, []);

  return (
    <div className="table-stats">
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Metrics</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TableData;
