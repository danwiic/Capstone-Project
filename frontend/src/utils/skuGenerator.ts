function slugify(text: string, length = 4): string {
  const noVowels =
    text.length <= 3
      ? text.toUpperCase().slice(0, length)
      : text
          .replace(/[aeiou]/gi, "")
          .toUpperCase()
          .slice(0, length);

  return noVowels;
}

const sizeCodeMap: Record<string, string> = {
  "extra small": "XS",
  xs: "XS",
  small: "SM",
  s: "SM",
  medium: "MD",
  m: "MD",
  large: "LG",
  l: "LG",
  "extra large": "XL",
  xl: "XL",
  "2xl": "2X",
  xxl: "2X",
  "3xl": "3X",
  xxxl: "3X",
  "4xl": "4X",
  xxxxl: "4X",
};

function getSizeCode(variant?: string | null): string | null {
  if (!variant) return null;
  const cleaned = variant.toLowerCase().replace(/[^a-z0-9]/g, "");
  return sizeCodeMap[cleaned] || slugify(variant, 4);
}

const colorCodeMap: Record<string, string> = {
  yellow: "YLW",
  black: "BLK",
  white: "WHT",
  gray: "GRY",
  grey: "GRY",
  green: "GRN",
  blue: "BLU",
  red: "RED",
  orange: "ORG",
  brown: "BRN",
  purple: "PRP",
  pink: "PNK",
  gold: "GLD",
  silver: "SLV",
  "matte black": "MTBLK",
  "matte gray": "MTGRY",
};

function getColorCode(color?: string | null): string | null {
  if (!color) return null;
  const cleaned = color.toLowerCase().trim();
  if (colorCodeMap[cleaned]) return colorCodeMap[cleaned];

  // Default: remove vowels and slugify fallback
  const noVowels = cleaned.replace(/[aeiou]/gi, "");
  return slugify(noVowels, 4);
}

type skuProps = {
  name?: string;
  brand: string;
  variant?: string | null;
  category?: string | null;
  color?: string | null;
  id?: string | null;
};

export default function generateSKU({
  name,
  brand,
  variant,
  category,
  color,
  id,
}: skuProps): string {
  const brandCode = slugify(brand.replace(/\s+/g, ''), 5);
  // const nameCode = slugify(name, 4);
  const categoryCode = category ? slugify(category.replace(/\s+/g, ''), 5) : null;
  const colorCode = getColorCode(color);
  const variantCode = getSizeCode(variant);
  const idCode = id ? id.slice(0, 4).toUpperCase() : null;

  const parts: string[] = [brandCode];

  if (categoryCode) parts.push(categoryCode);
  if (name) parts.push(slugify(name.replace(/\s+/g, ''), 4));
  if (colorCode) parts.push(colorCode);
  if (idCode) parts.push(idCode);
  if (variantCode) parts.push(variantCode);

  return parts.join("-");
}
