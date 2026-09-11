import type { CollectionEntry } from "astro:content";

export type WriteupEntry = CollectionEntry<"writeups">;

const getGameLevel = (entry: WriteupEntry) => {
  const fileName = entry.id.split("/").at(-1) ?? entry.id;
  const match = fileName.match(/^([a-z]+)(\d*)$/i);

  return {
    game: match?.[1] ?? entry.data.game,
    level: match?.[2] ? Number(match[2]) : Number.parseInt(entry.data.level, 10),
  };
};

export const sortWriteupsByGameLevel = (a: WriteupEntry, b: WriteupEntry) => {
  const aLevel = getGameLevel(a);
  const bLevel = getGameLevel(b);

  return (
    a.data.platform.localeCompare(b.data.platform) ||
    aLevel.game.localeCompare(bLevel.game) ||
    aLevel.level - bLevel.level ||
    a.data.title.localeCompare(b.data.title)
  );
};
