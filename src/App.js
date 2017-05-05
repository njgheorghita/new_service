import React, { Component } from 'react';

import Web3 from 'web3';
var ens = require('./ensutils.js').ENS;

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/xRsYoyjxnWPw537pet38`))
var instance = new ens(ETHEREUM_CLIENT)

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ownerAddress: getContractOwner(this.state.value)})
    // this.props.getBookData(this.state.value);
    // this.setState({value: ''});

    //This is just an example way to hit our express server running on port 3001.
    //TODO: Take this out once we build fetching of rainbow tables etc
    fetch('/hello')
      .then(res => res.json())
      .then(resp => this.setState({ helloTarget: resp.helloTarget }) );
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>Enter address: </label>
          <input type="name" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <p>Owner Address: {this.state.ownerAddress}</p>
        <p>Hello: {this.state.helloTarget ? this.state.helloTarget : "Noone yet"}</p>
        {/*<Button onPress={onButtonPress} title="button"/>*/}
      </div>
    );
  }
}

export default App;
