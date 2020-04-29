# GraphQL with Express and json-server

Basic example of using GraphQL with express server.

## Technologies

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Babel](https://babeljs.io/)
- [json-server](https://www.npmjs.com/package/json-server)
- [axios](https://www.npmjs.com/package/axios)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Usage

- clone the repo
- cd to project directory
- ```npm install``` all the dependencies
- ```npm run dev:server``` to start the local express server
- ```npm run json:server``` to start the local json-server
- open browser to http://localhost:3000/graphql to use the graphql gui
- open browser to http://localhost:4000 to see json-server page


## GraphQL Screenshot
![Graphql](/docs/graphql_screenshot.jpg)


## GraphQL Example Queries

### Get specific customer:
```Query
{
  customer(id: "1") {
    name,
    email,
    age
  }
}
```

### Get all customers:
```Query
{
  customers {
    id,
    name,
    email,
    age
  }
}
```

### Get all companies with the customer info.
```Query
{
  companies {
    name,
    customers {
      id,
      name
    }
  }
}
```

### Add customer and in {} tells what to return after adding:
```Query
mutation {
  addCustomer(name: "Jim Kung", email: "jim.kung@gmail.com", age: 42) {
    id,
    name,
    email
  }
}
```

### Delete a customer. The id should be null since it's been delete.
```Query
mutation {
  deleteCustomer(id: "1"){
    id
  }
}
```

### Update a customer
```Query
mutation {
  editCustomer(id: "2", age: 50, name: "liam"){
    id,
    name,
    age
  }
}
```

