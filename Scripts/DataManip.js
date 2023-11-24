/*//// Initialization Functions ////*/

function initializeGods() {
    const Filter = SiteData.Filter;
    const GodMenu = document.querySelector('#GodList');
    GodMenu.innerHTML = '';
    for (God of English.Gods) {
        if (!God.Name.toLowerCase().includes(SiteData.SearchQuery)) continue;
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

function initializeItems() {
    const PLAYER = SiteData.ActivePlayerIndex;
    const God = SiteData.PlayerData[PLAYER - 1].God;
    const Filter = SiteData.Filter;
    const ItemMenu = document.querySelector('#ItemList');
    ItemMenu.innerHTML = '';
    for (Item of English.Items) {
        if (!Item.Name.toLowerCase().includes(SiteData.SearchQuery)) continue;
        if (!Item.Filters.includes(Filter) && Filter) continue;
        if (Item.RestrictedRoles.includes(God.Role.toLowerCase())) continue;
        if ((Item.Name.toLowerCase()).includes('acorn') && God.Name != 'Ratatoskr') continue;
        if (Item.DamageType != 'Neutral' && Item.DamageType != God.Type) continue;
        if (SiteData.TierFilter && SiteData.TierFilter != Item.Tier) continue;
        const newItem = document.createElement('div');
        newItem.classList.add('item_elem');
        newItem.style.backgroundImage = `url("${Item.URL}")`
        const thisItem = Item;
        newItem.onclick = function() { displayItem(thisItem.Name); }
        newItem.ondblclick = function() { appendItem(thisItem); }
        ItemMenu.appendChild(newItem);
    }
}

/*//// Utility Functions ////*/

function setFilter(name) { 
    SiteData.Filter = name; print(`Set filter to ${name}`);
    initializeGods();
    initializeItems();
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
        break;
    }
}

function appendGod(God) {
    const PLAYER = SiteData.ActivePlayerIndex;
    const GodIcon = document.querySelectorAll('#App .icon')[PLAYER - 1];
    displayMenu(document.querySelector('#GodMenu'));
    GodIcon.innerHTML = '';
    GodIcon.style.backgroundImage = `url(${God.Icon})`;
    SiteData.PlayerData[PLAYER - 1].God = God;
    print(`${God.Name} selected for player ${SiteData.ActivePlayerIndex % 5} of ${SiteData.ActivePlayerIndex < 6 ? 'Chaos' : 'Order'}`)
}

function displayItem(name) {
    for (Item of English.Items) if (Item.Name === name) {
        
        //
        
        break;
    }
}

function appendItem(Item) {
    const PLAYER = SiteData.ActivePlayerIndex;
    const ITEM = SiteData.ActiveItemIndex;
    //const GodIcon = document.querySelectorAll('#App .icon')[player - 1];
    displayMenu(document.querySelector('#ItemMenu'));
    //ItemIcon.innerHTML = '';
    //GodIcon.style.backgroundImage = `url(${God.Icon})`;
    SiteData.PlayerData[PLAYER - 1].Items[ITEM - 1] = Item;
    print(`${Item.Name} selected for player ${SiteData.ActivePlayerIndex % 5} of ${SiteData.ActivePlayerIndex < 6 ? 'Chaos' : 'Order'}`)
}