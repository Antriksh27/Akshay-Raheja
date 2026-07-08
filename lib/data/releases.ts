export interface Release {
  id: string;
  title: string;
  project: string;
  projectType: "film" | "series" | "single" | "EP" | "independent";
  creditAs: "Akshay Raheja" | "Akshay & IP";
  role: ("composer" | "producer" | "lyricist")[];
  year: number;
  releaseDate: string;
  isRecreation: boolean;
  originalTrackRef?: {
    title: string;
    composer: string;
    year: number;
  };
  embedUrl: string;
  coverArtPath: string;
  youtubeId?: string;
  contextLine: string;
  featured: boolean;
}


export const releases: Release[] = [
  // AKSHAY & IP
  {
    id: "ae-ri-sakhi",
    title: "Ae Ri Sakhi",
    project: "Subedaar",
    projectType: "film",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2026,
    releaseDate: "2026-03-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/ae-ri-sakhi.jpg",
    youtubeId: "XP8WZiHAlbg",
    contextLine: "A sarod and sarangi-led arrangement featuring Shreya Ghoshal.",
    featured: true,
  },
  {
    id: "choli-ke-peeche",
    title: "Choli Ke Peeche",
    project: "Crew",
    projectType: "film",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2024,
    releaseDate: "2024-03-01T00:00:00Z",
    isRecreation: true,
    originalTrackRef: {
      title: "Choli Ke Peeche Kya Hai",
      composer: "Laxmikant-Pyarelal",
      year: 1993,
    },
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/choli-ke-peeche.jpg",
    youtubeId: "co4EBYZZhg4",
    contextLine: "Reimagined classic preserving the original legacy.",
    featured: false,
  },
  {
    id: "sona-kitna-sona-hai",
    title: "Sona Kitna Sona Hai",
    project: "Crew",
    projectType: "film",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2024,
    releaseDate: "2024-03-15T00:00:00Z",
    isRecreation: true,
    originalTrackRef: {
      title: "Sona Kitna Sona Hai",
      composer: "Anand-Milind",
      year: 1997,
    },
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/sona-kitna-sona-hai.jpg",
    youtubeId: "LliE-j-HBu8",
    contextLine: "Respectful re-arrangement of a 90s staple.",
    featured: false,
  },
  {
    id: "dar-ba-dar",
    title: "Dar Ba Dar",
    project: "Crew",
    projectType: "film",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2024,
    releaseDate: "2024-04-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/dar-ba-dar.jpg",
    youtubeId: "p1Lvp_3yNOY",
    contextLine: "Original track driven by instinct and warm production.",
    featured: false,
  },
  {
    id: "dupahiya",
    title: "Dupahiya",
    project: "Dupahiya",
    projectType: "series",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2025,
    releaseDate: "2025-01-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/dupahiya.jpg",
    youtubeId: "EfqB8sbtWgc",
    contextLine: "Signature sound for the Dupahiya series.",
    featured: false,
  },
  {
    id: "gori-hai-kalaiyan",
    title: "Gori Hai Kalaiyan",
    project: "Mere Husband Ki Biwi",
    projectType: "film",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2025,
    releaseDate: "2025-05-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/gori-hai-kalaiyan.jpg",
    youtubeId: "7WH-Od55sgc",
    contextLine: "New arrangement for Mere Husband Ki Biwi.",
    featured: false,
  },
  {
    id: "ishq-e-desi",
    title: "Ishq-E-Desi",
    project: "Jassi Weds Jassi",
    projectType: "film",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2025,
    releaseDate: "2025-08-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/ishq-e-desi.jpg",
    youtubeId: "bsiyDixuapc",
    contextLine: "Original composition.",
    featured: false,
  },
  {
    id: "chunnari-chunnari",
    title: "Chunnari Chunnari – Let's Go!",
    project: "Hai Jawani Toh Ishq Hona Hai",
    projectType: "film",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2026,
    releaseDate: "2026-02-01T00:00:00Z",
    isRecreation: true,
    originalTrackRef: {
      title: "Chunnari Chunnari",
      composer: "Anu Malik",
      year: 2000,
    },
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/chunnari-chunnari.jpg",
    youtubeId: "XqdtZhYAVa0",
    contextLine: "Reimagined club-ready version.",
    featured: false,
  },
  {
    id: "chaanta-tera",
    title: "Chaanta Tera",
    project: "Happy Patel – Khatarnak Jasoos",
    projectType: "film",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2026,
    releaseDate: "2026-04-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/chaanta-tera.jpg",
    youtubeId: "O_exmqGxMV8",
    contextLine: "Action-comedy scoring and original track.",
    featured: false,
  },
  {
    id: "maa-behen",
    title: "Maa Behen",
    project: "Maa Behen",
    projectType: "EP",
    creditAs: "Akshay & IP",
    role: ["composer", "producer"],
    year: 2026,
    releaseDate: "2026-06-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/maa-behen.jpg",
    youtubeId: "RuicPHcCpLs",
    contextLine: "Lead track from the Maa Behen EP.",
    featured: false,
  },
  
  // AKSHAY RAHEJA SOLO
  {
    id: "shershaah",
    title: "Shershaah",
    project: "Shershaah",
    projectType: "film",
    creditAs: "Akshay Raheja",
    role: ["composer"],
    year: 2021,
    releaseDate: "2021-08-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/shershaah.jpg",
    contextLine: "Acclaimed original score for the biographical war drama.",
    featured: false,
  },
  {
    id: "kesari",
    title: "Kesari",
    project: "Kesari",
    projectType: "film",
    creditAs: "Akshay Raheja",
    role: ["composer"],
    year: 2019,
    releaseDate: "2019-03-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/kesari.jpg",
    contextLine: "Epic and intense original score.",
    featured: false,
  },
  {
    id: "runway-34",
    title: "Runway 34",
    project: "Runway 34",
    projectType: "film",
    creditAs: "Akshay Raheja",
    role: ["composer"],
    year: 2022,
    releaseDate: "2022-04-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/runway-34.jpg",
    contextLine: "Tension-driven aviation thriller score.",
    featured: false,
  },
  {
    id: "phillauri",
    title: "Phillauri",
    project: "Phillauri",
    projectType: "film",
    creditAs: "Akshay Raheja",
    role: ["composer"],
    year: 2017,
    releaseDate: "2017-03-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/phillauri.jpg",
    contextLine: "Whimsical period piece arrangements.",
    featured: false,
  },
  {
    id: "hichki",
    title: "Hichki",
    project: "Hichki",
    projectType: "film",
    creditAs: "Akshay Raheja",
    role: ["composer"],
    year: 2018,
    releaseDate: "2018-03-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/hichki.jpg",
    contextLine: "Heartwarming and emotional original score.",
    featured: false,
  },
  {
    id: "maska",
    title: "Maska",
    project: "Maska",
    projectType: "film",
    creditAs: "Akshay Raheja",
    role: ["composer"],
    year: 2015,
    releaseDate: "2015-01-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/maska.jpg",
    contextLine: "Early independent film score.",
    featured: false,
  },
  {
    id: "previous",
    title: "Previous",
    project: "Previous",
    projectType: "film",
    creditAs: "Akshay Raheja",
    role: ["composer"],
    year: 2015,
    releaseDate: "2015-06-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/previous.jpg",
    contextLine: "Solo legacy filmography entry.",
    featured: false,
  },
  {
    id: "sharafat-gayi-tel-lene",
    title: "Sharafat Gayi Tel Lene",
    project: "Sharafat Gayi Tel Lene",
    projectType: "film",
    creditAs: "Akshay Raheja",
    role: ["composer"],
    year: 2017,
    releaseDate: "2017-01-01T00:00:00Z",
    isRecreation: false,
    embedUrl: "PLACEHOLDER_SPOTIFY_EMBED",
    coverArtPath: "/images/covers/sharafat-gayi-tel-lene.jpg",
    contextLine: "Solo legacy filmography entry.",
    featured: false,
  }
];

export function getNowFeed(): Release[] {
  return releases
    .filter((r) => r.creditAs === "Akshay & IP")
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
}

export function getRecreations(): Release[] {
  return releases.filter((r) => r.isRecreation === true);
}

export function getFilmographyLegacy(): Release[] {
  return releases.filter((r) => r.creditAs === "Akshay Raheja" && r.projectType === "film");
}

export function getFeaturedRelease(): Release | undefined {
  return releases.find((r) => r.featured === true);
}
