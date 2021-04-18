//TODO Refactor and Optimize
// //Debug mode - Set to True for extensive Logs
// const merchantDebugMode = false;

// //Money in pocked [Used to buy Potions, Scrolls and cheap Items]
// const reserveMoney = 1000000;
// //Minimal number of Upgrade & Compound Scrolls to have
// const minScrolls = 100;

// //Number of potions to buy each round.
// //Gets tripled if the hunted monster requires a master
// const potions = {
// 	hpot0: 50,
// 	hpot1: 50,
// 	mpot0: 30,
// 	mpot1: 30
// };
// //Cost 19000 @ 50 each
// //Cost 30000 @ 50/50/30/30

// //Selling parameters
// const sellItemLevel = 3;
// const profitMargin = 20;

// //Max level to be compounded
// const maxCompoundLevel = 3;
// //Max level to be upgraded
// const maxUpgradeLevel = 6;

// //Items to be sold
// const trashName = [
// 	// ringsj hpamulet hpbelt strring quiver snakeoil snakefang
// 	//spidersilk ascale cscale lotusf bfur ink spores
// 	"cclaw", "crabclaw", "shoes1", "coat", "coat1", "pants1",
// 	"wshoes", "beewings", "wcap", "strearring", "stramulet",
// 	"wattire", "poison", "rattail", "wbreeches", "gslime",
// 	"shoes", "pants", "spear", "sstinger", "smush", "frogt",
// 	"gloves", "gloves1", "stinger", "wgloves", "sword",
// 	"dstones", "helmet", "helmet1", "bwing", "tshirt0",
// 	"tshirt1", "tshirt2", "cshell", "whiteegg", "quiver",
// 	"hbow", "shield", "mushroomstaff", "swifty", "stramulet",
// 	"strbelt", "strearring", "hpbelt", "hpamulet",
// 	"throwingstars", "smoke", "phelmet", "basher",
// 	"xmace", "dagger", "bataxe", "", "",
// 	"", "", "", "", "", "", "", "",
// 	//XMas Set
// 	"xmashat", "mittens", "xmaspants", "xmasshoes", "rednose", "warmscarf", "gcape", "ornamentstaff",
// 	//Easter Set
// 	"eears", "ecape", "epyjamas", "eslippers", "carrotsword", "pinkie",
// 	//Unneeded elixirs
// 	"elixirstr0", "elixirstr1", "elixirstr2",
// 	"", "", "", "", "", "", "", "",
// 	"", "", "", "", "", "", "", ""];

// //True when Merchant is making his round
// let bigRound = false;

// function merchantSkills() {

// 	//Check if party is incomplete, restore of not
// 	restoreParty();

// 	//Buff players with merchant's luck
// 	merchantsLuck();

// 	if (!bigRound) {
// 		//Functions only used on "main" map
// 		if (character.map === "main"
// 			&& Math.abs(character.x) < 250
// 			&& Math.abs(character.y) < 250
// 			&& !is_moving(character)) {

// 			//Sell unwanted items
// 			sellTrash();

// 			//Buy cheap items from other merchants
// 			buyCheapStuff();

// 			//Upgrade items
// 			upgradeItems();

// 			//Compound items
// 			for (let i = 0; i < maxCompoundLevel; i++) if (findTriple(i)) compoundItems(i);

// 			//searchItems2bSold Returns Array SLOTS. Therefor it can return ZEROES
// 			//So we have to specifically look for UNDEFINED
// 			if (searchItems2bSold(sellItemLevel) !== undefined
// 				&& findEmptyTradeSlots() !== undefined) sellItems(sellItemLevel, profitMargin);
// 		}

// 		//These functions can run on any map [not just on the marketplace]
// 		//Therefor, they have to run in sequence, not to interfere with each other
// 		//Craft items
// 		if (craftItems("check")) {
// 			craftItems();
// 			//Dismantle items
// 		} else if (dismantleItems("check")) {
// 			dismantleItems();
// 			//Exchange Gems and Quests
// 		} else if (exchangeGemsQuests("check")) {
// 			exchangeGemsQuests();
// 			//Go Fishing!
// 		} else if (goFishing("check")) {
// 			goFishing();
// 		}
// 	}

// 	//Visit farm-party every 10 minutes.
// 	//Bring potions, take their gold and items
// 	//and store gold and good items in bank
// 	if (new Date().getMinutes() % 10 === 0) {

