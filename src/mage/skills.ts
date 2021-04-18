//TODO Refactor to TS and optimize
// function mageSkills(target) {

// 	//How much Mana should be kept in reserve
// 	const manaReserve = 0.8;
// 	const hpReserve = 0.5;
// 	const energizeMPs = G.items.mpot1.gives[0][1];

// 	//Energize and Shield Party Members
// 	//parent.party_list = Array of PartyMembers-Names
// 	for (const name of parent.party_list) {
// 		const partyMember = get_player(name);
// 		if (partyMember) {

// 			//Shield Partymenber [Only works against magical attacks]
// 			if (character.level >= 60
// 				&& !partyMember.rip
// 				&& G.monsters?.[target?.mtype]?.damage_type === "magical"
// 				&& character.mp > G.skills.reflection.mp
// 				&& partyMember.hp < (partyMember.max_hp * hpReserve)
// 				&& is_in_range(partyMember, "reflection")
// 				&& !is_on_cooldown("reflection")) {
// 				use_skill("reflection", partyMember);
// 				game_log(`Shielded ${partyMember.name}`);
// 			}

// 			//Energize Partymenber
// 			if (character.level >= 20
// 				&& !partyMember.rip
// 				&& partyMember.name !== character.name //No self-energize!
// 				&& character.mp > (character.max_mp * manaReserve)
// 				&& partyMember.mp < ((partyMember.max_mp * manaReserve) - (energizeMPs * 2))
// 				&& is_in_range(partyMember, "energize")
// 				&& !is_on_cooldown("energize")) {
// 				use_skill("energize", partyMember, energizeMPs);
// 				game_log(`Energized ${partyMember.name}`);
// 			}
// 		}
// 	}

// 	if (character.mp > (character.max_mp * manaReserve)) {

// 		//Burst
// 		if (validateOffensiveSkill(target, manaReserve)
// 			&& target.hp >= (character.mp * 0.5)
// 			&& is_in_range(target, "burst")
// 			&& !is_on_cooldown("burst")) {
// 			use_skill("burst");
// 			game_log("Bursting enemy");
// 		}

// 		//Controlled burst
// 		if (character.level >= 75
// 			&& !master
// 			//Only use these skills against weak monsters
// 			&& !requiresMaster.includes(farmMonsterType)
// 			&& !is_on_cooldown("cburst")
// 			&& character.mp > G.skills.cburst.mp) {
// 			let targets = Object.values(parent.entities).filter(entity => entity.mtype === farmMonsterType && entity.level <= 1 && is_in_range(entity, "cburst"));
// 			let targets2 = [];
// 			for (target of targets) {
// 				const manaModifier = target.max_hp * 1.85
// 				const maxTargets = Math.floor(character.mp / manaModifier);
// 				targets2.push([target, manaModifier]);
// 				if (targets2.length === maxTargets) break;
// 			}
// 			if (targets2.length) {
// 				use_skill("cburst", targets2);
// 				game_log("Used controlled Burst");
// 			}
// 		}
// 	}
