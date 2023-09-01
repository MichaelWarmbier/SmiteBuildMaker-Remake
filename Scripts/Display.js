function DisplayGlobalOptions() {
    let target = document.querySelector('#GlobalOptions');
    let targetHeight = target.offsetHeight;

    if (SiteData.Flags.GlobalOptionsOpen) {
        target.style.top = '-46vh';
        SiteData.Flags.GlobalOptionsOpen = false;
    }
    else {
        target.style.top = '15vh';
        SiteData.Flags.GlobalOptionsOpen = true;
    }
}