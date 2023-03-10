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
    await actualNFTSVG.deployed()
  } else {
    actualNFTSVG = await NFTSVG.attach(nftSVG + '')
  }
  console.log('NFTSVG deployed at', actualNFTSVG.address)
  console.log('npx hardhat verify --network', hre.network.name, actualNFTSVG.address)

  const NFTDescriptor = await ethers.getContractFactory('NFTDescriptor', {
    libraries: {
      NFTSVG: actualNFTSVG.address,
    },
  })
  let actualNFTdescriptor
  if (nftdescriptor == '' || nftdescriptor == '0x') {
    actualNFTdescriptor = await NFTDescriptor.deploy()
    await actualNFTdescriptor.deployed()
  } else {
    actualNFTdescriptor = await NFTDescriptor.attach(nftdescriptor + '')
  }
  console.log('NFTdescriptor deployed at', actualNFTdescriptor.address)
  console.log('npx hardhat verify --network', hre.network.name, actualNFTdescriptor.address)

  const PosDescriptor = await ethers.getContractFactory('NonfungibleTokenPositionDescriptor', {
    libraries: {
      NFTDescriptor: actualNFTdescriptor.address,
    },
  })

  const posDescriptor = await PosDescriptor.deploy(WNATIVE, nativeCurrencyLabelBytes)
  await posDescriptor.deployed()
  console.log('Descriptor deployed at: ', posDescriptor.address)
  console.log(
    'npx hardhat verify --network',
    hre.network.name,
    posDescriptor.address,
    WNATIVE,
    nativeCurrencyLabelBytes
  )

  const TransparentUpgradeableProxy = await ethers.getContractFactory('TransparentUpgradeableProxy')
  const proxy = await TransparentUpgradeableProxy.deploy(posDescriptor.address, proxyAdmin, '0x')
  await proxy.deployed()
  console.log('proxy deployed at: ', proxy.address)
  console.log('npx hardhat verify --network', hre.network.name, proxy.address, WNATIVE, nativeCurrencyLabelBytes)

  const PosManager = await ethers.getContractFactory('NonfungiblePositionManager')
  const posManager = await PosManager.deploy(factory, WNATIVE, proxy.address)
  await posManager.deployed()
  console.log('Manager deployed at: ', posManager.address)
  console.log('npx hardhat verify --network', hre.network.name, posManager.address, factory, WNATIVE, proxy.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
