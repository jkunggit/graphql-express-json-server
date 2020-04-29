# GraphQL with Express and json-server

Basic example of using GraphQL with express server. 
GraphGL is a query language use to communicate data between client and server. 
It helps to structure data driven applications in a more efficient way than a REST approach.

## Technologies
- [Graphql](https://graphql.org)
- [React](https://reactjs.org)
- [Express](https://expressjs.com)
- [Babel](https://babeljs.io)
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

## GraphQL Server - dummy front end to test our queries on the graphql server
![GraphqlChart](/docs/graphql_flow_chart.svg)

## GraphQL Screenshot
![GraphqlGui](/docs/graphql_screenshot1.jpg)

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

