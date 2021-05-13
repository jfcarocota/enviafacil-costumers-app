import axios from "axios";
import {GET_COSTUMERS_SEARCH, GET_COSTUMER_BY_ID, GET_USERS_SEARCH, ADD_COSTUMER, EDIT_COSTUMER, EDIT_PACKAGE, GET_USER_BY_ID, GET_ROLE_LIST, EDIT_USER, GET_PARCELS_LIST } from "./graphql/queries";

const costumersSearchById = id => (
  axios.post(process.env.REACT_APP_API_URL, {
    query: GET_COSTUMER_BY_ID,
    variables: {
      id
    }
  })
  .then(({data}) => data.data.costumer)
  .catch(error => console.log(error))
);

const UserSearchById = id => (
  axios.post(process.env.REACT_APP_API_URL, {
    query: GET_USER_BY_ID,
    variables: {
      id
    }
  })
  .then(({data}) => {
    console.log(data);
    return data.data.user;
  })
  .catch(error => console.log(error))
);

const costumersSearchCall = filter => (
axios.post(process.env.REACT_APP_API_URL, {
  query: GET_COSTUMERS_SEARCH,
  variables: {
    filter
  }
})
.then(({data}) => (
  data.data.costumersSearch.map(costumer => {
    const {fullName, id, phonNumber, email, packages} = costumer;
    const accounts = packages.map(element => `${element.parcel.name}: ${element.account}`);
    return {
      title: fullName,
      description: `${email}, ${phonNumber}, (${accounts.join()})`,
      id: id
    }
  })
))
.catch(error => console.log(error))
);

const costumersSearchTableCall = filter => (
  axios.post(process.env.REACT_APP_API_URL, {
    query: GET_COSTUMERS_SEARCH,
    variables: {
      filter
    }
  })
  .then(({data}) => (
    data.data.costumersSearch.map(costumer => {
      const {fullName, id, phonNumber, email, packages} = costumer;
      const accounts = packages.map(element => `${element.parcel.name}: ${element.account}`);
      return {
        id,
        fullName,
        email,
        phonNumber,
        accounts
      }
    })
  ))
  .catch(error => console.log(error))
);

const usersSearchCall = email => (
  axios.post(process.env.REACT_APP_API_URL, {
    query: GET_USERS_SEARCH,
    variables: {
      email
    }
  })
  .then(({data}) => (
    data.data.usersSearch.map(user => {
      const {id, email, role} = user;
      //const permissions = role.permissions.map(element => `${element.name}`);
      return {
        title: email,
        description: role.name,
        id: id
      }
    })
  ))
  .catch(error => console.log(error))
);

const costumerInfoResultCall =  id => (
  axios.post(process.env.REACT_APP_API_URL, {
    query: GET_COSTUMER_BY_ID,
    variables: {
      id
    }
  })
  .then(({data}) => {
    const {costumer} = data.data
    //console.log(costumer);
    return {
      fullName: costumer.fullName,
      phonNumber: costumer.phonNumber,
      email: costumer.email
    };

  })
  .catch(error => {
    console.log(error);
  })
);

const updateCostumer = (id, firstName, middleName, lastName, secondLastName,fullName, phonNumber, email) => (
  axios.post(process.env.REACT_APP_API_URL, {
    query: EDIT_COSTUMER,
    variables: {
      id,
      firstName,
      middleName,
      lastName,
      secondLastName,
      fullName,
      phonNumber,
      email
    }
  })
  .then(({data}) => {
    //console.log(data.data.editCostumer);
    return data.data.costumer;
  })
  .catch(error =>{
    console.log(error);
  })
);

const updateUser = (id, email, password, roleId) => (
  axios.post(process.env.REACT_APP_API_URL, {
    query: EDIT_USER,
    variables: {
      id,
      email,
      password,
      roleId
    }
  })
  .then(({data}) => {
    console.log(data.data.editUser);
    return data.data.editUser;
  })
  .catch(error =>{
    console.log(error);
  })
);

const updateCostumerPackage = (id, account, password, costumerId, parcelId) => (
  axios.post(process.env.REACT_APP_API_URL, {
    query: EDIT_PACKAGE,
    variables: {
      id,
      account,
      password,
      costumerId,
      parcelId
    }
  })
  .then(({data}) => {
    console.log(data.data.editPackage);
    return data.data.editPackage;
  })
  .catch(error =>{
    console.log(error);
  })
);

const roleList = ()=>(
  axios.post(process.env.REACT_APP_API_URL, {query: GET_ROLE_LIST})
  .then(({data}) => data.data.roles)
  .catch(error => console.log(error))
);

const addCostumer = (email, password, roleId)=> (
  axios.post(process.env.REACT_APP_API_URL, {
    query: EDIT_COSTUMER,
    variables: {
      email,
      password,
      roleId
    }
  })
  .then(({data}) => data.data.costumer)
  .catch(error => console.log(error))
);

const getParcellist = ()=> (
  axios.post(process.env.REACT_APP_API_URL, { query: GET_PARCELS_LIST})
  .then(({data}) => data.data.parcels)
  .catch(error => console.log(error))
);

export {
  costumersSearchById,
  costumersSearchCall,
  costumersSearchTableCall,
  usersSearchCall,
  costumerInfoResultCall,
  updateCostumer,
  updateCostumerPackage,
  UserSearchById,
  roleList,
  updateUser,
  addCostumer,
  getParcellist
}