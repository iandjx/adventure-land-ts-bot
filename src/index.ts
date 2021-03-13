import * as AL from 'alclient';
import path from 'path';
import { test } from 'merchant/main';
async function run() {
  console.log(test());

  await Promise.all([
    AL.Game.loginJSONFile(path.resolve('credentials.json')),
    AL.Pathfinder.prepare(),
  ]);
  const merchant = await AL.Game.startMerchant('Merchiex', 'ASIA', 'I');
  const ranger = await AL.Game.startRanger('crosscutting', 'ASIA', 'I');
  console.log(ranger.dex);
  console.log('hello');
  await merchant.smartMove('fancypots');
  await merchant.buy('hpot0', 1);
  // console.log('Moving to main');
  // await merchant.smartMove('main');
  // console.log('Moving to cyberland');
  // await merchant.smartMove('cyberland');
  // console.log('Moving to halloween');
  // await merchant.smartMove('halloween');

  AL.Game.disconnect();
}
run();
