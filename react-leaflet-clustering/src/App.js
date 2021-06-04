//import React from 'react';
import axios from 'axios';
import ClusterMap from './components/ClusterMap';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import React, { useState, useEffect } from 'react';

const SERVER = 'http://localhost:5000';

function App() {

  const [clusters, setClusters] = useState()
  const [fromdate, setFromDate] = useState('');
  const [todate, setToDate] = useState('');
  const [crime, setCrime] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // axios.get(`${SERVER}/clusters?fromdate=${fromdate}&todate=${todate}&crime=${crime}`)
    //   .then(res => {
    //     console.log(res)
    //     setClusters(res.data);
    //     //window.location.reload();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //   //window.location.reload();

    const fetchAPI = () => {
      const data = axios.get('./data/BaltimoreCityLine.json')
        .then(response => response.data)
        .catch(err => {
          console.log(err);
        })
      return data
    }
    const dataSet = await fetchAPI();
    setClusters(dataSet.features[0].geometry.coordinates[0])
  }

  return (
    <div>
      <ClusterMap clusters={clusters} />
      <Form onSubmit={handleSubmit} encType='multipart/form-data'>
        <FormGroup>
          <Label>From Date </Label>
          <Input value={fromdate} onChange={e => setFromDate(e.target.value)} type="date" className="form-control" />
        </FormGroup>
        <FormGroup>
          <Label >To Date </Label>
          <Input value={todate} onChange={e => setToDate(e.target.value)} type="date" className="form-control" />
        </FormGroup>
        <FormGroup>
          <Label >Crime Type: </Label>
          <Input value={crime} onChange={e => setCrime(e.target.value)} type="select" className="form-control" bsSize='lg'>
            <option>HOMICIDE</option>
          </Input>
        </FormGroup>
        <Button type="submit">Get Clusters</Button>
      </Form>
    </div>
  );
}

export default App;
