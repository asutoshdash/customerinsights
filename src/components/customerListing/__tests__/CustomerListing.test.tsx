import { enableFetchMocks } from "jest-fetch-mock";
import fetch from "jest-fetch-mock";
import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import { CustomerListing } from "./../CustomerListing";
import { CustomerContext } from "../../../store/CustomerStore";
import {FETCH_DETAILS} from "../../../store/CustomerStoreActionTypes";
enableFetchMocks();
beforeEach(() => {
  fetch.mockResponses(
    [
      JSON.stringify([
        { name: "Asutosh", gender: "male", age: "32", customerid: 3 },
        { name: "John", gender: "male", age: "40", customerid: 4 }
      ]),
      { status: 200 }
    ],
    [JSON.stringify(new Error("aPI Limit excceds")), { status: 500 }],
    () => new Promise(resolve => setTimeout(() => resolve({ body: "ok" }), 100))
  );
});
/**
 * Test if customerlisting table appears when fetch call returns valid data
 */
test("renders customer list", async () => {
  const mockDispatchFn = jest.fn(action => {
    console.log("action");
  });
  const dispatchFnObj = { dispatchFn: mockDispatchFn };
  await act(async () => {
    await render(
      <CustomerContext.Provider value={dispatchFnObj}>
        <CustomerListing />
      </CustomerContext.Provider>
    );
  });
  const customerListingTable = screen.getByTestId("customerlistingtable");
  expect(customerListingTable).toBeInTheDocument();
  expect(screen.getByText("John")).toBeInTheDocument();
});
/**
 * Test if it shows error message when network error happens while making a fetch call to the customer listing API.
 */
test("shows error message if network error", async () => {
  const mockDispatchFn = jest.fn(action => {
    console.log("action");
  });
  const dispatchFnObj = { dispatchFn: mockDispatchFn };
  await act(async () => {
    await render(
      <CustomerContext.Provider value={dispatchFnObj}>
        <CustomerListing />
      </CustomerContext.Provider>
    );
  });
  const customerListingError = screen.getByText(
    "Error occurred while fetching customer data.."
  );
  expect(customerListingError).toBeInTheDocument();
});
/**
 * Test if it shows loading message when network slowness/server slowness is there while making a fetch call to the customer listing API.
 */
test("shows loading message if network/server is slow", async () => {
    const mockDispatchFn = jest.fn(action => {
        console.log("action");
    });
    const dispatchFnObj = { dispatchFn: mockDispatchFn };
    await act(async () => {
        await render(
            <CustomerContext.Provider value={dispatchFnObj}>
                <CustomerListing />
            </CustomerContext.Provider>
        );
    });
    const customerListingError = screen.getByText(
        "Loading customer data..."
    );
    expect(customerListingError).toBeInTheDocument();
});
/**
 * Testing the scenario when a click action happened on a row of the customer listing table.
 * expectations: The dispatch function must be called with valid arguments and row must contain a class selected.
 */
test("clicking on anywhere in the row", async () => {
  const mockDispatchFn = jest.fn(action => {
  });
  const dispatchFnObj = { dispatchFn: mockDispatchFn };
  await act(async () => {
    await render(
      <CustomerContext.Provider value={dispatchFnObj}>
        <CustomerListing />
      </CustomerContext.Provider>
    );
  });
  const customerListingTable = screen.getByTestId("customerlistingtable");
  expect(customerListingTable).toBeInTheDocument();
  const tableCellRow2Col1 = screen.getByText("John");
  const secondRow = tableCellRow2Col1.parentElement;
  const tableCellRow1Col1 = screen.getByText("Asutosh");
  const firstRow = tableCellRow1Col1.parentElement;
  fireEvent.click(tableCellRow2Col1);
  expect(mockDispatchFn.mock.calls.length).toBe(1);
  //Dispatch function must be called with valid arguments
  expect(mockDispatchFn.mock.calls[0][0]).toMatchObject({
    type: FETCH_DETAILS,
    payload: { id: "4" }
  });
  //The row must contain now a selected class
  expect(secondRow).toHaveClass("selected");
  //click on any where in another row
  fireEvent.click(tableCellRow1Col1);
  //Previously selected row must not contain the selected class anymore
  expect(secondRow).not.toHaveClass("selected");
  expect(firstRow).toHaveClass("selected");
});
