import { errorResponse } from "../utils/response.js";

const notFound = (req, res) => {
    return errorResponse(res, {
        statusCode: 404,
        message: "Route not found.",
    });
};

export default notFound;