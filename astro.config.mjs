import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://LetUsTakeANapForever.github.io",
  base: "/CTF-writeups",
  integrations: [
    starlight({
      title: "Nidchamon's CTF Journey",
      description: "Practical CTF walkthroughs, commands, and lessons learned.",
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/LetUsTakeANapForever/CTF-writeups",
        },
      ],
      sidebar: [
        {
          label: "OverTheWire",
          items: [
            {
              label: "Bandit",
              collapsed: false,
              items: [
                {
                  label: "Level 0",
                  link: "/writeups/overthewire/bandit/",
                  badge: "Easy",
                },
                {
                  label: "Level 0 → Level 1",
                  link: "/writeups/overthewire/bandit0/",
                  badge: "Easy",
                },
                {
                  label: "Level 1 → Level 2",
                  link: "/writeups/overthewire/bandit1/",
                  badge: "Easy",
                },
                {
                  label: "Level 2 → Level 3",
                  link: "/writeups/overthewire/bandit2/",
                  badge: "Easy",
                },
                {
                  label: "Level 3 → Level 4",
                  link: "/writeups/overthewire/bandit3/",
                  badge: "Easy",
                },
              ],
            }
          ],
        },
      ],
    }),
  ],
});
