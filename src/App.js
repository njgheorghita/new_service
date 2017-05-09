import React, { Component } from 'react';
import { Panel, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import ENSClient from './ensClient';

var instance = new ENSClient();

function getContractOwner(contractName){
    // return instance.ens.owner(instance.namehash(contractName))
    console.log(instance.getAddr(contractName))
    return instance.ethRegistrar.entries(instance.web3.sha3(contractName))[0].toNumber()
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
                  ownerAddress: '',
                  //TODO: Take this attribute out. Just a hello world for hitting the server
                  helloTarget: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyDown(event) {
    if(event.key === 'Enter') {
      this.setState({
        ownerAddress: getContractOwner(event.target.value),
        value: ''
      });

      //TODO: Take this out
      this.fetchHelloTarget();
    }
  }

  //This is just an example way to hit our express server running on port 3001.
  //TODO: Take this out once we build fetching of rainbow tables etc
  fetchHelloTarget() {
    fetch('/hello')
      .then(res => res.json())
      .then(resp => this.setState({ helloTarget: resp.helloTarget }) );
  }

  render() {
    return (
      <div>
        <Panel header='Get ENS info'>

          <FormGroup>
            <ControlLabel>Enter Address: </ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter domain name"
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
              />
          </FormGroup>

          <p>Owner Address: {this.state.ownerAddress}</p>
        </Panel>

        <Panel header='hello world test'>
          <p>Hello: {this.state.helloTarget ? this.state.helloTarget : "Noone yet"}</p>
        </Panel>
      </div>

    );
  }
}

export default App;
