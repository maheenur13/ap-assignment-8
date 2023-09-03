import { z } from 'zod';

const signUp = z.object({
  body: z.object({
    name: z.string({
      required_error: 'email required!',
    }),
    email: z.string({
      required_error: 'email required!',
    }),
    password: z.string({
      required_error: 'password required!',
    }),
    role: z.enum(['customer', 'admin'], {
      required_error: 'invalid role!',
    }),
    contactNo: z.string({
      required_error: 'contact no required!',
    }),
    address: z.string({
      required_error: 'address required!',
    }),
    profileImg: z.string({
      required_error: 'profile img required!',
    }),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

export const AuthValidation = {
  signUp,
  login,
};
