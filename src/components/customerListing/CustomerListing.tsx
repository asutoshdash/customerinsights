import * as React from "react";
import "./CustomListing.css";
import { CustomerContext } from "../../store/CustomerStore";
import { T_CustomerListingResult } from "../../types/CustomerType";
import { FETCH_DETAILS } from "../../store/CustomerStoreActionTypes";

/**
 * This component fetches customer lists from the API and then displays it as a table. When some row in the table gets clicked it dispatch an action with selected customer id.
 * @constructor
 */
const CustomerListing: React.FC = () => {
  const [customerListingData, setCustomerListingData] = React.useState<
    T_CustomerListingResult
  >({
    loading: true,
    data: [],
    error: null
  });
  const [selectedRow, setSelectedRow] = React.useState(null);
  React.useEffect(() => {
    fetch("https://my.api.mockaroo.com/customers.json?key=2567b1e0")
      .then(resp => {
        if (!resp.ok) {
          throw resp;
        }
        return resp.json();
      })
      .then(parsedData => {
        setCustomerListingData({
          loading: false,
          data: parsedData,
          error: null
        });
      })
      .catch(err => {
        setCustomerListingData({ loading: false, data: [], error: err });
      });
  }, []);
  const CustomerStoreContext = React.useContext(CustomerContext);
  const rowClickHandler = React.useCallback(
    evt => {
      setSelectedRow(evt.currentTarget.dataset.customerid);
      CustomerStoreContext &&
        CustomerStoreContext.dispatchFn({
          type: FETCH_DETAILS,
          payload: { id: evt.currentTarget.dataset.customerid }
        });
    },
    [CustomerStoreContext]
  );
  if (customerListingData.loading) {
    return <p>Loading customer data...</p>;
  }
  if (customerListingData.error) {
    return <p>Error occurred while fetching customer data..</p>;
  }
  return (
    <table data-testid={"customerlistingtable"} className={"pure-table"}>
      <thead>
        <tr>
          <th>customerid</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {customerListingData.data.map(customer => (
          <tr
            key={customer.customerid}
            data-customerid={customer.customerid}
            onClick={rowClickHandler}
            className={customer.customerid.toString() === selectedRow ? "selected" : ""}
          >
            <td>{customer.customerid}</td>
            <td>{customer.name}</td>
            <td>{customer.age}</td>
            <td>{customer.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export { CustomerListing };
