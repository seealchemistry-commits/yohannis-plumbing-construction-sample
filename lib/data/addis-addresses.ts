import type { Locale } from '../i18n/types';

export interface LocalizedLabelMap {
  en: string;
  am: string;
  om: string;
  ti: string;
}

export interface LandmarkEntry {
  id: string;
  labels: LocalizedLabelMap;
}

export interface SubCityConfig {
  id: string;
  nameAm: string;
  labels: LocalizedLabelMap;
  woredas: string[];
  landmarks: LandmarkEntry[];
  landmarksAm: string[];
}

function makeWoredas(count: number): string[] {
  return Array.from({ length: count }, (_, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    return `ወረዳ ${num}`;
  });
}

export function getWoredaLabel(woredaId: string, locale: Locale): string {
  const numMatch = woredaId.match(/(\d+)/);
  const num = numMatch ? numMatch[1] : woredaId;
  switch (locale) {
    case 'en':
      return `Woreda ${num}`;
    case 'om':
      return `Woredaa ${num}`;
    case 'ti':
      return `ወረዳ ${num}`;
    case 'am':
    default:
      return `ወረዳ ${num}`;
  }
}

export const ADDIS_SUBCITY_DATA: SubCityConfig[] = [
  {
    id: 'ቦሌ',
    nameAm: 'ቦሌ',
    labels: { en: 'Bole', am: 'ቦሌ', om: 'Bolee', ti: 'ቦሌ' },
    woredas: makeWoredas(14),
    landmarksAm: [
      'ቦሌ መድኃኔዓለም',
      'ቦሌ ሚካኤል / ቦሌ ቡልቡላ',
      'ቦሌ ኤርፖርት / ቦሌ ድልድይ',
      '22 / ጎላጎል',
      'ሃያ ሁለት (Hayahulet)',
      'ወሎ ሰፈር',
    ],
    landmarks: [
      {
        id: 'ቦሌ መድኃኔዓለም',
        labels: {
          en: 'Bole Medhanialem',
          am: 'ቦሌ መድኃኔዓለም',
          om: 'Bolee Madhaani’aalam',
          ti: 'ቦሌ መድሃኔኣለም',
        },
      },
      {
        id: 'ቦሌ ሚካኤል / ቦሌ ቡልቡላ',
        labels: {
          en: 'Bole Michael / Bole Bulbula',
          am: 'ቦሌ ሚካኤል / ቦሌ ቡልቡላ',
          om: 'Bolee Mikaa’eel / Bolee Bulbulaa',
          ti: 'ቦሌ ሚካኤል / ቦሌ ቡልቡላ',
        },
      },
      {
        id: 'ቦሌ ኤርፖርት / ቦሌ ድልድይ',
        labels: {
          en: 'Bole Airport / Bole Bridge',
          am: 'ቦሌ ኤርፖርት / ቦሌ ድልድይ',
          om: 'Bolee Eerpoortii / Riicha Bolee',
          ti: 'ቦሌ ኤርፖርት / ድልድል ቦሌ',
        },
      },
      {
        id: '22 / ጎላጎል',
        labels: {
          en: '22 / Golagul',
          am: '22 / ጎላጎል',
          om: '22 / Golaagul',
          ti: '22 / ጎላጎል',
        },
      },
      {
        id: 'ሃያ ሁለት (Hayahulet)',
        labels: {
          en: 'Hayahulet (22)',
          am: 'ሃያ ሁለት (Hayahulet)',
          om: 'Hayahulet (22)',
          ti: 'ሃያ ሁለት (Hayahulet)',
        },
      },
      {
        id: 'ወሎ ሰፈር',
        labels: {
          en: 'Wollo Sefer',
          am: 'ወሎ ሰፈር',
          om: 'Wolloo Safar',
          ti: 'ወሎ ሰፈር',
        },
      },
    ],
  },
  {
    id: 'የካ',
    nameAm: 'የካ',
    labels: { en: 'Yeka', am: 'የካ', om: 'Yekkaa', ti: 'የካ' },
    woredas: makeWoredas(13),
    landmarksAm: [
      'መገናኛ',
      'ሲኤምሲ (CMC)',
      'ካራ',
      'ኮተቤ',
      'ባልደራስ',
      'ሳህሊተ ምህረት',
    ],
    landmarks: [
      {
        id: 'መገናኛ',
        labels: {
          en: 'Megenagna',
          am: 'መገናኛ',
          om: 'Maganaanyaa',
          ti: 'መገናኛ',
        },
      },
      {
        id: 'ሲኤምሲ (CMC)',
        labels: {
          en: 'CMC',
          am: 'ሲኤምሲ (CMC)',
          om: 'CMC',
          ti: 'ሲኤምሲ (CMC)',
        },
      },
      {
        id: 'ካራ',
        labels: { en: 'Kara', am: 'ካራ', om: 'Kaaraa', ti: 'ካራ' },
      },
      {
        id: 'ኮተቤ',
        labels: { en: 'Kotebe', am: 'ኮተቤ', om: 'Kotabee', ti: 'ኮተቤ' },
      },
      {
        id: 'ባልደራስ',
        labels: {
          en: 'Balderas',
          am: 'ባልደራስ',
          om: 'Baalderaas',
          ti: 'ባልደራስ',
        },
      },
      {
        id: 'ሳህሊተ ምህረት',
        labels: {
          en: 'Sahlite Mihret',
          am: 'ሳህሊተ ምህረት',
          om: 'Saahlita Mihrat',
          ti: 'ሳህሊተ ምህረት',
        },
      },
    ],
  },
  {
    id: 'ንፋስ ስልክ ላፍቶ',
    nameAm: 'ንፋስ ስልክ ላፍቶ',
    labels: {
      en: 'Nifas Silk Lafto',
      am: 'ንፋስ ስልክ ላፍቶ',
      om: 'Nifaas Silk Laaftoo',
      ti: 'ንፋስ ስልክ ላፍቶ',
    },
    woredas: makeWoredas(13),
    landmarksAm: [
      'ጀሞ',
      'ሳሪስ (ሳሪስ አደይ አበባ / ሳሪስ አቦ)',
      'ሃና ማርያም',
      'ላፍቶ',
      'መካኒሳ / ላፍቶ መናኸሪያ',
    ],
    landmarks: [
      {
        id: 'ጀሞ',
        labels: { en: 'Jemo', am: 'ጀሞ', om: 'Jamoo', ti: 'ጀሞ' },
      },
      {
        id: 'ሳሪስ (ሳሪስ አደይ አበባ / ሳሪስ አቦ)',
        labels: {
          en: 'Saris (Saris Adey Abeba / Saris Abo)',
          am: 'ሳሪስ (ሳሪስ አደይ አበባ / ሳሪስ አቦ)',
          om: 'Saaris (Saaris Aday Ababaa / Saaris Aboo)',
          ti: 'ሳሪስ (ሳሪስ ኣደይ ኣበባ / ሳሪስ ኣቦ)',
        },
      },
      {
        id: 'ሃና ማርያም',
        labels: {
          en: 'Hana Mariam',
          am: 'ሃና ማርያም',
          om: 'Haannaa Maariyaam',
          ti: 'ሃና ማርያም',
        },
      },
      {
        id: 'ላፍቶ',
        labels: { en: 'Lafto', am: 'ላፍቶ', om: 'Laaftoo', ti: 'ላፍቶ' },
      },
      {
        id: 'መካኒሳ / ላፍቶ መናኸሪያ',
        labels: {
          en: 'Mekanisa / Lafto Terminal',
          am: 'መካኒሳ / ላፍቶ መናኸሪያ',
          om: 'Makanniisaa / Buufata Laaftoo',
          ti: 'መካኒሳ / መናኸሪያ ላፍቶ',
        },
      },
    ],
  },
  {
    id: 'ኮልፌ ቀራንዮ',
    nameAm: 'ኮልፌ ቀራንዮ',
    labels: {
      en: 'Kolfe Keranio',
      am: 'ኮልፌ ቀራንዮ',
      om: 'Kolfee Qaraaniyoo',
      ti: 'ኮልፌ ቀራንዮ',
    },
    woredas: makeWoredas(14),
    landmarksAm: ['ጦር ሃይሎች', 'ቀራንዮ', 'ዊንጌት', 'አስኮ', 'ቤተል', 'ዘነበ ወርቅ'],
    landmarks: [
      {
        id: 'ጦር ሃይሎች',
        labels: {
          en: 'Tor Hailoch',
          am: 'ጦር ሃይሎች',
          om: 'Xoor Hayilooch',
          ti: 'ጦር ሃይሎች',
        },
      },
      {
        id: 'ቀራንዮ',
        labels: {
          en: 'Keranio',
          am: 'ቀራንዮ',
          om: 'Qaraaniyoo',
          ti: 'ቀራንዮ',
        },
      },
      {
        id: 'ዊንጌት',
        labels: {
          en: 'Wingate',
          am: 'ዊንጌት',
          om: 'Wiingeet',
          ti: 'ዊንጌት',
        },
      },
      {
        id: 'አስኮ',
        labels: { en: 'Asko', am: 'አስኮ', om: 'Askkoo', ti: 'ኣስኮ' },
      },
      {
        id: 'ቤተል',
        labels: { en: 'Bethel', am: 'ቤተል', om: 'Beetal', ti: 'ቤተል' },
      },
      {
        id: 'ዘነበ ወርቅ',
        labels: {
          en: 'Zenebework',
          am: 'ዘነበ ወርቅ',
          om: 'Zanabawarq',
          ti: 'ዘነበ ወርቅ',
        },
      },
    ],
  },
  {
    id: 'ጉለሌ',
    nameAm: 'ጉለሌ',
    labels: {
      en: 'Gullele',
      am: 'ጉለሌ',
      om: 'Gullallee',
      ti: 'ጉለሌ',
    },
    woredas: makeWoredas(10),
    landmarksAm: ['ሽሮ ሜዳ', 'እንጦጦ', 'ፈረንሳይ ለጋሲዮን', 'ድል በር', 'ሳንቃ'],
    landmarks: [
      {
        id: 'ሽሮ ሜዳ',
        labels: {
          en: 'Shiro Meda',
          am: 'ሽሮ ሜዳ',
          om: 'Shiroo Meedaa',
          ti: 'ሽሮ ሜዳ',
        },
      },
      {
        id: 'እንጦጦ',
        labels: {
          en: 'Entoto',
          am: 'እንጦጦ',
          om: 'Inxooxxoo',
          ti: 'እንጦጦ',
        },
      },
      {
        id: 'ፈረንሳይ ለጋሲዮን',
        labels: {
          en: 'Ferensay Legasion',
          am: 'ፈረንሳይ ለጋሲዮን',
          om: 'Faransaay Lagaasiyoon',
          ti: 'ፈረንሳይ ለጋሲዮን',
        },
      },
      {
        id: 'ድል በር',
        labels: {
          en: 'Dil Ber',
          am: 'ድል በር',
          om: 'Dil Bar',
          ti: 'ድል በር',
        },
      },
      {
        id: 'ሳንቃ',
        labels: { en: 'Sanka', am: 'ሳንቃ', om: 'Saanqaa', ti: 'ሳንቃ' },
      },
    ],
  },
  {
    id: 'አራዳ',
    nameAm: 'አራዳ',
    labels: { en: 'Arada', am: 'አራዳ', om: 'Araadaa', ti: 'ኣራዳ' },
    woredas: makeWoredas(10),
    landmarksAm: ['ፒያሳ', 'አራት ኪሎ', 'ስድስት ኪሎ', 'ራስ ደስታ', 'አትክልት ተራ'],
    landmarks: [
      {
        id: 'ፒያሳ',
        labels: { en: 'Piassa', am: 'ፒያሳ', om: 'Piyaasaa', ti: 'ፒያሳ' },
      },
      {
        id: 'አራት ኪሎ',
        labels: {
          en: 'Arat Kilo',
          am: 'አራት ኪሎ',
          om: 'Araat Kiiloo',
          ti: 'ኣራት ኪሎ',
        },
      },
      {
        id: 'ስድስት ኪሎ',
        labels: {
          en: 'Sidist Kilo',
          am: 'ስድስት ኪሎ',
          om: 'Sidist Kiiloo',
          ti: 'ስድስት ኪሎ',
        },
      },
      {
        id: 'ራስ ደስታ',
        labels: {
          en: 'Ras Desta',
          am: 'ራስ ደስታ',
          om: 'Raas Dastaa',
          ti: 'ራስ ደስታ',
        },
      },
      {
        id: 'አትክልት ተራ',
        labels: {
          en: 'Atkilt Tera',
          am: 'አትክልት ተራ',
          om: 'Atkilt Taraa',
          ti: 'ኣትክልቲ ተራ',
        },
      },
    ],
  },
  {
    id: 'አዲስ ከተማ',
    nameAm: 'አዲስ ከተማ',
    labels: {
      en: 'Addis Ketema',
      am: 'አዲስ ከተማ',
      om: 'Addis Katamaa',
      ti: 'ኣዲስ ከተማ',
    },
    woredas: makeWoredas(14),
    landmarksAm: [
      'መርካቶ',
      'አውቶቡስ ተራ',
      'ጳውሎስ ሆስፒታል አካባቢ',
      'ጎፋ ገብርኤል / አዲስ ከተማ አካባቢ',
    ],
    landmarks: [
      {
        id: 'መርካቶ',
        labels: {
          en: 'Merkato',
          am: 'መርካቶ',
          om: 'Markaatoo',
          ti: 'መርካቶ',
        },
      },
      {
        id: 'አውቶቡስ ተራ',
        labels: {
          en: 'Autobus Tera',
          am: 'አውቶቡስ ተራ',
          om: 'Awtoobis Taraa',
          ti: 'ኣውቶቡስ ተራ',
        },
      },
      {
        id: 'ጳውሎስ ሆስፒታል አካባቢ',
        labels: {
          en: 'St. Paul Hospital Area',
          am: 'ጳውሎስ ሆስፒታል አካባቢ',
          om: 'Naannoo Hospitaala Phaawuloos',
          ti: 'ከባቢ ሆስፒታል ጳውሎስ',
        },
      },
      {
        id: 'ጎፋ ገብርኤል / አዲስ ከተማ አካባቢ',
        labels: {
          en: 'Gofa Gabriel / Addis Ketema Area',
          am: 'ጎፋ ገብርኤል / አዲስ ከተማ አካባቢ',
          om: 'Gofaa Gabri’eel / Naannoo Addis Katamaa',
          ti: 'ጎፋ ገብርኤል / ከባቢ ኣዲስ ከተማ',
        },
      },
    ],
  },
  {
    id: 'ቂርቆስ',
    nameAm: 'ቂርቆስ',
    labels: { en: 'Kirkos', am: 'ቂርቆስ', om: 'Qirqoos', ti: 'ቂርቆስ' },
    woredas: makeWoredas(11),
    landmarksAm: [
      'ካዛንቺስ',
      'ሜክሲኮ',
      'ሳርቤት',
      'ወሎ ሰፈር / ጎተራ መገንጠያ',
      'ቦሌ ርቀት/ደንበል አካባቢ',
    ],
    landmarks: [
      {
        id: 'ካዛንቺስ',
        labels: {
          en: 'Kazanchis',
          am: 'ካዛንቺስ',
          om: 'Kaazaanchiis',
          ti: 'ካዛንቺስ',
        },
      },
      {
        id: 'ሜክሲኮ',
        labels: {
          en: 'Mexico',
          am: 'ሜክሲኮ',
          om: 'Meeksikoo',
          ti: 'ሜክሲኮ',
        },
      },
      {
        id: 'ሳርቤት',
        labels: {
          en: 'Sarbet',
          am: 'ሳርቤት',
          om: 'Saarbeet',
          ti: 'ሳርቤት',
        },
      },
      {
        id: 'ወሎ ሰፈር / ጎተራ መገንጠያ',
        labels: {
          en: 'Wollo Sefer / Gotera Interchange',
          am: 'ወሎ ሰፈር / ጎተራ መገንጠያ',
          om: 'Wolloo Safar / Qaxxaamura Gotaraa',
          ti: 'ወሎ ሰፈር / መገንጠያ ጎተራ',
        },
      },
      {
        id: 'ቦሌ ርቀት/ደንበል አካባቢ',
        labels: {
          en: 'Bole Road / Dembel Area',
          am: 'ቦሌ ርቀት/ደንበል አካባቢ',
          om: 'Naannoo Daandii Bolee / Dambal',
          ti: 'ከባቢ መንገዲ ቦሌ / ደንበል',
        },
      },
    ],
  },
  {
    id: 'ልደታ',
    nameAm: 'ልደታ',
    labels: { en: 'Lideta', am: 'ልደታ', om: 'Lidataa', ti: 'ልደታ' },
    woredas: makeWoredas(10),
    landmarksAm: [
      'ልደታ',
      'ባልቻ ሆስፒታል አካባቢ',
      'ታጠቅ / አዲሱ ገበያ አካባቢ',
      'ካሳንቺስ / ሲቪል ሰርቪስ በኩል',
    ],
    landmarks: [
      {
        id: 'ልደታ',
        labels: { en: 'Lideta', am: 'ልደታ', om: 'Lidataa', ti: 'ልደታ' },
      },
      {
        id: 'ባልቻ ሆስፒታል አካባቢ',
        labels: {
          en: 'Balcha Hospital Area',
          am: 'ባልቻ ሆስፒታል አካባቢ',
          om: 'Naannoo Hospitaala Baalchaa',
          ti: 'ከባቢ ሆስፒታል ባልቻ',
        },
      },
      {
        id: 'ታጠቅ / አዲሱ ገበያ አካባቢ',
        labels: {
          en: 'Tatek / Addisu Gebeya Area',
          am: 'ታጠቅ / አዲሱ ገበያ አካባቢ',
          om: 'Taaxaq / Naannoo Addisu Gabayaa',
          ti: 'ታጠቅ / ከባቢ ኣዲሱ ገበያ',
        },
      },
      {
        id: 'ካሳንቺስ / ሲቪል ሰርቪስ በኩል',
        labels: {
          en: 'Kazanchis / Civil Service Side',
          am: 'ካሳንቺስ / ሲቪል ሰርቪስ በኩል',
          om: 'Kaazaanchiis / Karaa Siiviil Sarviis',
          ti: 'ካዛንቺስ / ወገን ሲቪል ሰርቪስ',
        },
      },
    ],
  },
  {
    id: 'አቃቂ ቃሊቲ',
    nameAm: 'አቃቂ ቃሊቲ',
    labels: {
      en: 'Akaki Kality',
      am: 'አቃቂ ቃሊቲ',
      om: 'Aqaaqii Qaallittii',
      ti: 'ኣቃቂ ቃሊቲ',
    },
    woredas: makeWoredas(13),
    landmarksAm: ['ቃሊቲ', 'ገላን', 'ቱሉ ዲምቱ', 'ኮዬ ፈጼ', 'አቃቂ'],
    landmarks: [
      {
        id: 'ቃሊቲ',
        labels: {
          en: 'Kality',
          am: 'ቃሊቲ',
          om: 'Qaallittii',
          ti: 'ቃሊቲ',
        },
      },
      {
        id: 'ገላን',
        labels: { en: 'Gelan', am: 'ገላን', om: 'Galaan', ti: 'ገላን' },
      },
      {
        id: 'ቱሉ ዲምቱ',
        labels: {
          en: 'Tulu Dimtu',
          am: 'ቱሉ ዲምቱ',
          om: 'Tulluu Diimtuu',
          ti: 'ቱሉ ዲምቱ',
        },
      },
      {
        id: 'ኮዬ ፈጼ',
        labels: {
          en: 'Koye Feche',
          am: 'ኮዬ ፈጼ',
          om: 'Koyyee Faccee',
          ti: 'ኮዬ ፈጼ',
        },
      },
      {
        id: 'አቃቂ',
        labels: { en: 'Akaki', am: 'አቃቂ', om: 'Aqaaqii', ti: 'ኣቃቂ' },
      },
    ],
  },
  {
    id: 'ለሚ ኩራ',
    nameAm: 'ለሚ ኩራ',
    labels: {
      en: 'Lemi Kura',
      am: 'ለሚ ኩራ',
      om: 'Lammii Kuraa',
      ti: 'ለሚ ኩራ',
    },
    woredas: makeWoredas(14),
    landmarksAm: [
      'አያት (Ayat)',
      'ሲኤምሲ በኩል ያሉ የለሚ ኩራ መንደሮች',
      'ፍየል ቤት / ቦሌ አራብሳ አካባቢ',
    ],
    landmarks: [
      {
        id: 'አያት (Ayat)',
        labels: {
          en: 'Ayat',
          am: 'አያት (Ayat)',
          om: 'Ayaat',
          ti: 'ኣያት (Ayat)',
        },
      },
      {
        id: 'ሲኤምሲ በኩል ያሉ የለሚ ኩራ መንደሮች',
        labels: {
          en: 'Lemi Kura Villages (CMC Side)',
          am: 'ሲኤምሲ በኩል ያሉ የለሚ ኩራ መንደሮች',
          om: 'Gandoota Lammii Kuraa (Karaa CMC)',
          ti: 'መንደራት ለሚ ኩራ (ወገን CMC)',
        },
      },
      {
        id: 'ፍየል ቤት / ቦሌ አራብሳ አካባቢ',
        labels: {
          en: 'Fiyel Bet / Bole Arabsa Area',
          am: 'ፍየል ቤት / ቦሌ አራብሳ አካባቢ',
          om: 'Fiyel Beet / Naannoo Bolee Araabsaa',
          ti: 'ፍየል ቤት / ከባቢ ቦሌ ኣራብሳ',
        },
      },
    ],
  },
];

