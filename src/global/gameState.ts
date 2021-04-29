import { Character } from 'alclient'
import { Entity } from 'alclient/build/Entity'

type HealState = 'not-healing' | 'healing'

export default class GameState {
  healState?: HealState
  goldSender?: Character | null
  coopTargetMonster?: { monster: Entity; distance: number } | null

  set currentGoldSender(character: Character | null) {
    this.goldSender = character
  }
}
