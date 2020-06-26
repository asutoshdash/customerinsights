import { enableFetchMocks } from "jest-fetch-mock";
import fetch from "jest-fetch-mock";
import React from "react";
import { render, act, screen } from "@testing-library/react";
import { CustomerDetail } from "./../CustomerDetail";
enableFetchMocks();
/**
 * Test suits to test all cases for CustomerDetail Component.
 */
beforeEach(() => {
  fetch.mockResponses(
    [
      JSON.stringify({
        address: [
          {
            streetaddress:
              "Cecilia Chapman\n" +
              "711-2880 Nulla St.\n" +
              "Mankato Mississippi 96522\n" +
              "(257) 563-7401"
          },
          {
            streetaddress:
              "Iris Watson\n" +
              "P.O. Box 283 8562 Fusce Rd.\n" +
              "Frederick Nebraska 20620\n" +
              "(372) 587-2335"
          }
        ]
      }),
      { status: 200 }
    ],
    [
      JSON.stringify(new Error("API Limit exceeds for the day.")),
      { status: 500 }
    ],
    () => new Promise(resolve => setTimeout(() => resolve({ body: "ok" }), 100))
  );
});
/**
 * Test if customer address are loaded in the UI
 */
test("renders customer address(s)", async () => {
  await act(async () => {
    await render(<CustomerDetail id={"4"} />);
  });
  //check if there are two addresses in the UI
  const customerAddresses = screen.getAllByLabelText("address");
  expect(customerAddresses.length).toBe(2);
});
/**
 * Test if error message appears in the UI if api call fails.
 */
test("Show error message if getting customer's address call failed", async () => {
  await act(async () => {
    await render(<CustomerDetail id={"4"} />);
  });
  expect(screen.getByText("Error While fetching data")).toBeInTheDocument();
});
/**
 * Test if loading message shows in UI if api call slows due to server/network issues.
 */
test("Show loading message if getting customer's address call slows down duse to network or server issues", async () => {
  await act(async () => {
    await render(<CustomerDetail id={"4"} />);
  });
  expect(screen.getByText("Loading data...")).toBeInTheDocument();
});