// 		bigRound = true;

// 		updateFarmingSpot();
// 		close_stand();
// 		merchantRound();

// 		async function merchantRound() {
// 			await smart_move("main"); //code stops here until smart move is finished
// 			buyPotions();
// 			goFishing("checkFishingRod");
// 			relocateItems();
// 			await new Promise(r => setTimeout(r, 3000)); //wait 1000ms
// 			await smart_move(farmingSpotData);
// 			transferPotions();
// 			merchantsLuck();
// 			await new Promise(r => setTimeout(r, 3000));
// 			await smart_move("bank");
// 			depositGold();
// 			depositSelectedItems();
// 			goFishing("checkFishingRod");
// 			await new Promise(r => setTimeout(r, 3000));
// 			if (buyScrolls("check")) {
// 				await smart_move("scrolls");
// 				buyScrolls("buy");
// 				await new Promise(r => setTimeout(r, 3000));
// 				openMerchantStand();
// 			} else {
// 				openMerchantStand();
// 			}
// 			await new Promise(r => setTimeout(r, 10000));
// 			bigRound = false;
// 		}
// 	}
// }

// /*
// //Make the big round
// smart_move({ to: "main" }, () => {
// 	buyPotions();
// 	relocateItems();
// 	smart_move(farmingSpotData, () => {
// 		transferPotions();
// 		merchantsLuck();
// 		setTimeout(() => {
// 			smart_move({ to: "bank" }, () => {
// 				depositGold();
// 				depositSelectedItems();
// 				//Wait after depositing items.
// 				//Depositing multiple items and immediately smart_moving can result in a kick (Call-cost too high)
// 				setTimeout(() => {
// 					if (buyScrolls("check")) {
// 						smart_move({ to: "scrolls" }, () => {
// 							buyScrolls("buy");
// 							openMerchantStand();
// 						});
// 					} else {
// 						openMerchantStand();
// 					}
// 				}, 3000);
// 			});
// 		}, 5000);
// 	});
// });
// }
// }
// */

// //Buy potions
// function buyPotions() {
// 	if (merchantDebugMode) log("Buying Potions", "green");
// 	//If farmMonsterType requires a master, buy more potions!
// 	const potionModifier = requiresMaster.includes(farmMonsterType) ? 3 : 1;
// 	for (const potion in potions) {
// 		if (quantity(potion) < potions[potion]) buy_with_gold(potion, (potions[potion] - quantity(potion)) * potionModifier);
// 	}
// }

// //Transfer potions to characters
// function transferPotions() {
// 	if (merchantDebugMode) log("Transferring Potions", "green");
// 	//All potions not listed here get sold (Check "trashName"-Array)
// 	const essentialPotions = ["hpot0", "mpot0", "hpot1", "mpot1"];
// 	const dexPotions = ["elixirdex0", "elixirdex1", "elixirdex2"];
// 	const intPotions = ["elixirint0", "elixirint1", "elixirint2"];
// 	const luckPotions = ["elixirluck"];

// 	for (const name of parent.party_list) {
// 		const partyMember = get_player(name);
// 		if (partyMember) {

// 			//Deliver essential potions (Health & Mana)
// 			essentialPotions.forEach(potion => {
// 				if (locate_item(potion) !== -1) {
// 					send_item(partyMember, locate_item(potion), Math.floor(quantity(potion) / 3));
// 					log("Delivered essential Potions!");
// 				}
// 			});
// 			//Deliver luck potions
// 			luckPotions.forEach(potion => {
// 				if (locate_item(potion) !== -1) {
// 					send_item(partyMember, locate_item(potion), Math.floor(quantity(potion) / 3));
// 					log("Delivered Luck Potions!");
// 				}
// 			});
// 			//Deliver dexterity potions to ranger
// 			if (partyMember.ctype === "ranger") {
// 				dexPotions.forEach(potion => {
// 					if (locate_item(potion) !== -1) {
// 						send_item(partyMember, locate_item(potion), quantity(potion));
// 						log("Delivered DexPotions!");
// 					}
// 				});
// 			}
// 			//Deliver intelligence potions to Priest & Mage
// 			if (partyMember.ctype === "priest" || partyMember.ctype === "mage") {
// 				intPotions.forEach(potion => {
// 					if (locate_item(potion) !== -1 && quantity(potion) % 2 === 0) {
// 						send_item(partyMember, locate_item(potion), quantity(potion) / 2);
// 						log("Delivered intPotions!");
// 					}
// 					if (quantity(potion) % 2 !== 0 && Math.round(Math.random()) === 1) {
// 						send_item(partyMember, locate_item(potion), 1);
// 						log("Delivered intPotions!");
// 					}
// 				});
// 			}
// 		}
// 	}
// }

