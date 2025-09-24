import { parseTree } from "./module/parser.js";
import { renderTree } from "./module/renderer.js";

const button = document.getElementById("render");
const input = document.getElementById("input");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  try {
    const tree = parseTree(input.value);
    console.log("Parsed tree:", JSON.stringify(tree, null, 2));
    const lines = renderTree(tree);
    console.log("Rendered output:\n", lines.join("\n"));
    output.textContent = lines.join("\n");
  } catch (e) {
    console.error("Error:", e.message);
    output.textContent = "Error: " + e.message;
  }
});
