import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/utils/ScrollToTop";

describe("ScrollToTop", () => {
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it("scrolls to top on initial render", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("scrolls to top when pathname changes", () => {
    render(
      <MemoryRouter initialEntries={["/page1"]}>
        <ScrollToTop />
        <Routes>
          <Route path="/page1" element={<div>Page 1</div>} />
          <Route path="/page2" element={<div>Page 2</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });

  it("returns null (renders nothing)", () => {
    const { container } = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });
});
