// TODO Refactor to TS and optimize
// function priestSkills(target) {

// 	//How much Mana should be kept in reserve
// 	const manaReserve = 0.7;
// 	const maxHealing = character.attack;
// 	const maxPartyHealing = (() => { for (let i = G.skills.partyheal.levels.length - 1; i >= 0; i--) if (G.skills.partyheal.levels[i][0] <= character.level) return G.skills.partyheal.levels[i][1] })();
// 	let hurtPartyMembers = 0;

// 	//Healing (Party-Heal and healing individual characters)
// 	for (const name of parent.party_list) {
// 		const partyMember = get_player(name);
// 		if (partyMember) {

// 			//Heal COMPLETE Party
// 			if (partyMember.hp < ((partyMember.max_hp - G.items.hpot1.gives[0][1]) - maxPartyHealing)
// 				&& !partyMember.rip) hurtPartyMembers++;
// 			if (hurtPartyMembers >= 2
// 				&& character.mp >= G.skills.partyheal.mp
// 				&& !is_on_cooldown("partyheal")) {
// 				use_skill("partyheal");
// 				game_log("Healing Party");
// 			}

// 			//Heal ONE Partymember
// 			if (partyMember.hp < ((partyMember.max_hp - G.items.hpot1.gives[0][1]) - maxHealing)
// 				&& !partyMember.rip
// 				&& character.mp >= character.mp_cost
// 				//&& can_heal(partyMember)
// 				&& is_in_range(partyMember, "heal")
// 				&& !is_on_cooldown("heal")) {
// 				heal(partyMember).then((message) => {
// 					reduce_cooldown("heal", character.ping);
// 					game_log(`Healing ${partyMember.name}`);
// 				}).catch((message) => {
// 					log(`Heal failed: ${message.reason}`);
// 				});
// 			}

// 			//Absorb Sins of a Partymember
// 			if (character.level >= 55
// 				&& !partyMember.rip
// 				&& partyMember.name !== character.name //Don't absorb own sins
// 				&& partyMember.hp < (partyMember.max_hp - (maxHealing * 2))
// 				&& character.mp >= G.skills.absorb.mp
// 				//&& can_heal(partyMember)
// 				&& is_in_range(partyMember, "absorb")
// 				&& !is_on_cooldown("absorb")) {
// 				use_skill("absorb", partyMember);
// 				game_log(`Absorbed sins of ${partyMember.name}`);
// 			}
// 		}
// 	}

// 	//Use Dark Blessing
// 	if (character.level >= 70
// 		&& validateOffensiveSkill(target, manaReserve)
// 		&& character.mp > (character.max_mp * manaReserve)
// 		&& character.mp > G.skills.darkblessing.mp
// 		&& !is_on_cooldown("darkblessing")) {
// 		use_skill("darkblessing");
// 		game_log("Used Dark Blessing");
// 	}

// 	//Curse the enemy
// 	if (validateOffensiveSkill(target, manaReserve)
// 		&& character.mp > (character.max_mp * manaReserve)
// 		&& character.mp > G.skills.curse.mp
// 		&& is_in_range(target, "curse")
// 		&& !is_on_cooldown("curse")) {
// 		use_skill("curse");
// 		game_log("Cursed the enemy");
// 	}
// }
