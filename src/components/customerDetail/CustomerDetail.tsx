import * as React from "react";
import "./CustomerDetail.css";
type T_CustomerId = {
  id: string | null;
};
type T_customerAddress = {
  streetaddress: string;
};
/**
 * This component list down all the address for a given customer id.
 * @param props
 * @constructor
 */
export const CustomerDetail = (props: T_CustomerId): React.ReactElement => {
  const [addressData, setAdddressData] = React.useState({
    loading: true,
    data: [],
    error: null
  });
  const renderAddress = React.useMemo(() => {
    if (addressData.loading) {
      return <p>Loading data...</p>;
    }
    if (addressData.error) {
      return <p>Error While fetching data</p>;
    }
    if (addressData.data && Array.isArray(addressData.data)) {
      if (addressData.data.length === 0) {
        return <p>No address(s) available</p>;
      } else {
        return (
          <ul className={"cl_addresslist"}>
            {addressData.data.map((aAddress: T_customerAddress, ind) => (
              <li key={ind}>
                <address aria-label={"address"}>{aAddress.streetaddress}</address>
              </li>
            ))}
          </ul>
        );
      }
    }
  }, [addressData]);
  React.useEffect(() => {
    if (props.id !== null) {
      fetch(
        "https://my.api.mockaroo.com/customeraddess/" +
          props.id +
          "?key=2567b1e0"
      )
        .then(resp => {
          if (!resp.ok) {
            throw resp;
          }
          return resp.json();
        })
        .then(parsedResp =>
          setAdddressData({
            loading: false,
            data: parsedResp.address,
            error: null
          })
        )
        .catch(e => {
          setAdddressData({ loading: false, data: [], error: e });
        });
    }
  }, [props.id]);
  return (
    <div>
      <h3>List of Address(s) of Customer having Customer id: {props.id}</h3>
      {renderAddress}
    </div>
  );
};
