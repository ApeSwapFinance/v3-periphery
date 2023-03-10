import { ethers } from 'hardhat'
import hre from 'hardhat'
import getNetworkConfig from '../deploy-config'

/**
 * // NOTE: This is an example of the default hardhat deployment approach.
 * This project takes deployments one step further by assigning each deployment
 * its own task in ../tasks/ organized by date.
 */
async function main() {
  let { factory, WNATIVE, nftdescriptor, nativeCurrencyLabelBytes } = getNetworkConfig(hre.network.name)

  const QuoterV2 = await ethers.getContractFactory('QuoterV2')
  const quoter = await QuoterV2.deploy(factory, WNATIVE)
  await quoter.deployed()
  console.log('Quoter:', quoter.address)
  console.log('npx hardhat verify --network', hre.network.name, quoter.address, factory, WNATIVE)

  const TickLens = await ethers.getContractFactory('TickLens')
  const ticklens = await TickLens.deploy()
  await ticklens.deployed()
  console.log('TickLens:', ticklens.address)
  console.log('npx hardhat verify --network', hre.network.name, ticklens.address)

  const UniswapInterfaceMulticall = await ethers.getContractFactory('UniswapInterfaceMulticall')
  const uim = await UniswapInterfaceMulticall.deploy()
  await uim.deployed()
  console.log('UniswapInterfaceMulticall:', uim.address)
  console.log('npx hardhat verify --network', hre.network.name, uim.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
