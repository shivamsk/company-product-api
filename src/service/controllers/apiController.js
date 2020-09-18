import * as HttpStatus from '../../common/httpStatusCodes';

class ApiController {
  constructor() {
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

  httpNotContent(response) {
    return response.status(HttpStatus.NoContent).end();
  }

  httpBadRequest(response, data) {
    this.sendResponse(response, HttpStatus.BadRequest, data);
  }

  httpUnauthorized(response, data) {
    this.sendResponse(response, HttpStatus.Unauthorized, data);
  }

  sendResponse(response, code, data) {
    return response.status(code).json({
      body: data,
    });
  }

  sendErrorResponse(response, code, error) {
    return response.status(code).json({
      error: {
        message: error.message,
      },
    });
  }
}

export default ApiController;
