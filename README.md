# Mini Shopping Cart App

This project is a mini shopping cart application that simulates core features of an e-commerce platform.

Available discount coupons:

- **SAVE10** = 10% discount
- **ISAVE15** = 15% discount
- **MEGA20** = 20% discount

## Tech Stack

**Client:** Angular 19, Tailwind, ngxpert hot toast

**Server:** JSON live server

## Run Locally

**Must have:**

- Node **22.14.0**
- Angular cli **^19.2.11**
- json-server installed [check here](https://www.geeksforgeeks.org/json-server-setup-and-introduction/)

Clone the project

```bash
git clone https://link-to-project
```

Go to the project directory

```bash
cd shopping-cart
```

Install dependencies

```bash
npm install
```

Start the json-server

```bash
json-server --watch db.json --port 3000
```

Start the application (new terminal in project directory)

```bash
ng serve
```

## Features

- Add, update, and remove items from the cart (CRUD functionality)
- Fetch and display product data from a mock API (json server)
- Apply discounts via coupon code
- Toast notifications when adding to cart
- Persist cart data using **local storage**

## Assumptions Made

- Products are always available (no stock limitations)
- Prices are static and do not change dynamically
- Discounts are applied only via valid, predefined coupon codes
  Available coupons:
  - **SAVE10** = 10% discount
  - **ISAVE15** = 15% discount
  - **MEGA20** = 20% discount
- Discounts are automatically applied on input change
- Users do not require authentication or login to use the app
- Cart data is stored locally and does not persist across different browsers or devices
- All product data is fetched from a mock API (no live backend)
