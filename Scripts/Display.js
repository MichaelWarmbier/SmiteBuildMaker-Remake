/*//// Data ////*/

const MenuFlags = SiteData.Flags
let touchValue = 0;

const AboutMenu = document.querySelector('#AboutMenu');
const NewsMenu = document.querySelector('#NewsMenu');
const AlertMenu = document.querySelector('#AlertMenu');
const InfoMenu = document.querySelector('#InfoMenu');
const OptionsMenu = document.querySelector('#OptionsMenu');
const GodFilters = document.querySelector('#GodFilters');
const GodSearch = document.querySelector('#GodSearch Input');
const ItemSearch = document.querySelector('#ItemSearch Input');
const Warning = document.querySelector('#Warning');
const SwipeNotif = document.querySelector('#SwipeNotif');
const GlobalOptions = document.querySelector('#GlobalOptions');
const Backdrop = document.querySelector('#MenuBackdrop');

/*//// Utility ////*/

function createTextEvent(item, text) {
    Info = document.querySelector('#ExtraInfo');
    item.addEventListener('mouseover', function() {
        Info.innerHTML = '<span>🛈</span>' + text;
        Info.style.opacity = '1';
    })
    item.addEventListener('mouseout', function() { Info.style.opacity = '0'; })
}

function print(str, warn) { 
    if (warn) {
        console.log('[SmiteBuildMaker] [WARNING] ' + str);
        Warning.innerHTML = str;
        Warning.style.opacity = 1;
        setTimeout(function() { Warning.style.opacity = 0; }, 1000)

    } else { console.log('[SmiteBuildMaker] ' + str); }
}

/*//// Display Initialize ////*/

window.onload = function() {
    TerminalInput.value = '';

    // Reset Scroll and Initial Values 
    InfoMenu.scrollTop = 0;
    OptionsMenu.scrollTop = 0;
    GodFilters.scrollTop = 0;


    GodSearch.value = '';
    document.querySelector('#GodMenu select').value = 'Role';

    // Initialize Touch Controls
    document.addEventListener('touchstart', function(event) { event.preventDefault();touchValue = event.touches[0].clientX; })
    document.addEventListener('touchmove', function(event) {
        event.preventDefault();
        const dir = event.touches[0].clientX - touchValue;
        if (!touchValue) return;

        let left = document.querySelector('#Chaos');
        let right = document.querySelector('#Order');
        if (dir < 0) { 
            if (!MenuFlags.MenuOpen) { left.style.left = '-105%'; right.style.left = '1%'; }
            if (SiteData.ActiveMenu == InfoMenu) {
                document.querySelector('#GodInfo').style.left = '-300vw';
                document.querySelector('#GodCard').style.left = '-300vw';
                document.querySelector('#InfoMenu .item_cont').style.left = '-300vw';
                document.querySelector('#GodStats').style.left = '0vw';
                InfoMenu.scrollTop = 0;
            }
        } if (dir > 0) { 
            if (!MenuFlags.MenuOpen) { left.style.left = '0'; right.style.left = '105%'; }
            if (SiteData.ActiveMenu == InfoMenu) {
                document.querySelector('#GodInfo').style.left = '0vw';
                document.querySelector('#GodCard').style.left = '0vw';
                document.querySelector('#InfoMenu .item_cont').style.left = '0vw';
                document.querySelector('#GodStats').style.left = '300vw';
            }
        }

    })

    // Play Swipe Animation
    SwipeNotif.style.opacity = 1;
    setTimeout(function() { SwipeNotif.style.opacity = 0; }, 1000)

    // Initialize About Menu
    for (item of AboutContent) {
        const newTitle = document.createElement('span');
        newTitle.classList.add('title');
        newTitle.innerHTML = item.Title;
        AboutMenu.append(newTitle);
        const newContent = document.createElement('span');
        newContent.classList.add('content');
        newContent.innerHTML = item.Content;
        AboutMenu.append(newContent);
    }

    // Initialize News Menu
    for (item of NewsContent) {
        const newTitle = document.createElement('span');
        newTitle.classList.add('title');
        newTitle.innerHTML = item.Title;
        NewsMenu.append(newTitle);
        const newContent = document.createElement('span');
        newContent.classList.add('content');
        newContent.innerHTML = item.Content;
        NewsMenu.append(newContent);
    }

    // Initialize Alert Menu
    const newAlert = document.createElement('span');
    newAlert.classList.add('content');
    if (SiteData.SiteAlert) newAlert.innerHTML = SiteData.SiteAlert;
    else newAlert.innerHTML = "No Current Site Announcements"
    AlertMenu.append(newAlert);

    // Initialize all Event Listeners
    document.querySelectorAll('.item').forEach((i) => { createTextEvent(i, 'Select an Item'); })
    document.querySelectorAll('.icon').forEach((i) => { createTextEvent(i, 'Select a Character'); })
    document.querySelectorAll('.information').forEach((i) => { createTextEvent(i, 'View Character Information'); })
    document.querySelectorAll('.preferences').forEach((i) => { createTextEvent(i, 'Modify Character Preferences'); })
    document.querySelectorAll('.tab').forEach((i) => { createTextEvent(i, 'Modify Global Preferences'); })
    createTextEvent(document.querySelector('#About'), 'Learn More About SmiteBuildMaker');
    createTextEvent(document.querySelector('#News'), 'View Recent SmiteBuildMaker News');
    createTextEvent(document.querySelector('#Alert'), 'View SmiteBuildMaker Announcements');
    createTextEvent(document.querySelector('#File'), 'Load Local Save Data');
    createTextEvent(document.querySelector('#Lang'), 'Select Site Language');
    print('Finished Initializing Site Display');
}

