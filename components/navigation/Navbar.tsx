"use client";
import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt2 as Menu } from "react-icons/hi";
import { ImCross as X } from "react-icons/im";
import navItemStyles from "@/app/styles/underline-hover.module.css";
import { ToggleNightMode } from "@/components/ToggleNightmode";
import type { IIconDetail } from "./Icons";
import Icons from "./Icons";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  pageName: string;
};

type INavLinksListProps = {
  isOpen: boolean;
  links: (keyof typeof NavLinksObject)[];
};

const NavLinksObject = {
  home: {
    href: "/",
    pageName: "Home",
  },
  about: {
    href: "/about",
    pageName: "About",
  },
  blog: {
    href: "/blog",
    pageName: "Blog",
  },
  releases: {
    href: "/releases",
    pageName: "Releases",
  },
  downloads: {
    href: "/downloads",
    pageName: "Downloads",
  },
  contact: {
    href: "/contact",
    pageName: "Contact",
  },
};

const NavLink: FC<NavLinkProps> = ({ href, pageName }) => {
  const pathName = usePathname();
  return (
    <Link
      aria-label={pageName}
      style={{
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
      href={href}
      target={"_self"}
      className={cn(
        "text-card-foreground hover:text-primary/80 text-sm transition-colors",
        pathName === href ? "font-bold " : "",
        navItemStyles.underlineHover
      )}
    >
      {pageName}
    </Link>
  );
};

const NavLinksList: FC<INavLinksListProps> = ({ links, isOpen }) => {
  return (
    <div
      className={`flex flex-col space-y-2 lg:flex-row lg:space-x-6 lg:justify-center lg:w-full ${
        isOpen ? "block transform-none opacity-100" : "hidden"
      } lg:block block duration-500 ease-in-out transition-opacity `}
    >
      {links.map((linkKey) => {
        const { href, pageName } = NavLinksObject[linkKey];
        return <NavLink href={href} pageName={pageName} key={linkKey} />;
      })}
    </div>
  );
};

const Navbar = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const iconDetails: IIconDetail[] = [
    "spotify",
    "instagram",
    "youtube",
    "discord",
    "soundcloud",
  ].map((iconKey) => ({
    key: iconKey,
  }));

  return (
    <nav className="p-4 flex flex-col lg:flex-row lg:items-center lg:mx-20">
      <div className="fixed right-0 p-4 top-0">
        <ToggleNightMode
          className={`${isOpen ? "block" : "hidden"} lg:block `}
        />
      </div>
      <div className="lg:mx-auto items-center gap-x-4">
        <button
          className={`flex lg:hidden self-center mt-2`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen && (
            <Menu className="text-3xl hover:text-primary hover:ring ring-primary/20 rounded-lg" />
          )}
        </button>
        <div className="flex justify-center lg:flex-col">
          {isOpen && (
            <button
              className={`flex lg:hidden items-center self-center mt-2 -ml-6`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen && <X className="text-lg mr-6" />}
            </button>
          )}
          <NavLinksList
            isOpen={isOpen}
            links={[
              "home",
              "about",
              "blog",
              "releases",
              "downloads",
              "contact",
            ]}
          />
          <div className="flex items-center lg:justify-center lg:mt-4 ">
            <Icons isOpen={isOpen} icons={iconDetails} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
