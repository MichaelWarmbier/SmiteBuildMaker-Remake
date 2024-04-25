let CurrentMenu = null;
let ItemNumbers = false;
let NonConquest = false;
let SaveNumber = 1;
let GlobalOptionsOpen = false;

/*//// Hover Text Events ////*/

for (elem of document.querySelectorAll('.item')) {
    elem.addEventListener("mouseover", () => { showToolTip('Select an Item')});
    elem.addEventListener("mouseout",  hideToolTip);
}

for (elem of document.querySelectorAll('.god_icon')) {
    elem.addEventListener("mouseover", () => { showToolTip('Select a God')});
    elem.addEventListener("mouseout",  hideToolTip);
}

for (elem of document.querySelectorAll('.god_options')) {
    elem.addEventListener("mouseover", () => { showToolTip('God Options')});
    elem.addEventListener("mouseout",  hideToolTip);
}

for (elem of document.querySelectorAll('.god_info')) {
    elem.addEventListener("mouseover", () => { showToolTip('God Information')});
    elem.addEventListener("mouseout",  hideToolTip);
}

Information.addEventListener("mouseover", () => { showToolTip('Site Information')});
Information.addEventListener("mouseout",  hideToolTip);
News.addEventListener("mouseover", () => { showToolTip('Site News')});
News.addEventListener("mouseout",  hideToolTip);
Files.addEventListener("mouseover", () => { showToolTip('Select a File')});
Files.addEventListener("mouseout",  hideToolTip);
Language.addEventListener("mouseover", () => { showToolTip('Select a Language')});
Language.addEventListener("mouseout",  hideToolTip);
Lookup.addEventListener("mouseover", () => { showToolTip('Lookup Player')});
Lookup.addEventListener("mouseout",  hideToolTip);

document.querySelectorAll('#GlobalOptions .tab')[0].addEventListener("mouseover", () => { showToolTip('Global Site Options')});
document.querySelectorAll('#GlobalOptions .tab')[0].addEventListener("mouseout",  hideToolTip);

/*//// Functions ////*/

function toggleMenu(targetMenu) {

    if (targetMenu == SelectToClose)
        targetMenu = CurrentMenu;

    if (targetMenu == ItemSelectMenu && SiteData.PlayerData[ActivePlayer].God == null) {
        alertUser('Please Select a God First');
        return;
    }


    if (targetMenu == GodInfoMenu || targetMenu == GodOptionsMenu) {

        targetMenu.querySelectorAll('h1')[1].innerHTML = `${ActivePlayer < 5 ? 'Order' : 'Chaos'} - Player ${ActivePlayer % 5 + 1}`;
        
        if (targetMenu == GodInfoMenu && SiteData.PlayerData[ActivePlayer].God == null) {
            alertUser('Please Select a God First');
            return;
        } else if (targetMenu == GodInfoMenu) {

            InfoIcon.style.backgroundImage = `URL('${SiteData.PlayerData[ActivePlayer].God.godIcon_URL}')`;
            InfoName.innerHTML = SiteData.PlayerData[ActivePlayer].God.Name;
            InfoLevel.innerHTML = `Level ${SiteData.PlayerData[ActivePlayer].Level}`;
            // Display Buffs
            const ITEMS = document.querySelectorAll('.info_item');
            const ITEM_PRICES = document.querySelectorAll('.info_item_label');
            const ITEM_DATA = SiteData.PlayerData[ActivePlayer].Items;

            for (let elemIndex = 0; elemIndex < 6; elemIndex++) {
                if (ITEM_DATA[elemIndex] != null) {
                    ITEMS[elemIndex].style.backgroundImage = `URL('${ITEM_DATA[elemIndex].itemIcon_URL}')`;
                    ITEM_PRICES[elemIndex].innerHTML = ITEM_DATA[elemIndex].Price;
                    ITEMS[elemIndex].addEventListener("mouseover", 
                        () => { showToolTip(`${ITEM_DATA[elemIndex].DeviceName}<br>${ITEM_DATA[elemIndex].ItemDescription.SecondaryDescription}`); });
                    ITEMS[elemIndex].addEventListener("mouseout",  hideToolTip);
                } else {
                    ITEMS[elemIndex].style.backgroundImage = '';
                    ITEM_PRICES[elemIndex].innerHTML = '0';
                    ITEMS[elemIndex].addEventListener("mouseover", () => { showToolTip('No Item'); });
                    ITEMS[elemIndex].addEventListener("mouseout",  hideToolTip);
                }
            }
            

            let totalGold = 0;
            for (item of ITEM_DATA) if (item != null) totalGold += item.Price;
            InfoGold.innerHTML = `${totalGold} <img src="../Assets/Icons/Money.png">`;

        }

    }

    if (targetMenu == GlobalOptions) {

        if (!GlobalOptionsOpen) {

            GlobalOptions.style.transitionDuration = '.2s';
            setTimeout(() => { GlobalOptions.style.transitionDuration = '0s'; }, 200);
            GlobalOptions.style.top = '13vh';
            CurrentMenu = targetMenu;

        } else {

            GlobalOptions.style.transitionDuration = '.2s';
            setTimeout(() => { GlobalOptions.style.transitionDuration = '0s'; }, 200);
            GlobalOptions.style.top = 'calc(-60vh + 13vh)';
            CurrentMenu = null;

        }
        GlobalOptionsOpen = !GlobalOptionsOpen;

    } 
    else {

        if (window.getComputedStyle(targetMenu).left == '0px') {

            targetMenu.style.left = '-1000vw';
            CurrentMenu = null;
            SelectToClose.style.opacity = 0;
            SelectToClose.style.pointerEvents = 'none';
            CurrentMenu = null;
            
        } else if (!GlobalOptionsOpen) {

            if (CurrentMenu !== null)
                CurrentMenu.style.left = '-1000vw';

            targetMenu.style.left = '0';
            CurrentMenu = targetMenu;
            SelectToClose.style.opacity = 1;
            SelectToClose.style.pointerEvents = 'auto';
            CurrentMenu = targetMenu;

        }

    }

    if (targetMenu == GodSelectMenu) initializeGods();
    if (targetMenu == ItemSelectMenu) initializeItems();
    
}