// //Buy Scrolls
// function buyScrolls(action) {
// 	const scrolls = ["scroll0", "scroll1", "cscroll0", "cscroll1"];
// 	for (const scroll of scrolls) {
// 		const missingScrolls = minScrolls - quantity(scroll);
// 		const affordableScrolls = Math.floor(character.gold / G.items[scroll].g);
// 		const scrollNum = (missingScrolls <= affordableScrolls) ? missingScrolls : affordableScrolls;
// 		if (action === "check") {
// 			if (merchantDebugMode) log("Checking Scrolls", "green");
// 			if (scrollNum > 0) return true;
// 		}
// 		else if (action === "buy"
// 			&& scrollNum
// 			&& scrollNum > 0) {
// 			if (merchantDebugMode) log("Buying Scrolls", "green");
// 			buy(scroll, scrollNum);
// 			log(`Bought ${scrollNum} ${G.items[scroll].name}`);
// 		}
// 	}
// }

// /*
// // ### Works independent of the "Big round" ###

// //Buy Compound Scrolls
// function buyScrolls() {
// 	const compScrolls = ["cscroll0", "cscroll1"];
// 	for (const scroll of compScrolls) {
// 		const missingScrolls = minScrolls - quantity(scroll);
// 		const affordableScrolls = Math.floor(character.gold / G.items[scroll].g);
// 		const scrollNum = (missingScrolls <= affordableScrolls) ? missingScrolls : affordableScrolls;
// 		if (scrollNum) {
// 			getScrolls(scroll, scrollNum);
// 			return;
// 		}
// 	}

// 	function getScrolls(scroll, scrollNum) {
// 		close_stand();
// 		smart_move(find_npc("scrolls"), () => {
// 			buy(scroll, scrollNum);
// 			log(`Bought ${scrollNum} ${G.items[scroll].name}`);
// 			setTimeout(() => {
// 				openMerchantStand();
// 			}, 6000);
// 		});
// 		return;
// 	}
// }
// */

// //Sell trash, keep if it's high grade. (Grades: 0 Normal / 1 High /  2 Rare
// function sellTrash() {
// 	if (merchantDebugMode) log("Selling Trash", "green");
// 	character.items.forEach((item, index) => {
// 		if (item
// 			&& trashName.includes(item.name)
// 			&& item_grade(item) < 2) {
// 			log(`Merchant is unloading trash ${item.name}`);
// 			item.q ? sell(index, item.q) : sell(index, item);
// 		}
// 	});
// }

// //Deposit Gold in bank
// function depositGold() {
// 	if (merchantDebugMode) log("Depositing Gold", "green");
// 	bank_deposit(character.gold - reserveMoney);
// 	log(`Money deposited! Money in Pocket: ${character.gold}`);
// }

// //Collects similar items in the bank
// //First item has to be stored manually to initialize!
// //This is a precaution not to store unwanted items (Overflow bank)
// function depositSelectedItems() {
// 	if (merchantDebugMode) log("Depositing Items", "green");
// 	const keepItems = [
// 		//Items
// 		"stand0", "tracker", "computer", "sshield", "candycanesword", "rod",
// 		//Orbs
// 		"jacko", "orbg", "talkingskull"
// 	];
// 	//Loops through character's inventory
// 	character.items.forEach((item, index) => {
// 		//Flag to break both nested for-loops
// 		//[Preventing multiple bank_store() operations of the same item, potentially resulting in a kick]
// 		let breakLoop = false;
// 		if (item
// 			&& !keepItems.includes(item.name)) {
// 			//Loops through bank-sections
// 			for (const box in character.bank) {
// 				if (breakLoop) break;
// 				//Can't store anything in gold-box
// 				if (box === "gold") continue;
// 				//Loops through individual bank-slots
// 				for (const slot of character.bank[box]) {
// 					if (slot) {
// 						if (item_grade(item) === 2
// 							|| (item.level
// 								&& item.level > sellItemLevel)
// 							|| (slot.name === item.name
// 								&& (slot.q
// 									|| slot.level <= item.level))) {
// 							bank_store(index);
// 							log(`Stored ${item.name} in bank!`);
// 							breakLoop = true;
// 							break;
// 						}
// 					}
// 				}
// 			}
// 		}
// 	});
// }

