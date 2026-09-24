"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Prototype: sixteen DevPath styles on the existing route, switchable with ?variant=.
const variants = [
  { key: "A", name: "Original Studio" },
  { key: "B", name: "Editorial" },
  { key: "C", name: "Developer Workspace" },
  { key: "D", name: "Bright Academy" },
  { key: "E", name: "Study Planner" },
  { key: "F", name: "Bold Graphic" },
  { key: "G", name: "shadcn/ui inspired" },
  { key: "H", name: "Material inspired" },
  { key: "I", name: "Bootstrap inspired" },
  { key: "J", name: "Ant Design inspired" },
  { key: "K", name: "Chakra UI inspired" },
  { key: "L", name: "Fluent UI inspired" },
  { key: "M", name: "Carbon inspired" },
  { key: "N", name: "Polaris inspired" },
  { key: "O", name: "daisyUI inspired" },
  { key: "P", name: "Learning Timeline" },
] as const;

type Variant = (typeof variants)[number]["key"];

function readVariant(): Variant {
  const value = new URLSearchParams(window.location.search).get("variant");
  return variants.find((item) => item.key === value)?.key ?? "L";
}

export function DesignPrototypeSwitcher() {
  const [variant, setVariant] = useState<Variant>("L");
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setVariant(readVariant());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.designVariant = variant;
    const options = optionsRef.current;
    const active = options?.querySelector<HTMLButtonElement>("button.active");
    if (options && active) {
      options.scrollLeft =
        active.offsetLeft -
        options.offsetLeft -
        (options.clientWidth - active.clientWidth) / 2;
    }
    return () => {
      document.documentElement.dataset.designVariant = "L";
    };
  }, [variant]);

  function choose(next: Variant) {
    const url = new URL(window.location.href);
    url.searchParams.set("variant", next);
    window.history.replaceState(null, "", url);
    setVariant(next);
  }

  function cycle(direction: number) {
    const index = variants.findIndex((item) => item.key === variant);
    choose(
      variants[(index + direction + variants.length) % variants.length].key,
    );
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('input, textarea, select, [contenteditable="true"]')
      )
        return;
      event.preventDefault();
      cycle(event.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [variant]);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="design-prototype-switcher" aria-label="เลือกตัวอย่างดีไซน์">
      <span className="design-prototype-caption">
        STYLE {variant} · {variants.find((item) => item.key === variant)?.name}
      </span>
      <button
        type="button"
        className="design-prototype-arrow"
        onClick={() => cycle(-1)}
        aria-label="ดีไซน์ก่อนหน้า"
      >
        <ArrowLeft size={16} />
      </button>
      <div className="design-prototype-options" ref={optionsRef}>
        {variants.map((item) => (
          <button
            key={item.key}
            type="button"
            className={item.key === variant ? "active" : ""}
            onClick={() => choose(item.key)}
            aria-pressed={item.key === variant}
            aria-label={`แบบ ${item.key} ${item.name}`}
          >
            <strong>{item.key}</strong>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="design-prototype-arrow"
        onClick={() => cycle(1)}
        aria-label="ดีไซน์ถัดไป"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
