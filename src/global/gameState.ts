import {Character} from 'alclient'

type HealState = 'not-healing' | 'healing'

export default class GameState {
  healState?: HealState
  goldSender?: Character | null

  set currentGoldSender(character: Character | null) {
    this.goldSender = character
  }
}
