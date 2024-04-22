/*/// On Event Functions ///*/

function toggleMenu(targetMenu) {

    if (targetMenu == SelectToClose)
        targetMenu = SiteData.CurrentMenu;

    if (targetMenu == GlobalOptions) {

        if (!SiteData.GlobalOptionsOpen) {

            GlobalOptions.style.transitionDuration = '.2s';
            setTimeout(() => { GlobalOptions.style.transitionDuration = '0s'; }, 200);
            GlobalOptions.style.top = '13vh';
            SiteData.MenuIsOpen = true;

        } else {

            GlobalOptions.style.transitionDuration = '.2s';
            setTimeout(() => { GlobalOptions.style.transitionDuration = '0s'; }, 200);
            GlobalOptions.style.top = 'calc(-60vh + 13vh)';
            SiteData.MenuIsOpen = false; 

        }
        SiteData.GlobalOptionsOpen = !SiteData.GlobalOptionsOpen;

    } 
    else {

        if (window.getComputedStyle(targetMenu).left == '0px') {

            targetMenu.style.left = '-1000vw';
            SiteData.MenuIsOpen = false;
            SiteData.CurrentMenu = null;
            SelectToClose.style.opacity = 0;
            SelectToClose.style.pointerEvents = 'none';
            
        } else if (!SiteData.GlobalOptionsOpen) {

            if (SiteData.CurrentMenu !== null)
                SiteData.CurrentMenu.style.left = '-1000vw';

            targetMenu.style.left = '0';
            SiteData.MenuIsOpen = true;
            SiteData.CurrentMenu = targetMenu;
            SelectToClose.style.opacity = 1;
            SelectToClose.style.pointerEvents = 'auto';

        }

    }

    if (targetMenu == GodSelectMenu) initializeGods();
    if (targetMenu == ItemSelectMenu) initializeItems();
    
    SiteData.CurrentMenu = targetMenu;
    printSBM(`Menu Toggled: ${targetMenu.id}`);
}

function displayGod(name) {
    const GOD = getGodData(name);
    document.querySelector('#GodMenuRight #HoveredGodName').innerHTML = GOD.Name;
    document.querySelector('#GodMenuRight #HoveredGodTitle').innerHTML = GOD.Title;
    document.querySelector('#GodMenuRight #HoveredGodIcon').style.backgroundImage = `URL('${GOD.Icon}')`;
    document.querySelector('#GodMenuRight #HoveredGodPantheon').innerHTML = GOD.Pantheon;
    document.querySelector('#GodMenuRight #HoveredGodDamage').innerHTML = GOD.Type;
    document.querySelector('#GodMenuRight #HoveredGodClass').innerHTML = GOD.Role;

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

    switch (GOD.Type) {
        case 'Magical':         document.querySelector('#GodMenuRight #HoveredGodDamage').style.color = '#6169d4'; break;
        case 'Physical':        document.querySelector('#GodMenuRight #HoveredGodDamage').style.color = '#c75d78'; break;
    }

    switch (GOD.Role) {
        case 'Mage':            document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#3b46c4'; break;
        case 'Warrior':         document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#6037b8'; break;
        case 'Assassin':        document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#c9bb38'; break;
        case 'Guardian':        document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#2cb838'; break;
        case 'Hunter':          document.querySelector('#GodMenuRight #HoveredGodClass').style.color = '#ba6529'; break;
    }

}

function displayItem(name) {

    const ITEM = getItemData(name);
    document.querySelector('#ItemMenuRight #HoveredItemName').innerHTML = ITEM.Name;
    document.querySelector('#ItemMenuRight #HoveredItemFullDesc').innerHTML = ITEM.Description;
    document.querySelector('#ItemMenuRight #HoveredItemFullPrice').innerHTML = ITEM.Gold;
    document.querySelector('#ItemMenuRight #HoveredItemSinglePrice').innerHTML = ITEM.SelfGold;
    document.querySelector('#ItemMenuRight #HoveredItemIcon').style.backgroundImage = `URL('${ITEM.URL}')`;

    document.querySelector('#ItemMenuRight #HoveredItemStats').innerHTML = '';
    for (stat of ITEM.Stats) 
        document.querySelector('#ItemMenuRight #HoveredItemStats').innerHTML += `${stat.StatName} ${stat.Value}<br>`;

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