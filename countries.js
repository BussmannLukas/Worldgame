// Country data: ISO alpha-2 code (lowercase) → { names (all lowercase search terms), displayName (German) }
// 195 UN member states + some observer states
// SVG IDs are lowercase ISO alpha-2 codes

const COUNTRIES = {
  "af": { names: ["afghanistan"], displayName: "Afghanistan", region: "Asien" },
  "al": { names: ["albanien", "albania"], displayName: "Albanien", region: "Europa" },
  "dz": { names: ["algerien", "algeria"], displayName: "Algerien", region: "Afrika" },
  "ad": { names: ["andorra"], displayName: "Andorra", region: "Europa" },
  "ao": { names: ["angola"], displayName: "Angola", region: "Afrika" },
  "ag": { names: ["antigua und barbuda", "antigua and barbuda"], displayName: "Antigua und Barbuda", region: "Amerika" },
  "ar": { names: ["argentinien", "argentina"], displayName: "Argentinien", region: "Amerika" },
  "am": { names: ["armenien", "armenia"], displayName: "Armenien", region: "Asien" },
  "au": { names: ["australien", "australia"], displayName: "Australien", region: "Ozeanien" },
  "at": { names: ["oesterreich", "österreich", "austria"], displayName: "Österreich", region: "Europa" },
  "az": { names: ["aserbaidschan", "azerbaijan"], displayName: "Aserbaidschan", region: "Asien" },
  "bs": { names: ["bahamas", "the bahamas"], displayName: "Bahamas", region: "Amerika" },
  "bh": { names: ["bahrain"], displayName: "Bahrain", region: "Asien" },
  "bd": { names: ["bangladesch", "bangladesh"], displayName: "Bangladesch", region: "Asien" },
  "bb": { names: ["barbados"], displayName: "Barbados", region: "Amerika" },
  "by": { names: ["belarus", "weissrussland", "weißrussland"], displayName: "Belarus", region: "Europa" },
  "be": { names: ["belgien", "belgium"], displayName: "Belgien", region: "Europa" },
  "bz": { names: ["belize"], displayName: "Belize", region: "Amerika" },
  "bj": { names: ["benin"], displayName: "Benin", region: "Afrika" },
  "bt": { names: ["bhutan"], displayName: "Bhutan", region: "Asien" },
  "bo": { names: ["bolivien", "bolivia"], displayName: "Bolivien", region: "Amerika" },
  "ba": { names: ["bosnien und herzegowina", "bosnien-herzegowina", "bosnien", "bosnia and herzegovina", "bosnia"], displayName: "Bosnien und Herzegowina", region: "Europa" },
  "bw": { names: ["botswana", "botsuana"], displayName: "Botswana", region: "Afrika" },
  "br": { names: ["brasilien", "brazil"], displayName: "Brasilien", region: "Amerika" },
  "bn": { names: ["brunei", "brunei darussalam"], displayName: "Brunei", region: "Asien" },
  "bg": { names: ["bulgarien", "bulgaria"], displayName: "Bulgarien", region: "Europa" },
  "bf": { names: ["burkina faso"], displayName: "Burkina Faso", region: "Afrika" },
  "bi": { names: ["burundi"], displayName: "Burundi", region: "Afrika" },
  "cv": { names: ["kap verde", "cabo verde", "cape verde"], displayName: "Kap Verde", region: "Afrika" },
  "kh": { names: ["kambodscha", "cambodia"], displayName: "Kambodscha", region: "Asien" },
  "cm": { names: ["kamerun", "cameroon"], displayName: "Kamerun", region: "Afrika" },
  "ca": { names: ["kanada", "canada"], displayName: "Kanada", region: "Amerika" },
  "cf": { names: ["zentralafrikanische republik", "central african republic"], displayName: "Zentralafrikanische Republik", region: "Afrika" },
  "td": { names: ["tschad", "chad"], displayName: "Tschad", region: "Afrika" },
  "cl": { names: ["chile"], displayName: "Chile", region: "Amerika" },
  "cn": { names: ["china", "volksrepublik china"], displayName: "China", region: "Asien" },
  "co": { names: ["kolumbien", "colombia"], displayName: "Kolumbien", region: "Amerika" },
  "km": { names: ["komoren", "comoros"], displayName: "Komoren", region: "Afrika" },
  "cg": { names: ["kongo", "republik kongo", "congo", "republic of the congo"], displayName: "Republik Kongo", region: "Afrika" },
  "cd": { names: ["demokratische republik kongo", "dr kongo", "democratic republic of the congo", "drc"], displayName: "Dem. Rep. Kongo", region: "Afrika" },
  "cr": { names: ["costa rica"], displayName: "Costa Rica", region: "Amerika" },
  "ci": { names: ["elfenbeinkueste", "elfenbeinküste", "cote d'ivoire", "ivory coast"], displayName: "Elfenbeinküste", region: "Afrika" },
  "hr": { names: ["kroatien", "croatia"], displayName: "Kroatien", region: "Europa" },
  "cu": { names: ["kuba", "cuba"], displayName: "Kuba", region: "Amerika" },
  "cy": { names: ["zypern", "cyprus"], displayName: "Zypern", region: "Europa" },
  "cz": { names: ["tschechien", "tschechische republik", "czech republic", "czechia"], displayName: "Tschechien", region: "Europa" },
  "dk": { names: ["daenemark", "dänemark", "denmark"], displayName: "Dänemark", region: "Europa" },
  "dj": { names: ["dschibuti", "djibouti"], displayName: "Dschibuti", region: "Afrika" },
  "dm": { names: ["dominica"], displayName: "Dominica", region: "Amerika" },
  "do": { names: ["dominikanische republik", "dominican republic"], displayName: "Dominikanische Republik", region: "Amerika" },
  "ec": { names: ["ecuador"], displayName: "Ecuador", region: "Amerika" },
  "eg": { names: ["aegypten", "ägypten", "egypt"], displayName: "Ägypten", region: "Afrika" },
  "sv": { names: ["el salvador"], displayName: "El Salvador", region: "Amerika" },
  "gq": { names: ["aequatorialguinea", "äquatorialguinea", "equatorial guinea"], displayName: "Äquatorialguinea", region: "Afrika" },
  "er": { names: ["eritrea"], displayName: "Eritrea", region: "Afrika" },
  "ee": { names: ["estland", "estonia"], displayName: "Estland", region: "Europa" },
  "sz": { names: ["eswatini", "swasiland", "swaziland"], displayName: "Eswatini", region: "Afrika" },
  "et": { names: ["aethiopien", "äthiopien", "ethiopia"], displayName: "Äthiopien", region: "Afrika" },
  "fj": { names: ["fidschi", "fiji"], displayName: "Fidschi", region: "Ozeanien" },
  "fi": { names: ["finnland", "finland"], displayName: "Finnland", region: "Europa" },
  "fr": { names: ["frankreich", "france"], displayName: "Frankreich", region: "Europa" },
  "ga": { names: ["gabun", "gabon"], displayName: "Gabun", region: "Afrika" },
  "gm": { names: ["gambia", "the gambia"], displayName: "Gambia", region: "Afrika" },
  "ge": { names: ["georgien", "georgia"], displayName: "Georgien", region: "Asien" },
  "de": { names: ["deutschland", "germany"], displayName: "Deutschland", region: "Europa" },
  "gh": { names: ["ghana"], displayName: "Ghana", region: "Afrika" },
  "gr": { names: ["griechenland", "greece"], displayName: "Griechenland", region: "Europa" },
  "gd": { names: ["grenada"], displayName: "Grenada", region: "Amerika" },
  "gt": { names: ["guatemala"], displayName: "Guatemala", region: "Amerika" },
  "gn": { names: ["guinea"], displayName: "Guinea", region: "Afrika" },
  "gw": { names: ["guinea-bissau"], displayName: "Guinea-Bissau", region: "Afrika" },
  "gy": { names: ["guyana"], displayName: "Guyana", region: "Amerika" },
  "ht": { names: ["haiti"], displayName: "Haiti", region: "Amerika" },
  "hn": { names: ["honduras"], displayName: "Honduras", region: "Amerika" },
  "hu": { names: ["ungarn", "hungary"], displayName: "Ungarn", region: "Europa" },
  "is": { names: ["island", "iceland"], displayName: "Island", region: "Europa" },
  "in": { names: ["indien", "india"], displayName: "Indien", region: "Asien" },
  "id": { names: ["indonesien", "indonesia"], displayName: "Indonesien", region: "Asien" },
  "ir": { names: ["iran"], displayName: "Iran", region: "Asien" },
  "iq": { names: ["irak", "iraq"], displayName: "Irak", region: "Asien" },
  "ie": { names: ["irland", "ireland"], displayName: "Irland", region: "Europa" },
  "il": { names: ["israel"], displayName: "Israel", region: "Asien" },
  "it": { names: ["italien", "italy"], displayName: "Italien", region: "Europa" },
  "jm": { names: ["jamaika", "jamaica"], displayName: "Jamaika", region: "Amerika" },
  "jp": { names: ["japan"], displayName: "Japan", region: "Asien" },
  "jo": { names: ["jordanien", "jordan"], displayName: "Jordanien", region: "Asien" },
  "kz": { names: ["kasachstan", "kazakhstan"], displayName: "Kasachstan", region: "Asien" },
  "ke": { names: ["kenia", "kenya"], displayName: "Kenia", region: "Afrika" },
  "ki": { names: ["kiribati"], displayName: "Kiribati", region: "Ozeanien" },
  "kp": { names: ["nordkorea", "north korea"], displayName: "Nordkorea", region: "Asien" },
  "kr": { names: ["suedkorea", "südkorea", "south korea"], displayName: "Südkorea", region: "Asien" },
  "kw": { names: ["kuwait"], displayName: "Kuwait", region: "Asien" },
  "kg": { names: ["kirgisistan", "kirgistan", "kyrgyzstan"], displayName: "Kirgisistan", region: "Asien" },
  "la": { names: ["laos"], displayName: "Laos", region: "Asien" },
  "lv": { names: ["lettland", "latvia"], displayName: "Lettland", region: "Europa" },
  "lb": { names: ["libanon", "lebanon"], displayName: "Libanon", region: "Asien" },
  "ls": { names: ["lesotho"], displayName: "Lesotho", region: "Afrika" },
  "lr": { names: ["liberia"], displayName: "Liberia", region: "Afrika" },
  "ly": { names: ["libyen", "libya"], displayName: "Libyen", region: "Afrika" },
  "li": { names: ["liechtenstein"], displayName: "Liechtenstein", region: "Europa" },
  "lt": { names: ["litauen", "lithuania"], displayName: "Litauen", region: "Europa" },
  "lu": { names: ["luxemburg", "luxembourg"], displayName: "Luxemburg", region: "Europa" },
  "mg": { names: ["madagaskar", "madagascar"], displayName: "Madagaskar", region: "Afrika" },
  "mw": { names: ["malawi"], displayName: "Malawi", region: "Afrika" },
  "my": { names: ["malaysia"], displayName: "Malaysia", region: "Asien" },
  "mv": { names: ["malediven", "maldives"], displayName: "Malediven", region: "Asien" },
  "ml": { names: ["mali"], displayName: "Mali", region: "Afrika" },
  "mt": { names: ["malta"], displayName: "Malta", region: "Europa" },
  "mh": { names: ["marshallinseln", "marshall islands"], displayName: "Marshallinseln", region: "Ozeanien" },
  "mr": { names: ["mauretanien", "mauritania"], displayName: "Mauretanien", region: "Afrika" },
  "mu": { names: ["mauritius"], displayName: "Mauritius", region: "Afrika" },
  "mx": { names: ["mexiko", "mexico"], displayName: "Mexiko", region: "Amerika" },
  "fm": { names: ["mikronesien", "micronesia"], displayName: "Mikronesien", region: "Ozeanien" },
  "md": { names: ["moldawien", "moldau", "moldova"], displayName: "Moldau", region: "Europa" },
  "mc": { names: ["monaco"], displayName: "Monaco", region: "Europa" },
  "mn": { names: ["mongolei", "mongolia"], displayName: "Mongolei", region: "Asien" },
  "me": { names: ["montenegro"], displayName: "Montenegro", region: "Europa" },
  "ma": { names: ["marokko", "morocco"], displayName: "Marokko", region: "Afrika" },
  "mz": { names: ["mosambik", "mozambique"], displayName: "Mosambik", region: "Afrika" },
  "mm": { names: ["myanmar", "birma", "burma"], displayName: "Myanmar", region: "Asien" },
  "na": { names: ["namibia"], displayName: "Namibia", region: "Afrika" },
  "nr": { names: ["nauru"], displayName: "Nauru", region: "Ozeanien" },
  "np": { names: ["nepal"], displayName: "Nepal", region: "Asien" },
  "nl": { names: ["niederlande", "netherlands", "holland"], displayName: "Niederlande", region: "Europa" },
  "nz": { names: ["neuseeland", "new zealand"], displayName: "Neuseeland", region: "Ozeanien" },
  "ni": { names: ["nicaragua"], displayName: "Nicaragua", region: "Amerika" },
  "ne": { names: ["niger"], displayName: "Niger", region: "Afrika" },
  "ng": { names: ["nigeria"], displayName: "Nigeria", region: "Afrika" },
  "mk": { names: ["nordmazedonien", "north macedonia", "macedonia"], displayName: "Nordmazedonien", region: "Europa" },
  "no": { names: ["norwegen", "norway"], displayName: "Norwegen", region: "Europa" },
  "om": { names: ["oman"], displayName: "Oman", region: "Asien" },
  "pk": { names: ["pakistan"], displayName: "Pakistan", region: "Asien" },
  "pw": { names: ["palau"], displayName: "Palau", region: "Ozeanien" },
  "pa": { names: ["panama"], displayName: "Panama", region: "Amerika" },
  "pg": { names: ["papua-neuguinea", "papua new guinea"], displayName: "Papua-Neuguinea", region: "Ozeanien" },
  "py": { names: ["paraguay"], displayName: "Paraguay", region: "Amerika" },
  "pe": { names: ["peru"], displayName: "Peru", region: "Amerika" },
  "ph": { names: ["philippinen", "philippines"], displayName: "Philippinen", region: "Asien" },
  "pl": { names: ["polen", "poland"], displayName: "Polen", region: "Europa" },
  "pt": { names: ["portugal"], displayName: "Portugal", region: "Europa" },
  "qa": { names: ["katar", "qatar"], displayName: "Katar", region: "Asien" },
  "ro": { names: ["rumaenien", "rumänien", "romania"], displayName: "Rumänien", region: "Europa" },
  "ru": { names: ["russland", "russia"], displayName: "Russland", region: "Europa" },
  "rw": { names: ["ruanda", "rwanda"], displayName: "Ruanda", region: "Afrika" },
  "kn": { names: ["st. kitts und nevis", "saint kitts and nevis"], displayName: "St. Kitts und Nevis", region: "Amerika" },
  "lc": { names: ["st. lucia", "saint lucia"], displayName: "St. Lucia", region: "Amerika" },
  "vc": { names: ["st. vincent und die grenadinen", "saint vincent and the grenadines", "st. vincent"], displayName: "St. Vincent und die Grenadinen", region: "Amerika" },
  "ws": { names: ["samoa"], displayName: "Samoa", region: "Ozeanien" },
  "sm": { names: ["san marino"], displayName: "San Marino", region: "Europa" },
  "st": { names: ["sao tome und principe", "são tomé und príncipe", "sao tome and principe"], displayName: "São Tomé und Príncipe", region: "Afrika" },
  "sa": { names: ["saudi-arabien", "saudi arabien", "saudi arabia"], displayName: "Saudi-Arabien", region: "Asien" },
  "sn": { names: ["senegal"], displayName: "Senegal", region: "Afrika" },
  "rs": { names: ["serbien", "serbia"], displayName: "Serbien", region: "Europa" },
  "sc": { names: ["seychellen", "seychelles"], displayName: "Seychellen", region: "Afrika" },
  "sl": { names: ["sierra leone"], displayName: "Sierra Leone", region: "Afrika" },
  "sg": { names: ["singapur", "singapore"], displayName: "Singapur", region: "Asien" },
  "sk": { names: ["slowakei", "slovakia"], displayName: "Slowakei", region: "Europa" },
  "si": { names: ["slowenien", "slovenia"], displayName: "Slowenien", region: "Europa" },
  "sb": { names: ["salomonen", "solomon islands"], displayName: "Salomonen", region: "Ozeanien" },
  "so": { names: ["somalia"], displayName: "Somalia", region: "Afrika" },
  "za": { names: ["suedafrika", "südafrika", "south africa"], displayName: "Südafrika", region: "Afrika" },
  "ss": { names: ["suedsudan", "südsudan", "south sudan"], displayName: "Südsudan", region: "Afrika" },
  "es": { names: ["spanien", "spain"], displayName: "Spanien", region: "Europa" },
  "lk": { names: ["sri lanka"], displayName: "Sri Lanka", region: "Asien" },
  "sd": { names: ["sudan"], displayName: "Sudan", region: "Afrika" },
  "sr": { names: ["suriname"], displayName: "Suriname", region: "Amerika" },
  "se": { names: ["schweden", "sweden"], displayName: "Schweden", region: "Europa" },
  "ch": { names: ["schweiz", "switzerland"], displayName: "Schweiz", region: "Europa" },
  "sy": { names: ["syrien", "syria"], displayName: "Syrien", region: "Asien" },
  "tj": { names: ["tadschikistan", "tajikistan"], displayName: "Tadschikistan", region: "Asien" },
  "tz": { names: ["tansania", "tanzania"], displayName: "Tansania", region: "Afrika" },
  "th": { names: ["thailand"], displayName: "Thailand", region: "Asien" },
  "tl": { names: ["timor-leste", "osttimor", "east timor"], displayName: "Timor-Leste", region: "Asien" },
  "tg": { names: ["togo"], displayName: "Togo", region: "Afrika" },
  "to": { names: ["tonga"], displayName: "Tonga", region: "Ozeanien" },
  "tt": { names: ["trinidad und tobago", "trinidad and tobago"], displayName: "Trinidad und Tobago", region: "Amerika" },
  "tn": { names: ["tunesien", "tunisia"], displayName: "Tunesien", region: "Afrika" },
  "tr": { names: ["tuerkei", "türkei", "turkey", "turkiye", "türkiye"], displayName: "Türkei", region: "Asien" },
  "tm": { names: ["turkmenistan"], displayName: "Turkmenistan", region: "Asien" },
  "tv": { names: ["tuvalu"], displayName: "Tuvalu", region: "Ozeanien" },
  "ug": { names: ["uganda"], displayName: "Uganda", region: "Afrika" },
  "ua": { names: ["ukraine"], displayName: "Ukraine", region: "Europa" },
  "ae": { names: ["vereinigte arabische emirate", "vae", "united arab emirates", "uae"], displayName: "Vereinigte Arabische Emirate", region: "Asien" },
  "gb": { names: ["vereinigtes koenigreich", "vereinigtes königreich", "grossbritannien", "großbritannien", "united kingdom", "uk", "great britain", "england"], displayName: "Vereinigtes Königreich", region: "Europa" },
  "us": { names: ["vereinigte staaten", "usa", "united states", "united states of america", "amerika"], displayName: "Vereinigte Staaten", region: "Amerika" },
  "uy": { names: ["uruguay"], displayName: "Uruguay", region: "Amerika" },
  "uz": { names: ["usbekistan", "uzbekistan"], displayName: "Usbekistan", region: "Asien" },
  "vu": { names: ["vanuatu"], displayName: "Vanuatu", region: "Ozeanien" },
  "ve": { names: ["venezuela"], displayName: "Venezuela", region: "Amerika" },
  "vn": { names: ["vietnam"], displayName: "Vietnam", region: "Asien" },
  "ye": { names: ["jemen", "yemen"], displayName: "Jemen", region: "Asien" },
  "zm": { names: ["sambia", "zambia"], displayName: "Sambia", region: "Afrika" },
  "zw": { names: ["simbabwe", "zimbabwe"], displayName: "Simbabwe", region: "Afrika" }
};

