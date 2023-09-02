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

function displayMenu(context, override) {
    if (MenuFlags.MenuOpen && !context && override) { displayMenu(SiteData.ActiveMenu, 1); return; }
    if (MenuFlags.MenuOpen && SiteData.ActiveMenu != context && !override) displayMenu(SiteData.ActiveMenu, 1);
    try { clearInterval(AlertInterval); } catch(e) { }
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