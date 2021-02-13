import { ageInfo } from "./ageInfo.js";

export function calcRatio(undertwocount, twotothreecount, threepluscount) {
  let accountedChildren = 0;
  let underTwoTemp = undertwocount;
  let twoToThreeTemp = twotothreecount;
  let threePlusTemp = threepluscount;
  let numStaff = 0;

  while (underTwoTemp) {
    underTwoTemp--;
    accountedChildren++;
  }

  while (accountedChildren % ageInfo.undertwo) {
    //if there are some children left over so more staff can fit
    while (twoToThreeTemp) {
      twoToThreeTemp--;
      accountedChildren++;
      if (!(accountedChildren % ageInfo.undertwo)) {
        break;
      }
    }

    if (!(accountedChildren % ageInfo.undertwo)) {
      break;
    }

    while (threePlusTemp) {
      threePlusTemp--;
      accountedChildren++;
      if (!(accountedChildren % ageInfo.undertwo)) {
        break;
      }
    }
    break;
  }

  numStaff = Math.ceil(accountedChildren / ageInfo.undertwo);
  accountedChildren = 0;

  while (twoToThreeTemp) {
    twoToThreeTemp--;
    accountedChildren++;
  }

  while (accountedChildren % ageInfo.twotothree) {
    //if there are some children left over so more staff can fit
    while (threePlusTemp) {
      threePlusTemp--;
      accountedChildren++;
      if (!(accountedChildren % ageInfo.twotothree)) {
        break;
      }
    }
    break;
  }

  numStaff += Math.ceil(accountedChildren / ageInfo.twotothree);
  accountedChildren = 0;

  //now just oldest children
  while (threePlusTemp) {
    threePlusTemp--;
    accountedChildren++;
  }

  numStaff += Math.ceil(accountedChildren / ageInfo.threeplus);
  accountedChildren = 0;

  return numStaff;
}
