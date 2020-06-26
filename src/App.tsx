import React, { Dispatch } from "react";
import "./App.css";
import { CustomerListing } from "./components/customerListing/CustomerListing";
import { CustomerContext, CustomerReducer } from "./store/CustomerStore";
import { CustomerDetail } from "./components/customerDetail/CustomerDetail";
import { T_StoreAction } from "./types/CustomerType";
const initialSelectedCustomerData = { id: null };

/**
 * Entry point for the whole application. It composite CustomerListing and CustomerDetail components.
 * @constructor
 */
function App() {
  const [customerDataState, dispatch] = React.useReducer(
    CustomerReducer,
    initialSelectedCustomerData
  );
  const contextProviderVal = React.useMemo((): {
    dispatchFn: Dispatch<T_StoreAction>;
  } => {
    return { dispatchFn: dispatch };
  }, [dispatch]);

  return (
    <div>
      <h1>Customer Insights</h1>
      <div className="App">
        <CustomerContext.Provider value={contextProviderVal}>
          <div className={"CustomerListingContainer"}>
            <CustomerListing></CustomerListing>
          </div>
          <div className={"CustomerDetailContainer"}>
            {!customerDataState.id ? (
              <div></div>
            ) : (
              <CustomerDetail id={customerDataState.id} />
            )}
          </div>
        </CustomerContext.Provider>
      </div>
    </div>
  );
}

export default App;
