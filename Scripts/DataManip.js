/*//// Variables ////*/

let CustomGodFilter = null;
let SelectedGodFilter = null;
let CustomItemFilter = null;
let SelectedItemFilter = null;
let SpecifiedItemTier = '3';
let ActivePlayer = 0;


function initializeGods() {
    const GodList = document.querySelector('#GodList');
    CustomGodFilter = document.querySelectorAll('#GodMenuLeft Input')[0].value;
    GodList.innerHTML = '';

    const newTrash = document.createElement('div');
    newTrash.classList.add('god_display_elem');
    newTrash.style.backgroundImage = `url("../Assets/Icons/Trash.png")`;
    // newTrash.ondblclick = function() { removeGod(); toggleMenu(GodList); }
    GodList.appendChild(newTrash);

    for (God of English.Gods) {

        if (SelectedGodFilter != null && God.Role != SelectedGodFilter) continue;
        if (!God.Name.toLowerCase().includes(CustomGodFilter)) continue;
        const newGod = document.createElement('div');
        newGod.classList.add('god_display_elem');
        newGod.style.backgroundImage = `url("${God.Icon}")`
        const thisGod = God;
        newGod.onclick = function() { displayGod(thisGod.Name); }
        newGod.ondblclick = function() { removeGod(); appendGod(thisGod); toggleMenu() }
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
    // newTrash.ondblclick = function() { removeItem(); toggleMenu(ItemList); }
    ItemList.appendChild(newTrash);

    const God = SiteData.Player[ActivePlayer];

    for (Item of English.Items) {

        if (SelectedItemFilter == 'Starter' && !Item.Starter) continue;
        if (!Item.Filters.includes(SelectedItemFilter) && SelectedItemFilter != null) continue;
        if (Item.RestrictedRoles.includes(God.Role.toLowerCase())) continue;
        if ((Item.Name.toLowerCase()).includes('acorn') && God.Name != 'Ratatoskr') continue;
        if (Item.DamageType != 'Neutral' && Item.DamageType != God.Type) continue;
        if (Filter != 'Starter' && SpecifiedItemTier && SpecifiedItemTier != Item.Tier) continue;

        if (Item.Tier != SpecifiedItemTier) continue;
        if (!Item.Name.toLowerCase().includes(CustomItemFilter)) continue;
        const newItem = document.createElement('div');
        newItem.classList.add('item_display_elem');
        newItem.style.backgroundImage = `url("${Item.URL}")`
        const thisItem = Item;
        newItem.onclick = function() { displayItem(thisItem.Name); }
        //newItem.ondblclick = function() { removeItem(); appendItem(thisItem); }
        ItemList.appendChild(newItem);

    }
}

function appendGod(GodObj) { 
    SiteData.PlayerData[ActivePlayer].God = GodObj;
}
function removeGod() { SiteData.PlayerData[ActivePlayer].God = null; }

function appendItem() { }
function removeItem() { } 