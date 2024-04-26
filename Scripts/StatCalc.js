let playerData = null;
let godData = null;
let statData = null;
let itemData = null;

function updateStats() {
    playerData = SiteData.PlayerData[ActivePlayer];
    godData = SiteData.PlayerData[ActivePlayer].God;
    statData = SiteData.PlayerData[ActivePlayer].Stats;
    itemData = SiteData.PlayerData[ActivePlayer].Items;

    resetStats();
    calculateBaseStats();
    clearPassives();
    addItemStats();
    addNonConquestBalance();
    addBuffs();
    calculateBasicAttack();
    displayStats();
}

function resetStats() { for (key of Object.keys(playerData.Stats)) playerData.Stats[key] = 0; }

function calculateBaseStats() {
    statData.Speed = godData.Speed + (playerData.Level <= 7 ? godData.Speed * (playerData.Level - 1) * .03 : godData.Speed * .18);
    statData.AttackSpeed = godData.AttackSpeed + (godData.AttackSpeedPerLevel * playerData.Level);
    statData.Health = godData.Health + (godData.HealthPerLevel * playerData.Level);
    statData.Mana = godData.Mana + (godData.ManaPerLevel * playerData.Level);
    statData.HP5 = godData.HealthPerFive + (godData.HP5PerLevel * playerData.Level);
    statData.MP5 = godData.ManaPerFive + (godData.MP5PerLevel * playerData.Level);
    statData.PhysicalProtections = godData.PhysicalProtection + (godData.PhysicalProtectionPerLevel * playerData.Level);
    statData.MagicalProtections =  godData.MagicProtection + (godData.MagicProtectionPerLevel * playerData.Level);
    if (godData.Type.includes('Magical'))   statData.BasicAttackDamage = (godData.MagicalPower + (godData.MagicalPowerPerLevel * playerData.Level)) * (godData.Name == 'Olorun' ? .25 : .20);
    else if (godData.Type.includes('Physical'))  statData.BasicAttackDamage = (godData.PhysicalPower + (godData.PhysicalPowerPerLevel * playerData.Level));
}

function addItemStats() {
    const STAT_NICKS = Object.keys(StatNicknames);

    for (item of itemData) {
        if (!item) continue;
        for (stat of item.ItemDescription.Menuitems) {

            const VALUE = parseInt(stat.Value.replace(/[+%]/g, ''));
            const NAME = stat.Description;

            if (StatNicknames['Speed'].includes(NAME))                              statData.Speed += statData.Speed * (VALUE / 100);
            if (StatNicknames['MagPower'].includes(NAME))                           statData.Power += VALUE;
            if (StatNicknames['PhysPower'].includes(NAME))                          statData.Power += VALUE;
            if (StatNicknames['Health'].includes(NAME))                             statData.Health += VALUE;
            if (StatNicknames['Mana'].includes(NAME))                               statData.Mana += VALUE;
            if (StatNicknames['HP5'].includes(NAME))                                statData.HP5 += VALUE;
            if (StatNicknames['MP5'].includes(NAME))                                statData.MP5 += VALUE;
            if (StatNicknames['Lifesteal'].includes(NAME))                          statData.Lifesteal += VALUE;
            if (StatNicknames['PhysicalProtections'].includes(NAME))                statData.PhysicalProtections += VALUE;
            if (StatNicknames['MagicalProtections'].includes(NAME))                 statData.MagicalProtections += VALUE;
            if (StatNicknames['CCR'].includes(NAME))                                statData.CCR += VALUE;
            if (StatNicknames['CDR'].includes(NAME))                                statData.CDR += VALUE;
            if (StatNicknames['Crit'].includes(NAME))                               statData.CriticalStrike += VALUE;
            if (StatNicknames['AttackSpeed'].includes(NAME))                        statData.AttackSpeed += godData.AttackSpeed * (VALUE / 100);
            if (StatNicknames['DamageRed'].includes(NAME))                          statData.DamageReduction += VALUE;
            if (stat.Value.includes('%') && StatNicknames['Pen'].includes(NAME))    statData.PercentPenetration += VALUE;
            if (!stat.Value.includes('%') && StatNicknames['Pen'].includes(NAME))   statData.Penetration += VALUE;

        }
    }
}

