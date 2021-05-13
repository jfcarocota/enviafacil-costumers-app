const AUTHENTICATE =`
  query($email:String!, $password:String!){
    login(email: $email, password: $password){
      token
    }
  }
`;

const GET_COSTUMERS_SEARCH = `
query($filter: String){
  costumersSearch(filter: $filter){
    id
    fullName
    phonNumber
    email
    packages{
      account
      parcel{
        name
      }
    }
  }
}
`;

const GET_USERS_SEARCH = `
query($email: String){
  usersSearch(email: $email){
    id
    email
    role{
      name
      permissions{
        name
      }
    }
  }
}
`;

const GET_COSTUMER_BY_ID = `
query($id: ID!){
    costumer(id: $id){
        id
        fullName
        phonNumber
        email
        packages{
            id
            account
            password
            parcel{
                id
                name
            }
        }
    }
}
`;

const ADD_COSTUMER = `
mutation($firstName: String!, $middleName: String!, $lastName: String!,
$secondLastName: String!, $fullName: String!, $phonNumber: String!, $email: String!){
    addCostumer(firstName: $firstName, middleName: $middleName, lastName: $lastName, 
    secondLastName: $secondLastName, fullName: $fullName, phonNumber: $phonNumber, email: $email){
        id
        firstName
        middleName
        lastName
        secondLastName
        fullName
        phonNumber
        email
    }
}
`;


const ADD_PACKAGE =`
mutation($account: String!, $password: String!, $costumerId: ID!, $parcelId: ID!){
  addPackage(account: $account, password: $password, costumerId: $costumerId, parcelId: $parcelId){
    account
    password
    costumerId
    parcel{
        name
    }
  }
}
`;

const EDIT_COSTUMER =`
mutation($id: ID!, $firstName: String!, $middleName: String!, $lastName: String!, $secondLastName: String!, $fullName: String!, $phonNumber: String!, $email: String!){
  editCostumer(id: $id, firstName: $firstName, middleName: $middleName, lastName: $lastName, secondLastName: $secondLastName, fullName: $fullName, phonNumber: $phonNumber, email: $email){
    id
    firstName
    middleName
    lastName
    secondLastName
    fullName
    phonNumber
    email
  }
}
`;

const EDIT_PACKAGE = `
mutation($id: ID!, $account: String!, $password: String!, $costumerId: ID!, $parcelId: ID!){
  editPackage(id: $id, account: $account, password: $password, costumerId: $costumerId, parcelId: $parcelId){
    id
    account
    password
    costumerId
  }
}
`;

const EDIT_USER = `
mutation($id: ID!, $email: String!, $password: String!, $roleId: ID!){
  editUser(id: $id, email: $email, password: $password, roleId: $roleId){
    email
    password
    role{
      name
    }
  }
}
`;

const GET_USER_BY_ID = `
query($id: ID!){
  user(id: $id){
    id
    email
    password
    role{
      id
      name
      permissions{
        id
        name
      }
    }
  }
}
`;

const GET_ROLE_LIST = `
query{
  roles{
    id
    name
    permissions{
      id
      name
    }
  }
}
`;

export {
  AUTHENTICATE,
  GET_COSTUMERS_SEARCH,
  GET_COSTUMER_BY_ID,
  GET_USERS_SEARCH,
  ADD_COSTUMER,
  ADD_PACKAGE,
  EDIT_COSTUMER,
  EDIT_PACKAGE,
  EDIT_USER,
  GET_USER_BY_ID,
  GET_ROLE_LIST
}