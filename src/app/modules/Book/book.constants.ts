export const bookFilterableFields = [
  'searchTerm',
  'categoryId',
  'minPrice',
  'maxPrice',
  'category',
];

export const bookSearchableFields = ['title', 'author', 'genre'];

export const bookRelationalFields: string[] = [
  'category',
  'minPrice',
  'maxPrice',
];

export const bookRelationalFieldsMapper: { [key: string]: string } = {
  category: 'category',
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
};
