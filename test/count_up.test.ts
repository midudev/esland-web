import { mount } from "@vue/test-utils";
import { h } from "preact";
import ProgressiveNumber from "@/components/Count/Up";
import CountVue from "@/components/Count/Up.vue";
import CountReact from "@/components/Count/Up.tsx";
import CountSvelte from "@/components/Count/Up.svelte";
import { render as mountSvelte } from "@testing-library/svelte";
import { render as mountReact } from "@testing-library/preact";

// vi.useFakeTimers()

describe("Count up", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should generate progressive number with 3 decimals", () => {
    const pgn = new ProgressiveNumber(0, 20, 3);
    expect(pgn.step).toBe(1);
    expect(pgn.value).toBe("0.000");
    pgn.next();
    expect(pgn.step).toBe(2);
    expect(pgn.value).toBe("0.199");
    pgn.next();
    expect(pgn.step).toBe(3);
    expect(pgn.value).toBe("0.397");
  });

  test("should generate progressive number with 2 decimals", () => {
    const pgn = new ProgressiveNumber(0, 20, 2);
    expect(pgn.step).toBe(1);
    expect(pgn.value).toBe("0.00");
    pgn.next();
    expect(pgn.step).toBe(2);
    expect(pgn.value).toBe("0.20");
    pgn.next();
    expect(pgn.step).toBe(3);
    expect(pgn.value).toBe("0.40");
  });

  test("should generate progressive number with 1 decimals", () => {
    const pgn = new ProgressiveNumber(0, 20, 1);
    expect(pgn.step).toBe(1);
    expect(pgn.value).toBe("0.0");
    pgn.next();
    expect(pgn.step).toBe(2);
    expect(pgn.value).toBe("0.2");
    pgn.next();
    expect(pgn.step).toBe(3);
    expect(pgn.value).toBe("0.4");
  });

  test("should mount a vue component", async () => {
    expect(CountVue).toBeTruthy();
    const component = mount(CountVue, {
      props: {
        initial: 20,
        final: 50.5,
        decimals: 1,
      },
    });
    expect(component.text()).toBe("20.0");
    vi.advanceTimersByTime(2000);
    await vi.waitFor(() => {
      expect(component.text()).toBe("50.5");
    });
  });

  test("should mount a svelte component", async () => {
    //@ts-ignore
    const { container } = mountSvelte(CountSvelte, {
      props: {
        initial: 20,
        final: 50.5,
        decimals: 1,
      },
    });
    const counter = container.querySelector("span");
    expect(counter?.textContent).toBe("20.0");
    vi.advanceTimersByTime(2000);
    await vi.waitFor(() => {
      expect(counter?.textContent).toBe("50.5");
    });
  });

  test("should mount a react component", async () => {
    const Component = h(CountReact, {
      initial: 0,
      final: 7,
      decimals: 1,
      duration: 50,
    });
    const { container } = mountReact(Component);
    const counter = container.querySelector("span");
    expect(counter?.textContent).toBe("0.0");
    vi.advanceTimersByTime(200);
    await vi.waitFor(() => {
      expect(counter?.textContent).toBe("7.0");
    });
  });
});