// /*
// //Collects similar items in the bank
// //First item has to be stored manually to initialize!
// //This is a precaution not to store unwanted items (Overflow bank)
// function depositSelectedItems() {
// 	if (merchantDebugMode) log("Depositing Items", "green");
// 	const keepItems = [
// 		//Items
// 		"stand0", "tracker", "computer", "sshield", "candycanesword", "rod",
// 		//Orbs
// 		"jacko", "orbg", "talkingskull"
// 	];
// 	//Loops through bank-sections
// 	for (const box in character.bank) {
// 		if (box === "gold") continue;
// 		//Loops through individual bank-slots
// 		for (let slot of character.bank[box]) {
// 			if (slot !== null) {
// 				//Loops through character's inventory
// 				character.items.forEach((item, index) => {
// 					if (item !== null
// 						&& !keepItems.includes(item.name)
// 						&& (item_grade(item) === 2
// 							|| (item.level
// 								&& item.level > sellItemLevel)
// 							|| (slot.name === item.name
// 								&& (slot.q
// 									|| slot.level <= item.level)))) {
// 						bank_store(index);
// 						log(`Stored ${item.name} in bank!`);
// 					}
// 				});
// 			}
// 		}
// 	}
// }
// */

// //Upgrade Items
// function upgradeItems() {
// 	if (merchantDebugMode) log("Upgrading Items", "green");
// 	const scrolls = ["scroll0", "scroll1", "scroll2"];
// 	for (slot in character.items) {
// 		if (!character.q.upgrade
// 			&& character.items[slot]
// 			&& (character.items[slot].name
// 				&& itemsToUpgrade.indexOf(character.items[slot].name) !== -1
// 				&& G.items[character.items[slot].name].upgrade)
// 			&& character.items[slot].level <= maxUpgradeLevel) {
// 			//Use massproduction skill
// 			massProduction();
// 			//Upgrade item
// 			upgrade(slot, locate_item(scrolls[item_grade(character.items[slot])])).then(
// 				(data) => {
// 					game_log(`Upgraded ${character.items[slot].name}`);
// 				},
// 				(data) => {
// 					game_log(`Upgrade failed: ${character.items[slot].name} : ${data.reason}`);
// 				},
// 			);
// 			return;
// 		}
// 	}
// }

// //Compound items
// function compoundItems(level) {
// 	if (merchantDebugMode) log("Compounding Items", "green");
// 	const scrolls = ["cscroll0", "cscroll1", "cscroll2"];
// 	const triple = findTriple(level);
// 	if (triple
// 		&& triple.length === 3
// 		&& !character.q.compound) {
// 		//Use massproduction skill
// 		massProduction();
// 		//Compound item
// 		compound(triple[0], triple[1], triple[2], locate_item(scrolls[item_grade(character.items[triple[0]])])).then((data) => {
// 			(data.success) ? game_log(`Compounded level ${data.level} accessory!`) : game_log("Compound Failed - Item lost!");
// 		}).catch((data) => {
// 			game_log(`Compound Failed: ${data.reason}`);
// 		});
// 	}
// }

// /*
// //Compound items
// function compoundItems(level) {
// 	const triple = findTriple(level);
// 	if (triple
// 		&& triple.length === 3
// 		&& !character.q.compound) {

// 		compound(triple[0], triple[1], triple[2], locate_item(chooseScroll(triple))).then((data) => {
// 			(data.success) ? game_log(`Compounded level ${data.level} accessory!`) : game_log("Compound Failed - Item lost!");
// 		}).catch((data) => {
// 			game_log(`Compound Failed: ${data.reason}`);
// 		});
// 	}
// 	function chooseScroll(triple) {
// 		const scrolls = ["cscroll0", "cscroll1", "cscroll2"];
// 		return scrolls[item_grade(character.items[triple[0]])];
// 	}
// }
// */

