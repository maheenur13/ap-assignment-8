"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const utils_1 = require("../../../shared/utils");
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (data, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const orderDetails = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const orderedInfo = {
            userId: userData.userId,
        };
        const order = yield prisma_1.default.order.create({
            data: orderedInfo,
        });
        if (!order) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'unable to create order!');
        }
        yield (0, utils_1.asyncForEach)(data.orderedBooks, (orderBook) => __awaiter(void 0, void 0, void 0, function* () {
            yield transactionClient.orderedBook.create({
                data: {
                    quantity: orderBook.quantity,
                    bookId: orderBook.bookId,
                    orderId: order.id,
                },
            });
        }));
        return order;
    }));
    const order = yield prisma_1.default.order.findUnique({
        where: {
            id: orderDetails.id,
        },
        include: {
            orderedBooks: true,
        },
    });
    return order;
});
const getAllOrders = (userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const whereConditions = userDetails.role === 'customer'
        ? {
            userId: userDetails.userId,
        }
        : {};
    const result = yield prisma_1.default.order.findMany({
        where: whereConditions,
        include: {
            orderedBooks: true,
            user: true,
        },
    });
    return result;
});
const getSingleOrder = (id, userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const whereConditions = userDetails.role === 'customer'
        ? {
            userId: userDetails.userId,
            id: id,
        }
        : {
            id: id,
        };
    const result = yield prisma_1.default.order.findUnique({
        where: whereConditions,
        include: {
            orderedBooks: true,
            user: true,
        },
    });
    return result;
});
exports.orderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
