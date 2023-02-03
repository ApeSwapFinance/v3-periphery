function getNetworkConfig(network: any) {
  if (['bsc', 'bsc-fork'].includes(network)) {
    console.log(`Deploying with BSC MAINNET config.`)
    return {
      factory: '',
      WETH: '',
    }
  } else if (['bscTestnet', 'bsc-testnet-fork'].includes(network)) {
    console.log(`Deploying with BSC testnet config.`)
    return {
      factory: '0xeBC1bc08d6290aB74BcB58CAA3A9Fb90e12f0c2f',
      WNATIVE: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      nftdescriptor: '0x2a3C8b63b7b08B4Ae658cEa91E09aF540bc44380',
    }
  } else if (['development'].includes(network)) {
    console.log(`Deploying with development config.`)
    return {}
  } else {
    throw new Error(`No config found for network ${network}.`)
  }
}

export default getNetworkConfig