// //Mass Production
// function massProduction() {
// 	if (merchantDebugMode) log("Using Mass Production Skill", "green");
// 	if (character.level >= 60
// 		&& character.mp > G.skills.massproductionpp.mp
// 		&& !is_on_cooldown("massproductionpp")) {
// 		use_skill("massproductionpp");
// 		game_log("Used Mass Production 90%");
// 	} else if (character.level >= 30
// 		&& character.mp > G.skills.massproduction.mp
// 		&& !is_on_cooldown("massproduction")) {
// 		use_skill("massproduction");
// 		game_log("Used Mass Production 50%");
// 	}
// }

// //Find a triple of items (same item, same level)
// function findTriple(level) {
// 	if (merchantDebugMode) log("Finding Triple", "green");
// 	let compoundTriple = [];
// 	//Look for triples
// 	for (let i = 0; i <= 41; i++) {
// 		if (character.items[i]?.level === level
// 			//First loop selects a compoundable item so the two
// 			// nested loops only need to match item name & item level
// 			&& G.items[character.items[i].name]?.compound
// 			//Validate Compound: If  item is needed for crafting,
// 			//it must NOT be compounded (Craft only takes lvl 0 items!)
// 			&& validateCompound(character.items[i].name)) {
// 			for (let j = i + 1; j <= 41; j++) {
// 				if (character.items[j]
// 					&& character.items[j].name === character.items[i].name
// 					&& character.items[j].level === level) {
// 					for (let k = j + 1; k <= 41; k++) {
// 						if (character.items[k]
// 							&& character.items[k].name === character.items[j].name
// 							&& character.items[k].level === level) {
// 							log(`Slot i: ${i} item: ${character.items[i].name} Slot j: ${j} item: ${character.items[j].name} Slot k: ${k} item: ${character.items[k].name}`)
// 							compoundTriple.push(i, j, k);
// 							return compoundTriple
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}

// 	//Validate Compound: If  item is needed for crafting,
// 	//it must NOT be compounded (Craft only takes lvl 0 items!)
// 	function validateCompound(compoundItem) {
// 		for (const craftItem of itemsToCraft) {
// 			const { items: ingredients } = G.craft[craftItem];
// 			for (const ingredient of ingredients) {
// 				if (compoundItem === ingredient[1]) return false;
// 			}
// 		}
// 		return true;
// 	}
// }

// //Find items to be sold  in the merchant stand
// function searchItems2bSold(sellItemLevel = 3) {
// 	if (merchantDebugMode) log("Searching Items to be sold", "green");
// 	for (const slot in character.items) {
// 		if (character.items[slot]
// 			&& !itemsToCraft.includes(character.items[slot].name)
// 			&& character.items[slot].level === sellItemLevel) return slot;
// 	}
// }

// //Sell items that match a certain level, with a profit
// function sellItems(sellItemLevel = 2, profitMargin = 15) {
// 	if (merchantDebugMode) log("Selling Items", "green");
// 	trade(searchItems2bSold(sellItemLevel), findEmptyTradeSlots(), item_value(character.items[searchItems2bSold(sellItemLevel)]) * profitMargin);
// }

// //Find empty trade-slots to put goods in
// function findEmptyTradeSlots() {
// 	const tradeSlots = Object.keys(character.slots).filter(tradeSlot => tradeSlot.includes("trade"));
// 	//Returns slot + 1 because character.slots is 0-indexed,
// 	//but Trate-Slots start with 1 NOT ZERO!
// 	for (const slot in tradeSlots) {
// 		if (!character.slots[tradeSlots[slot]]) return Number(slot) + 1;
// 	}
// }

// //Auto-buy items from other merchants if they are sold below their value
// //Also, auto-join Giveaways
// function buyCheapStuff() {
// 	if (merchantDebugMode) log("Buying cheap Stuff", "green");
// 	for (const i in parent.entities) {
// 		const otherPlayer = parent.entities[i];
// 		if (otherPlayer.player
// 			&& otherPlayer.ctype === "merchant"
// 			&& otherPlayer.slots
// 			&& distance(character, otherPlayer) < G.skills.mluck.range) {

