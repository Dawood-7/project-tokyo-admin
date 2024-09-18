import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  checkbox,
  password,
  relationship,
  text,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ isIndexed: "unique", validation: { isRequired: true } }),
      password: password({
        validation: {
          isRequired: true,
          length: {
            min: 8,
            max: 1000,
          },
          rejectCommon: true,
        },
        //   bcrypt: require('bcrypt')
      }),
      isAdmin: checkbox({ defaultValue: false }),
    },
  }),

  Post: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      content: document({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
      }),
      //   thumbnail: image({ storage: "local" }),
      author: relationship({ ref: "Author.posts", many: false }),
    },
  }),

  Author: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      posts: relationship({ ref: "Post.author", many: true }),
    },
  }),
};
