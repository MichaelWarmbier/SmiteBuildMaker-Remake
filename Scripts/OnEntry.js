let LangData = null;

switch (document.lang) {
    default: LangData = English; break;
}

const ARGS = ((window.location.href).split('?'))[1];
if (ARGS && ARGS.length > 2) loadData(ARGS);