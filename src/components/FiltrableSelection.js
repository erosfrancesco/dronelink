import van from "vanjs-core";
import "./FiltrableSelection.css";

import {
  Input,
  Button,
  HorizontalLayout,
  VerticalLayout,
  TextNormal,
  VanComponentArgsParser,
} from "../components/index.js";

//
const defaultFilteredItems = van.state([]);
const defaultFilterValue = van.state("");
const defaultSelected = van.state();

const defaultFilter = (items, filterStr) =>
  items.filter((item) => item.includes(filterStr));
const defaultOnSelected = (item) => {
  defaultSelected.val = item;
};
const defaultOnCloseClicked = () => {}
//

//
const DefaultDropdownItem = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const { item = "", selected, onSelected, ...props } = otherProps;

  const onclick = () => {
    onSelected(item);
  };

  const className = () =>
    "filtrable-selection-default-item" +
    (selected?.val === item
      ? " filtrable-selection-default-item-selected"
      : "");

  return () => TextNormal({ onclick, class: className }, item);
};

const Options = ({
  filter,
  filterValue,
  filteredItems,
  items,
  ItemRender,
  onSelected,
  selected,
}) => {
  if (filterValue?.val && filterValue?.val !== "") {
    filteredItems.val = filter(items, filterValue.val.toUpperCase());
  } else {
    filteredItems.val = items;
  }

  return VerticalLayout(
    { class: "filtrable-selection-wrapper" },
    filteredItems.val.map((item) => ItemRender({ item, onSelected, selected }))
  );
};
//

export const FiltrableSelection = (...args) => {
  const { componentClass, childs, otherProps } = VanComponentArgsParser(
    ...args
  );

  const {
    filter = defaultFilter,
    filterValue = defaultFilterValue,
    filteredItems = defaultFilteredItems,
    items = [],
    ItemRender = DefaultDropdownItem,
    onSelected = defaultOnSelected,
    onCloseClicked = defaultOnCloseClicked,
    selected = defaultSelected,

    ...props
  } = otherProps;

  return VerticalLayout(
    { class: componentClass, ...props },
    HorizontalLayout(
      Input({
        value: filterValue,
        onkeyup: (e) => {
          const { value = "" } = e?.target || {};
          filterValue.val = value;
        },
      }),
      Button(
        {
          class: "filtrable-selection-close",
          color: "secondary",
          onclick: onCloseClicked
        },
        "x"
      )
    ),
    () =>
      Options({
        filter,
        filterValue,
        filteredItems,
        items,
        ItemRender,
        onSelected,
        selected,
      })
  );
};