// Add Item Passives
// Add God Passives

function addNonConquestBalance() {
    if (!NonConquest) return;
    if (godData.Name == 'Ah Puch') {
        addPassive('[Non-Conquest Nerf]: -5% Damage to Gods, -10% Damage to Minions, +5% Non-Ultimate Cooldowns, +15% Ultimate Cooldown' );
        statData.Power -= statData.Power * .05;
    } if (godData.Name == 'Artemis') {
        addPassive('[Non-Conquest Nerf]: -5% Damage to Gods, +10% Ultimate Cooldown');
        statData.Power -= statData.Power * .05;  
    } if (godData.Name == 'Zeus') {
        addPassive('[Non-Conquest Nerf]: -10% Damage to Gods, +5% Ultimate Cooldown');
        statData.Power -= statData.Power * .10;
    } if (godData.Name == 'Serqet') {
        addPassive('[Non-Conquest Buff]: +5% Damage to Gods, -10% Damage Taken');
        statData.Power += statData.Power * .05;
    } if (godData.Name == 'Susanoo') {
        addPassive('[Non-Conquest Nerf]: +-5% Damage to Gods, +5% Cooldowns');
        statData.Power -= statData.Power * .05;
    } if (godData.Name == 'Nu Wa') {
        addPassive('[Non-Conquest Nerf]: +-5% Damage dealt, +10% Ultimate Cooldown');
        statData.Power -= statData.Power * .05;
    } 
}

function addBuffs() {
    const BUFFS = SiteData.PlayerData[ActivePlayer].Buffs;
    if (BUFFS.includes('Health Buff')) {
        addPassive('[Health Buff]: +100 Health, +100 Mana, +30 Health/Mana per 50 Protections, +10 HP5, +10 MP5');
        statData.Health += 100 + 30 * (Math.floor((statData.MagicalProtections + statData.PhysicalProtections) / 50));
        statData.Mana += 100 + 30 * (Math.floor((statData.MagicalProtections + statData.PhysicalProtections) / 50));
        statData.HP5 += 10;
        statData.MP5 += 10;
    } if (BUFFS.includes('Mana Buff')) {
        addPassive('[Mana Buff]: +20 MP5');
        statData.MP5 += 20;
    } if (BUFFS.includes('Attack Speed Buff')) {
        addPassive('[Attack Speed Buff]: +15% Attack Speed');
        statData.AttackSpeed += statData.AttackSpeed * .15;
    } if (BUFFS.includes('Speed Buff')) {
        addPassive('[Speed Buff]: +10% Movement Speed');
        statData.Speed += statData.Speed * .10;
    } if (BUFFS.includes('Void Buff')) {
        addPassive('[Void Buff]: +10% Attack Speed, +10 Magical Basic Attack, +12 Physical Basic Attack');
        if (godData.Type.includes('Magical')) statData.BasicAttackDamage += 10;
        if (godData.Type.includes('Physical')) statData.BasicAttackDamage += 12;
    } if (BUFFS.includes('Power Buff')) {
        addPassive('[Power Buff]: +10% Power, +10 Magical Power, +5 Physical Power');
        statData.Power += statData.Power * .10;
        if (godData.Type.includes('Magical')) statData.Power += 10;
        if (godData.Type.includes('Physical')) statData.Power += 5;
    } if (BUFFS.includes('Silver Buff')) {
        addPassive('[Silver Buff]: +5% CDR x .75 Per Level');
        statData.CDR += 5 + .75 * (playerData.Level);
    } if (BUFFS.includes('Gold Buff')) {
        addPassive('[Gold Buff]: +5 Physical Protections Per Level, +5 Magical Protections Per Level');
        statData.PhysicalProtections += 5 * playerData.Level;
        statData.MagicalProtections += 5 * playerData.Level;
    } if (BUFFS.includes('Fire Giant')) {
        addPassive('[Fire Giant]: +75 Magical Power, +55 Physical Power, +3% HP5, +2% MP5');
        if (godData.Type.includes('Magical')) statData.Power += 75;
        if (godData.Type.includes('Physical')) statData.Power += 55;
        statData.HP5 += statData.Health * .03;
        statData.MP5 += statData.Mana * .02;
    } if (BUFFS.includes('E. Fire Giant')) {
        addPassive('[E. Fire Giant]: +100 Magical Power, +65 Physical Power, +3% HP5, +2% MP5');
        if (godData.Type.includes('Magical')) statData.Power += 100;
        if (godData.Type.includes('Physical')) statData.Power += 65;
        statData.HP5 += statData.Health * .03;
        statData.MP5 += statData.Mana * .02;
    } if (BUFFS.includes('Joust Buff')) {
        addPassive('[Joust Buff]: +4% HP5, +2% MP5');
        statData.HP5 += statData.Health * .04;
        statData.MP5 += statData.Mana * .02;
    } if (BUFFS.includes('Slash Buff')) {
        addPassive('[Slash Buff]: +50 Magical Power, +30 Physical Power, +4% HP5, +2% MP5');
        if (godData.Type.includes('Magical')) statData.Power += 50;
        if (godData.Type.includes('Physical')) statData.Power += 30;
        statData.HP5 += statData.Health * .04;
        statData.MP5 += statData.Mana * .02;
    } if (BUFFS.includes('Power Potion')) {
        addPassive('[Power Potion]: +70 Magical Power, +40 Physical Power, +10 Penetration');
        if (godData.Type.includes('Magical')) statData.Power += 70;
        if (godData.Type.includes('Physical')) statData.Power += 40;
        statData.Penetration += 10;
    } if (BUFFS.includes('Defense Elixir')) {
        addPassive('[Defense Elixir]: +50 Magical Protections, +50 Physical Protections, +10% Damage Mitigation, +20% CCR');
        statData.MagicalProtections += 50;
        statData.PhysicalProtections += 50;
        statData.DamageReduction += 10;
        statData.CCR += 20;
    } if (BUFFS.includes('Power Elixir')) {
        addPassive('[Power Elixir]: +25% Power, +10% Penetration');
        statData.Power += statData.Power * .25;
        statData.PercentPenetration += 10;
    } 
}

