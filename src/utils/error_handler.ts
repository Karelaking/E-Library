import createHttpError from "http-errors";

const errorHandler = (
  statusCode: number = 500,
  message: string = "something went wrong...",
) => {
  const error = createHttpError(
    statusCode,
    message,
  );
  return error;
};

export default errorHandler;