/*//// Event Triggered Functions ////*/

function toggleGlobalOptions() {

    if (MenuFlags.GlobalOptionsOpen ) {
        print('Global Options Menu Opened');
        GlobalOptions.style.top = '-60vh';
        MenuFlags.GlobalOptionsOpen = false;
        MenuFlags.MenuOpen = false;6
    } else if (!MenuFlags.MenuOpen) {
        print('Global Options Menu Closed');
        GlobalOptions.style.top = '45vh';
        MenuFlags.GlobalOptionsOpen = true;
        MenuFlags.MenuOpen = true;
    }
}

function toggleBuildNumbering() {
    let players = document.querySelectorAll('.player');
    let items = document.querySelectorAll('.item');

    for (let player = 0; player < players.length; player++)
        for (let item = 0; item < 6; item++) {
            let curr = (player * 6) + item;
            switch (SiteData.Options[0]) {
                case false:
                    print('Build Numbering ON');
                    items[curr].innerHTML = '<span class="build_num">' + item + '</span>+';
                    items[curr].style.fontSize = '5vh';
                break;
                case true:
                    print('Build Numbering OFF');
                    items[curr].innerHTML = '+';
                    items[curr].style.fontSize = '7vh';
                break;
            }
        }
    toggleGOption(0);
}

function displayMenu(context, override) {

    if (context != GlobalOptions && MenuFlags.GlobalOptionsOpen) return;
    
    if (context == document.querySelector('#OptionsMenu')) {
        document.querySelector('#LevelSlider').value = SiteData.PlayerData[SiteData.ActivePlayerIndex - 1].Level;
        document.querySelector('#LevelValue').innerHTML = SiteData.PlayerData[SiteData.ActivePlayerIndex - 1].Level;
        updateBuffs('or');
    }

    if (context == document.querySelector('#InfoMenu')) { appendInfo(); }

    if (MenuFlags.MenuOpen && !context && override) { displayMenu(SiteData.ActiveMenu, 1); return; }
    if (MenuFlags.MenuOpen && SiteData.ActiveMenu != context && !override) displayMenu(SiteData.ActiveMenu, 1);
    try { clearInterval(AlertInterval); document.querySelector('#Alert').style.color = 'rgb(168, 168, 168)'; } catch(e) { }
    
    if (!MenuFlags.MenuOpen) {
        context.style.left = '0vw';
        Backdrop.style.opacity = 1;
        GlobalOptions.style.opacity = 0;
        Backdrop.style.pointerEvents = "auto";
        SiteData.ActiveMenu = context;
        MenuFlags.MenuOpen = true;
    } else {
        context.style.left = '200vw';
        Backdrop.style.opacity = 0;
        GlobalOptions.style.opacity = 1;
        Backdrop.style.pointerEvents = "none";
        SiteData.ActiveMenu = null;
        MenuFlags.MenuOpen = false;
    }
}

function toggleGOption(option) {
    const optionElem = document.querySelectorAll('.c')[option];
    SiteData.Options[option] = !SiteData.Options[option];
    if (SiteData.Options[option]) optionElem.innerHTML = '✓';
    else optionElem.innerHTML = '';
}

function displayOptions(obj, pIndex, side) {
    print(`Opening Options for Player ${(pIndex)} of ${side}`);
    SiteData.ActivePlayerIndex = pIndex + 5 * (side == 'Order');
    Menu = document.querySelector('#OptionsMenu');
    Title = Menu.getElementsByClassName('header')[0];
    Title.innerHTML = `Modify Player ${pIndex} of ${side}`;
    displayMenu(Menu);
}

