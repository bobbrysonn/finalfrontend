import {z} from "zod";

export const PasswordResetConfirmationSchema = z.object({
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .max(20, {message: "Password should not exceed 20 characters long"})
        .refine((data) => /[A-Z]/.test(data), {
            message: "Password must have at least one uppercase letter",
        })
        .refine((data) => /[a-z]/.test(data), {
            message: "Password must have at least one lowercase letter",
        })
        .refine((data) => /[0-9]/.test(data), {
            message: "Password must have at least one number",
        })
        .refine((data) => /[!@#$%^&*(),.?":{}|<>-]/.test(data), {
            message: "Password must have at least one special character",
        }),
    confirmPassword: z.string(),
});

export const LoginFormSchema = z.object({
    netID: z.string(),
    password: z.string().min(8),
});

export const PasswordResetFormSchema = z.object({
    email: z
        .string()
        .email()
        .regex(/^[a-zA-Z]+(\.[a-zA-Z]+)*\.\d+@dartmouth\.edu$/, {
            message: "Email must be valid dartmouth address",
        }),
});

export const RegisterFormSchema = z
    .object({
        netID: z.string(),
        password: z
            .string()
            .min(8, {message: "Password must be at least 8 characters long"})
            .max(20, {message: "Password should not exceed 20 characters long"})
            .refine((data) => /[A-Z]/.test(data), {
                message: "Password must have at least one uppercase letter",
            })
            .refine((data) => /[a-z]/.test(data), {
                message: "Password must have at least one lowercase letter",
            })
            .refine((data) => /[0-9]/.test(data), {
                message: "Password must have at least one number",
            })
            .refine((data) => /[!@#$%^&*(),.?":{}|<>-]/.test(data), {
                message: "Password must have at least one special character",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export const ReviewFormSchema = z.object({
    courseRating: z.coerce.number().int().min(1).max(10),
    layup: z.boolean(),
    medianGrade: z.enum([
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "D-",
        "E",
        "F",
    ]),
    professorEmail: z
        .string()
        .regex(/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@dartmouth\.edu$/, {
            message: "Professor email must be valid dartmouth address",
        }),
    professorRating: z.coerce.number().int().min(1).max(10),
    review: z
        .string()
        .min(100, {message: "Review must be at least 100 characters long"}),
    term: z.string().regex(/^\d{2}[FWSX]$/, {
        message: "Term must be in the format 24F, 24W, 24S or 24X",
    }),
});

export type Course = {
    id: number;
    title: string;
    layup: number;
    rating: number;
    url: string;
};

export type Department = {
    id: number;
    short_name: string;
    long_name: string;
    courses: Course[];
    course_count: number;
};

export type ReviewDataSchema = {
    content: string;
    course: string;
    course_rating: number;
    term: string;
    professor: string;
    professor_rating: number;
    median:
        "A" |
        "A-" |
        "B+" |
        "B" |
        "B-" |
        "C+" |
        "C" |
        "C-" |
        "D+" |
        "D" |
        "D-" |
        "E" |
        "F";
    student: string | null | undefined;
    layup: boolean;
}
