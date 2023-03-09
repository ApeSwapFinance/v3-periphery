function getNetworkConfig(network: any) {
  if (['bsc', 'bsc-fork'].includes(network)) {
    console.log(`Deploying with BSC MAINNET config.`)
    return {
      factory: '',
      WNATIVE: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      nativeCurrencyLabelBytes: '0x424E420000000000000000000000000000000000000000000000000000000000',
      proxyAdmin: '0x1B7722871c06Acc4cfB13e7A7503eA3DEaE78Ec8',
      //Optional
      nftdescriptor: '',
      nftSVG: '',
      posDescriptorProxy: '',
    }
  } else if (['bscTestnet', 'bsc-testnet-fork'].includes(network)) {
    console.log(`Deploying with BSC testnet config.`)
    return {
      factory: '0xc6AAeE93771e6E35f6A973b0019448C3581f665e',
      WNATIVE: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      nativeCurrencyLabelBytes: '0x424E420000000000000000000000000000000000000000000000000000000000',
      proxyAdmin: '0x5c7C7246bD8a18DF5f6Ee422f9F8CCDF716A6aD2',
      //Optional
      nftdescriptor: '',
      nftSVG: '',
      posDescriptorProxy: '',
    }
  } else if (['polygon'].includes(network)) {
    console.log(`Deploying with polygon config.`)
    return {
      factory: '0x86A2Ad3771ed3b4722238CEF303048AC44231987',
      WNATIVE: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      nativeCurrencyLabelBytes: '0x4D41544943000000000000000000000000000000000000000000000000000000',
      proxyAdmin: '0x5c7C7246bD8a18DF5f6Ee422f9F8CCDF716A6aD2',
      //Optional
      nftSVG: '0x0fc5849B38A29CFdd0d9b8edEb612C8464109Cae',
      nftdescriptor: '0x4170fFa29F9A714c739E7F81ef9aac1A8d4Af4B7', //'0x36520bBd502d70aF871F52Dc69b17Aa6996AC874',
      posDescriptorProxy: '0xf72F8ECDC4005735a0473c2b1B464F84F4B6ad19',
    }
  } else if (['development'].includes(network)) {
    console.log(`Deploying with development config.`)
    return {}
  } else {
    throw new Error(`No config found for network ${network}.`)
  }
}

export default getNetworkConfig
