/*//// Event Listener for Search ////*/

let ID = getCookie('ID');
let onDisplayResults = null;

SearchMenu.addEventListener("keydown", function(event) {
    if (event.key !== 'Enter') return;
    const INPUT = document.querySelectorAll('#SearchMenu Input')[0];
    const SECONDS = Date.now();

    if (SiteData.LastLookup !== -1 && SECONDS - SiteData.LastLookup < 10) {  return; }
    SiteData.LastLookup = SECONDS;
    document.querySelector('#SearchResults').innerHTML = '';

    try { generateRecentGames(INPUT.value); }
    catch (e) {  }
    INPUT.value = '';
}, false);

async function generateRecentGames(player) {
    await updateSession();
    let Request, Data = '';
    try { 
        if (!player) { print(SiteLang[26], 1); return; }
        Request = await fetch(`https://server-08-kirbout.replit.app/requestmatchhistory?ID=${ID}&USER=${player}`);
        Data = await Request.json();
        if (Data.ret_msg) throw new Error(Data.ret_msg);
    }
    catch (e) { return; }

    if (!Data || !Data[0].GodId) { return; }
    console.log(Data);
    onDisplayResults = Data;

    for (let recentIndex = 0; recentIndex < 10; recentIndex++) {
        const GAME = document.createElement('div');
        GAME.classList.add('search_result');
        const GOD = getGodData(Data[recentIndex].GodId);
        GAME.innerHTML = `<div class="search_title" ondblclick='appendMatchData(${recentIndex})'>${Data[recentIndex].Match_Time} ${Data[recentIndex].Queue}</div><div class="search_name">${Data[recentIndex].God}</div><div class="search_other">${Data[recentIndex].Kills}/${Data[recentIndex].Deaths}/${Data[recentIndex].Assists}</div><div class="search_status">${Data[recentIndex].Win_Status}</div>`;
        SearchResults.appendChild(GAME);
    }
}

async function updateSession() {
    const STATUS = await checkSessionStatus();
    if (!STATUS) { return; }
    else console.log('Connection estbalished under session ' + ID);
}

async function checkSessionStatus() {
    let Request = await fetch('https://server-08-kirbout.replit.app/requestsession');
    const NEW_SESSION = await Request.text();
    if (NEW_SESSION.includes('Err') || NEW_SESSION.includes('ERR')) return false;
    try { Request = await fetch(`https://server-08-kirbout.replit.app/testsession?ID=${ID}`); }
    catch(e) { console.log(e); return false; }
    let Data = await Request.json(); 
    if (Data.Status !== 'Valid') { ID = NEW_SESSION; setCookie('ID', NEW_SESSION, 1); }
    return true;
}

async function appendMatchData(index) {
    const DATA = onDisplayResults[index];
}

async function appendPlayerData(playerName) {
    
}