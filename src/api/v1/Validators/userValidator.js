const Validator = require("fastest-validator");

const v = new Validator();

const userSchemaValidation = {
  full_name: {
    type: "string",
    min: 5,
    max: 125,
    trim: true,
    empty: false,
    messages: {
      required: "نام و نام خانوادگی الزامی است",
      stringMin: "نام و نام خانوادگی حداقل باید 5 کاراکتر باشد",
      stringMax: "نام و نام خانوادگی حداکثر می‌تواند 125 کاراکتر باشد",
    },
  },
  email: {
    type: "string",
    min: 5,
    max: 256,
    normalize: true,
    empty: false,
    messages: {
      required: "ایمیل الزامی است",
      email: "ایمیل وارد شده معتبر نیست",
      stringMin: "ایمیل حداقل باید 5 کاراکتر باشد",
      stringMax: "ایمیل حداکثر می‌تواند 256 کاراکتر باشد",
    },
  },
  password: {
    type: "string",
    min: 8,
    empty: false,
    messages: {
      required: "رمز عبور الزامی است",
      stringMin: "رمزعبور حداقل باید 8 کاراکتر باشد",
    },
  },
  confirm_password: {
    type: "equal",
    field: "password",
    empty: false,
    messages: {
      required: "تایید رمز عبور الزامی است",
      equalField: "رمز عبور و تکرار آن باید یکسان باشد",
    },
  },
  address: {
    type: "object",
    optional: true,
    props: {
      street: { type: "string", optional: true, nullable: true },
      city: { type: "string", optional: true, nullable: true },
      state: { type: "string", optional: true, nullable: true },
      zip: { type: "string", optional: true, nullable: true },
    },
  },
  phone_number: {
    type: "string",
    optional: true,
    nullable: true,
    messages: {
      string: "شماره تلفن باید یک مقدار متنی باشد",
    },
  },
  membership: {
    type: "string",
    default: false,
  },
  role: {
    type: "enum",
    values: ["USER", "ADMIN"],
    default: "USER",
    messages: {
      enumValue: "مقدار نقش نامعتبر است، باید USER یا ADMIN باشد",
    },
  },
};

const checkUser = v.compile(userSchemaValidation);

module.exports = checkUser;
