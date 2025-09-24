// parser.js
export const parseTree = (input) => {
  let i = 0;

  const skipSpace = () => {
    while (i < input.length && /\s/.test(input[i])) i++;
  };
  const readVal = () => {
    skipSpace();
    let start = i;
    while (i < input.length && !/\s|\(|\)/.test(input[i])) i++;
    return input.slice(start, i);
  };

  const parseList = () => {
    const nodes = [];
    while (true) {
      skipSpace();
      if (i >= input.length) throw new Error("Нет закрывающей скобки");
      if (input[i] === ")") {
        i++;
        break;
      }

      if (input[i] === "(") {
        i++;
        const subNodes = parseList();
        if (nodes.length === 0) nodes.push(...subNodes);
        else nodes[nodes.length - 1].children.push(...subNodes);
      } else {
        const val = readVal();
        nodes.push({ value: val, children: [] });
      }
    }
    return nodes;
  };

  skipSpace();
  if (input[i] === "(") {
    i++;
    const nodes = parseList();
    if (nodes.length === 0) throw new Error("Пустой ввод ()");

    const root = nodes[0];
    if (nodes.length > 1) root.children.push(...nodes.slice(1));
    skipSpace();
    if (i < input.length)
      throw new Error("Есть лишние символы за пределами определения древа");
    return root;
  }

  const val = readVal();
  if (!val) throw new Error("Поле ввода пусто");
  return { value: val, children: [] };
};
