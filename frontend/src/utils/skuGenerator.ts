function slugify(text: string, length = 4): string {
    return text
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, length);
  }
  
  const sizeCodeMap: Record<string, string> = {
    "extra small": "XS",
    "xs": "XS",
    "small": "SM",
    "s": "SM",
    "medium": "MD",
    "m": "MD",
    "large": "LG",
    "l": "LG",
    "extra large": "XL",
    "xl": "XL",
    "2xl": "2X",
    "xxl": "2X",
    "3xl": "3X",
    "xxxl": "3X",
    "4xl": "4X",
    "xxxxl": "4X",
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
    name: string;
    brand: string;
    variant?: string | null;
    category?: string | null;
    color?: string | null;
  };
  
  export default function generateSKU({
    name,
    brand,
    variant,
    category,
    color,
  }: skuProps): string {
    const brandCode = slugify(brand);
    const nameCode = slugify(name);
    const categoryCode = category ? slugify(category, 4) : null;
    const colorCode = getColorCode(color);
    const variantCode = getSizeCode(variant);
  
    const parts: string[] = [brandCode, nameCode];
  
    if (categoryCode) parts.push(categoryCode);
    if (colorCode) parts.push(colorCode);
    if (variantCode) parts.push(variantCode);
  
    return parts.join("-");
  }
  