import { mount } from "@vue/test-utils";
import { render as mountSvelte } from "@testing-library/svelte";
import * as react from "@testing-library/preact";
import { h } from "preact";

import LinkReact from "@/components/Link/$";
import LinkVue from "@/components/Link/$.vue";
import LinkSvelte from "@/components/Link/$.svelte";

describe("Vue", () => {
  test("mount component with locale(ca) link", () => {
    expect(LinkVue).toBeTruthy();
    const link = mount(LinkVue, {
      props: {
        locale: "ca",
        href: "/vota",
      },
      slots: {
        default: "This is a test",
      },
    });
    expect(link.text()).toContain("This is a test");
    expect(link.attributes("href")).toBe("/ca/vota");
    expect(link.html()).toMatchSnapshot();
  });

  test("mount component with locale(default) link", () => {
    expect(LinkVue).toBeTruthy();
    const link = mount(LinkVue, {
      props: {
        href: "/vota",
      },
      slots: {
        default: "This is a test",
      },
    });
    expect(link.text()).toContain("This is a test");
    expect(link.attributes("href")).toBe("/vota");
    expect(link.html()).toMatchSnapshot();
  });

  test("mount component with external link, locale not has effect", () => {
    expect(LinkVue).toBeTruthy();
    const link = mount(LinkVue, {
      props: {
        locale: "ca",
        href: "https://www.google.com/",
      },
      slots: {
        default: "This is a test",
      },
    });
    expect(link.text()).toContain("This is a test");
    expect(link.attributes("href")).toBe("https://www.google.com/");
    expect(link.html()).toMatchSnapshot();
  });

  test("mount component with hash link, locale not has effect", () => {
    expect(LinkVue).toBeTruthy();
    const link = mount(LinkVue, {
      props: {
        locale: "ca",
        href: "#more-d",
      },
      slots: {
        default: "This is a test",
      },
    });
    expect(link.text()).toContain("This is a test");
    expect(link.attributes("href")).toBe("#more-d");
    expect(link.html()).toMatchSnapshot();
  });
});

describe("Svelte", () => {
  test("mount component with locale(ca) link", () => {
    //@ts-ignore
    const { container } = mountSvelte(LinkSvelte, {
      href: "/vota",
      locale: "ca",
    });
    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/ca/vota");
    // expect(link?.textContent).toBe('This is a test')
    expect(link?.outerHTML).toMatchSnapshot();
  });
});

describe("React", () => {
  test("mount component with locale(ca) link", () => {
    expect(LinkReact).toBeTruthy();
    const component = h(LinkReact, {
      href: "/vota",
      locale: "ca",
      children: "This is a test",
    });

    react.render(component);
    const link = react.screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/ca/vota");
    expect(link?.textContent).toBe("This is a test");
    expect(link?.outerHTML).toMatchSnapshot();
  });

  test("mount component with locale(default) link", () => {
    expect(LinkReact).toBeTruthy();
    const component = h(LinkReact, {
      href: "/vota",
      children: "This is a test",
    });

    react.render(component);

    const link = react.screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/vota");
    expect(link?.textContent).toBe("This is a test");
    expect(link?.outerHTML).toMatchSnapshot();
  });

  test("mount component with external link, locale not has effect", () => {
    expect(LinkReact).toBeTruthy();

    const component = h(LinkReact, {
      locale: "es",
      href: "https://www.google.com/",
      children: "This is a test",
    });

    react.render(component);

    const link = react.screen.getByRole("link");

    expect(link).toHaveAttribute("href", "https://www.google.com/");
    expect(link?.textContent).toBe("This is a test");
    expect(link?.outerHTML).toMatchSnapshot();
  });

  test("mount component with external link, locale not has effect", () => {
    expect(LinkReact).toBeTruthy();

    const component = h(LinkReact, {
      locale: "ca",
      href: "#more-d",
      children: "This is a test",
    });

    react.render(component);

    const link = react.screen.getByRole("link");

    expect(link).toHaveAttribute("href", "#more-d");
    expect(link?.textContent).toBe("This is a test");
    expect(link?.outerHTML).toMatchSnapshot();
  });
});
