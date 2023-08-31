type IPlatformAndEmbed = {
  platform: string;
  embed: string;
};

function matchPlatformAndGetId(url: string): IPlatformAndEmbed | undefined {
  if (url.includes("youtube")) {
    return {
      platform: "youtube",
      embed: `https://www.youtube.com/embed/${url.split("=")[1]}?rel=0`,
    };
  } else if (url.includes("soundcloud")) {
    return {
      platform: "soundcloud",
      //
      embed: `https://w.soundcloud.com/player/?url=${url}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`,
    };
  } else if (url.includes("spotify")) {
    const id = url.split("/")[4].split("?")[0];
    return {
      platform: "spotify",
      embed: `https://open.spotify.com/embed/track/${id}?utm_source=generator`,
    };
  }
}

const parsePlatform = (url: string) => {
  if (url.includes("spotify")) {
    return "spotify";
  }
  if (url.includes("soundcloud")) {
    return "soundcloud";
  }
  if (url.includes("youtube")) {
    return "youtube";
  }
};

export { matchPlatformAndGetId, parsePlatform };
