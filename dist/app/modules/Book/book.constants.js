"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    'searchTerm',
    'categoryId',
    'minPrice',
    'maxPrice',
    'category',
];
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookRelationalFields = [
    'category',
    'minPrice',
    'maxPrice',
];
exports.bookRelationalFieldsMapper = {
    category: 'category',
    minPrice: 'minPrice',
    maxPrice: 'maxPrice',
};