// 			const tradeSlots = Object.keys(otherPlayer.slots).filter(tradeSlot => tradeSlot.includes("trade"));
// 			tradeSlots.forEach(tradeSlot => {
// 				const otherPlayerTradeSlot = otherPlayer.slots[tradeSlot];
// 				//Must be a Trade-Slot
// 				if (otherPlayerTradeSlot) {
// 					if (!otherPlayerTradeSlot.b //Excludes "whishlisted" items! Trade slots can "sell" or "wishlist"!
// 						&& otherPlayerTradeSlot.price < item_value(otherPlayerTradeSlot)
// 						&& character.gold > otherPlayerTradeSlot.price
// 						//Don't try to buy Giveaways
// 						&& !otherPlayerTradeSlot.giveaway) {
// 						//If it's a single item, buy it.
// 						if (!otherPlayerTradeSlot.q) {
// 							log(`Bought 1 ${otherPlayerTradeSlot.name} from ${otherPlayer.name}`);
// 							trade_buy(otherPlayer, tradeSlot, 1);
// 							//If the item has a quantity, buy as many as possible
// 						} else if (otherPlayerTradeSlot.q) {
// 							//Maximum possible quantity of items that can be bought wit available gold
// 							let maxBuy = Math.floor(character.gold / otherPlayerTradeSlot.price) < otherPlayerTradeSlot.q ? Math.floor(character.gold / otherPlayerTradeSlot.price) : otherPlayerTradeSlot.q;
// 							trade_buy(otherPlayer, tradeSlot, maxBuy);
// 							//parent.trade_buy(tradeSlot, otherPlayer.name, otherPlayerTradeSlot.rid, maxBuy);
// 						}
// 						//Auto-Join Giveaways
// 					} else if (otherPlayerTradeSlot.giveaway
// 						&& !otherPlayerTradeSlot.list.includes(character.name)) {
// 						parent.socket.emit('join_giveaway', {
// 							slot: tradeSlot,
// 							id: otherPlayer.id,
// 							rid: otherPlayerTradeSlot.rid,
// 						});
// 						log("Joined giveaway!");
// 					}
// 				}
// 			});
// 		}
// 	}
// }

// //Buff other characters with Merchants Luck!
// function merchantsLuck() {
// 	if (merchantDebugMode) log("Using Merchants Luck Skill", "green");
// 	let otherPlayers = [];
// 	for (i in parent.entities) {
// 		if (parent.entities[i].player
// 			&& parent.entities[i].ctype
// 			&& !parent.entities[i].rip
// 			&& !parent.entities[i].npc
// 			&& (!parent.entities[i].s.mluck
// 				|| parent.entities[i].s.mluck.strong === false)
// 			/*
// 			&& (!parent.entities[i].s.mluck
// 			 || !parent.entities[i].s.mluck.f
// 			 || parent.entities[i].s.mluck.f != character.name)
// 			*/
// 			&& character.mp > (character.max_mp / 10)
// 			&& character.mp > G.skills.mluck.mp
// 			&& distance(character, parent.entities[i]) < G.skills.mluck.range
// 			&& is_in_range(parent.entities[i], "mluck")
// 			&& !is_on_cooldown("mluck")) {
// 			//All eligible players get pushed to the array...
// 			otherPlayers.push(parent.entities[i]);
// 		}
// 	}
// 	//...and then one random player is picked!
// 	if (otherPlayers.length > 0) {
// 		const luckyPlayer = Math.floor(Math.random() * otherPlayers.length)
// 		use_skill("mluck", otherPlayers[luckyPlayer].name);
// 		log(`Giving luck to: ${otherPlayers[luckyPlayer].name}`);
// 	}
// }

// //If a character is not in the party, reatore it
// function restoreParty() {
// 	if (merchantDebugMode) log("Restoring Party", "green");
// 	if (parent.party_list.length < 4) {
// 		loadCharacters();
// 		initParty();
// 	}
// }

// //Go to the market and sell things
// function openMerchantStand() {
// 	if (merchantDebugMode) log("Opening Merchant Stand", "green");
// 	/*
// 	IMPORTANT!!! Because this function gets called with a setTimeout(),
// 	it can be called WHILE the character is moving,
// 	causing too many calls to the server, resulting in a kick!
// 	We therefor MUST check in the beginning if the character is already moving!
// 	*/
// 	if (is_moving(character)) return;

// 	smart_move({
// 		map: "main",
// 		x: - 20 - Math.round(Math.random() * 180),
// 		y: - 70
// 	}, () => {
// 		//Face front
// 		move(character.x, character.y + 1);
// 		open_stand();
// 	});
// }

