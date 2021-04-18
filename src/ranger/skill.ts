//TODO Refactor and optimize
// function rangerSkills(target) {

// 	//How much Mana should be kept in reserve
// 	const manaReserve = 0.8;

// 	//Use Ranger Skills
// 	if (character.mp > (character.max_mp * manaReserve)) {

// 		//Multishots (3-Shot and 5-Shot)
// 		//ONLY if there is no master!
// 		if (!master
// 			&& !is_on_cooldown("attack")
// 			//Only use these skills against weak monsters
// 			&& !requiresMaster.includes(farmMonsterType)) {
// 			const targets = Object.values(parent.entities).filter(entity => entity.mtype === farmMonsterType && entity.level <= 1 && is_in_range(entity, "3shot") && is_in_range(entity, "5shot"));
// 			if (character.level >= 75
// 				&& targets.length >= 5
// 				&& character.mp > G.skills["5shot"].mp) {
// 				use_skill("5shot", targets);
// 				game_log("Used 5-Shot");
// 			}
// 			else if (character.level >= 60
// 				&& targets.length >= 3
// 				&& character.mp > G.skills["3shot"].mp) {
// 				use_skill("3shot", targets);
// 				game_log("Used 3-Shot");
// 			}
// 		}

// 		//Piercingshot
// 		if (character.level >= 72
// 			&& validateOffensiveSkill(target, manaReserve)
// 			&& target.armor > 0
// 			&& character.mp > G.skills.piercingshot.mp
// 			&& is_in_range(target, "piercingshot")
// 			&& !is_on_cooldown("piercingshot")) {
// 			use_skill("piercingshot");
// 			game_log("Used Piercingshot");
// 		}
// 		//Hunters Mark
// 		if (validateOffensiveSkill(target, manaReserve)
// 			&& character.mp > G.skills.huntersmark.mp
// 			&& is_in_range(target, "huntersmark")
// 			&& !is_on_cooldown("huntersmark")) {
// 			use_skill("huntersmark");
// 			game_log("Used Hunters Mark");
// 		}
// 		//Supershot
// 		if (validateOffensiveSkill(target, manaReserve)
// 			&& character.mp > G.skills.supershot.mp
// 			&& is_in_range(target, "supershot")
// 			&& !is_on_cooldown("supershot")) {
// 			use_skill("supershot");
// 			game_log("Used Supershot");
// 		}
// 	}
// }
