import React, { useEffect, useState } from 'react';
import BaseComponent from '../BaseComponent';
import { Search, Icon, Container, Button, Divider, ButtonContent, ListItem, ListContent, Image, List} from 'semantic-ui-react';
import {usersSearchCall} from '../../api';
import { useHistory } from 'react-router-dom';

const UsersSearch = ()=> {

  const history = useHistory();

  const [usersResults, setUsersResults] = useState([]);
  const [filter, setFilter] = useState('');

  const catchName = (e, { value }) => {
    usersSearchCall(value).then(results => setUsersResults(results));
  }

  const clickSearch = ()=> history.push({pathname: '/userstable', state:{filter}});

  const handleResultSelect = (e, data)=> history.push({pathname: '/user', state: {id: data.result.id}});

  useEffect(()=>{
    
  }, [usersResults]);

  return (
    <BaseComponent itemSelected='Buscar Empleados' children={
      <Container textAlign='center'>
          <Search
          fluid
          onResultSelect={handleResultSelect}
          onSearchChange={catchName}
          results={usersResults}
          //value={value}
          size='massive'
          placeholder='nombre...'
          />
          <Divider hidden/>
          <Button basic size='large' color='blue' animated='fade' onClick={clickSearch}>
            <ButtonContent visible>Buscar empleados</ButtonContent>
            <Button.Content hidden>
            <Icon name='table'/>
            </Button.Content>
          </Button>
      </Container>
    }/>
  );
}

export default UsersSearch;