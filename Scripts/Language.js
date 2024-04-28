let langText = null;
let langRef = English;
const LANG = document.querySelector('html').lang;
const QUERY = new URLSearchParams(window.location.search);

function saveData() { setCookie(`save_${SaveNumber}`, generateLink(), 10_000); }

function loadData(data) {
    let dataToLoad = null;
    if (data == null) dataToLoad = getCookie(`save_${SaveNumber}`);
    else              dataToLoad = data;
    const SPLIT_DATA = dataToLoad.split(/[&=]/g);
        
    let parsedData = [[],[]];

    for (let dataIndex = 0; dataIndex < SPLIT_DATA.length; dataIndex++) 
        if (dataIndex % 2 == 0) parsedData[0].push(SPLIT_DATA[dataIndex]);
        else                    parsedData[1].push(SPLIT_DATA[dataIndex]);

    for (let dataIndex = 0; dataIndex < parsedData[0].length; dataIndex++) {

        if (parsedData[0][dataIndex].includes('g')) {
            ActivePlayer = parseInt(parsedData[0][dataIndex][0]);
            appendGod(getGodData(parsedData[1][dataIndex]));
        }
        if (parsedData[0][dataIndex].includes('l')) SiteData.PlayerData[ActivePlayer].Level = parsedData[1][dataIndex];
        if (parsedData[0][dataIndex].includes('i') && !parsedData[1][dataIndex].includes('N')) {
            ActiveItem = parseInt(parsedData[0][dataIndex][2]);
            appendItem(getItemData(parsedData[1][dataIndex]));
        }
        if (parsedData[0][dataIndex].includes('bfs') && !parsedData[1][dataIndex].includes('N')) {
            let foundBuffs = parsedData[1][dataIndex].split(',');
            for (buff of foundBuffs) SiteData.PlayerData[ActivePlayer].Buffs.push(buff.replace(/%20/g, ' '));
        }
    }

}

const ARGS = ((window.location.href).split('?'))[1];
if (ARGS && ARGS.length > 2) loadData(ARGS);

const LangData = {
    English: [
        "Select a God",
        "Toggle Player Options",
        "Player",
        "Order",
        "Chaos",
        "Level",
        "Speed",
        "Power",
        "Attack Speed",
        "Basic Attack Damage",
        "Health",
        "Mana",
        "HP5",
        "MP5",
        "Crowd Control Reduction",
        "Damage Reduction",
        "Penetration",
        "Critical Strike Chance",
        "Cooldown Reduction",
        "No Passive Effects",
        "Game Wins",
        "Loss",
        "Win",
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Master",
        "Grandmaster",
        "First Blood",
        "Godlikes",
        "Killing Spree",
        "Divines",
        "Immortals",
        "Fire Giant Kills",
        "Penta-kills",
        "Quadra-kills",
        "Triple-kills",
        "Double-kills",
        "Most Kills",
        "Most Deaths",
        "Most Assists",
        "Most Worshippers",
        "Best KDR",
        "Most Wins",
        "Most Losses",
        "Select an Item",
        "God Options",
        "God Information",
        "Global Site Options",
        "Site Information",
        "Site News",
        "Select a File",
        "Select a Language",
        "Lookup Player",
        "Power Buff",
        "Speed Buff",
        "Attack Speed Buff",
        "Mana Buff",
        "Void Buff",
        "Health Buff",
        "Gold Buff",
        "Silver Buff",
        "Fire Giant",
        "Enhanced Fire Giant",
        "Joust Buff",
        "Slash Buff",
        "Power Potion",
        "Power Elixir",
        "Defense Elixir",
        "Reset Enhancements",
        "No Item",
        "Damage to Gods",
        "Damage to Minions",
        "Non-Ultimate Cooldowns",
        "Ultimate Cooldown",
        "Damage Taken",
        "Damage Dealt",
        "Double Click to Modify Passive",
        "Please Select a God First",
        "Basic Attack Factor",
        "Physical Protections",
        "Cannot Select Two Acorns",
        "Cannot Select Two Starters",
        "Cannot Select Tier III and Tier IV",
        "Item Already Selected",
        "Cooldowns",
        "Non-Conquest Nerf",
        "Non-Conquest Buff",
        "Could not find player",
        "Unable to establish session with API",
        "Unable to connect to server",
        "Magical",
        "Physical",
        "Magical Protections",
        "Game Losses",
        "Left Games"
    ],
    Latam: [
        "Selecciona un Dios",
        "Alternar opciones del reproductor",
        "Jugador",
        "Orden",
        "Caos",
        "Nivel",
        "Velocidad",
        "Poder",
        "Velocidad de Ataque",
        "Daño de Ataque Básico",
        "Salud",
        "Maná",
        "HP5",
        "MP5",
        "Reducción del Control",
        "Daño Reducido",
        "Penetración",
        "Ataque Crítico",
        "Reducción de Enfriamiento",
        "Sin Efectos Pasivos",
        "Victorias del juego",
        "Pérdida",
        "Victoria",
        "Bronce",
        "Plata",
        "Oro",
        "Platino",
        "Diamante",
        "Maestro",
        "Gran Maestro",
        "Primer Asesinato",
        "Como Dios",
        "Matanza",
        "Divino",
        "Inmortal",
        "Muertes del Gigante de Fuego",
        "Penta-muerte",
        "Cuadra-muerte",
        "Triple-muerte",
        "Doble-muerte",
        "Mayoría Mata",
        "Mayoría de las Muertes",
        "Mayoría Asistencias",
        "Mayoría de las Adoradoras",
        "Mejores Asesinatos/Muertes",
        "Más Victorias",
        "Mayoría de las Derrotas",
        "Selecciona un Artículo",
        "Opciones del Jugador",
        "Información del Jugador",
        "Opciones Globales",
        "Información del Sitio",
        "Noticias del Sitio",
        "Seleccione un Archivo",
        "Selecciona un Idioma",
        "Búsqueda de Jugadores",
        "Mejora de Potencia",
        "Mejora de Velocidad",
        "Mejora de Velocidad de ataque",
        "Mejora de Maná",
        "Mejora de Vacío",
        "Mejora de Salud",
        "Mejora de Oro",
        "Mejora de Plata",
        "Gigante de Fuego",
        "E. Gigante de Fuego",
        "Mejora de Joust",
        "Mejora de Slash",
        "Poción de Poder",
        "Elixir de Poder",
        "Elixir de Defensa",
        "Restaurar Mejoras",
        "No hay Artículo",
        "Daño a los dioses",
        "Daño a los Súbditos",
        "Non-Ultimate Enfriamientos",
        "Ultimate Enfriamiento",
        "Daño Recibido",
        "Daño Enviado",
        "Haga doble clic para aplicar efecto pasivo",
        "Por favor primero seleccione Dios",
        "Factor de Ataque Básico",
        "Protecciones Fisicas",
        "Can't select two acorns",
        "No se pueden seleccionar dos elementos iniciales",
        "No se puede seleccionar el Nivel III y el Nivel IV",
        "Artículo ya seleccionado",
        "Enfriamientos",
        "Non-Conquest Desventaja",
        "Non-Conquest Ventaja",
        "No se pudo encontrar el jugador",
        "No se puede establecer conexión con API",
        "No es posible conectarse al servidor",
        "Mágico",
        "Físico",
        "Protecciones Mágicas",
        "Pérdidas del Juego",
        "Juegos Abandonados"
    ]
}

switch (LANG) {
    case 'es': langText = LangData.Latam; langRef = Latam; break;
    default: langText = LangData.English; break;
}