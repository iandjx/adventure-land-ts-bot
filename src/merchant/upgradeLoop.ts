import { Merchant, ItemName } from 'alclient'
import sleep from 'utils/sleep'

export async function upgradeLoop(
  merchant: Merchant,
  itemName: ItemName,
): Promise<void> {
  while (true) {
    let blade = merchant.items.find(item => item?.name === itemName)
    if (!blade) {
      await merchant.smartMove('weapons').catch(err => console.log(err))
      await merchant.buy(itemName, 1).catch(err => console.log(err))
    }
    blade = merchant.items.find(item => item?.name === itemName)

    if (blade?.level === 4) {
      continue
    }
    let scroll = merchant.items.find(item => item.name === 'scroll0')
    if ((scroll && scroll.q && scroll?.q < 10) || !scroll) {
      await merchant.smartMove('scrolls').catch(err => console.log(err))
      await merchant.buy('scroll0', 10).catch(err => console.log(err))
    }

    scroll = merchant.items.find(item => item.name === 'scroll0')

    await merchant.smartMove('newupgrade').catch(err => console.log(err))
    const bladeIndex = merchant.items.findIndex(item => item?.name === itemName)
    const scrollIndex = merchant.items.findIndex(
      item => item.name === 'scroll0',
    )

    const upgradeSucc = await merchant
      .upgrade(bladeIndex, scrollIndex)
      .catch(err => console.log(err))
    console.log(upgradeSucc)
    console.log(merchant.items[bladeIndex])

    await sleep(250) /* Wait a bit until the next regen */
  }
}
