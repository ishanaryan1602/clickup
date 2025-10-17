export const responseHandler = (req, res, next) => {
    res.success = ({
        status = 200,
        info = "OK",
        message = "Request was successfull",
        data = {},
        success = true,
    } = {}) => {
        res.status(status).json({
            status,
            info,
            success,
            message,
            data
        });
    };

    res.error = (errorObj = {}) => {

        const statusCode = errorObj.status || 500;
        const info = errorObj.name?.toLowerCase().includes('prisma')
            ? 'DATABASE_ERROR'
            : errorObj?.info || 'INTERNAL_SERVER_ERROR';
        const message = errorObj.name?.toLowerCase().includes('prisma')
            ? "An unexpected error occurred. Please try again later."
            : errorObj.message || 'An unexpected error occurred. Please try again later.';
        const errors = Array.isArray(errorObj.errors) ? errorObj.errors : [];

        return res.status(statusCode).json({
            statusCode,
            success: false,
            info,
            message,
            errors
        });

    };

    next();
};
