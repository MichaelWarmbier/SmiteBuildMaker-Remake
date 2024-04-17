/*/// On Event Functions ///*/

function toggleMenu(targetMenu) {

    if (targetMenu == GlobalOptions) {

        if (!SiteData.GlobalOptionsOpen) {

            GlobalOptions.style.transitionDuration = '.2s';
            setTimeout(() => { GlobalOptions.style.transitionDuration = '0s'; }, 200);
            GlobalOptions.style.top = '13vh';
            SiteData.MenuIsOpen = true;
            SiteData.GlobalOptionsOpen = true;

        } else {
            GlobalOptions.style.transitionDuration = '.2s';
            setTimeout(() => { GlobalOptions.style.transitionDuration = '0s'; }, 200);
            GlobalOptions.style.top = 'calc(-60vh + 13vh)';
            SiteData.MenuIsOpen = false; 
            SiteData.GlobalOptionsOpen = false;

        }
        SiteData.GlobalOptionsOpen = !SiteData.GlobalOptionsOpen;

    } 
    else {

        if (window.getComputedStyle(targetMenu).left == '0px') {

            targetMenu.style.left = '-1000vw';
            SiteData.MenuIsOpen = false;
            SiteData.CurrentMenu = null;
            
        } else if (!SiteData.GlobalOptionsOpen) {
            if (SiteData.CurrentMenu !== null) { 
                console.log('t')
                SiteData.CurrentMenu.style.left = '-1000vw';
            }
            targetMenu.style.left = '0';
            SiteData.MenuIsOpen = true;
            SiteData.CurrentMenu = targetMenu;

        }

    }
    
    SiteData.CurrentMenu = targetMenu;
    printSBM(`Menu Toggled: ${targetMenu.id}`);
}