////////////////////////////////
/*//// Main Stat Function ////*/
////////////////////////////////

function updateStats(player) {
    const PLAYER_DATA = SiteData.PlayerData[player - 1];
    if (!PLAYER_DATA.God) return;
    resetStats(PLAYER_DATA);
    calculateBaseStats(PLAYER_DATA);
    clearPassiveText();
    addItemStats(PLAYER_DATA);
    document.querySelector('#PassiveDisplay').innerHTML = '<span>🛈</span>';
    /*
    addGodPassiveStats(side);
    addItemPassiveStats(side);
    addBuffStats(side);
    */
    addNonConquestBalance(PLAYER_DATA);
    calculateBasicAttackDamage(PLAYER_DATA);
    displayStats(PLAYER_DATA);
}

//////////////////////////////
/*//// Stat Subroutines ////*/
//////////////////////////////

function resetStats(player) {
    let PlayerStats = player.Stats;
    for (key of Object.keys(PlayerStats)) PlayerStats[key] = 0;
}

function calculateBaseStats(player) {
    let PlayerStats = player.Stats;
    const GOD_STATS = player.God;
    PlayerStats.Speed += (player.Level <= 7 ? GOD_STATS.Speed * (player.Level - 1 * .03) : GOD_STATS.Speed * .18);
    PlayerStats.AttackSpeed += GOD_STATS.AttackSpeed + (GOD_STATS.AttackSpeedPL * player.Level * GOD_STATS.AttackSpeed);
    PlayerStats.Health += GOD_STATS.Health + (GOD_STATS.HealthPL * player.Level);
    PlayerStats.Mana += GOD_STATS.Mana + (GOD_STATS.ManaPL * player.Level);
    PlayerStats.HP5 += GOD_STATS.HP5 + (GOD_STATS.HP5PL * player.Level);
    PlayerStats.MP5 += GOD_STATS.MP5 + (GOD_STATS.MP5PL * player.Level);
    PlayerStats.PhysicalProtections += GOD_STATS.PhysProt + (GOD_STATS.PhysProtPL * player.Level);
    PlayerStats.MagicalProtections +=  GOD_STATS.MagProt + (GOD_STATS.MagProtPL * player.Level);
    if (GOD_STATS.Name == 'Olorun') PlayerStats.BasicAttackDamage += (GOD_STATS.Power + (GOD_STATS.PowerPL * player.Level)) * .25;
    else if (GOD_STATS.Type == 'Magical') PlayerStats.BasicAttackDamage += (GOD_STATS.Power + (GOD_STATS.PowerPL * player.Level)) * .20;
    else if (GOD_STATS.Name == 'Physical') PlayerStats.BasicAttackDamage += (GOD_STATS.Power + (GOD_STATS.PowerPL * player.Level));
}

function addItemStats(player) {
    let PlayerStats = player.Stats;
    let PlayerItems = player.Items;
    const GOD_TYPE = player.God.Type;
    let Nicknames = SiteData.StatNicknames;

    for (Item of PlayerItems) {
        if (!Item) continue;
        for (ItemStat of Item.Stats) {
            let StatValue = parseInt(ItemStat.Value.replace(/[+%]/g, ''));
            if (Nicknames.Speed.includes(ItemStat.StatName)) PlayerStats.Speed += StatValue;
            if (GOD_TYPE == 'Magical' && Nicknames.MagPower.includes(ItemStat.StatName)) PlayerStats.Power += StatValue;
            if (GOD_TYPE == 'Physical' && Nicknames.PhysPower.includes(ItemStat.StatName)) PlayerStats.Power += StatValue;
            if (Nicknames.Health.includes(ItemStat.StatName)) PlayerStats.Health += StatValue;
            if (Nicknames.Mana.includes(ItemStat.StatName)) PlayerStats.Mana += StatValue;
            if (Nicknames.HP5.includes(ItemStat.StatName)) PlayerStats.HP5 += StatValue;
            if (Nicknames.MP5.includes(ItemStat.StatName)) PlayerStats.MP5 += StatValue;
            if (Nicknames.Lifesteal.includes(ItemStat.StatName)) PlayerStats.Lifesteal += StatValue;
            if (Nicknames.PhysicalProtections.includes(ItemStat.StatName)) PlayerStats.PhysicalProtections += StatValue;
            if (Nicknames.MagicalProtections.includes(ItemStat.StatName)) PlayerStats.MagicalProtections += StatValue;
            if (Nicknames.CCR.includes(ItemStat.StatName)) PlayerStats.CCR += StatValue;
            if (Nicknames.CDR.includes(ItemStat.StatName)) PlayerStats.CDR += StatValue;
            if (Nicknames.Crit.includes(ItemStat.StatName)) PlayerStats.CriticalStrike += StatValue;
            if (ItemStat.Value.includes('%') && Nicknames.Pen.includes(ItemStat.StatName)) PlayerStats.PercentPenetration += StatValue;
            if (!ItemStat.Value.includes('%') && Nicknames.Pen.includes(ItemStat.StatName)) PlayerStats.Penetration += StatValue;
            if (Nicknames.AttackSpeed.includes(ItemStat.StatName)) PlayerStats.AttackSpeed += StatValue;
            if (Nicknames.DamageRed.includes(ItemStat.StatName)) PlayerStats.DamageRed += StatValue;
        }
    }
}

