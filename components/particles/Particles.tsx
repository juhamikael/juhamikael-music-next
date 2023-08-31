"use client";
import particlesConfigDarkTheme from "@/config/particles-config-dark-theme";
import particlesConfigLightTheme from "@/config/particles-config-light-theme";
import { useCallback, useState, useEffect } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes";

const ParticlesComponent = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log("particlesLoaded");
    },
    []
  );

  if (!mounted) {
    return null;
  }

  const particlesOptions =
    theme === "light" ? particlesConfigLightTheme : particlesConfigDarkTheme;

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
