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
                  link: "/writeups/overthewire/bandit0/",
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
