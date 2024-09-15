import * as dotenv from 'dotenv';

dotenv.config();

export const AppConfig: any = process.env;

import * as Joi from 'joi';

export const AppConfigValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'test')
    .default('development'),

  PORT: Joi.number().required(),
  APPLICATION_KEY: Joi.number().required(),
  DATABASE_URI: Joi.string().required(),
  NEWSAPI_KEY: Joi.string().required(),
  OPENAI_API_KEY: Joi.string().required()
});
