declare module "*.hbs" {
  import { TemplateDelegate } from "handlebars";
  const template: TemplateDelegate;
  export default template;
}

declare module "*.svelte" {
  import { SvelteComponentTyped } from "svelte";
  export default class Component extends SvelteComponentTyped<any> {}
}

declare module "flowbite-svelte";
declare module "@sveltejs/vite-plugin-svelte";
