import Web3 from 'web3';

import { ensContractABI, auctionRegistrarContractABI, deedContractABI, fifsRegistrarABI, resolverContractABI, reverseRegistrarContractABI } from './abiDefs';

const INFURA_URL = 'https://mainnet.infura.io/xRsYoyjxnWPw537pet3';

class ENSClient {
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));

    let ensContract = this.web3.eth.contract(ensContractABI);
    this.ens = ensContract.at('0x314159265dd8dbb310642f98f50c066173c1259b');

    let auctionRegistrarContract = this.web3.eth.contract(auctionRegistrarContractABI);
    this.ethRegistrar = auctionRegistrarContract.at(this.ens.owner(this.namehash('eth')));

    this.deedContract = this.web3.eth.contract(deedContractABI);
    this.fifsRegistrarContract = this.web3.eth.contract(fifsRegistrarABI);
    this.testRegistrar = this.fifsRegistrarContract.at(this.ens.owner(this.namehash('test')));
    this.resolverContract = this.web3.eth.contract(resolverContractABI);
    this.publicResolver = this.resolverContract.at('0x4c641fb9bad9b60ef180c31f56051ce826d21a9a');
    this.reverseRegistrarContract = this.web3.eth.contract(reverseRegistrarContractABI);
    // var reverseRegistrar = this.reverseRegistrarContract.at(this.ens.owner(this.namehash('addr.reverse')));
  }

  getContractOwner(contractName) {
    return this.ethRegistrar.entries(this.web3.sha3(contractName))[0].toNumber();
  }

  namehash(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if(name !== '') {
        var labels = name.split(".");
        for(var i = labels.length - 1; i >= 0; i--) {
            node = this.web3.sha3(node + this.web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
  }

  getAddr(name) {
    var node = this.namehash(name)
    var resolverAddress = this.ens.resolver(node);
    if(resolverAddress === '0x0000000000000000000000000000000000000000') {
      return resolverAddress;
    }
    return this.resolverContract.at(resolverAddress).addr(node);
  }

  getContent(name) {
    var node = this.namehash(name)
    var resolverAddress = this.ens.resolver(node);
    if(resolverAddress === '0x0000000000000000000000000000000000000000') {
      return "0x0000000000000000000000000000000000000000000000000000000000000000";
    }
    return this.resolverContract.at(resolverAddress).content(node);
  }
}

export default ENSClient;
