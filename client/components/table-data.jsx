import React, { useEffect } from 'react'

const TableData = (props) => {

    let tableRows = [];
    let oneRow = <></>
    for (let i = 0; i < props.tableData.name.length; i++) {
      oneRow = (
        <tr>
        <th>{i}</th>
        <td>{props.tableData.name[i]}</td>
        <td>{props.tableData.description[i]}</td>
        <td>{props.tableData.values[i]}</td>
      </tr>
      )
      tableRows.push(oneRow);
    }

  

  useEffect(() => {
  },[])

  return (
    <div className="table-stats">
    <div className="overflow-x-auto">
  <table className="table w-full">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Description</th>
        <th>Metrics</th>
      </tr>
    </thead>
    <tbody>
      {tableRows}
    </tbody>
  </table>
</div>
    </div>
  )
}

export default TableData;