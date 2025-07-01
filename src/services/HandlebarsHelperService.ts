import type { HelperOptions } from "handlebars";
export class HandlebarsHelperService {
  static register(): void {
    Handlebars.registerHelper(
      "ifEquals",
      function (
        this: unknown,
        arg1: unknown,
        arg2: unknown,
        options: HelperOptions,
      ) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
      },
    );
  }
}
