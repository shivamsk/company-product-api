/**
 * Accepted indicates that the request has been accepted for further processing.
 */
export const Accepted = 202;

/**
 * BadGateway indicates that an intermediate proxy server received a bad
 * response from another proxy or the origin server.
 */
export const BadGateway = 502;

/**
 * BadRequest indicates that the request could not be understood by the server.
 * BadRequest is sent when no other error is applicable, or if the exact error
 * is unknown or does not have its own error code.
 */
export const BadRequest = 400;

/**
 * Created indicates that the request resulted in a new resource created before
 * the response was sent.
 */
export const Created = 201;

/**
 * Forbidden indicates that the server refuses to fulfill the request.
 */
export const Forbidden = 403;


/**
 * InternalServerError indicates that a generic error has occurred on the
 * server.
 */
export const InternalServerError = 500;

/**
 * NotFound indicates that the requested resource does not exist on the server.
 */
export const NotFound = 404;

/**
 * OK indicates that the request succeeded and that the requested information
 * is in the response. This is the most common status code to receive.
 */
export const OK = 200;
/**
 * PartialContent indicates that the response is a partial response as
 * requested by a GET request that includes a byte range.
 */
