export type PublicCategory = {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  iconKey: string;
  subcategories?: string[];
};