export function getWoredasForSubCity(subCityName: string): string[] {
  const match = ADDIS_SUBCITY_DATA.find((c) => c.nameAm === subCityName);
  return match ? match.woredas : makeWoredas(14);
}

export function getLandmarksForSubCity(subCityName: string): string[] {
  const match = ADDIS_SUBCITY_DATA.find((c) => c.nameAm === subCityName);
  return match ? match.landmarksAm : [];
}

export function getSubCityLabel(subCityId: string, locale: Locale): string {
  const match = ADDIS_SUBCITY_DATA.find(
    (c) => c.id === subCityId || c.nameAm === subCityId
  );
  return match ? match.labels[locale] : subCityId;
}

const LEGACY_LANDMARK_ALIASES: Record<string, LocalizedLabelMap> = {
  'ቦሌ ቡልቡላ': {
    en: 'Bole Bulbula',
    am: 'ቦሌ ቡልቡላ',
    om: 'Bolee Bulbulaa',
    ti: 'ቦሌ ቡልቡላ',
  },
};

export function getLandmarkLabel(landmarkId: string, locale: Locale): string {
  if (landmarkId in LEGACY_LANDMARK_ALIASES) {
    return LEGACY_LANDMARK_ALIASES[landmarkId][locale];
  }
  for (const city of ADDIS_SUBCITY_DATA) {
    const found = city.landmarks.find((l) => l.id === landmarkId);
    if (found) return found.labels[locale];
  }
  return landmarkId;
}

export function isValidSubCityWoreda(
  subCityName: string,
  woreda: string
): boolean {
  const woredas = getWoredasForSubCity(subCityName);
  return woredas.includes(woreda);
}

export function isValidSubCityLandmark(
  subCityName: string,
  landmark: string
): boolean {
  const landmarks = getLandmarksForSubCity(subCityName);
  return landmarks.includes(landmark);
}
