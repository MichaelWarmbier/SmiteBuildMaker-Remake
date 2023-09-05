/*//// Initialization Functions ////*/

function initializeGods() {
    const Filter = document.querySelectorAll('select')[0].value;
    const GodMenu = document.querySelector('#GodList');
    GodMenu.innerHTML = '';
    for (God of English.Gods) {
        if (God[Filter] != SiteData.Filter && SiteData.Filter) continue;
        const newGod = document.createElement('div');
        newGod.classList.add('god');
        newGod.style.backgroundImage = `url("${God.Icon}")`
        const thisGod = God;
        newGod.onclick = function() { displayGod(thisGod.Name); }
        newGod.ondblclick = function() { appendGod(thisGod); }
        GodMenu.appendChild(newGod);
    }
}

/*//// Utility Functions ////*/

function setFilter(name) { 
    SiteData.Filter = name; print(`Set filter to ${name}`);
    initializeGods();
}

function appendInfo() {
    const player = SiteData.ActivePlayerIndex;
    const God = SiteData.PlayerData[player - 1].God;
    const PantheonData = getPantheon(God.Pantheon);
    document.querySelector('#GodCard').style.backgroundImage = `url("${God.CardArt}")`;
    document.querySelector('#GodName').innerHTML = God.Name;
    document.querySelector('#GodTitle').innerHTML = God.Title;
    document.querySelector('#GodPantheon').innerHTML = `<span style="color:${PantheonData.Color}"><img src="Assets/Icons/${PantheonData.Icon}">${PantheonData.Name}</span>`;
    document.querySelector('#GodLevel').innerHTML = `Level: ${SiteData.PlayerData[player - 1].Level}`;
    if (!SiteData.PlayerData[player - 1].Buffs.length) document.querySelector('#GodBuffs').innerHTML = 'No Buffs Selected';
    else {
        document.querySelector('#GodBuffs').innerHTML = '';
        for (buff of SiteData.PlayerData[player - 1].Buffs)
        document.querySelector('#GodBuffs').innerHTML += buff;
    }
}

function getPantheon(name) { for (item of SiteData.PantheonData) if (item.Name === name) return item; }

/*//// God Functions ////*/

function displayGod(name) {
    for (God of English.Gods) if (God.Name === name) {
        function getPantheon(name) { for (item of SiteData.PantheonData) if (item.Name === name) return item; }
        const PantheonData = getPantheon(God.Pantheon);
        document.querySelectorAll('#GodDetails .title')[0].innerHTML = God.Name;
        document.querySelectorAll('#GodDetails .subtitle')[0].innerHTML = God.Title;
        document.querySelectorAll('#GodDetails .label')[0].innerHTML = `<div class="pantheon_ico"></div><span style="color:${PantheonData.Color}">${PantheonData.Name}</span>`
        document.querySelectorAll('#GodDetails .type')[0].innerHTML = `${God.Type} ${God.Role}`;
        document.querySelectorAll('#GodDetails .ico')[0].style.backgroundImage = `url("${God.Icon}")`;
        document.querySelectorAll('.pantheon_ico')[0].style.backgroundImage = `url("Assets/Icons/${PantheonData.Icon}")`;
        print(`${name} selected for player ${SiteData.ActivePlayerIndex % 5} of ${SiteData.ActivePlayerIndex < 6 ? 'Chaos' : 'Order'}`)
        break;
    }
}

function appendGod(God) {
    const player = SiteData.ActivePlayerIndex;
    const GodIcon = document.querySelectorAll('#App .icon')[player - 1];
    displayMenu(document.querySelector('#GodMenu'));
    GodIcon.innerHTML = '';
    GodIcon.style.backgroundImage = `url(${God.Icon})`;
    SiteData.PlayerData[player - 1].God = God;
}