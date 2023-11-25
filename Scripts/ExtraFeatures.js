///////////////////////////
/*//// Randomization ////*/
///////////////////////////

function randomGod() {
    const PLAYER = SiteData.ActivePlayerIndex;
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
    for (Item of English.Items) if (Item.Starter) StarterList.push(Item.Name);

    let status = '';
    while (SiteData.ActiveItemIndex < 7) {
       let ChoosenItem = ItemList[Math.floor(Math.random() * (ItemList.length))];
       let ChoosenStarter = StarterList[Math.floor(Math.random() * (StarterList.length))];
       for (Item of English.Items)
        if ((SiteData.ActiveItemIndex != 1 && Item.Name == ChoosenItem) || SiteData.ActiveItemIndex == 1 && Item.Name == ChoosenStarter) 
        { status = appendItem(Item, true); break; } 

       //if (status && !status[1].Filters.includes('Recipe')) status[0] = undefined;
       if (status && status[0] == 'SUCCESS') SiteData.ActiveItemIndex++;
    }
    SiteData.TierFilter = 3;
}