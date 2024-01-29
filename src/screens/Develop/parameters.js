const nameParser = (nodeName) =>
  nodeName.startsWith("#") ? nodeName.substring(1) : nodeName;

const childrenParser = (childNodes) =>
  Array.from(childNodes).filter((node) => {
    const { nodeValue } = node;
    const v = String(nodeValue);
    return !(v === "\n" || v.endsWith("  "));
  });

const attributeParser = (attributes) =>
  Array.from(attributes).reduce((acc, { name, localName, value }) => {
    acc[name] = {
      name,
      localName,
      value,
    };

    return acc;
  }, {});
//

//
export const xmlParser = (node, acc = {}) => {
  const { childNodes, nodeName, nodeValue, attributes } = node;
  const name = nameParser(nodeName);
  const parsedNode = { nodeName: name };

  if (attributes) {
    if (Object.keys(attributes).length) {
      parsedNode.attributes = attributeParser(attributes);
    }
  }

  if (nodeValue !== null) {
    parsedNode.nodeValue = nodeValue;
  }

  if (childNodes.length) {
    parsedNode.childNodes = childrenParser(childNodes).map((node) => {
      const parsedNode = xmlParser(node);
      const childName = Object.keys(parsedNode)[0];

      return parsedNode[childName];
    });
  }

  acc[name] = parsedNode;

  return acc;
};
//

export const loadXML = async (file) => {
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        return resolve(xmlhttp.responseXML);
      }
    };
    xmlhttp.open("GET", file, true);
    xmlhttp.send();
  });
};
