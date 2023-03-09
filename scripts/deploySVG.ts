const { ethers, upgrades } = require('hardhat')
import hre from 'hardhat'
import getNetworkConfig from '../deploy-config'

/**
 * // NOTE: This is an example of the default hardhat deployment approach.
 * This project takes deployments one step further by assigning each deployment
 * its own task in ../tasks/ organized by date.
 */
async function main() {
  let { factory, WNATIVE, nftdescriptor, nftSVG, nativeCurrencyLabelBytes, proxyAdmin } = getNetworkConfig(
    hre.network.name
  )

  const NFTSVG = await ethers.getContractFactory('NFTSVG')
  let actualNFTSVG
  if (nftSVG == '' || nftSVG == '0x') {
    actualNFTSVG = await NFTSVG.deploy()
  } else {
    actualNFTSVG = await NFTSVG.attach(nftSVG + '')
  }

  const NFTDescriptor = await ethers.getContractFactory('NFTDescriptor', {
    libraries: {
      NFTSVG: actualNFTSVG.address,
    },
  })
  let actualNFTdescriptor
  if (nftdescriptor == '' || nftdescriptor == '0x') {
    actualNFTdescriptor = await NFTDescriptor.deploy()
  } else {
    actualNFTdescriptor = await NFTDescriptor.attach(nftdescriptor + '')
  }

  console.log('NFTdescriptor deployed at', actualNFTdescriptor.address)

  const PosDescriptor = await ethers.getContractFactory('NFTDesignTest', {
    libraries: {
      NFTDescriptor: actualNFTdescriptor.address,
    },
  })

  // const TransparentUpgradeableProxy = await ethers.getContractFactory('TransparentUpgradeableProxy')

  const posDescriptor = await PosDescriptor.deploy(WNATIVE, nativeCurrencyLabelBytes)
  await posDescriptor.deployed()
  console.log('Descriptor deployed at: ', posDescriptor.address)

  // const proxy = await TransparentUpgradeableProxy.deploy(
  //   posDescriptor.address,
  //   proxyAdmin,
  //   '0x'
  // )
  // await proxy.deployed()

  // const PosManager = await ethers.getContractFactory('NonfungiblePositionManager')
  // const posManager = await PosManager.deploy(factory, WNATIVE, posDescriptor.address)
  // console.log('proxy deployed at: ', proxy.address)
  // console.log('Manager deployed at: ', posManager.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
