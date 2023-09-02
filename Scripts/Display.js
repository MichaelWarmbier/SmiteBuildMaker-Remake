/*//// Data ////*/
const MenuFlags = SiteData.Flags

/*//// Display Initialize ////*/

window.onload = function() {
    const AboutMenu = document.querySelector('#AboutMenu');
    const NewsMenu = document.querySelector('#NewsMenu');
    const AlertMenu = document.querySelector('#AlertMenu');

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

}

/*//// Event Triggered Functions ////*/

function toggleGlobalOptions() {
    const target = document.querySelector('#GlobalOptions');

    if (MenuFlags.GlobalOptionsOpen ) {
        target.style.top = '-46vh';
        SiteData.Flags.GlobalOptionsOpen = false;
        MenuFlags.MenuOpen = false;6
    } else if (!MenuFlags.MenuOpen) {
        target.style.top = '15vh';
        SiteData.Flags.GlobalOptionsOpen = true;
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
                    items[curr].innerHTML = '<span class="build_num">' + item + '</span>+';
                    items[curr].style.fontSize = '5vh';
                break;
                case true:
                    items[curr].innerHTML = '+';
                    items[curr].style.fontSize = '7vh';
                break;
            }
        }
    toggleGOption(0);
}

function displayMenu(context, override) {
    document.querySelector('#LevelSlider').value = SiteData.PlayerData[SiteData.ActivePlayerIndex - 1].Level;
    document.querySelector('#LevelValue').innerHTML = SiteData.PlayerData[SiteData.ActivePlayerIndex - 1].Level;
    updateBuffs('or');
    if (MenuFlags.MenuOpen && !context && override) { displayMenu(SiteData.ActiveMenu, 1); return; }
    if (MenuFlags.MenuOpen && SiteData.ActiveMenu != context && !override) displayMenu(SiteData.ActiveMenu, 1);
    try { clearInterval(AlertInterval); document.querySelector('#Alert').style.color = 'rgb(168, 168, 168)'; } catch(e) { }
    let backdrop = document.querySelector('#MenuBackdrop');
    if (!MenuFlags.MenuOpen) {
        context.style.left = '0vw';
        backdrop.style.opacity = 100;
        backdrop.style.pointerEvents = "auto";
        SiteData.ActiveMenu = context;
        MenuFlags.MenuOpen = true;
    } else {
        context.style.left = '200vw';
        backdrop.style.opacity = 0;
        backdrop.style.pointerEvents = "none";
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
    SiteData.ActivePlayerIndex = pIndex + 5 * (side == 'Order');
    Menu = document.querySelector('#OptionsMenu');
    Title = Menu.getElementsByClassName('header')[0];
    Title.innerHTML = `Modify player ${pIndex} of ${side}`;
    displayMenu(Menu);
}

function displayInfo (obj, pIndex, side) {
    SiteData.ActivePlayerIndex = pIndex + 5 * (side == 'Order');
    Menu = document.querySelector('#InfoMenu');
    displayMenu(Menu);
}

function updateLevelSlider() { 
    let newLevel = document.querySelector('#LevelSlider').value;
    document.querySelector('#LevelValue').innerHTML = newLevel;
    SiteData.PlayerData[SiteData.ActivePlayerIndex - 1].Level = newLevel;
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
    } else {
        if (override && !Player.Buffs.length) {
            buffValue.innerHTML = 'No Buff Selected';
            return;
        }

        if (Player.BuffTypes.includes(type)) override = true;

        if (!override) {
            Player.Buffs.push('<span style="color:' + hex + '">' + buffName + '</span>, ');
            Player.BuffTypes.push(type);
        }
        buffValue.innerHTML = 'Current Buffs:';
        for (buff of Player.Buffs)
            buffValue.innerHTML += ' ' + buff.replace('_', ' ');
        buffValue.innerHTML = buffValue.innerHTML.slice(0, -2);
    }
}

/*//// Persistant Functions ////*/

const AlertInterval = setInterval(function() {
    if (!SiteData.SiteAlert) clearInterval(AlertInterval);
    else {
        AlertButton = document.querySelector('#Alert');
        AlertColor = window.getComputedStyle(AlertButton).color;
        if (AlertColor == 'rgb(168, 168, 168)') AlertButton.style.color = '#d17524';
        else AlertButton.style.color = 'rgb(168, 168, 168)';
    }
}, 750);