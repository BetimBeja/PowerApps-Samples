import { ArgTypes } from "@storybook/html";

export type IArg<T> = {
  [P in keyof T]: T[P] extends "text"
    ? T[P]
    : T[P] extends "number"
    ? T[P]
    : T[P] extends "color"
    ? T[P]
    : T[P] extends "boolean"
    ? T[P]
    : T[P] extends "date"
    ? T[P]
    : T[P] extends "object"
    ? T[P]
    : T[P] extends readonly string[]
    ? T[P]
    : never;
};

export const getArgTypes = <T extends IArg<T>>(
  args: IArg<T>,
  getFromResource: (key: string) => string | undefined
) => {
  const argTypes: Partial<ArgTypes<T>> = {};
  for (let arg in args)
    switch (args[arg]) {
      case "text":
      case "color":
      case "boolean":
      case "date":
      case "number":
      case "object":
        argTypes[arg] = {
          name: getFromResource(arg + "_Display_Key") || getFromResource(arg) || arg,
          description: getFromResource(arg + "_Desc_Key"),
          control: args[arg],
          table: {
            category: "Parameters",
          },
        };
        break;
      default:
        if (args[arg] instanceof Array) {
          argTypes[arg] = {
            name: getFromResource(arg + "_Display_Key") || arg,
            description: getFromResource(arg + "_Desc_Key"),
            control: "select",
            options: args[arg],
            table: {
              category: "Parameters",
            },
          };
        }
    }
  return argTypes;
};
