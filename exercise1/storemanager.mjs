import { addItem, removeItem, getItems, listItems } from './inventory.mjs';
addItem("Book");
addItem("Pen");
addItem("Pencil");
listItems();
removeItem("Pen");
listItems();
console.log("Items in inventory:", getItems());
