function getNetworkConfig(network: any) {
  if (['bsc', 'bsc-fork'].includes(network)) {
    console.log(`Deploying with BSC MAINNET config.`)
    return {
      factory: '',
      WNATIVE: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      nftdescriptor: '',
      nativeCurrencyLabelBytes: '0x424e420000000000000000000000000000000000000000000000000000000000',
      proxyAdmin: '0x1B7722871c06Acc4cfB13e7A7503eA3DEaE78Ec8',
    }
  } else if (['bscTestnet', 'bsc-testnet-fork'].includes(network)) {
    console.log(`Deploying with BSC testnet config.`)
    return {
      factory: '0xeBC1bc08d6290aB74BcB58CAA3A9Fb90e12f0c2f',
      WNATIVE: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      nftdescriptor: '0x2a3C8b63b7b08B4Ae658cEa91E09aF540bc44380',
      nativeCurrencyLabelBytes: '0x424E420000000000000000000000000000000000000000000000000000000000',
    }
  } else if (['polygon'].includes(network)) {
    console.log(`Deploying with polygon config.`)
    return {
      factory: '0xB8BE51c57c280C83ED93DcFD6fDD7C98af897D7a',
      WNATIVE: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      nftdescriptor: '0x36520bBd502d70aF871F52Dc69b17Aa6996AC874',
      nativeCurrencyLabelBytes: '0x4D41544943000000000000000000000000000000000000000000000000000000',
      proxyAdmin: '0x5c7C7246bD8a18DF5f6Ee422f9F8CCDF716A6aD2',
    }
  } else if (['development'].includes(network)) {
    console.log(`Deploying with development config.`)
    return {}
  } else {
    throw new Error(`No config found for network ${network}.`)
  }
} 

export default getNetworkConfig
