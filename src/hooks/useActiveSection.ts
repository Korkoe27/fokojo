"use client";
import { useState, useEffect, useRef } from "react";

export default function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>("");
  const visibleRef = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.querySelector(`#${id}`))
      .filter(Boolean) as HTMLElement[];

    visibleRef.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRef.current.set(entry.target.id, entry.isIntersecting);
        });

        for (const id of sectionIds) {
          if (visibleRef.current.get(id)) {
            setActiveSection(id);
            return;
          }
        }
      },
      { rootMargin: "-90px 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}