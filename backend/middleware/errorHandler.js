import { errorResponse } from "../utils/response.js";

const errorHandler = (err, req, res, next) => {
    console.error(err);

    return errorResponse(res, {
        statusCode: err.status || 500,
        message: err.message || "Internal Server Error.",
    });
};

export default errorHandler;