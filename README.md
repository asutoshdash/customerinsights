                                                      Customer Insights

### Features
When the application opens in browser it loads llist of customers fetched through API calls. It lists down the customer's id, name, age and gender in a table. Once the table is displayed any row can be clicked to show the address(s) avialable for the customer. The address(s) are being fetched from another API call.

Customer listing Api: https://www.mockaroo.com/virtual_services/26584

Customer Address(s) Api: https://www.mockaroo.com/virtual_services/26582

*Above mocks are hosted in Mockaroo portal, they have a limit of 200 requests per 24Hrs, if you donot see data then the limit might have exhausted. Try next day in UST time.*

### Architecture

This is a typescript based React application. It has below two main components apart from App component:

#### CustomerListing

This component takes care of dispaying the customer data in HTML table with styling on it. It also dispatch and action with payload containing selected customer's id when any row in the table is being clicked. Then the customer's id being passed down to CustomerDetails component as part of it;s properties.

#### CustomerDetails

This component gets the customer's id in it's properties, using it the component fetches customer address from the api discussed above for customer Address data. Once it recieves the data its shows in a list in the UI. A customer can have many number of addresse(s) or no address. For convinience the Api can return max three addres(s) for customer, however that can be increased at API level. This component is capable of handling any number of addresses.

#### CustomerStore (For passing state across component)

This module exports a reducer function which handles the action triggered by row-click event described in CustomerListing component. It returns a state conatining selected customer's id. App component uses this reducer using `useReducer` hook to get the state and dispatch function. It also exports a context which is being used to pass down the dispatch function to child component of App such as CustomerListing.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm test -- --coverage`

Launches the test runner with code coverage
Currently we have 95% code coverage

### `npm run lint`

List down any linting warning or error in the project.
With the last commit all files are lint free.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

