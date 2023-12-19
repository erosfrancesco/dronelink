export const VanComponentArgsParser = (...args) => {
  const [first, ...childs] = args || [];

  // if first argument is a dom node or a function, then it's a child
  // if not, it's a prop
  if (first?.nodeName || typeof first === "function") {
    return { childs: [first, ...childs] };
  }

  const { class: componentClass, ...otherProps } = first || {};
  return { componentClass, childs, otherProps };
};

export default VanComponentArgsParser;
