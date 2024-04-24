/*//// Variables ////*/

let CustomGodFilter = null;
let SelectedGodFilter = null;
let CustomItemFilter = null;
let SelectedItemFilter = null;
let SpecifiedItemTier = '3';
let ActivePlayer = 0;
let ActiveItem = 0;

let GlobalOptionFlags = [0, 0];

const GlyphPairs = [
    ["Bewitched Dagger", "Eldritch Dagger", "Relic Dagger"],
    ["Bancroft's Claw", "Nimble Bancroft's Talon", "Bancroft's Talon"],
    ["Breastplate of Determination", "Breastplate of Vigilance", "Breastplate of Valor"],
    ["Magi's Shelter", "Magi's Revenge", "Magi's Cloak"],
    ["Amulet of Silence", "Amulet of the Stronghold", "Heartward Amulet"],
    ["Calamitous Rod of Tahuti", "Perfected Rod of Tahuti", "Rod of Tahuti"],
    ["Glorious Pridwen", "Reverent Pridwen", "Pridwen"],
    ["Envenomed Executioner", "The Ferocious Executioner", "The Executioner"],
    ["Jotunn's Vigor", "Jotunn's Cunning", "Jotunn's Wrath"],
    ["Malicious Deathbringer", "Devoted Deathbringer", "Deathbringer"],
    ["Flameforged Hammer", "Runebreaking Hammer", "Runeforged Hammer"],
];

/*//// Functions ////*/

function initializeGods() {
    const GodList = document.querySelector('#GodList');
    CustomGodFilter = document.querySelectorAll('#GodMenuLeft Input')[0].value;
    GodList.innerHTML = '';

    const newTrash = document.createElement('div');
    newTrash.classList.add('god_display_elem');
    newTrash.style.backgroundImage = `url("../Assets/Icons/Trash.png")`;
    newTrash.ondblclick = function() { removeGod(); toggleMenu(GodSelectMenu); }
    GodList.appendChild(newTrash);

    for (God of English.Gods) {

        if (SelectedGodFilter != null && God.Role != SelectedGodFilter) continue;
        if (!God.Name.toLowerCase().includes(CustomGodFilter)) continue;
        const newGod = document.createElement('div');
        newGod.classList.add('god_display_elem');
        newGod.style.backgroundImage = `url("${God.Icon}")`
        const thisGod = God;
        newGod.onclick = function() { displayGod(thisGod.Name); }
        newGod.ondblclick = function() { removeGod(); appendGod(thisGod); toggleMenu(GodSelectMenu); }
        GodList.appendChild(newGod);

    }
}

function initializeItems() {
    const ItemList = document.querySelector('#ItemList');
    CustomItemFilter = document.querySelectorAll('#ItemMenuLeft Input')[0].value;
    ItemList.innerHTML = '';

    const newTrash = document.createElement('div');
    newTrash.classList.add('item_display_elem');
    newTrash.style.backgroundImage = `url("../Assets/Icons/Trash.png")`;
    newTrash.ondblclick = function() { removeItem(); toggleMenu(ItemSelectMenu); }
    ItemList.appendChild(newTrash);

    const God = SiteData.PlayerData[ActivePlayer].God;

    for (Item of English.Items) {

        if (SelectedItemFilter == 'Starter' && !Item.Starter) continue;
        if (!Item.Filters.includes(SelectedItemFilter) && SelectedItemFilter != null) continue;
        if (Item.RestrictedRoles.includes(God.Role.toLowerCase())) continue;
        if ((Item.Name.toLowerCase()).includes('acorn') && God.Name != 'Ratatoskr') continue;
        if (Item.DamageType != 'Neutral' && Item.DamageType != God.Type) continue;
        if (SelectedItemFilter != 'Starter' && SpecifiedItemTier && SpecifiedItemTier != Item.Tier) continue;
        if (Item.Tier != SpecifiedItemTier) continue;
        if (!Item.Name.toLowerCase().includes(CustomItemFilter)) continue;

        const newItem = document.createElement('div');
        newItem.classList.add('item_display_elem');
        newItem.style.backgroundImage = `url("${Item.URL}")`
        newItem.deviceName = Item.Name;
        const thisItem = Item;
        newItem.onclick = function() { displayItem(thisItem.Name); }
        newItem.ondblclick = function() { removeItem(); appendItem(thisItem); toggleMenu(ItemSelectMenu); }
        ItemList.appendChild(newItem);

    }
}

