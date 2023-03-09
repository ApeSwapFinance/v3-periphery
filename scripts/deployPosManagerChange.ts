const { ethers, upgrades } = require('hardhat')
import hre from 'hardhat'
import getNetworkConfig from '../deploy-config'

/**
 * // NOTE: This is an example of the default hardhat deployment approach.
 * This project takes deployments one step further by assigning each deployment
 * its own task in ../tasks/ organized by date.
 */
async function main() {
  // THIS IS SCRIPT TO UPDATE NFT DESIGN ON EXISTING PROXY DESCRIPTOR (AND THUS MANAGER)
  let { factory, WNATIVE, nftdescriptor, nftSVG, nativeCurrencyLabelBytes, proxyAdmin, posDescriptorProxy } =
    getNetworkConfig(hre.network.name)

  //force deploy new because it needs update
  const NFTSVG = await ethers.getContractFactory('NFTSVG')
  // let actualNFTSVG = await NFTSVG.deploy()
  let actualNFTSVG = await NFTSVG.attach(nftSVG)
  console.log('NFTSVG deployed at', actualNFTSVG.address)

  const NFTDescriptor = await ethers.getContractFactory('NFTDescriptor', {
    libraries: {
      NFTSVG: actualNFTSVG.address,
    },
  })
  //force deploy new because it needs update
  // let actualNFTdescriptor = await NFTDescriptor.deploy()
  let actualNFTdescriptor = await NFTDescriptor.attach(nftdescriptor)
  console.log('NFTdescriptor deployed at', actualNFTdescriptor.address)

  const PosDescriptor = await ethers.getContractFactory('NonfungibleTokenPositionDescriptor', {
    libraries: {
      NFTDescriptor: actualNFTdescriptor.address,
    },
  })

  // const posDescriptor = await PosDescriptor.deploy(WNATIVE, nativeCurrencyLabelBytes, { gasPrice: '200000000000' })
  // await posDescriptor.deployed()
  const posDescriptor = await PosDescriptor.attach('0xb29D70ee4ABE404430E16deb7534d98762302682')
  console.log('Descriptor deployed at: ', posDescriptor.address)

  const TransparentUpgradeableProxy = await ethers.getContractFactory('TransparentUpgradeableProxy')
  const proxy = await TransparentUpgradeableProxy.attach(posDescriptorProxy)
  await proxy.upgradeTo(posDescriptor.address, { gasPrice: '200000000000' })
  console.log('done')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
