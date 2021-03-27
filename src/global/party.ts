import {Character, Merchant} from 'alclient'
// import {timeout} from 'utils/set-timeout'

const sleep = (ms: number | undefined) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const setupParty = async (
  merchant: Merchant,
  farmers: Character[],
): Promise<void> => {
  for (const farmer of farmers) {
    while (farmer.party === undefined) {
      try {
        merchant.sendPartyInvite(farmer.id)
        await sleep(3000)
        farmer.acceptPartyInvite(merchant.id)
        await sleep(3000)
      } catch (error) {
        console.log(error)
      }
    }

    console.log(farmer.id, ' joined ', farmer.party)
  }
}
