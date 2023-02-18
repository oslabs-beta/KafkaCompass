import React from "react";

const TableData = (props) => {
  let tableRows = [];
  let oneRow = <></>;
  for (let row of props.tableData) {
    oneRow = (
      <tr key={row.name}>
        <td>{row.name}</td>
        <td>{row.value}</td>
      </tr>
    );
    tableRows.push(oneRow);
  }

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
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