// /*
// //Go to the market and sell things
// function openMerchantStand() {
// 	if (is_moving(character)) return;
// 	if (character.map !== "main") {
// 		smart_move({ to: "main" }, () => {
// 			goTownOpenStand();
// 		});
// 	} else {
// 		goTownOpenStand();
// 	}
// 	function goTownOpenStand() {
// 		smart_move({ to: "town" }, () => {
// 			smart_move({ x: -20 - Math.round(Math.random() * 180), y: - 85 }, () => {
// 				//Turn around, face front
// 				smart_move({ x: character.x, y: character.y + 1 }, () => {
// 					//parent.socket.emit("merchant",{num:41});
// 					//parent.open_merchant(locate_item("stand0"));
// 					open_stand();
// 				});
// 			});
// 		});
// 	}
// }
// */

// /*
// //Close the merchant stand
// function closeMerchantStand() {
// 	//Close merchant Stand
// 	//parent.socket.emit("merchant", {close:1})
// 	//parent.close_merchant(locate_item("stand0"));
// 	close_stand();
// }
// */

// //Exchange Gems & Quests at the corresponding NPC
// function exchangeGemsQuests(action = "default") {
// 	if (merchantDebugMode) log("Exchanging Gems & Quests", "green");
// 	if (action === "check") return locateGems("findGems");
// 	if (locateGems("findGems")) {
// 		close_stand();
// 		//smart_move({ to: "exchange" }, () => {
// 		smart_move(find_npc(locateGems("findNpc")), () => {
// 			exchange(locateGems("getSlotNum"));
// 			log("Item Exchanged!");
// 			setTimeout(() => {
// 				if (!locateGems("findGems")) openMerchantStand();
// 			}, 6000);
// 		});
// 	}
// 	//Finds Gems & Quests in Inventory
// 	function locateGems(arg) {
// 		for (const slotNum in character.items) {
// 			if (character.items[slotNum]) {
// 				const item = G.items[character.items[slotNum].name];
// 				//If the item is a gem, exchange it
// 				if ((item.type === "gem"
// 					|| item.type === "box"
// 					|| item.type === "misc"
// 					|| item.type === "quest")
// 					//"e"-key means the item is exchangeable
// 					&& item.e
// 					//Some quests (seashells, ornaments) need more than 1 item to be exchangeable
// 					&& item.e <= character.items[slotNum].q) {
// 					//Gem found
// 					if (arg === "findGems") {
// 						return true;
// 						//Return slot
// 					} else if (arg === "getSlotNum") {
// 						return slotNum;
// 						//Go to the correct NPC
// 					} else if (arg === "findNpc") {
// 						//If the item is a gem (not a quest), go to Xyn
// 						if (!item.quest) {
// 							return "exchange";
// 							//If the item is  a quest, go to the corresponding NPC
// 						} else if (item.quest) {
// 							for (const npc in G.npcs) {
// 								if (G.npcs[npc].quest === item.quest) return npc;
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// }

// //Craft Items
// function craftItems(action = "default") {
// 	if (merchantDebugMode) log("Crafting Items", "green");
// 	for (const item of itemsToCraft) {
// 		if (checkCraftIngredients(item)) {
// 			if (action === "check") return checkCraftIngredients(item);
// 			close_stand();
// 			smart_move(find_npc("craftsman"), () => {
// 				auto_craft(item);
// 				setTimeout(() => {
// 					if (!checkCraftIngredients(item)) openMerchantStand();
// 				}, 3000);
// 			});
// 			return;
// 		}
// 	}
// 	//Checks inventory if all needed ingredients are available
// 	function checkCraftIngredients(item) {
// 		let ingredientsComplete = [];
// 		const { items: ingredients } = G.craft[item];
// 		if (G.craft[item].cost <= character.gold) {
// 			for (const ingredient of ingredients) {
// 				if (locate_item(ingredient[1]) !== -1
// 					//Check that item has no level...
// 					&& (!character.items[locate_item(ingredient[1])].level
// 						//... if it has a level, level must be 0 for the item to be crafted
// 						|| character.items[locate_item(ingredient[1])].level === 0)) {
// 					//Check if exactly 1 of this ingredient is needed
// 					if (ingredient[0] === 1) {
// 						ingredientsComplete.push(true);
// 						//If more than 1 of this ingredient is needed, check if the inventory holds enough
// 					} else if (ingredient[0] > 1
// 						&& (quantity(ingredient[1]) >= ingredient[0])) {
// 						//&& (character.items[locate_item(ingredient[1])].q >= ingredient[0])) {
// 						ingredientsComplete.push(true);
// 					}
// 				}
// 			}
// 		}
// 		return ingredients.length === ingredientsComplete.length ? true : false;
// 	}
// }

