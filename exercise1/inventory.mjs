const items = [];
export const addItem = (item) => {
    items.push(item);
    console.log(`Item added: ${item} to inventory`);
};
export const removeItem = (item) => {
    const index = items.indexOf(item);
    if (index > -1) {
        items.splice(index, 1);
        console.log(`Item removed: ${item} from inventory`);
    } else {
        console.log(`Item not found: ${item}`);
    }
};
export const getItems = () => {
    return items;
};
export const listItems = () => {
    console.log("Current inventory:", items);
};
