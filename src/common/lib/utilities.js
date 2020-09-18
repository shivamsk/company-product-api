export function getValueByPath (obj, path) {
  return path.split('.')
    .reduce((previousValue, currentValue) => {
      return previousValue ? previousValue[currentValue] : undefined;
    }, obj);
}

export async function validate(request, validation,logger) {
  try {
    const { error } = Joi.validate(request, validation, { abortEarly: false });

    if (error && error.details) {
      logger.error(`ValidationError :${error.details}`);
      const errorDetails = [];
      error.details.forEach((detailObject) => {
        errorDetails.push(detailObject.message);
      });
      logger.error(`ErrorDetails${JSON.stringify(errorDetails)}`);
      throw new Error(errorDetails);
    }
  } catch (err) {
    logger.error(`Error ${err}`);
    throw err;
  }
}
