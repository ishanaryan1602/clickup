import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().superRefine((val, ctx) => {
    if (!val) return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email is required" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
      return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid email address" });
    if (!val.endsWith(".com") && !val.endsWith(".in"))
      return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email domain not allowed" });
  }),
  password: z.string().superRefine((val, ctx) => {
    if (!val) return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Password is required" });
    if (val.length < 6)
      return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Password must be at least 6 characters long" });
  }),
});

export const registerSchema = z.object({
  username: z.string().superRefine((val, ctx) => {
    if (!val)
      return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Username is required" });
    if (val.length < 3)
      return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Username must be at least 3 characters long" });
  }),
  email: z.string().superRefine((val, ctx) => {
    if (!val) return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email is required" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
      return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid email address" });
    if (!val.endsWith(".com") && !val.endsWith(".in"))
      return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email domain not allowed" });
  }),
  password: z.string().superRefine((val, ctx) => {
    if (!val) return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Password is required" });
    if (val.length < 6)
      return ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Password must be at least 6 characters long" });
  }),
});