import { defineCollection} from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writeups = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writeups" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(5).max(180),
    date: z.date(),
    platform: z.enum(["OverTheWire"]),
    game: z.enum(["Bandit"]),
    level: z.string().min(1),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    category: z.enum(["Linux", "Web", "Cryptography", "Forensics", "Pwn", "Misc"]),
    tags: z.array(z.string().min(1)).min(1),
  }),
});

export const collections = { writeups };
