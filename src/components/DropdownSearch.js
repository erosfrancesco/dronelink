// TODO: - Wrapper and selector
import van from "vanjs-core";
import "./DropdownSearch.css";
import {
  Button,
  Input,
  VerticalLayout,
  HorizontalLayout,
  TextNormal,
  TextBold,
  VanComponentArgsParser,
} from "../components/index.js";

const { div } = van.tags;

const DefaultDropdownItem = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { item = "", ...props } = otherProps;

  return TextNormal(item);
};

const filteredItems = van.state([]);
const filterValue = van.state();

const defaultFilter = (items, filterStr) =>
  items.filter((item) => item.includes(filterStr));

const defaultOnSelected = (item) => {};

export const DropdownSearch = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const {
    items = [],
    selected = null,
    onSelected = defaultOnSelected,
    ...props
  } = otherProps;

  if (filterValue.val) {
    filteredItems.val = defaultFilter(items, filterValue.val.toUpperCase());
  } else {
    filteredItems.val = items;
  }

  return VerticalLayout(
    { class: "dropdown-content" },
    filteredItems.val.map((item) => DefaultDropdownItem({ item }))
  );
};
