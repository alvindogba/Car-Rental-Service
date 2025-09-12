# basic_api
Project Description
Build a simple API that allows you to manage a car rental system. You will perform CRUD operations on:

-- Cars — Add, update, delete, and list cars available for rent.

-- Customers — Register and manage customers.

-- Rentals — Create and track which customer rented which car, and for how long.

# Models

1. Customer
id: integer (auto-increment, primary key)
name: string
email: string
phone: string

2. Car 
id: integer (auto-increment, primary key)
name: string
model: string
year: integer
rentalPricePerDay: decimal
isAvailable: boolean (default: true)


3. Rental
id: integer (auto-increment, primary key)
carId: foreign key → Car
customerId: foreign key → Customer
startDate: date
endDate: date
totalCost: decimal (auto-calculated: days * rentalPricePerDay)

# Car EndPoints

| Method | Endpoint    | Description            |
| ------ | ----------- | ---------------------- |
| POST   | `/cars`     | Add new car            |
| GET    | `/cars`     | List all cars          |
| GET    | `/cars/:id` | Get single car details |
| PUT    | `/cars/:id` | Update car info        |
| DELETE | `/cars/:id` | Remove a car           |

# Customer EndPoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/customers`     | Register customer    |
| GET    | `/customers`     | List customers       |
| GET    | `/customers/:id` | View single customer |
| PUT    | `/customers/:id` | Update customer      |
| DELETE | `/customers/:id` | Delete customer      |


# Rental Endpoints

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| POST   | `/rentals`     | Rent a car                 |
| GET    | `/rentals`     | View all rentals           |
| GET    | `/rentals/:id` | View a specific rental     |
| DELETE | `/rentals/:id` | Cancel a rental (optional) |


# Logic Notes
When renting a car, check if isAvailable is true.

On successful rental, update isAvailable to false.

On delete rental (if you allow), set isAvailable back to true.

Total cost = number of days × rentalPricePerDay.

