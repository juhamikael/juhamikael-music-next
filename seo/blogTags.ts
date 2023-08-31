const tagsForBlog = {
  flStudio: "FL Studio",
  ableton: "Ableton",
  musicProduction: "Music Production",
  musicTheory: "Music Theory",
  musicBusiness: "Music Business",
  musicMarketing: "Music Marketing",
  musicIndustry: "Music Industry",
  musicCareer: "Music Career",
  musicJobs: "Music Jobs",
  imposterSyndrome: "Imposter Syndrome",
  improvement: "Improvement",
  motivation: "Motivation",
  productivity: "Productivity",
  creativity: "Creativity",
  inspiration: "Inspiration",
  music: "Music",
  musicSoftware: "Music Software",
  tools: "Tools",
  plugins: "Plugins",
  vst: "VST",
  samples: "Samples",
} as const;

export const BlogTags = Object.entries(tagsForBlog).map(([key, value]) => ({
  value: key,
  label: value,
}));
