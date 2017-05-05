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
                  ownerAddress: ''};

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
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="name" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.ownerAddress}</p>
        {/*<Button onPress={onButtonPress} title="button"/>*/}
      </div>
    );
  }
}

export default App;
