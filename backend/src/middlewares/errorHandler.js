import { Prisma } from '@prisma/client';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';


const mapPrismaKnownError = (err) => {
    // Unique constraint
    if (err.code === 'P2002') {
        const targets = Array.isArray(err.meta?.target) ? err.meta.target : [];
        const field = targets[0] || 'unique';
        const isEmail = targets.includes('email');
        return {
            status: StatusCodes.CONFLICT,
            info: ReasonPhrases.CONFLICT,
            message: isEmail ? 'EmailId already in use.' : 'Duplicate value.',
            errors: [{ field, issue: 'Duplicate value violates unique constraint.' }],
        };
    }

    // Record not found
    if (err.code === 'P2025') {
        return {
            status: StatusCodes.NOT_FOUND,
            info: ReasonPhrases.NOT_FOUND,
            message: 'Requested resource was not found.',
            errors: [{ field: 'id', issue: 'No matching record.' }],
        };
    }

    // Foreign key constraint
    if (err.code === 'P2003') {
        const field = err.meta?.field_name || 'foreign_key';
        return {
            status: StatusCodes.BAD_REQUEST,
            info: ReasonPhrases.BAD_REQUEST,
            message: 'Related resource is invalid.',
            errors: [{ field, issue: 'Constraint failed.' }],
        };
    }

    // Default for other known request errors
    return {
        status: StatusCodes.BAD_REQUEST,
        info: 'DATABASE_ERROR',
        message: 'Request could not be completed.',
        errors: [{ field: 'database', issue: 'Unhandled database error.' }],
    };
};

export const errorHandler = (err, req, res, _next) => {
    // Prisma: DB not reachable / init failure
    if (err instanceof Prisma.PrismaClientInitializationError) {
        return res.error({
            status: StatusCodes.SERVICE_UNAVAILABLE,
            info: 'DATABASE_ERROR',
            message: 'Service temporarily unavailable.',
            errors: [],
        });
    }

    // Prisma: invalid query shape (often developer error or bad input)
    if (err instanceof Prisma.PrismaClientValidationError) {
        return res.error({
            status: StatusCodes.BAD_REQUEST,
            info: ReasonPhrases.BAD_REQUEST,
            message: 'Invalid database query.',
            errors: [{ field: 'query', issue: 'Validation failed for database operation.' }],
        });
    }

    // Prisma: known request errors with codes (P2002, P2025, etc.)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const mapped = mapPrismaKnownError(err);
        return res.error(mapped);
    }

    // Your own BAD_REQUEST objects passed via next({ status:400, info:'BAD_REQUEST', ... })
    if (err?.info === 'BAD_REQUEST' && err?.status === 400) {
        return res.error(err);
    }

    // Fallback
    return res.error({
        status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
        info: err.info || ReasonPhrases.INTERNAL_SERVER_ERROR,
        message: err.message
            ? err.message
            : 'An unexpected error occurred. Please try again later.',
        errors: Array.isArray(err.errors) ? err.errors : [],
    });
};
