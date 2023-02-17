import { ethers } from 'hardhat'
import hre from 'hardhat'
import getNetworkConfig from '../deploy-config'

/**
 * // NOTE: This is an example of the default hardhat deployment approach.
 * This project takes deployments one step further by assigning each deployment
 * its own task in ../tasks/ organized by date.
 */
async function main() {
  const { factory, WNATIVE } = getNetworkConfig(hre.network.name)

  const Router = await ethers.getContractFactory('SwapRouter')
  const router = await Router.deploy(factory, WNATIVE)
  console.log('Router deployed at: ', router.address)
  console.log('npx hardhat verify --network', hre.network.name, router.address, factory, WNATIVE)
  

  // uint160 sqrtRatioX96,
  // uint160 sqrtRatioAX96,
  // uint160 sqrtRatioBX96,
  // uint256 amount0,
  // uint256 amount1
  // const Router = await ethers.getContractFactory('LiquidityAmounts')
  // const router = await Router.attach('0xF776a44160271aF9ecc0f6D6D544684A9EA05c16')

  // const res = await router.getLiquidityForAmounts(
  //   '2623217336919476318046309936907',
  //   '4295128739',
  //   '1461446703485210103287273052203988822378723970342',
  //   '100000000000000000000',
  //   '100000000000000000000'
  // )
  // console.log(res)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
