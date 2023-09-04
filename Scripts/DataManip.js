/*//// Initialization Functions ////*/

function initializeGods() {
    const GodMenu = document.querySelector('#GodList');
    for (God of English.Gods) {
        const newGod = document.createElement('div');
        newGod.classList.add('god');
        newGod.style.backgroundImage = `url("${God.Icon}")`
        GodMenu.appendChild(newGod);
    }
}