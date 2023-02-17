const { ethers, upgrades } = require('hardhat')
import hre from 'hardhat'
import getNetworkConfig from '../deploy-config'

/**
 * // NOTE: This is an example of the default hardhat deployment approach.
 * This project takes deployments one step further by assigning each deployment
 * its own task in ../tasks/ organized by date.
 */
async function main() {
  let { factory, WNATIVE, nftdescriptor, nativeCurrencyLabelBytes, proxyAdmin } = getNetworkConfig(hre.network.name)

  const NFTDescriptor = await ethers.getContractFactory('NFTDescriptor')
  let actualNFTdescriptor
  if (nftdescriptor == '' || nftdescriptor == '0x') {
    actualNFTdescriptor = await NFTDescriptor.deploy()
  } else {
    actualNFTdescriptor = await NFTDescriptor.attach(nftdescriptor + '')
  }

  const PosDescriptor = await ethers.getContractFactory('NonfungibleTokenPositionDescriptor', {
    libraries: {
      NFTDescriptor: actualNFTdescriptor.address,
    },
  })

  const TransparentUpgradeableProxy = await ethers.getContractFactory('TransparentUpgradeableProxy')

  console.log('NFTdescriptor deployed at', actualNFTdescriptor.address)
  const posDescriptor = await PosDescriptor.deploy(WNATIVE, nativeCurrencyLabelBytes)
  await posDescriptor.deployed()
  console.log('Descriptor deployed at: ', posDescriptor.address)

  const proxy = await TransparentUpgradeableProxy.deploy(
    posDescriptor.address,
    proxyAdmin,
    '0x'
  )
  await proxy.deployed()

  const PosManager = await ethers.getContractFactory('NonfungiblePositionManager')
  const posManager = await PosManager.deploy(factory, WNATIVE, posDescriptor.address)
  console.log('proxy deployed at: ', proxy.address)
  console.log('Manager deployed at: ', posManager.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
