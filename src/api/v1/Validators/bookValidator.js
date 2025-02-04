const Validator = require("fastest-validator");

const v = new Validator();

const bookSchemaValidation = {
  title: {
    type: "string",
    min: 3,
    max: 256,
    trim: true,
    empty: false,
    messages: {
      required: "نام کتاب الزامی است",
      stringMin: "نام کتاب حداقل باید 5 کاراکتر باشد",
      stringMax: "نام کتاب حداکثر می‌تواند 125 کاراکتر باشد",
    },
  },
  author: {
    type: "string",
    min: 3,
    max: 128,
    trim: true,
    empty: false,
    messages: {
      required: "نام نویسنده کتاب الزامی است",
      stringMin: "نام نویسنده کتاب حداقل باید 3 کاراکتر باشد",
      stringMax: "نام نویسنده کتاب حداکثر می‌تواند 128 کاراکتر باشد",
    },
  },
  pages: {
    type: "number",
    min: 1,
    empty: false,
    messages: {
      required: "تعداد صفحات کتاب الزامی است",
      stringMin: "تعداد صفحات کتاب حداقل باید 1 باشد",
    },
  },
  publisher: {
    type: "string",
    min: 3,
    max: 128,
    trim: true,
    empty: false,
    messages: {
      required: "نام ناشر کتاب الزامی است",
      stringMin: "نام ناشر کتاب حداقل باید 5 کاراکتر باشد",
      stringMax: "نام ناشر کتاب حداکثر می‌تواند 128 کاراکتر باشد",
    },
  },
  copies_available: {
    type: "number",
    min: 0,
    empty: false,
    messages: {
      required: "تعداد نسخه ها موجود الزامی است",
      stringMin: "تعداد نسخه های موجود کتاب حداقل باید 0 باشد",
    },
  },
  total_copies: {
    type: "number",
    min: 1,
    empty: false,
    messages: {
      required: "تعداد کل نسخه های کتاب الزامی است",
      stringMin: "تعداد کل نسخه ها موجود کتاب حداقل باید 1 باشد",
    },
  },
  language: {
    type: "enum",
    values: ["English", "Persian", "French", "German", "Spanish"],
    empty: false,
    messages: {
      required: "زبان کتاب الزامی است",
      enumValue: "زبان معتبر انتخاب کنید",
    },
  },
  publication_date: {
    type: "date",
    convert: true,
    empty: false,
    messages: {
      required: "تاریخ انتشار کتاب الزامی است",
    },
  },
  category: {
    type: "string",
    max: 64,
    trim: true,
    empty: false,
    messages: {
      required: "دسته‌بندی کتاب الزامی است",
      stringMax: "نام دسته بندی کتاب حداکثر می‌تواند 64 کاراکتر باشد",
    },
  },
  free: {
    type: "boolean",
    default: true,
  },
  description: {
    type: "string",
    max: 2000,
    optional: true,
    messages: {
      stringMax: "توضیحات کتاب حداکثر می‌تواند 2000 کاراکتر باشد",
    },
  },
  image_url: {
    type: "url",
    default: null,
  },
};

const checkBook = v.compile(bookSchemaValidation);
module.exports = checkBook;