function displayInfo(obj, pIndex, side) {
    if (!SiteData.PlayerData[pIndex + 5 * (side == 'Order') - 1].God) { print('A Character Must Be Selected First', 1); return; }
    
    setTimeout(function() { document.querySelector('#SwipeNotif').style.opacity = 1; }, 500)
    setTimeout(function() { document.querySelector('#SwipeNotif').style.opacity = 0; }, 1500)

    print(`Opening Information for Player ${(pIndex)} of ${side}`);
    SiteData.ActivePlayerIndex = pIndex + 5 * (side == 'Order');
    Menu = document.querySelector('#InfoMenu');
    displayMenu(Menu);
}

function updateLevelSlider() { 
    let player = SiteData.ActivePlayerIndex;
    let newLevel = document.querySelector('#LevelSlider').value;
    document.querySelector('#LevelValue').innerHTML = newLevel;
    SiteData.PlayerData[player - 1].Level = newLevel;
    print(`Level set to ${newLevel} for player ${player % 5} on side ${player <= 4 ? 'Chaos':'Order'}`)
 }

function updateBuffs(buffName, type, hex) {
    let buffValue = document.querySelector('#BuffValue');
    let Player = SiteData.PlayerData[SiteData.ActivePlayerIndex - 1];
    let override = buffName == 'or';
    if (!hex) hex = '#FFFFFF';
    
    if (!buffName) {
        Player.Buffs = [];
        Player.BuffTypes = [];
        buffValue.innerHTML = 'No Buff Selected';
        print(`Buffs Cleared For Player ${(SiteData.ActivePlayerIndex - 1)}`);
    } else {
        if (override && !Player.Buffs.length) {
            buffValue.innerHTML = 'No Buff Selected';
            return;
        }

        if (Player.BuffTypes.includes(type)) {
            print(`Cannot Set Buff, But of This Type Already Selected`);
            override = true;
        }

        if (!override) {
            Player.Buffs.push('<span style="color:' + hex + '">' + buffName + '</span>, ');
            Player.BuffTypes.push(type);
            print(`Buff ${buffName} Set For Player ${(SiteData.ActivePlayerIndex - 1)}`);
        }
        buffValue.innerHTML = 'Current Buffs:';
        for (buff of Player.Buffs)
            buffValue.innerHTML += ' ' + buff.replace('_', ' ');
        buffValue.innerHTML = buffValue.innerHTML.slice(0, -2);
    }
}

function openGodMenu(pIndex, side) {
    SiteData.Filter = '';
    SiteData.SearchQuery = '';
    SiteData.ActivePlayerIndex = pIndex + 5 * (side == 'Order');
    if (!SiteData.PlayerData[pIndex].God) displayGod('Zeus');
    initializeGods();
    displayMenu(document.querySelector('#GodMenu'));
}

function openItemMenu(iIndex, pIndex, side) {
    if (!SiteData.PlayerData[pIndex + 5 * (side == 'Order') - 1].God) { print('A Character Must Be Selected First', 1); return; }
    SiteData.Filter = '';
    SiteData.SearchQuery = '';
    SiteData.ActivePlayerIndex = pIndex + 5 * (side == 'Order');
    SiteData.ActiveItemIndex = iIndex;
    if (!SiteData.PlayerData[pIndex].God) displayItem('Breastplate of Valor');
    initializeItems();
    displayMenu(document.querySelector('#ItemMenu'));
}

function updateFilters() {
    const Filter = document.querySelector('#GodFilters select');
    const Names = document.querySelector('#GodFilterNames');

    for (item of SiteData.GodCategories) 
        if (item.Name === Filter.value) {
            Names.innerHTML = '';
            for (subItem of item.Choices) 
                Names.innerHTML += `<button onclick="setFilter('${subItem}');">${subItem}</button>`;
            return;
        }
}

function updateSearch() {
    if (SiteData.ActiveMenu == document.querySelector('#GodMenu'))
        SiteData.SearchQuery = GodSearch.value.toLowerCase();
        if (SiteData.ActiveMenu == document.querySelector('#ItemMenu'))
        SiteData.SearchQuery = ItemSearch.value.toLowerCase();
    initializeGods();
    initializeItems();
}

/*//// Persistent Functions ////*/

const AlertInterval = setInterval(function() {
    if (!SiteData.SiteAlert) clearInterval(AlertInterval);
    else {
        AlertButton = document.querySelector('#Alert');
        AlertColor = window.getComputedStyle(AlertButton).color;
        if (AlertColor == 'rgb(168, 168, 168)') AlertButton.style.color = '#d17524';
        else AlertButton.style.color = 'rgb(168, 168, 168)';
    }
}, 750);