// //Dismantle Items
// function dismantleItems(action = "default") {
// 	if (merchantDebugMode) log("Dismantling Items", "green");
// 	if (action === "check") return findDismantleItems("find");
// 	if (findDismantleItems("find")) {
// 		close_stand();
// 		smart_move(find_npc("craftsman"), () => {
// 			dismantle(findDismantleItems("slot"));
// 			setTimeout(() => {
// 				if (!findDismantleItems("find")) openMerchantStand();
// 			}, 3000);
// 		});
// 		return;
// 	}
// 	function findDismantleItems(arg) {
// 		for (const slot in character.items) {
// 			if (character.items[slot]) {
// 				if (arg === "find") {
// 					if (itemsToDismantle.indexOf(character.items[slot].name) !== -1) return true;
// 				} else if (arg === "slot") {
// 					if (itemsToDismantle.indexOf(character.items[slot].name) !== -1) return slot;
// 				}
// 			}
// 		}
// 	}
// }

// function goFishing(action = "default") {
// 	if (fishingToggle) {
// 		if (merchantDebugMode) log("Fishing", "green");

// 		//Equipment to wear when not fishing
// 		const mainHand = "candycanesword";
// 		const offHand = "sshield";
// 		const fishingSpot = {
// 			map: "main",
// 			x: -1368,
// 			y: -34
// 		}

// 		//Check if can go fishing, equip regular Gear if not
// 		if (action === "check") {
// 			if (is_on_cooldown("fishing")) equipRegularGear();
// 			return !is_on_cooldown("fishing");
// 			//Check if character has a fishingrod. If not, craft one
// 		} else if (action === "checkFishingRod") {
// 			checkFishingRod();
// 		}

// 		//Check if character has a fishingrod. If not, craft one.
// 		function checkFishingRod() {
// 			if (locate_item("rod") === -1
// 				&& character.slots.mainhand?.name !== "rod") {
// 				if (character.map === "bank"
// 					&& locate_item("spidersilk") === -1) {
// 					retrieveFromBank("spidersilk");
// 				} else if (character.map === "main"
// 					&& locate_item("spidersilk") !== -1) {
// 					buy("staff");
// 				}
// 			}
// 		}

// 		//Go fishing
// 		if (!is_on_cooldown("fishing")
// 			&& (locate_item("rod") !== -1
// 				|| character.slots.mainhand?.name === "rod")) {
// 			if (character.stand) close_stand();
// 			//Move to fishing spot
// 			if (distance(character, fishingSpot) > 10) {
// 				smart_move(fishingSpot, () => { equipFishingGear() });
// 				//If at fishing spot, equip the fishing rod and fish
// 			} else if (distance(character, fishingSpot) < 10) {
// 				if (character.slots.mainhand?.name !== "rod") {
// 					equipFishingGear();
// 					//Start fishing!
// 				} else if (character.slots.mainhand?.name === "rod"
// 					&& !character.c.fishing) {
// 					use_skill("fishing");
// 					setTimeout(() => {
// 						if (is_on_cooldown("fishing")) {
// 							equipRegularGear();
// 							openMerchantStand();
// 						}
// 					}, 15000);
// 				}
// 			}
// 			// ###### Still needed?? ######
// 			//If fishing is on cooldown, openMerchantStand()
// 		} /*else if (is_on_cooldown("fishing")) {
// 		if (distance(character, fishingSpot) < 10) openMerchantStand();
// 		equipRegularGear();
// 	}*/

// 		//Equip Fishingrod
// 		function equipFishingGear() {
// 			if (character.slots.offhand) unequip("offhand");
// 			if (character.slots.mainhand?.name !== "rod"
// 				&& locate_item("rod") !== -1) {
// 				equip(locate_item("rod"));
// 			}
// 		}

// 		//Equip regular Gear
// 		function equipRegularGear() {
// 			if (character.slots.mainhand?.name !== mainHand
// 				&& locate_item(mainHand) !== -1) {
// 				equip(locate_item(mainHand));
// 			}
// 			if (character.slots.offhand?.name !== offHand
// 				&& locate_item(offHand) !== -1) {
// 				equip(locate_item(offHand));
// 			}
// 		}
// 	}
// }
