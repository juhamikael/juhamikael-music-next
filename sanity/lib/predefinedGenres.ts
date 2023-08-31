const GenreObject = {
  progressiveHouse: "Progressive House",
  tropicalHouse: "Tropical House",
  deepHouse: "Deep House",
  house: "House",
  techHouse: "Tech House",
  techno: "Techno",
  trance: "Trance",
  hardstyle: "Hardstyle",
} as const;

export const predefinedGenres = Object.entries(GenreObject).map(
  ([key, value]) => ({
    value: key,
    label: value,
  })
);
