import { Creator, Platform, Niche, Level, OutreachStatus } from '../types';

// --- Helper Functions for Realistic Data Generation ---

function daysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomFollowers = (): number => {
    const rand = Math.random();
    if (rand < 0.4) return randomInt(3000, 9999); // 40% Nano
    if (rand < 0.85) return randomInt(10000, 99999); // 45% Micro
    return randomInt(100000, 600000); // 15% Macro
};

const getLevel = (followers: number): Level => {
    if (followers < 10000) return Level.Nano;
    if (followers <= 100000) return Level.Micro;
    return Level.Macro;
};

const allPlatforms = Object.values(Platform);
const allNiches = Object.values(Niche);
const allStatuses = Object.values(OutreachStatus);
const responsibles = ['Carlos', 'Laura', 'Admin'];
const genericTags = ['UGC', 'brunch', 'coctelería', 'eventos', 'fotografía', 'música'];

const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const randomElements = <T>(arr: T[], maxCount: number): T[] => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomInt(1, maxCount));
};

const getUrlFromHandle = (handle: string) => `https://instagram.com/${handle.replace('@', '')}`;

// --- Raw Creator Data from User ---

const rawCreators = [
  { name: 'Mor Zucker (The Denver Ear)', handle: '@thedenverear', nicheKeywords: [Niche.Lifestyle, Niche.Viajes] },
  { name: 'Yesenia Chinchilla', handle: '@denverfoodscene', nicheKeywords: [Niche.Food, Niche.Bebidas] },
  { name: 'Haley Paez', handle: '@milehighandhungry', nicheKeywords: [Niche.Food, Niche.Bebidas] },
  { name: 'Larry Herz', handle: '@larryherz', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Nick Howard', handle: '@milehighfooddude', nicheKeywords: [Niche.Food, Niche.Bebidas] },
  { name: 'Amanda Bittner', handle: '@theamandabittner', nicheKeywords: [Niche.Lifestyle, Niche.Moda] },
  { name: 'Khalil & Raina', handle: '@kravingdenver', nicheKeywords: [Niche.Food, Niche.Lifestyle] },
  { name: 'Bailey Chefsquire', handle: '@coloradochefsquire', nicheKeywords: [Niche.Food] },
  { name: 'Christian DaCosta', handle: '@meet_the_dacostas', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Ryan Tag', handle: '@ryantagcoffee', nicheKeywords: [Niche.Bebidas, Niche.Lifestyle] },
  { name: 'Leigh Skomal', handle: '@leigh.skomal', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Kayla King', handle: '@celiacwithkayla', nicheKeywords: [Niche.Food, Niche.Fitness] },
  { name: '2Girls – 1MileHigh', handle: '@2girls1milehigh', nicheKeywords: [Niche.Lifestyle, Niche.Food] },
  { name: 'Anidas Lajaunie', handle: '@anidasthefoodie', nicheKeywords: [Niche.Food] },
  { name: 'Brianna Swint', handle: '@briannaswint', nicheKeywords: [Niche.Moda] },
  { name: 'Olivia Merrill', handle: '@thedenverlook', nicheKeywords: [Niche.Moda, Niche.Lifestyle] },
  { name: 'Alisha Alexandra', handle: '@denv.her', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Abby Miller', handle: '@denverdarling', nicheKeywords: [Niche.Moda, Niche.Lifestyle] },
  { name: 'Rae Ridings Scott', handle: '@softspiritstrong', nicheKeywords: [Niche.Fitness, Niche.Lifestyle] },
  { name: 'Channing (Blue Mountain Belle)', handle: '@bluemountainbelle', nicheKeywords: [Niche.Viajes, Niche.Moda] },
  { name: 'Alena (Moda Prints)', handle: '@modaprints', nicheKeywords: [Niche.Moda, Niche.Arte] },
  { name: 'Cortney Hansen', handle: '@cortneyyynicole', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Michelle Nguyen', handle: '@michellenguyen_', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Laura Young', handle: '@newdenizen', nicheKeywords: [Niche.Lifestyle, Niche.Food] },
  { name: 'Lexi', handle: '@exploringwithlexi', nicheKeywords: [Niche.Viajes] },
  { name: 'Elaine Schoch', handle: '@thecarpetravel', nicheKeywords: [Niche.Viajes] },
  { name: 'Juli Bauer Roth', handle: '@paleomg', nicheKeywords: [Niche.Food, Niche.Fitness] },
  { name: 'Max Greb', handle: '@maxthemeatguy', nicheKeywords: [Niche.Food] },
  { name: 'From the Hip Photo', handle: '@fromthehipphoto', nicheKeywords: [Niche.Fotografia] },
  { name: 'Allyson Reedy', handle: '@allysonreedy', nicheKeywords: [Niche.Food] },
  { name: 'Carrie Baird', handle: '@carriebaird', nicheKeywords: [Niche.Food] },
  { name: 'Gabbana Nova', handle: '@gabbananova', nicheKeywords: [Niche.Moda, Niche.Arte] },
  { name: 'Sam Tallent', handle: '@samtallent', nicheKeywords: [Niche.Comedia] },
  { name: 'Luke Pearsall', handle: '@lukepearsallphoto', nicheKeywords: [Niche.Fotografia, Niche.Viajes] },
  { name: 'Irma Mendoza', handle: '@irmamendoza.official', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Jonathan Davis', handle: '@jonathandavis', nicheKeywords: [Niche.Arte] },
  { name: 'Talitha Jane', handle: '@talithajane', nicheKeywords: [Niche.Moda] },
  { name: 'Divinen Chang', handle: '@divinenchang', nicheKeywords: [Niche.Food, Niche.Lifestyle] },
  { name: 'Emi Zerr', handle: '@earthyemii', nicheKeywords: [Niche.Lifestyle, Niche.Arte] },
  { name: 'Zuri Wright', handle: '@zuriwright', nicheKeywords: [Niche.Moda] },
  { name: 'Hilary Silver', handle: '@hilarysilver', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Andrew Vascassenno', handle: '@andrewvascassenno', nicheKeywords: [Niche.Fotografia] },
  { name: 'Katrina Nguyen', handle: '@katrinanguyen', nicheKeywords: [Niche.Food] },
  { name: 'Steve Greig', handle: '@wolfgang2242', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Kira, Hoya y Zoya', handle: '@kirahoyazoya_pets', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Jade Sharrer', handle: '@jadesharrer', nicheKeywords: [Niche.Fitness] },
  { name: 'Gina', handle: '@ginagoesglobal', nicheKeywords: [Niche.Viajes] },
  { name: 'Megan Zarcone', handle: '@meganzarcone', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Erin & Vinny', handle: '@erinandvinny', nicheKeywords: [Niche.Viajes, Niche.Lifestyle] },
  { name: 'Sherry Ott', handle: '@ottsworld', nicheKeywords: [Niche.Viajes, Niche.Fotografia] },
  { name: 'Blanca J', handle: '@blancaj', nicheKeywords: [Niche.Moda] },
  { name: 'Lexi Larson', handle: '@lexilarson', nicheKeywords: [Niche.Viajes] },
  { name: 'Judith Boyd', handle: '@stylecrone', nicheKeywords: [Niche.Moda, Niche.Lifestyle] },
  { name: 'Austin Becker', handle: '@theskierguy', nicheKeywords: [Niche.Fitness, Niche.Viajes] },
  { name: 'Kirill Mist', handle: '@mistkirill', nicheKeywords: [Niche.Fotografia] },
  { name: 'Gigi Eats', handle: '@gigieats', nicheKeywords: [Niche.Food] },
  { name: 'Steven Dominici', handle: '@stevendominici', nicheKeywords: [Niche.Fotografia] },
  { name: 'Rayna Kingston', handle: '@raynakingston', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Cody Roark', handle: '@codyroark', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Holliday Johnson (Home With Holliday)', handle: '@homewithholliday', nicheKeywords: [Niche.RealEstate, Niche.Lifestyle] },
  { name: 'Krissy Simmons', handle: '@lively.rock', nicheKeywords: [Niche.Arte, Niche.Lifestyle] },
  { name: 'Samantha Joseph', handle: '@samanthajoseph', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Shawn Melgar', handle: '@shawnmelgar', nicheKeywords: [Niche.Comedia] },
  { name: 'Ashton Acree', handle: '@ashton_acree', nicheKeywords: [Niche.Moda] },
  { name: 'Maryam Gates', handle: '@maryamsellsdenver', nicheKeywords: [Niche.RealEstate] },
  { name: 'Ben Palmer', handle: '@palmer.ben', nicheKeywords: [Niche.Comedia] },
  { name: 'Morgan Jay', handle: '@morganjay', nicheKeywords: [Niche.Comedia, Niche.Arte] },
  { name: 'Tori’s Foodie Adventures', handle: '@torisfoodieadventures', nicheKeywords: [Niche.Food] },
  { name: 'Alma & Tony', handle: '@que.antojada', nicheKeywords: [Niche.Food, Niche.Bebidas] },
  { name: 'Candies Liu', handle: '@candieseatsworld', nicheKeywords: [Niche.Food, Niche.Viajes] },
  { name: 'Ali Jenkins', handle: '@stelleandcobakes', nicheKeywords: [Niche.Food] },
  { name: 'Lianna', handle: '@coloradofoodenthusiast', nicheKeywords: [Niche.Food, Niche.Bebidas] },
  { name: 'Fiona', handle: '@bonappetitmysweet', nicheKeywords: [Niche.Food] },
  { name: 'Jonathan Mora', handle: '@mora_pizza', nicheKeywords: [Niche.Food] },
  { name: 'Ocn Eats', handle: '@ocn_eats', nicheKeywords: [Niche.Food] },
  { name: 'Gemma (Everyday Latina)', handle: '@everydaylatina', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Dan & Alicia (Date Night Denver)', handle: '@datenightdenver', nicheKeywords: [Niche.Lifestyle, Niche.Food] },
  { name: 'Mile High Munch', handle: '@milehighmunch', nicheKeywords: [Niche.Food, Niche.Bebidas] },
  { name: 'Kait Welch', handle: '@modhippiehabits', nicheKeywords: [Niche.Lifestyle, Niche.Arte] },
  { name: 'Nikki', handle: '@nikkisnaturalkitchen', nicheKeywords: [Niche.Food] },
  { name: 'Daniela Capri', handle: '@coloradofoodie', nicheKeywords: [Niche.Food] },
  { name: 'Jennifer Mackenchery', handle: '@allthesweetsandothereats', nicheKeywords: [Niche.Food] },
  { name: 'Kelsey', handle: '@chow_milehigh', nicheKeywords: [Niche.Food] },
  { name: 'Natalia Story', handle: '@colorado_bites', nicheKeywords: [Niche.Food, Niche.Bebidas] },
  { name: 'Bre Patterson', handle: '@biteswithbre', nicheKeywords: [Niche.Food, Niche.Bebidas] },
  { name: 'Paul Heaston', handle: '@paulheaston', nicheKeywords: [Niche.Arte] },
  { name: 'Tammy Dinh', handle: '@tammydinh', nicheKeywords: [Niche.Lifestyle] },
  { name: 'Max Greb (MaxTheMeatGuy)', handle: '@maxthemeatguy.official', nicheKeywords: [Niche.Food] },
  { name: 'Irma Mendoza (familia y cocina)', handle: '@irmamendoza.cocina', nicheKeywords: [Niche.Food, Niche.Lifestyle] },
  { name: 'Allyson Reedy (food writer)', handle: '@allysonreedy.writes', nicheKeywords: [Niche.Food, Niche.Lifestyle] },
];

// --- Generate Full Seed Data ---

export const seedData: Creator[] = rawCreators.map((creatorInfo, index) => {
  const seguidores = randomFollowers();
  const nivel = getLevel(seguidores);
  const estado_outreach = randomElement(allStatuses);
  const isContacted = estado_outreach !== OutreachStatus.NoContactado;

  // Logic to populate the app with interesting data for demonstration
  const isTop20 = index < 20;
  const isPreselected = isTop20 || (index >= 20 && index < 35 && Math.random() > 0.5);
  const isInvited = index < 7;
  
  const creator: Creator = {
    id: (index + 1).toString(),
    nombre: creatorInfo.name,
    usuario: creatorInfo.handle,
    plataformas: randomElements(allPlatforms, 2),
    url_perfil: getUrlFromHandle(creatorInfo.handle),
    nicho: creatorInfo.nicheKeywords.length > 0 ? creatorInfo.nicheKeywords : randomElements(allNiches, 2),
    ciudad: 'Denver, CO',
    seguidores: seguidores,
    engagement: parseFloat((Math.random() * 4 + 1).toFixed(2)),
    correo: `${creatorInfo.handle.replace('@', '')}@example.com`,
    nivel: nivel,
    prioridad_top20: isTop20,
    ranking: isTop20 ? index + 1 : undefined,
    preseleccionado: isPreselected,
    invitado_final: isInvited,
    estado_outreach: isInvited ? OutreachStatus.Acepto : estado_outreach,
    fecha_ultimo_contacto: isContacted || isInvited ? daysAgo(randomInt(1, 20)) : undefined,
    responsable: randomElement(responsibles),
    notas: isInvited ? 'Confirmado para la cena. Muy entusiasmado/a.' : (isContacted ? 'Primer contacto realizado.' : ''),
    etiquetas: randomElements(genericTags, 3),
    costo_estimado: nivel === Level.Nano ? undefined : randomInt(5, 50) * 100,
  };

  return creator;
});
