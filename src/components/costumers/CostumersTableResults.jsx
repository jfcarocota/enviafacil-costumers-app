import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination, Table, Icon, Button, Container } from 'semantic-ui-react'
import { costumersSearchTableCall } from '../../api';
import BaseComponent from '../BaseComponent';

const CostumersTableResults = (props)=> {

  const history = useHistory();
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState([]);

  useEffect(()=>{
    setFilter(history.location.state.filter);
  }, [history]);

  useEffect(()=> {
    console.log(filter);
    costumersSearchTableCall(filter).then(results => setResults(results));
  }, [filter]);

  useEffect(()=> console.log(results), [results]);

  const watchCostumer = id => history.push({pathname: '/costumer', state:{id}});

  return (
    <BaseComponent itemSelected='Buscar Clientes' children={
      <>
      <Table selectable singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Correo</Table.HeaderCell>
            <Table.HeaderCell>Teléfono</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
            {
              results.map(item => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.fullName}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.phonNumber}</Table.Cell>
                  <Table.Cell>
                    <Button icon color='green' onClick={()=> watchCostumer(item.id)}>
                      <Icon name='eye' />
                    </Button>
                    <Button icon color='red'>
                      <Icon name='user cancel' />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            }
        </Table.Body>
      </Table>
      <Container fluid>
        <Pagination
        defaultActivePage={5}
        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
        prevItem={{ content: <Icon name='angle left' />, icon: true }}
        nextItem={{ content: <Icon name='angle right' />, icon: true }}
        totalPages={10}
        />
      </Container>
      </>
    }/>
  );
}

export default CostumersTableResults;