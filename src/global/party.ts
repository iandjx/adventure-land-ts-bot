import { Character, Merchant } from 'alclient';
import { timeout } from 'utils/set-timeout';

export const setupParty = async (merchant: Merchant, farmers: Character[]) => {
  for (const farmer of farmers) {
    while (farmer.party === undefined) {
      console.log('creating party');
      merchant.sendPartyInvite(farmer.id);
      await timeout(100);
      farmer.acceptPartyInvite(merchant.id);
    }
  }
};
