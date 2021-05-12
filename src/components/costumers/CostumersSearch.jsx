import React, { useState } from 'react';
import BaseComponent from '../BaseComponent';
import { Search, Icon, Container, Button, Divider, ButtonContent, ListItem, ListContent, Image, List} from 'semantic-ui-react';
import {costumersSearchCall} from '../../api';
import { useHistory } from 'react-router-dom';

const UserSearch = ()=> {

  const history = useHistory();

  const [costumersResults, setCostumersResults] = useState([]);
  const [filter, setFilter] = useState('');

  const catchName = (e, { value }) => {
    setFilter(value);
    costumersSearchCall(filter).then(results => setCostumersResults(results));
  }

  const clickSearch = ()=> history.push({pathname: '/costumerstable', state:{filter}});
  const handleResultSelect = (e, data)=> history.push({pathname: '/costumer', state: {id: data.result.id}});
  //this.props.history.push({pathname: '/costumer', state: {id: data.result.id}});

  return (
    <BaseComponent itemSelected='Buscar Clientes' children={
      <Container textAlign='center'>
          <Search
          fluid
          onResultSelect={handleResultSelect}
          onSearchChange={catchName}
          results={costumersResults}
          //value={value}
          size='massive'
          placeholder='nombre...'
          />
          <Divider hidden/>
          <Button basic size='large' color='blue' animated='fade' onClick={clickSearch}>
            <ButtonContent visible>Buscar clientes</ButtonContent>
            <Button.Content hidden>
            <Icon name='table'/>
            </Button.Content>
          </Button>
      </Container>
    }/>
  );
}

export default UserSearch;