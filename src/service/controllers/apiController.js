import * as HttpStatus from '../../common/httpStatusCodes';

class ApiController {
  constructor(logger) {
    this.logger = logger;
  }

  httpCreated(response, data) {
    this.sendResponse(response, HttpStatus.Created, data);
  }

  httpOk(response, data) {
    this.sendResponse(response, HttpStatus.OK, data);
  }

  httpInternalServerError(response, data) {
    this.sendErrorResponse(response, HttpStatus.InternalServerError, data);
  }

  httpNotFound(response, data) {
    this.sendResponse(response, HttpStatus.NotFound, data);
  }

  httpBadRequest(response, data) {
    this.sendErrorResponse(response, HttpStatus.BadRequest, data);
  }

  httpUnauthorized(response, data) {
    this.sendErrorResponse(response, HttpStatus.Unauthorized, data);
  }

  httpForbideen(response, data) {
    this.sendErrorResponse(response, HttpStatus.Forbidden, data);
  }

  sendResponse(response, code, data) {
    return response.status(code).json({
      body: data,
    });
  }

  sendErrorResponse(response, code, error) {
    this.logger.error(`error : ${JSON.stringify(error)}`);

    return response.status(code).json({
      error: {
        message: error.message,
      },
    });
  }
}

export default ApiController;
