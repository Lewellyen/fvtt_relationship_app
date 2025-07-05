/// <reference types="vitest/globals" />
import TestSuccessWrapper from "./TestSuccessWrapper.svelte";
import TestErrorWrapper from "./TestErrorWrapper.svelte";

describe("ErrorBoundary via wrapper components", () => {
  let container: HTMLElement;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.append(container);
  });
  afterEach(() => {
    container.remove();
  });

  it("renders child content via TestSuccessWrapper", () => {
    new TestSuccessWrapper({ target: container });
    expect(container.innerHTML).toContain("<p>Alles gut!</p>");
  });

  it("shows fallback UI via TestErrorWrapper", () => {
    new TestErrorWrapper({ target: container });
    const html = container.innerHTML;
    expect(html).toContain("⚠️ Ein Fehler ist aufgetreten");
    expect(html).toContain("Technische Details");
  });
});
