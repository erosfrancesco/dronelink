const attributeParser = (attributes) => {
  const props = Array.from(attributes);

  return props.reduce((acc, { name, localName, value }) => {
    acc[name] = {
      name,
      localName,
      value,
    };

    return acc;
  }, {});
};

//
const htmlNodeParser = (node, acc = {}) => {
  const { childNodes, nodeName, nodeValue, attributes } = node;
  const name = nodeName.startsWith("#") ? nodeName : nodeName;
  acc[name] = { nodeName };

  if (attributes) {
    if (Object.keys(attributes).length) {
      const parsed = attributeParser(attributes);
      // const { name, ...otherProps } = parsed;
      acc[name].attributes = parsed;
    }
  }

  if (nodeValue !== null) {
    acc[name] = { nodeValue };
  }

  if (childNodes.length) {
    acc[name].childNodes = [];

    const nodes = Array.from(childNodes);
    nodes
      .filter((node) => {
        const { nodeValue } = node;
        const v = String(nodeValue);
        return !(v === "\n" || v.endsWith("  "));
      })
      .forEach((node, i) => {
        acc[name].childNodes[i] = htmlNodeParser(node);
      });
  }

  return acc;
};
//


const xmlParser = (data) => {
  console.log("Got it", data);
  // const paramFile = data.getElementsByTagName("paramfile");
  // paramFile[0].childNodes[1].children[0]

  const parsedData = htmlNodeParser(data);
  const { parameters } =
    parsedData["#document"].childNodes[1].paramfile.childNodes[0].vehicles
      .childNodes[0];
  const parsedParameters = {};
  const { name, ...attributes } = parameters.attributes;
  const { value } = name;
  parsedParameters[value] = {};

  Object.keys(attributes).map((v) => {
    console.log(v, value);
    return v;
  });

  console.log(parsedData, parameters, parsedParameters, attributes);
};

const loadXMLDoc = () => {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      xmlParser(xmlhttp.responseXML);
    }
    /**
       * eg:
    Takeoff Check RPM maximum : humanName = Takeoff Check RPM maximum
    Takeoff Check RPM maximum : name = ArduCopter:TKOFF_RPM_MAX
    Takeoff Check RPM maximum : documentation = Takeoff is not permitted until motors report no more than this RPM.  Set to zero to disable check
    Takeoff Check RPM maximum : user = Standard
       */
  };
  xmlhttp.open("GET", "param.xml", true);
  xmlhttp.send();
};

loadXMLDoc();
