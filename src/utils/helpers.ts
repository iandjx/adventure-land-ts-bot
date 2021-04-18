// TODO Refactor to TS and separate files and optimize
// function transferLoot(merchantName) {
// 	if (character.ctype === "merchant") return;
// 	const merchant = get_player(merchantName);
// 	const keepItems = [
// 		//Items
// 		"tracker", "computer",
// 		//Orbs
// 		"jacko", "orbg", "talkingskull",
// 		//Gloves
// 		"handofmidas", "mpgloves", "mmgloves", "mrngloves",
// 		//Offhands
// 		"lantern", "wbook1", "t2quiver",
// 		//Potions & Elixirs
// 		"hpot0", "mpot0", "hpot1", "mpot1",
// 		"elixirdex0", "elixirdex1", "elixirdex2",
// 		"elixirint0", "elixirint1", "elixirint2",
// 		//"elixirvit0", "elixirvit1", "elixirvit2",
// 		//"elixirstr0", "elixirstr1", "elixirstr2",
// 		"elixirluck"
// 	];
// 	if (character.ctype !== "merchant"
// 		&& merchant
// 		&& merchant.owner === character.owner
// 		&& distance(character, merchant) < 400) {
// 		//Transfer Gold
// 		if (character.gold > 1000) send_gold(merchant, character.gold)
// 		//Transfer Items
// 		character.items.forEach((item, index) => {
// 			if (item && !keepItems.includes(item.name)) {
// 				send_item(merchant, index, 9999);
// 				log("Sent items to merchant.");
// 			}
// 		});
// 		//Send spare jackos to the merchant, too [Deactivated: Jackos don't drop from monsters, only from rare candy]
// 		//if (locate_item("jacko") !== -1 && locate_item("jacko") !== 40) send_item(merchant, locate_item("jacko"), 9999);
// 	}
// }

// function tidyInventory() {
// 	for (let i = 0; i <= 34; i++) {
// 		if (character.items[i] === null) {
// 			for (let j = 34; j > i; j--) {
// 				if (character.items[j]) swap(j, i);
// 			}
// 		}
// 	}
// }

// //Relocate certain items to certain slots
// function relocateItems() {
// 	//All Characters Special Items
// 	if (locate_item("tracker") !== -1
// 		&& locate_item("tracker") !== 0) swap(locate_item("tracker"), 0);
// 	if (locate_item("jacko") !== -1
// 		&& locate_item("jacko") !== 1) swap(locate_item("jacko"), 1);
// 	//Only farmers have Hand of Midas
// 	if (character.ctype !== "merchant"
// 		&& locate_item("handofmidas") !== -1
// 		&& locate_item("handofmidas") !== 2) swap(locate_item("handofmidas"), 2);
// 	//Only Priest and Mage have a lantern
// 	if ((character.ctype !== "priest"
// 		|| character.ctype !== "mage")
// 		&& locate_item("lantern") !== -1
// 		&& locate_item("lantern") !== 3) swap(locate_item("lantern"), 3);
// 	//Potions
// 	if (locate_item("hpot1") !== -1
// 		&& locate_item("hpot1") !== 35) swap(locate_item("hpot1"), 35);
// 	if (locate_item("mpot1") !== -1
// 		&& locate_item("mpot1") !== 36) swap(locate_item("mpot1"), 36);
// 	if (locate_item("hpot0") !== -1
// 		&& locate_item("hpot0") !== 37) swap(locate_item("hpot0"), 37);
// 	if (locate_item("mpot0") !== -1
// 		&& locate_item("mpot0") !== 38) swap(locate_item("mpot0"), 38);
// }

// //Replenish Health and Mana
// function usePotions() {
// 	if (!character.rip) {
// 		//Emergency Mana [For Scare-Ability]
// 		if (!is_on_cooldown("use_mp")
// 			//If character has at least half of it's HP...
// 			&& (character.hp >= (character.max_hp / 2)
// 				//Or almost no HP
