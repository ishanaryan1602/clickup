import logger from '../utils/logger.js';
import { simplifyZodErrorName, simplifyZodErrors } from '../utils/zodUtils.js';
import {StatusCodes,ReasonPhrases} from 'http-status-codes';

export const validate = (schema, pick = 'body') => (req, _res, next) => {
    const input = pick === 'query' ? req.query : pick === 'params' ? req.params : req.body;

    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      const message = simplifyZodErrorName(parsed);
      const errors = simplifyZodErrors(parsed);
      for(const err of errors) {
        logger.error(`Validation failed: ${JSON.stringify(err.issue)}`);
      }

      return next({
        status: StatusCodes.BAD_REQUEST,
        info: ReasonPhrases.BAD_REQUEST,
        message,
        errors,
      });
    }

    if (pick === 'query') req.validatedQuery = parsed.data;
    else if (pick === 'params') req.validatedParams = parsed.data;
    else req.validatedBody = parsed.data;

    return next();
  };
