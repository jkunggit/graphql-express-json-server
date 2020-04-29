// to see the graphql. Goto the localhost:4000
/*
// get specific customer:
{
  customer(id: "1") {
    name,
    email,
    age
  }
}

// get all customers:
{
  customers {
    id,
    name,
    email,
    age
  }
}

// get all companies with the customer info
{
  companies {
    name,
    customers {
      id,
      name
    }
  }
}

// add customer and in {} tells what to return after adding:
mutation {
  addCustomer(name: "Jim Kung", email: "jim.kung@gmail.com", age: 42){
    id,
    name,
    email
  }
}

// delete a customer. the id should be null since it's been delete.
mutation {
  deleteCustomer(id: "1"){
    id
  }
}

// update a customer
mutation {
  editCustomer(id: "2", age: 50, name: "liam"){
    id,
    name,
    age
  }
}
*/

import axios from 'axios'

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

// Company Type
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    customers: { type: GraphQLList(CustomerType) }
  })
})

// root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString}
      },
      resolve (root, args) {
        return axios.get(`http://localhost:4000/customers/${args.id}`).then(res => res.data)
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve (root, args) {
        return axios.get('http://localhost:4000/customers/').then(res => res.data)
      }
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString}
      },
      resolve (root, args) {
        return axios.get(`http://localhost:4000/companies/${args.id}/?_embed=customers`).then(res => res.data)
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve (root, args) {
        return axios.get('http://localhost:4000/companies/?_embed=customers').then(res => res.data)
      }
    }
  }
})

// mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve (parentValue, args) {
        return axios.post('http://localhost:4000/customers', {
          name: args.name,
          email: args.email,
          age: args.age
        }).then(res => res.data)
      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve (parentValue, args) {
        return axios.patch(`http://localhost:4000/customers/${args.id}`, args).then(res => res.data)
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve (parentValue, args) {
        return axios.delete(`http://localhost:4000/customers/${args.id}`).then(res => res.data)
      }
    }
  }
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation
})