function calculateBasicAttackDamage(player) {
    let PlayerStats = player.Stats;
    const GOD_STATS = player.God;
    if (GOD_STATS.Name == 'Olorun') PlayerStats.BasicAttackDamage += (GOD_STATS.Power + (GOD_STATS.PowerPL * player.Level)) * .25;
    else if (GOD_STATS.Type == 'Magical') PlayerStats.BasicAttackDamage += (GOD_STATS.Power + (GOD_STATS.PowerPL * player.Level)) * .20;
    else if (GOD_STATS.Name == 'Physical') PlayerStats.BasicAttackDamage += (GOD_STATS.Power + (GOD_STATS.PowerPL * player.Level));
}

function addNonConquestBalance(player) {
    if (!SiteData.Options[1]) return;
    const GOD = player.God.Name;
    let PlayerStats = player.Stats;
    switch (GOD) {
        case 'Ah Puch':
            addPassiveText('Non-Conquest Nerf', '-5% Damage to Gods</br>-10% Damage to Minions</br>+5% Non-Ultimate Cooldowns</br>+15% Ultimate Cooldown');
            PlayerStats.Power -= PlayerStats.Power * .05;
            break;   
        case 'Artemis':
            addPassiveText('Non-Conquest Nerf', '-5% Damage to Gods</br>+10% Ultimate Cooldown');
            PlayerStats.Power -= PlayerStats.Power * .05;   
        case 'Zeus':
            addPassiveText('Non-Conquest Nerf', '-10% damage to Gods</br>+5% Non-Ultimate Cooldowns');
            PlayerStats.Power -= PlayerStats.Power * .10;
            break;
        case 'Serqet':
            addPassiveText('Non-Conquest Buff', '-10% Damage Taken</br>+5% Damage to Gods');
            PlayerStats.Power += PlayerStats.Power * .05;
            break;
        case 'Susano':
            addPassiveText('Non-Conquest Nerf', '+5% Longer Non-Ultimate Cooldowns<br>+5% Longer Ultimate Cooldowns<br>-5% God Damage');
            PlayerStats.Power -= PlayerStats.Power * .05;
            break;
        case 'Nu Wa':
            addPassiveText('Non-Conquest Nerf', '-5% Damage Dealt<br>+10% Ultimate Cooldown');
            PlayerStats.Power -= PlayerStats.Power * .05;
            break;
    }
    for (Entries of SiteData.NonConquest) if (Entries.God === GOD) 
        addPassiveText('Non-Conquest ' + Entries.Type, Entries.Effect);
}

function displayStats(player) {
    let PlayerStats = player.Stats;
    let StatDisplays = document.querySelectorAll('#GodStats .stat .stat_amount');
    let StatBars = document.querySelectorAll('#GodStats .stat .stat_bar');
    let StatCaps = document.querySelectorAll('#GodStats .stat .stat_cap');
    let StatIndex = 0;
    for (key of Object.keys(PlayerStats)) {
        let Percent = PlayerStats[key] / StatCaps[StatIndex].innerHTML * 100;
        if (!PlayerStats[key]) Percent = 0;
        StatDisplays[StatIndex].innerHTML = Math.round(PlayerStats[key] * 100) / 100;
        StatBars[StatIndex].style.background = 'linear-gradient(to right, #827751 ' + Percent + '%, #111821 ' + Percent + '%)';
        StatIndex++;
    }
}