function calculateBasicAttack(player) {
    if (godData.Type.includes('Magical') == 'Magical')          statData.BasicAttackDamage += (statData.Power + godData.MagicalPower + (godData.MagicalPowerPerLevel * playerData.Level)) * (godData.Name == 'Olorun' ? .25 : .20);
    else if (godData.Type.includes('Physical') == 'Physical')   statData.BasicAttackDamage += (statData.Power + godData.PhysicalPower + (godData.PhysicalPowerPerLevel * playerData.Level));
}

function displayStats() {
    const STATS = document.querySelectorAll('.stat');
    const STAT_AMOUNTS = document.querySelectorAll('.stat_amount');
    const STAT_CAPS = document.querySelectorAll('.stat_cap');
    const STAT_NAMES = Object.keys(statData);
    const STAT_BARS = document.querySelectorAll('.stat_bar');

    for (let statIndex = 0; statIndex < STATS.length; statIndex++) {
        const hasPercent = STAT_CAPS[statIndex].innerHTML.includes('%');
        const CAP = STAT_CAPS[statIndex].innerHTML.replace('%', '');
        let amount = statData[STAT_NAMES[statIndex]].toFixed(2);
        const PERCENT = amount / CAP * 100
        if (amount > parseInt(CAP)) amount = CAP;

        console.log(PERCENT);

        STAT_AMOUNTS[statIndex].innerHTML = amount + (hasPercent ? '%' : '');
        if (!PERCENT) STAT_BARS[statIndex].style.backgroundColor = 'var(--InternalBlue)';
        else STAT_BARS[statIndex].style.background = 'linear-gradient(to right, var(--DarkGold) ' + PERCENT + '%, var(--InternalBlue) ' + PERCENT + '%)';
    }
}