// Build reverse lookup: normalized name → ISO code
const NAME_TO_CODE = {};
for (const [code, data] of Object.entries(COUNTRIES)) {
  for (const name of data.names) {
    NAME_TO_CODE[name] = code;
  }
}

// Normalize input: lowercase, trim, handle umlauts written as ae/oe/ue
function normalizeInput(input) {
  let normalized = input.trim().toLowerCase();
  return normalized;
}

// Also try umlaut alternatives
function getAlternatives(input) {
  const alts = [input];
  // ä → ae, ö → oe, ü → ue, ß → ss
  const umlautToAscii = input
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  if (umlautToAscii !== input) alts.push(umlautToAscii);
  // ae → ä, oe → ö, ue → ü, ss → ß
  const asciiToUmlaut = input
    .replace(/ae/g, 'ä').replace(/oe/g, 'ö').replace(/ue/g, 'ü').replace(/ss/g, 'ß');
  if (asciiToUmlaut !== input) alts.push(asciiToUmlaut);
  return alts;
}

function lookupCountry(input) {
  const normalized = normalizeInput(input);
  if (!normalized) return null;

  const alternatives = getAlternatives(normalized);
  for (const alt of alternatives) {
    if (NAME_TO_CODE[alt]) {
      return NAME_TO_CODE[alt];
    }
  }
  return null;
}
