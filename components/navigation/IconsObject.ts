import { FaInstagram, FaSpotify, FaTiktok, FaYoutube } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import { ImSoundcloud2 } from "react-icons/im";
import { FC } from "react";
const linkHref = {
  linkedin: "https://www.linkedin.com/in/juha-savikko/",
  instagram: "https://www.instagram.com/juhamikaell",
  spotify:
    "https://open.spotify.com/artist/2heJl7jzvTYoHyR5xwSSea?si=21da2248a57e49f4",
  discord: "https://discord.gg/KgSJauHmWC",
  soundcloud: "https://soundcloud.com/juhasmusic",
  youtube: "https://www.youtube.com/@Juhamikael",
  tiktok: "https://www.tiktok.com/@juhamikaelmusic",
  facebook: "https://www.facebook.com/juhasmusic",
} as const;

type SocialLink = {
  icon: FC;
  href: string;
};

export type LinkKey = keyof typeof linkHref;

export const IconsObject: Record<string, SocialLink> = {
  linkedin: {
    icon: BsLinkedin,
    href: linkHref.linkedin,
  },
  instagram: {
    icon: FaInstagram,
    href: linkHref.instagram,
  },
  discord: {
    icon: IoLogoDiscord,
    href: linkHref.discord,
  },
  spotify: {
    icon: FaSpotify,
    href: linkHref.spotify,
  },
  soundcloud: {
    icon: ImSoundcloud2,
    href: linkHref.soundcloud,
  },
  youtube: {
    icon: FaYoutube,
    href: linkHref.youtube,
  },
  tiktok: {
    icon: FaTiktok,
    href: linkHref.tiktok,
  },
} as const;
