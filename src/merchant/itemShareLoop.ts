import { Character, Merchant, Priest, Ranger, Warrior } from 'alclient'
import { getDistance } from 'utils/getDistance'
import sleep from 'utils/sleep'

export default async function itemShareLoop(
  merchant: Merchant,
  farmers: Character[],
): Promise<void> {
  for (const item of merchant.items) {
    if (!item) {
      continue
    }
    const itemName = item.name
    const itemIndex = merchant.items.findIndex(el => el === item)

    const warrior = farmers.find(
      character => character.ctype === 'warrior',
    ) as Warrior
    const ranger = farmers.find(
      character => character.ctype === 'ranger',
    ) as Ranger
    const priest = farmers.find(
      character => character.ctype === 'priest',
    ) as Priest

    switch (itemName) {
      case 'blade':
        if (getDistance(merchant, warrior) > merchant.range) {
          if (!merchant.moving) {
            await merchant
              .smartMove({ map: warrior.map, x: warrior.x, y: warrior.y })
              .catch(err => {
                console.log(err)
              })
          }
          break
        }
        await merchant
          .sendItem(warrior.id, itemIndex, 1)
          .catch(err => console.log(err))
        break
      case 'bow':
        await merchant
          .smartMove({ map: ranger.map, x: ranger.x, y: ranger.y })
          .catch(err => console.log(err))
        await merchant
          .sendItem(ranger.id, itemIndex, 1)
          .catch(err => console.log(err))
        break
      case 'staff':
        await merchant
          .smartMove({ map: priest.map, x: priest.x, y: priest.y })
          .catch(err => console.log(err))
        await merchant
          .sendItem(priest.id, itemIndex, 1)
          .catch(err => console.log(err))
        break
      default:
        break
    }
  }

  await sleep(5000) /* Wait a bit until the next regen */
}
