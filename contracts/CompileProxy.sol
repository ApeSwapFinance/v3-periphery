// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.8.15;
pragma abicoder v2;

import '@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol';

abstract contract CompileProxy is TransparentUpgradeableProxy {}
