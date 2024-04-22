function printSBM(text, flag) {
    console.log(`[SmiteBuildMaker] ${text}`);
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) { return (document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '') }
function getGodData(id, o=English) { for (God of o.Gods) if (God.Id == id || God.Name == id) return God; }
function getItemData(id, o=English) { for (Item of o.Items) if (Item.Id == id || Item.Name == id) return Item; }

function getRankTitle(id) {
    if (id <= 0) return 'N/A';
    id--;
    const RANKS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Master', 'Grandmaster'];
    const TIERS = ['V', 'IV', 'III', 'II', 'I'];

    return `${RANKS[Math.floor(id / 5)]} ${TIERS[id % 5]}`;
}

function getRankIcon(id) {
    id--;
    if (id <= 0) id = 1;
    const RANKS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Master', 'Grandmaster'];
    return `../Assets/Icons/${RANKS[Math.floor(id / 5)]}.png`;
}