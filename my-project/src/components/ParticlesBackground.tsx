import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: {
                    enable: false, // disable full screen so we control it manually
                },
                background: {
                    color: {
                        value: "#0f172a",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: "push" },
                        onHover: { enable: true, mode: "repulse" },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 4 },
                        repulse: { distance: 100, duration: 0.4 },
                    },
                },
                particles: {
                    color: { value: "#ffffff" },
                    links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: false,
                        straight: false,
                        outModes: "bounce",
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 60,
                    },
                    opacity: { value: 0.5 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 4 } },
                },
                detectRetina: true,
            }}
        />
    );
}