function displayGod(name) {
    const GOD = getGodData(name);
    document.querySelector('#GodMenuRight #HoveredGodName').innerHTML = GOD.Name;
    document.querySelector('#GodMenuRight #HoveredGodTitle').innerHTML = GOD.Title;
    document.querySelector('#GodMenuRight #HoveredGodIcon').style.backgroundImage = `URL('${GOD.godIcon_URL}')`;
    document.querySelector('#GodMenuRight #HoveredGodPantheon').innerHTML = GOD.Pantheon;
    document.querySelector('#GodMenuRight #HoveredGodDamage').innerHTML = GOD.Type;
    document.querySelector('#GodMenuRight #HoveredGodClass').innerHTML = GOD.Roles;

    switch (GOD.Pantheon) {
        case 'Arthurian':       document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#a3190f'; break;
        case 'Babylonian':      document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#8fc9eb'; break;
        case 'Celtic':          document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '"#0f7013'; break;
        case 'Chinese':         document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#edea32'; break;
        case 'Egyptian':        document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#a13d12'; break;
        case 'Great Old Ones':  document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#4f0b8a'; break;
        case 'Greek':           document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#6b19b3'; break;
        case 'Hindu':           document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#d911bb'; break;
        case 'Japanese':        document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#e61919'; break;
        case 'Maya':            document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#eda70e'; break;
        case 'Norse':           document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#b3b3b3'; break;
        case 'Polynesian':      document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#ffb74a'; break;
        case 'Roman':           document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#bf7f1d'; break;
        case 'Slavic':          document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#ed9d21'; break;
        case 'Voodoo':          document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#d664ed'; break;
        case 'Yoruba':          document.querySelector('#GodMenuRight #HoveredGodPantheon').style.color = '#799e0b'; break;
    }

    switch (GOD.Type.includes('Magical')) {
        case true:         document.querySelector('#GodMenuRight #HoveredGodDamage').style.color = '#6169d4'; break;
        case false:        document.querySelector('#GodMenuRight #HoveredGodDamage').style.color = '#c75d78'; break;
    }

    switch (GOD.Roles) {
        case 'Mage':            document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#3b46c4'; break;
        case 'Warrior':         document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#6037b8'; break;
        case 'Assassin':        document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#c9bb38'; break;
        case 'Guardian':        document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#2cb838'; break;
        case 'Hunter':          document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#ba6529'; break;
    }

}

