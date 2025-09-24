export const renderTree = (
  node,
  prefix = "",
  isLast = true,
  groupMax = 0,
  vLinePos = []
) => {
  if (groupMax === 0) groupMax = node.value.length;
  let val = node.value;
  let len = val.length;
  let dashCount = node.children.length > 0 ? groupMax - len + 3 : 0;
  let header =
    prefix + val + "-".repeat(dashCount) + (dashCount > 0 ? "+" : "");
  let lines = [header];

  if (node.children.length > 0) {
    let childGroupMax = node.children.reduce(
      (max, c) => Math.max(max, c.value.length),
      0
    );
    let childPrefix = prefix + " ".repeat(len + dashCount);
    for (let i = 0; i < node.children.length; i++) {
      let child = node.children[i];
      let childIsLast = i === node.children.length - 1;
      let newVLinePos = [...vLinePos];
      if (!childIsLast && prefix.length > 0) newVLinePos.push(prefix.length);

      let childLines = renderTree(
        child,
        childPrefix,
        childIsLast,
        childGroupMax,
        newVLinePos
      );
      lines = lines.concat(childLines);
    }
  }

  let currentPos = prefix.length;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    for (let pos of vLinePos) {
      if (line.length > pos && line[pos] === " ") {
        line = line.substring(0, pos) + "|" + line.substring(pos + 1);
      }
    }
    if (i > 0 && !isLast) {
      if (line.length > currentPos && line[currentPos] === " ") {
        line =
          line.substring(0, currentPos) + "|" + line.substring(currentPos + 1);
      }
    }
    lines[i] = line;
  }
  return lines;
};
