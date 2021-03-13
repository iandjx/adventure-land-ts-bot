import {setupParty} from './global/party'
import * as AL from 'alclient'
import path from 'path'

const sum = (a: number) => {
  console.log(a)
}
async function run() {
  await Promise.all([
    AL.Game.loginJSONFile(path.resolve('credentials.json')),
    AL.Pathfinder.prepare(),
  ])
  const merchant = await AL.Game.startMerchant('Merchiex', 'ASIA', 'I')
  const ranger = await AL.Game.startRanger('crosscutting', 'ASIA', 'I')
  const priest = await AL.Game.startPriest('priestiex', 'ASIA', 'I')
  const warrior = await AL.Game.startWarrior('rastarix', 'ASIA', 'I')

  const farmers = [ranger, priest, warrior]

  await setupParty(merchant, farmers)

  await merchant.smartMove('fancypots')
  await merchant.buy('hpot0', 1)

  AL.Game.disconnect()
}
run()