function displayItem(name) {

    const ITEM = getItemData(name);
    document.querySelector('#ItemMenuRight #HoveredItemName').innerHTML = ITEM.DeviceName;
    document.querySelector('#ItemMenuRight #HoveredItemFullDesc').innerHTML = ITEM.ItemDescription.SecondaryDescription;
    document.querySelector('#ItemMenuRight #HoveredItemFullPrice').innerHTML = ITEM.Gold;
    

    let childItem = ITEM; let fullPrice = 0;
    for (let limitIndex = 0; limitIndex < 4; limitIndex++) {
        fullPrice += childItem.Price;
        if (childItem.ChildItemId == 0 || childItem.ChildItemId == null || !childItem.ChildItemId) break;
        childItem = getItemData(childItem.ChildItemId);      
    }

    document.querySelector('#ItemMenuRight #HoveredItemSinglePrice').innerHTML = ITEM.fullPrice;
    document.querySelector('#ItemMenuRight #HoveredItemIcon').style.backgroundImage = `URL('${ITEM.itemIcon_URL}')`;

    document.querySelector('#ItemMenuRight #HoveredItemStats').innerHTML = '';
    for (stat of ITEM.ItemDescription.Menuitems) 
        document.querySelector('#ItemMenuRight #HoveredItemStats').innerHTML += `${stat.Description} ${stat.Value}<br>`;

}

function toggleSearchMenu(index) {

    let NavElems = document.querySelectorAll('.search_nav_elem');
    let Menus = document.querySelectorAll('.search_display_menu');
    for (let navIndex = 0; navIndex < NavElems.length; navIndex++) {

        if (index == navIndex) {
            NavElems[navIndex].style.color = 'var(--BrightGold)';
            if (navIndex < 2) Menus[navIndex].style.display = 'block';
            else               Menus[navIndex].style.display = 'flex';
        } else  {
            NavElems[navIndex].style.color = 'var(--DarkGold)';
            Menus[navIndex].style.display = 'none';
        }

    }

}

function toggleGlobalOptions(index) {
    const OPTIONS = document.querySelectorAll('#GlobalOptions .option');
    const CHECKS = document.querySelectorAll('#GlobalOptions .check');

    if (index <= 2) {
        if (!GlobalOptionFlags[index]) CHECKS[index].style.backgroundImage = 'URL("../Assets/Icons/Check.png")';
        else                           CHECKS[index].style.backgroundImage = '';
        GlobalOptionFlags[index] = !GlobalOptionFlags[index];

        if (index == 0) toggleItemNumbers();
        if (index == 1) NonConquest = !NonConquest;
    }
}

function adjustMenu(dir) {

    let tempIndex = ActivePlayer + dir;

    if (CurrentMenu == GodOptionsMenu) {
    
        if (tempIndex < 0) tempIndex = 9;
        if (tempIndex > 9) tempIndex = 0;

        ActivePlayer = tempIndex;
        toggleMenu(GodOptionsMenu);
        setTimeout(() => { toggleMenu(GodOptionsMenu); }, 200);

    } else if (CurrentMenu == GodInfoMenu) {
        
        for (let menuIndex = 0; menuIndex < 15; menuIndex++) {
            if (SiteData.PlayerData[tempIndex].God != null) { break; } 
            else { tempIndex += dir; }
            if (tempIndex < 0) tempIndex = 9;
            if (tempIndex > 9) tempIndex = 0;
            if (menuIndex == 14) tempIndex = ActivePlayer + dir;
        }

        ActivePlayer = tempIndex;
        toggleMenu(GodInfoMenu);
        setTimeout(() => { toggleMenu(GodInfoMenu); }, 200);

    }

}

function toggleItemNumbers() {

    
    for (elem of document.querySelectorAll('.player')) {
        const ITEMS = elem.querySelectorAll('.item');
        for (let itemIndex = 0; itemIndex < 6; itemIndex++) {
            if (!ItemNumbers) ITEMS[itemIndex].style.backgroundImage = `URL('../Assets/Icons/${itemIndex + 1}.png')`;
            else              ITEMS[itemIndex].style.backgroundImage = 'URL("../Assets/Icons/Plus_Gold.png")';
        }
    }
    
    ItemNumbers = !ItemNumbers;
}

function focusSelf(className, obj) {
    const FAMILY = document.querySelectorAll(className);

    for (child of FAMILY) 
        if (child != obj) child.style.backgroundColor = 'var(--InternalBlue)';
        else              child.style.backgroundColor = 'var(--LightGrayBlue)';
}

function showToolTip(msg) { ToolTip.style.opacity = '1'; ToolTip.innerHTML = msg; }
function hideToolTip() { ToolTip.style.opacity = '0'; }

