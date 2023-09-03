"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signUp = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'email required!',
        }),
        email: zod_1.z.string({
            required_error: 'email required!',
        }),
        password: zod_1.z.string({
            required_error: 'password required!',
        }),
        role: zod_1.z.enum(['customer', 'admin'], {
            required_error: 'invalid role!',
        }),
        contactNo: zod_1.z.string({
            required_error: 'contact no required!',
        }),
        address: zod_1.z.string({
            required_error: 'address required!',
        }),
        profileImg: zod_1.z.string({
            required_error: 'profile img required!',
        }),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
exports.AuthValidation = {
    signUp,
    login,
};