function updateLevel() { 
    SiteData.PlayerData[ActivePlayer].Level = document.querySelector('#LevelSlider').value;
    LevelLabel.innerHTML = document.querySelector('#LevelSlider').value;
}

function appendGod(GodObj) { 
    SiteData.PlayerData[ActivePlayer].God = GodObj;
    const PLAYERS = document.querySelectorAll('.god_icon .icon');
    PLAYERS[ActivePlayer].style.backgroundImage = `URL('${GodObj.Icon}')`;
}
function removeGod() { 
    SiteData.PlayerData[ActivePlayer].God = null;
    const PLAYERS = document.querySelectorAll('.god_icon .icon');
    PLAYERS[ActivePlayer].style.backgroundImage = 'URL("../Assets/Icons/Question_Gold.png")';
    for (let itemIndex = 0; itemIndex < 6; itemIndex++) {
        ActiveItem = itemIndex;
        removeItem();
    }
}

function appendItem(itemObj, flag=0) { 

    /* Logic Filters */
    const CURR_ITEMS = SiteData.PlayerData[ActivePlayer].Items;

    // No Duplicates
    if (CURR_ITEMS.includes(itemObj)) 
        { if (!flag) alertUser('Item Already Selected'); return; }
    // No Two Starters
    if (SiteData.PlayerData[ActivePlayer].StarterIndex != -1 && itemObj.Starter) 
        { if (!flag) alertUser('Cannot Select Two Starters'); return; }
    // No Tier III and respective Tier IV
    for (pair of GlyphPairs) for (item of CURR_ITEMS)
        if (item && pair.includes(item.Name) && pair.includes(itemObj.Name)) 
            { if (!flag) alertUser('Cannot Select Tier III and Tier IV'); return; }
    // No Two Acorns
    for (item of CURR_ITEMS) if (item && item.Name.toLowerCase().includes('acorn') && itemObj.Name.toLowerCase().includes('acorn'))
    { if (!flag) alertUser('Cannot Select Two Acorns'); return; }

    if (itemObj.Starter) SiteData.PlayerData[ActivePlayer].StarterIndex = ActiveItem;
    SiteData.PlayerData[ActivePlayer].Items[ActiveItem] = itemObj;
    const ITEMS = document.querySelectorAll('.item');
    ITEMS[ActivePlayer * 6 + ActiveItem].style.backgroundImage = `URL('${itemObj.URL}')`;
}
function removeItem() {
    if (SiteData.PlayerData[ActivePlayer].Items[ActiveItem] && SiteData.PlayerData[ActivePlayer].Items[ActiveItem].Starter) 
        SiteData.PlayerData[ActivePlayer].StarterIndex = -1;
    SiteData.PlayerData[ActivePlayer].Items[ActiveItem] = null;
    const ITEMS = document.querySelectorAll('.item');
    ITEMS[ActivePlayer * 6 + ActiveItem].style.backgroundImage = `URL("../Assets/Icons/Plus_Gold.png")`;
} 

