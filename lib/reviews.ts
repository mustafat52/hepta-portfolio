// PENDING: add only the real reviews and client names that Hepta provides.
// Replace each placeholder entry below. Add or remove entries as needed.
export type Review = { quote: string; name: string; project: string };

export const REVIEWS: Review[] = [
  { quote: "[Client review to be provided by Hepta]", name: "[Client name 1]", project: "[Project name]" },
  { quote: "[Client review to be provided by Hepta]", name: "[Client name 2]", project: "[Project name]" },
  { quote: "[Client review to be provided by Hepta]", name: "[Client name 3]", project: "[Project name]" },
];

// Leave as null until Hepta provides a real rating and project count, for example { score: "4.9", count: "30+" }.
export const RATING: { score: string; count: string } | null = null;
