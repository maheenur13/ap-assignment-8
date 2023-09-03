"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/Auth/auth.routes");
const user_routes_1 = require("../modules/User/user.routes");
const category_routes_1 = require("../modules/Category/category.routes");
const book_routes_1 = require("../modules/Book/book.routes");
const order_routes_1 = require("../modules/Order/order.routes");
const profile_routes_1 = require("../modules/Profile/profile.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/categories',
        route: category_routes_1.categoryRoutes,
    },
    {
        path: '/books',
        route: book_routes_1.bookRoutes,
    },
    {
        path: '/orders',
        route: order_routes_1.orderRoutes,
    },
    {
        path: '/profile',
        route: profile_routes_1.profileRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