function randomItems() {
    if (SiteData.PlayerData[ActivePlayer].God == null) { alertUser('Please Select a God First'); return; }

    CustomItemFilter = null;
    SelectedItemFilter = 'Starter';
    SpecifiedItemTier = '1';

    const ACORNS = ['Bristlebush Acorn', 'Thistlethorn Acorn', 'Thickbark Acorn', 'Evergreen Acorn'];

    for (let itemIndex = 0; itemIndex < 6; itemIndex++) {

        ActiveItem = itemIndex;
        initializeItems();

        if (itemIndex == 0 && SiteData.PlayerData[ActivePlayer].God.Name == 'Ratatoskr') {
            const RANDOM_ITEM = getItemData(ACORNS[Math.floor(Math.random() * ACORNS.length)]);
            appendItem(RANDOM_ITEM, true);
            SelectedItemFilter = null;
            SpecifiedItemTier = '3';
            continue;
        }
      
        const ITEMS = document.querySelectorAll('.item_display_elem');
        const RANDOM_ITEM = getItemData(ITEMS[Math.floor(Math.random() * ITEMS.length - 1) + 1].deviceName);
        appendItem(RANDOM_ITEM, true);
        SelectedItemFilter = null;
        SpecifiedItemTier = '3';

        if (itemIndex == 5 && SiteData.PlayerData[ActivePlayer].Items.includes(null)) itemIndex = 0;
    }
    toggleMenu(GodOptionsMenu);
}

function randomGod() {
    const RANDOM_GOD = Math.floor(Math.random() * English.Gods.length);
    appendGod(English.Gods[RANDOM_GOD]);
    toggleMenu(GodOptionsMenu);
}

function randomAll() {
    randomGod();
    randomItems();
    toggleMenu(GodOptionsMenu);
}

function generateLink() {
    const REGEX = />([^<]+)/;
    let link = '';

    for (let playerIndex = 0; playerIndex < 10; playerIndex++) {
        if (!SiteData.PlayerData[playerIndex].God) continue;

        else link += playerIndex + 'g=' + SiteData.PlayerData[playerIndex].God.Id + '&';
        link += playerIndex + 'l=' + SiteData.PlayerData[playerIndex].Level + '&';

        for (let itemIndex = 0; itemIndex < 6; itemIndex++) {
            if (!SiteData.PlayerData[playerIndex].Items[itemIndex]) link += playerIndex + 'i' + itemIndex + '=N&';
            else link += playerIndex + 'i' + itemIndex + '=' + SiteData.PlayerData[playerIndex].Items[itemIndex].Id + '&';
        }

        link += playerIndex + 'bfs=';
        if (!SiteData.PlayerData[playerIndex].Buffs.length) link += 'N';
        for (Buffs of SiteData.PlayerData[playerIndex].Buffs) link += REGEX.exec(Buffs)[1] + ',';
        link += '&';

    }
    return link;
}

function generateShareLink() {
    const URL = ((window.location.href).split('?'))[0];
    navigator.clipboard.writeText(`${URL}?${generateLink()}`);
}

function saveData() { setCookie(`save_${SaveNumber}`, generateLink(), 10_000); }

function loadData(data) {
    let dataToLoad = null;
    if (data == null) dataToLoad = getCookie(`save_${SaveNumber}`);
    else              dataToLoad = data;
    const SPLIT_DATA = dataToLoad.split(/[&=]/g);
        
    let parsedData = [[],[]];

    for (let dataIndex = 0; dataIndex < SPLIT_DATA.length; dataIndex++) 
        if (dataIndex % 2 == 0) parsedData[0].push(SPLIT_DATA[dataIndex]);
        else                    parsedData[1].push(SPLIT_DATA[dataIndex]);

    for (let dataIndex = 0; dataIndex < parsedData[0].length; dataIndex++) {

        if (parsedData[0][dataIndex].includes('g')) {
            ActivePlayer = parseInt(parsedData[0][dataIndex][0]);
            appendGod(getGodData(parsedData[1][dataIndex]));
        }
        if (parsedData[0][dataIndex].includes('l')) SiteData.PlayerData[ActivePlayer].Level = parsedData[1][dataIndex];
        if (parsedData[0][dataIndex].includes('i') && !parsedData[1][dataIndex].includes('N')) {
            ActiveItem = parseInt(parsedData[0][dataIndex][2]);
            appendItem(getItemData(parsedData[1][dataIndex]));
        }
    }

}