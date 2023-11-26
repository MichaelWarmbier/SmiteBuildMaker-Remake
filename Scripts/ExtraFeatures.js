///////////////////////////
/*//// Randomization ////*/
///////////////////////////

function randomGod() {
    const PLAYER = SiteData.ActivePlayerIndex;
    SiteData.PlayerData[PLAYER - 1].Level = 20;
    LevelSlider.value = SiteData.PlayerData[SiteData.ActivePlayerIndex - 1].Level;
    LevelValue.innerHTML = SiteData.PlayerData[SiteData.ActivePlayerIndex - 1].Level;
    appendGod(English.Gods[Math.floor(Math.random() * (English.Gods.length))]); 
    displayMenu(SiteData.ActiveMenu);
}

function randomItems() {
    const PLAYER = SiteData.ActivePlayerIndex;
    if (!SiteData.PlayerData[PLAYER - 1].God) { print('A God must be selected first', 1); return; }
    SiteData.ActiveItemIndex = 1;
    SiteData.TierFilter = 3;
    SiteData.Filter = '';
    SiteData.SearchQuery = '';
    initializeItems();
    let ItemList = [];
    for (elem of document.querySelectorAll('.item_elem')) ItemList.push(elem.lang);
    ItemList.reverse(); ItemList.pop(); 

    let StarterList = [];
    if (SiteData.PlayerData[PLAYER - 1].God.Name === 'Ratatoskr')
        for (Item of English.Items) if (Item.Ratatoskr) StarterList.push(Item.Name);
    if (SiteData.PlayerData[PLAYER - 1].God.Name !== 'Ratatoskr')
        for (Item of English.Items) if (Item.Starter) StarterList.push(Item.Name);
    console.log(StarterList);

    let status = '';
    while (SiteData.ActiveItemIndex < 7) {
       let ChoosenItem = ItemList[Math.floor(Math.random() * (ItemList.length))];
       let ChoosenStarter = StarterList[Math.floor(Math.random() * (StarterList.length))];
       for (Item of English.Items) {
            if ((SiteData.ActiveItemIndex != 1 && Item.Name == ChoosenItem) || (SiteData.ActiveItemIndex == 1 && Item.Name == ChoosenStarter)) 
            { status = appendItem(Item, true); break; } 
       }

       if (status && status[0] == 'SUCCESS') SiteData.ActiveItemIndex++;
    }
    SiteData.TierFilter = 3;
    displayMenu(SiteData.ActiveMenu);
}

////////////////////////////
/*//// Global Options ////*/
////////////////////////////

function toggleBuildNumbers() {
    const MOBILE = window.matchMedia("(orientation: portrait)").matches;
    const ITEMS = document.querySelectorAll('.item');
    for (let itemIndex = 0; itemIndex < 60; itemIndex++) {
        if (!SiteData.Options[0]) {
            if (itemIndex == 59) SiteData.Options[0] = true;
            ITEMS[itemIndex].innerHTML = (itemIndex % 6) + 1;
            if (!MOBILE) {
                ITEMS[itemIndex].style.fontSize = '1.25vw';
                ITEMS[itemIndex].style.height = '.75vw';
                ITEMS[itemIndex].style.width = '.75vw';
                ITEMS[itemIndex].style.padding = '.75vw 1.5vw 1.5vw .75vw';
            } else {
                ITEMS[itemIndex].style.fontSize = '1.5vw';
                ITEMS[itemIndex].style.height = '3.375vw';
                ITEMS[itemIndex].style.width = '3.375vw';
                ITEMS[itemIndex].style.padding = '1.125vw 4.5vw 4.5vw 1.125vw';
            }
            ITEMS[itemIndex].style.color = 'white';
        } else {
            if (itemIndex == 59) SiteData.Options[0] = false;
            if (ITEMS[itemIndex].style.backgroundImage) ITEMS[itemIndex].innerHTML = '';
            else ITEMS[itemIndex].innerHTML = '+';
            if (!MOBILE) {
                ITEMS[itemIndex].style.fontSize = '3.5vw';
                ITEMS[itemIndex].style.height = '3vw';
                ITEMS[itemIndex].style.width = '3vw';
            } else {
                ITEMS[itemIndex].style.fontSize = '5vw';
                ITEMS[itemIndex].style.height = '9vw';
                ITEMS[itemIndex].style.width = '9vw';

            }
            ITEMS[itemIndex].style.padding = '0';
            ITEMS[itemIndex].style.color = 'var(--BrightGold)';
        }
    }
    toggleGOption(0);
    print('Toggled Build Numbers');
}

///////////////////////////////
/*//// Save/Share System ////*/
///////////////////////////////

function setCookie(name, value ,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    return (document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '')
}

function generateLink() {
    const REGEX = />([^<]+)/;
    let link = '';
    for (let playerIndex = 0; playerIndex < 10; playerIndex++) {
        if (!SiteData.PlayerData[playerIndex].God) link +=  playerIndex + 'g=N&';
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
    link += 'bn=' + SiteData.Options[0];
    return link;
}

function saveData() {
    const DUE = 10_000;
    const cookieStr = generateLink();
  
    setCookie('save_' + SiteData.SaveNumber, cookieStr, DUE);
    document.querySelector('#SaveButton').innerHTML = '✓';
    setTimeout(function() { document.querySelector('#SaveButton').innerHTML = 'Save to Local Storage'; }, 1500);
    print(`Saved data to file ${SiteData.SaveNumber}`)
  }

  function loadData() {
    // ADD CODE LATER ON LIVE VERSION
    document.querySelector('#LoadButton').innerHTML = '✓';
    setTimeout(function() { document.querySelector('#LoadButton').innerHTML = 'Load Local Save'; }, 1500);
    print(`Loaded file ${SiteData.SaveNumber}`)
}

function generateShareLink() {
    const SITE_URL = 'dummy_websiteDOTcom';
    navigator.clipboard.writeText(SITE_URL + '/?' + generateLink());
    document.querySelector('#ShareButton').innerHTML = '✓ Copied!';
    setTimeout(function() { document.querySelector('#ShareButton').innerHTML = 'Create Share Link'; }, 1500);
    print(`Generated sharable link`)
}

//////////////////////////////
/*//// Passived Related ////*/
//////////////////////////////

let mouseInterval = null;
let xPos = -1;
document.onmousemove = function(event) { xPos = event.pageX; }

function updateHealthMana(elem, event) {
    const BOX = elem.getBoundingClientRect();
    mouseInterval = setInterval(function() {
        const X_OFFSET = xPos - BOX.left;
        let Percent = X_OFFSET / (elem.offsetWidth) * 100;
        if (Percent < 10) Percent = 0;
        if (Percent > 95) Percent = 100;
        if (elem.className === 'health') elem.style.background = 'linear-gradient(to right, #3cb038 ' + Percent + '%, #292929 ' + Percent + '%)';
        else elem.style.background = 'linear-gradient(to right, #4054ad ' + Percent + '%, #292929 ' + Percent + '%)';
        elem.innerHTML = Math.floor(Percent) + '%&nbsp;';
    }, 100);
}

function clearHMUpdate() { 
    const INTERVAL_ID = setInterval(function() {}, 10_000); 
    for (let intervalIndex = 0; intervalIndex <= INTERVAL_ID; intervalIndex++) window.clearInterval(intervalIndex);
}