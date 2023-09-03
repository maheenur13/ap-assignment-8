### Live Link: https://book-catalog-ass-8.onrender.com/api/v1

### Application Routes:

#### Auth

- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)

#### User

- api/v1/users (GET)
- api/v1/users/579d2552-574a-4d0b-86d9-6641981fd9f7 (Single GET) Include an id that is saved in your database
- api/v1/users/579d2552-574a-4d0b-86d9-6641981fd9f7 (PATCH)
- api/v1/users/579d2552-574a-4d0b-86d9-6641981fd9f7 (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/e0b210a9-4c26-4c21-b14c-229a3e2deb0a (Single GET) Include an id that is saved in your database
- api/v1/categories/e0b210a9-4c26-4c21-b14c-229a3e2deb0a (PATCH)
- api/v1/categories/e0b210a9-4c26-4c21-b14c-229a3e2deb0a (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/e0b210a9-4c26-4c21-b14c-229a3e2deb0a/category (GET)
- api/v1/books/adf0c4fd-f6b7-4f08-bb2c-abc79e39f3b6 (GET)
- api/v1/books/adf0c4fd-f6b7-4f08-bb2c-abc79e39f3b6 (PATCH)
- api/v1/books/adf0c4fd-f6b7-4f08-bb2c-abc79e39f3b6 (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/1332e46b-c1aa-4ad2-baec-deea23857994 (GET)
