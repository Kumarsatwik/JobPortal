const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string().min(4).max(30).required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  email: Joi.string()
    .required()
    .lowercase()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "edu"] },
    }),
  phone: Joi.string().required().min(10).max(10),
});

module.exports = registerValidation;
