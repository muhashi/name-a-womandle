export default {
  "Women in Science": {
    description: "Name 10 women who made significant contributions to science or mathematics",
    filter: (woman) => woman?.j?.some(job => ['scientist', 'physicist', 'chemist', 'mathematician', 'geneticist', 'biochemist'].includes(job?.toLowerCase()))
  },
  "Women from the UK": {
    description: "Name 10 notable women from the United Kingdom",
    filter: (woman) => woman?.c === "United Kingdom" || woman?.c === "England" || woman?.c === "Scotland" || woman?.c === "Wales" || woman?.c === "United Kingdom of Great Britain and Ireland" || woman?.c === "Kingdom of Great Britain"
  },
  "20th Century Born": {
    description: "Name 10 women born in the 20th century (1901-2000)",
    filter: (woman) => {
      if (!woman?.d) return false;
      const year = parseInt(woman.d?.split('-')[0]);
      return year >= 1901 && year <= 2000;
    }
  },
  "Women Named Emily": {
    description: "Name 10 women with Emily as their first or last name",
    filter: (woman) => woman?.n?.toLowerCase().includes('emily')
  },
  "Women Writers": {
    description: "Name 10 women who are notable writers",
    filter: (woman) => woman?.j?.some(job => ['writer', 'author', 'poet', 'novelist', 'playwright', 'screenwriter'].includes(job?.toLowerCase()))
  },
  "Women in Politics": {
    description: "Name 10 women who are notable political figures",
    filter: (woman) => woman?.j?.some(job => ['politician', 'activist', 'leader', 'diplomat'].includes(job?.toLowerCase()))
  },
  "Women from Japan": {
    description: "Name 10 notable women from Japan",
    filter: (woman) => woman?.c === "Japan" || woman?.c === "Empire of Japan" || woman?.c === "Nippon"
  },
  "Women Athletes": {
    description: "Name 10 women who are notable athletes or sports figures",
    filter: (woman) => woman?.j?.some(job => ['athlete', 'tennis player', 'swimmer', 'runner', 'gymnast', 'basketball player', 'soccer player', 'golfer'].includes(job?.toLowerCase()))
  },
  "Women Artists": {
    description: "Name 10 women who are notable artists, painters, or sculptors",
    filter: (woman) => woman?.j?.some(job => ['artist', 'painter', 'sculptor', 'photographer', 'illustrator'].includes(job?.toLowerCase()))
  },
  "Women in Technology": {
    description: "Name 10 women who made significant contributions to technology and computing",
    filter: (woman) => woman?.j?.some(job => ['programmer', 'computer scientist', 'engineer', 'inventor', 'technologist'].includes(job?.toLowerCase()))
  },
  "Women from the US": {
    description: "Name 10 notable women from the United States",
    filter: (woman) => woman?.c === "United States" || woman?.c === "USA" || woman?.c === "United States of America" || woman?.c === "Thirteen Colonies" || woman?.c === "British America" || woman?.c === "British North America"
  },
  "Women from the European Union": {
    description: "Name 10 notable women from the European Union",
    filter: (woman) => {
      const europeanCountries = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Spanish Empire"];
      return europeanCountries.some(country => woman?.c?.includes(country));
    }
  },
  "Historical Women": {
    description: "Name 10 women born before the 20th century (before 1901)",
    filter: (woman) => {
      if (!woman?.d) return false;
      const year = parseInt(woman.d?.split('-')[0]);
      return year < 1901;
    }
  },
  "Women in Medicine": {
    description: "Name 10 women who are notable in medicine and healthcare",
    filter: (woman) => woman?.j?.some(job => ['doctor', 'physician', 'nurse', 'surgeon', 'medical researcher', 'psychiatrist', 'pediatrician', 'pharmacologist', 'pharmaceutical chemist', 'pharmacist', 'general practitioner', 'cardiologist'].includes(job?.toLowerCase()))
  },
  "Women Musicians": {
    description: "Name 10 women who are notable musicians or composers",
    filter: (woman) => woman?.j?.some(job => ['musician', 'composer', 'singer', 'pianist', 'violinist', 'conductor', 'music artist', 'music arranger', 'record producer', 'singer-songwriter', 'lyricist', 'rapper', 'songwriter'].includes(job?.toLowerCase()))
  },
  "21st Century Born": {
    description: "Name 10 women born in the 21st century (2001-present)",
    filter: (woman) => {
      if (!woman?.d) return false;
      const year = parseInt(woman.d?.split('-')[0]);
      return year >= 2001 && year <= 2100;
    }
  },
  "Women Journalists": {
    description: "Name 10 women who are notable journalists or news correspondents",
    filter: (woman) => woman?.j?.some(job => ['journalist', 'reporter', 'news anchor', 'correspondent', 'broadcaster'].includes(job?.toLowerCase()))
  },
  "Women Content Creators": {
    description: "Name 10 women who are notable content creators or influencers",
    filter: (woman) => woman?.j?.some(job => ['content creator', 'influencer', 'blogger', 'vlogger', 'streamer', 'podcaster', 'youtuber', 'twitch streamer', 'tiktoker', 'instagrammer'].includes(job?.toLowerCase()))
  },
  "Women from China": {
    description: "Name 10 notable women from China",
    filter: (woman) => woman?.c === "China" || woman?.c === "People's Republic of China" || woman?.c === "Republic of China" || woman?.c === "Qing dynasty" || woman?.c === "Chinese Empire" || woman?.c === "Ming dynasty"
  },
  "Women Named Jessica": {
    description: "Name 10 women with Jessica as their first or last name",
    filter: (woman) => woman?.n?.toLowerCase().includes('jessica')
  },
  "Women from Australia": {
    description: "Name 10 notable women from Australia",
    filter: (woman) => woman?.c === "Australia"
  },
  "Women in Entertainment": {
    description: "Name 10 women who are notable in entertainment and performing arts",
    filter: (woman) => woman?.j?.some(job => ['actress', 'singer', 'dancer', 'performer', 'entertainer', 'comedian', 'director'].includes(job?.toLowerCase()))
  },
  "Women from Canada": {
    description: "Name 10 notable women from Canada",
    filter: (woman) => woman?.c === "Canada" || woman?.c === "New France" || woman?.c === "British North America" || woman?.c === "British America"
  },
  "Women from Mexico": {
    description: "Name 10 notable women from Mexico",
    filter: (woman) => woman?.c === "Mexico"
  },
  "Women Named Elizabeth": {
    description: "Name 10 women with Elizabeth as their first or last name",
    filter: (woman) => woman?.n?.toLowerCase().includes('elizabeth')
  },
  "Women Entrepreneurs": {
    description: "Name 10 women who are notable entrepreneurs or business leaders",
    filter: (woman) => woman?.j?.some(job => ['entrepreneur', 'business leader', 'chief executive officer', 'founder', 'businessperson', 'chief operating officer', 'business executive', 'investor', 'manager'].includes(job?.toLowerCase()))
  },
  "Women Named Sarah": {
    description: "Name 10 women with Sarah as their first or last name",
    filter: (woman) => woman?.n?.toLowerCase().includes('sarah')
  },
  "Women from Brazil": {
    description: "Name 10 notable women from Brazil",
    filter: (woman) => woman?.c === "Brazil"
  },
  // "Women from Africa": {
  //   description: "Name 10 notable women from African countries",
  //   filter: (woman) => {
  //     const africanCountries = ["South Africa", "Nigeria", "Kenya", "Egypt", "Ethiopia", "Ghana", "Morocco", "Tunisia", "Algeria", "Libya", "Sudan", "Tanzania", "Uganda", "Zimbabwe", "Botswana", "Zambia", "Malawi", "Mozambique", "Madagascar", "Cameroon", "Ivory Coast", "Senegal", "Mali", "Burkina Faso", "Niger", "Chad", "Central African Republic", "Democratic Republic of the Congo", "Republic of the Congo", "Gabon", "Equatorial Guinea", "Sao Tome and Principe", "Cape Verde", "Guinea-Bissau", "Guinea", "Sierra Leone", "Liberia", "Togo", "Benin", "Rwanda", "Burundi", "Djibouti", "Eritrea", "Somalia", "Comoros", "Mauritius", "Seychelles", "Lesotho", "Swaziland", "Eswatini", "Gambia"];
  //     return africanCountries.some(country => woman?.c?.includes(country));
  //   }
  // },
  "Women from the Philippines": {
    description: "Name 10 notable women from the Philippines",
    filter: (woman) => woman?.c === "Philippines" || woman?.c === "Philippine Islands"
  },
  "Women from Korea": {
    description: "Name 10 notable women from Korea (North or South)",
    filter: (woman) => woman?.c === "South Korea" || woman?.c === "North Korea" || woman?.c === "Korea"
  },
  "Women Actresses": {
    description: "Name 10 women who are notable actresses",
    filter: (woman) => woman?.j?.some(job => ['actress', 'actor', 'television actor', 'film actor', 'voice actor', 'stage actor'].includes(job))
  },
  "Women Film Directors": {
    description: "Name 10 women who are notable film directors",
    filter: (woman) => woman?.j?.some(job => ['director', 'film director', 'filmmaker'].includes(job))
  },
  "Women Rappers": {
    description: "Name 10 women who are notable rappers or hip-hop artists",
    filter: (woman) => woman?.j?.some(job => ['rapper', 'hip-hop musician', 'MC'].includes(job))
  },
  "Women in Sports": {
    description: "Name 10 women who are notable athletes or sports figures",
    filter: (woman) => woman?.j?.some(job => ['athlete', 'tennis player', 'swimmer', 'runner', 'gymnast', 'basketball player', 'soccer player', 'golfer', 'boxer', 'martial artist', 'volleyball player', 'softball player', 'track and field', 'olympic competitor', 'sports figure', 'long-distance runner', 'sport cyclist', 'professional wrestler', 'amateur wrestler', 'sportsperson', 'athletics competitor', 'long jumper', 'association football player', 'rugby union player', 'rugby sevens player', 'sprinter', 'netballer', 'kickboxer', 'mixed martial arts fighter', 'baseball player', 'American football player', 'Australian rules football player', 'cricketer'].includes(job))
  },
  "Women Named Anna": {
    description: "Name 10 women with Anna as their first or last name",
    filter: (woman) => woman?.n?.toLowerCase().includes('anna')
  },
};
