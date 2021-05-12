import axios from "axios";
import jwt from "jsonwebtoken";
import { AUTHENTICATE, GET_COSTUMERS_SEARCH, GET_COSTUMER_BY_ID } from "./graphql/queries";

export const Auth = (email, password)=>(
  axios.post(process.env.REACT_APP_API_URL, {
    query: AUTHENTICATE,
    variables:{email, password}
  })
  .then(({data}) => {
    try {
      const session = jwt.verify(data.data.login.token, process.env.REACT_APP_TOKEN_KEY);
      StoreSession(data.data.login.token, email);
      return {token: data.data.login.token, user: session.email};
    } catch (error) {
      console.log(error.message);
    }
  })
  .catch(error =>{
    console.log(error);
  }));

export const StoreSession = (token, user) => localStorage.setItem(process.env.REACT_APP_APP_KEY, JSON.stringify({ token, user}));

export const CheckSession = () => {
  const storedSession = JSON.parse(localStorage.getItem(process.env.REACT_APP_APP_KEY));
  //console.log(storedSession);
  try{
    const session = jwt.verify(storedSession.token, process.env.REACT_APP_TOKEN_KEY);

    return {token: storedSession.token, user: session.email};
  } catch (error) {
    console.log(error.message);
  }
};

export const Logout = ()=> {
  localStorage.removeItem(process.env.REACT_APP_APP_KEY);
}

export const costumersSearchCall = filter => (
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

  export const costumerInfoResultCall =  id => (
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