import * as AL from 'alclient'
import settings from './settings.config'
import getStatus from 'global/getstatus'
import healLoop from 'priest/heal'
import regenLoop from 'global/regenloop'
import GameState from 'global/gameState'
import moveLoop from 'global/moveLoop'
import attackLoop from 'global/attackLoop'
import chestLoop from 'global/chestLoop'
import respawnLoop from 'global/respawnLoop'
import goldLoop from 'global/goldLoop'
import getMonsterHunt from 'global/monsterHunt'
import { setupParty } from 'global/party'

async function run() {
  await Promise.all([
    AL.Game.login(settings.EMAIL, settings.PASSWORD),
    AL.Pathfinder.prepare(),
  ])
  const warrior = await AL.Game.startWarrior('rastarix', 'US', 'II')
  const merchant = await AL.Game.startMerchant('Merchiex', 'US', 'II')
  const ranger = await AL.Game.startRanger('crosscutting', 'US', 'II')
  const priest = await AL.Game.startPriest('priestiex', 'US', 'II')

  const gameState = new GameState()

  const farmers = [ranger, priest, warrior]

  setupParty(merchant, farmers)

  getStatus(farmers)
  regenLoop(farmers)
  healLoop(priest, [merchant, warrior, ranger], gameState)

  moveLoop(gameState, farmers)

  attackLoop(farmers, gameState)

  chestLoop(farmers)

  respawnLoop(merchant, farmers)

  goldLoop(merchant, farmers, gameState)

  getMonsterHunt(farmers)
}
run()
