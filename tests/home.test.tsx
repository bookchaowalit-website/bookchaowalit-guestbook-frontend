import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the empty register with the local-only notice and the entry limit", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Leave a trace.");
    expect(html).toContain("Sign the book");
    expect(html).toContain("The first line is still waiting.");
    expect(html).toContain("No account, inbox, or shared wall.");
    expect(html).toContain("newest 40 kept");
  });
});
