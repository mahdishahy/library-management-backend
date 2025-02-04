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
    },
    author: {
      type: "string",
      min: 3,
      max: 128,
      trim: true,
      empty: false,
      messages: {
        required: "نام نویسنده کتاب الزامی است",
      },
    },
    pages: {
      type: "number",
      min: 1,
      empty: false,
      messages: {
        required: "تعداد صفحات کتاب الزامی است",
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
      },
    },
    copies_available: {
      type: "number",
      min: 0,
      empty: false,
      messages: {
        required: "تعداد نسخه ها موجود الزامی است",
      },
    },
    total_copies: {
      type: "number",
      min: 1,
      empty: false,
      messages: {
        required: "تعداد کل نسخه های کتاب الزامی است",
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
    free: {
      type: "boolean",
      default: true,
    },
    description: {
      type: "string",
      max: 2000,
      optional: true,
    },
    category: {
      type: "string",
      max: 64,
      trim: true,
      empty: false,
      messages: { required: "دسته‌بندی کتاب الزامی است" },
    },
    image_url: {
      type: "url",
      default: null,
    },
  },
};

const checkBook = v.compile(bookSchemaValidation);
module.exports = checkBook;
