export const $ = (id) => document.getElementById(id);

export const smoothTo = (hash) => {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const parseStatText = (text) => {
  if (!text) return null;
  const match = text.match(/-?\d[\d,]*\.?\d*/);
  if (!match) return null;
  const raw = match[0];
  const number = parseFloat(raw.replace(/,/g, ""));
  if (Number.isNaN(number)) return null;
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const suffix = text.replace(raw, "");
  return { number, decimals, suffix, hasComma: raw.includes(",") };
};
