"use client";

import { useEffect } from "react";

const addCopyButtons = () => {
  document.querySelectorAll("pre code").forEach((codeBlock) => {
    if (codeBlock.parentNode?.querySelector(".copy-button")) {
      return;
    }

    const button = document.createElement("button");
    button.innerText = "Copy";
    button.className = "copy-button";
    button.classList.add(
      "absolute", 
      "top-2", 
      "right-2", 
      "bg-gray-600", 
      "text-white", 
      "border", 
      "border-transparent",
      "py-1", 
      "px-2", 
      "rounded", 
      "cursor-pointer",
      "text-xs", 
      "hover:bg-gray-500", 
      "focus:outline-none",
      "z-10"
    );

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(codeBlock.textContent || "");
      button.innerText = "Copied!";
      setTimeout(() => {
        button.innerText = "Copy";
      }, 2000);
    });

    const pre = codeBlock.parentNode as HTMLElement;
    if (pre && pre.style) {
      pre.style.position = "relative";
      pre.appendChild(button);
    }
  });
};

export default function CopyButtonHandler() {
  useEffect(() => {
    addCopyButtons();
  }, []);

  return null;
}
