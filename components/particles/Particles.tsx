"use client";
import particlesConfigDarkTheme from "@/config/particles-config-dark-theme";
import particlesConfigLightTheme from "@/config/particles-config-light-theme";
import { useCallback, useState, useEffect } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes";

const ParticlesComponent = () => {
  const { theme: initialTheme } = useTheme();
  const defaultTheme = "dark";

  const [theme, setTheme] = useState<string | null>(
    initialTheme || defaultTheme
  );

  useEffect(() => {
    if (initialTheme) {
      setTheme(initialTheme);
    }
  }, [initialTheme]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log("particlesLoaded");
    },
    []
  );

  const particlesOptions =
    theme === "dark" ? particlesConfigDarkTheme : particlesConfigLightTheme;

  return (
    <Particles
      key={theme}
      id="tsparticles"
      options={particlesOptions as any}
      init={particlesInit}
      loaded={particlesLoaded}
    />
  );
};

export default ParticlesComponent;
