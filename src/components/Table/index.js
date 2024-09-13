import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import "./styles.scss";

function TableComponent(props) {
  const { headers, data, displayTotal, editable, total } = props;

  const editTable = (row) => {
    toast.info(row.expenseName ?? "Name unavailable");
  };
  return (
    <Container className="custom-table-container">
      {data.length > 0 ? (
        <Table hover responsive="sm" id="table-data">
          <thead>
            <tr>
              <th>#</th>
              {headers.map((header, index) => {
                return <th key={String(index)}>{header.value}</th>;
              })}
              {editable && <th />}
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, rowIndex) => {
              return (
                <tr key={String(rowIndex)}>
                  <td>{rowIndex + 1}</td>

                  {Object.entries(headers).map((cell, index) => {
                    return (
                      <td key={String(cell)}>
                        {rowData[headers[index].label] ?? (
                          <span style={{ fontWeight: "bold", color: "black" }}>
                            NA
                          </span>
                        )}
                      </td>
                    );
                  })}

                  {editable && (
                    <td>
                      <FaPencilAlt
                        onClick={() => editTable(rowData)}
                        className="edit-icon"
                      />
                    </td>
                  )}
                </tr>
              );
            })}
            {displayTotal && (
              <tr>
                <td />
                <td />
                <td />
                <td className="dispalyTotal">Total</td>
                <td className="dispalyTotal">{total}</td>
                <td />
              </tr>
            )}
          </tbody>
        </Table>
      ) : (
        <div className="noData">No Data Available</div>
      )}
    </Container>
  );
}

TableComponent.defaultProps = {
  data: [],
  headers: [],
};

export default TableComponent;
