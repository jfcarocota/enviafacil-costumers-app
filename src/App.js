import './App.css';
import {useEffect, useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import Routes from './components/router/Routes';
import {CheckSession} from './Auth';
import { Container } from 'semantic-ui-react';

function App() {

  const [session, setSession] = useState({});

  useEffect(()=>{
    setSession(CheckSession());
  }, []);

  useEffect(()=> console.log(session), [session]);


  return (
    <Container>
      <Routes session={session}/>
    </Container>
  );
}

export default App;
