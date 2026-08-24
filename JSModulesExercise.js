// Part 1: Naming Exports and Imports 
// inventory.mjs
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
    
// storemanager.mjs 
import {addItem, removeItem, getItems, listItems } from './inventory.mjs'; 
addItem("Book");
addItem("Pen");
addItem("Pencil");
listItems();
removeItem("Pen");
listItems();
console.log("Items in inventory:", getItems());

// Default Export and Import 
// Post.mjs 
export default class Post {
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
    publish () {
        console.log(`Title: ${this.title}`);
        console.log(`Content: ${this.content}`);
    }
}

// main.mjs
import Post from './Post.mjs'; 
const post1 = new Post("Hello World", "This is the content of my first post.");
post1.publish();

// Re-exporting Modules 
// stringUtils.mjs
export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// numberUtils.mjs
export const square = (n) => n * n;

// index.mjs
export { capitalize } from './stringUtils.mjs';
export { square } from './numberUtils.mjs';

// app.mjs 
import { capitalize, square } from './index.mjs';
console.log(capitalize("hello"));
console.log(square(4));

// Dynamic Imports 
// theme.mjs 
let theme = null; 
export const setLightTheme =() =>{
    console.log("Light theme set");
    theme = "light";
}
export const setDarkTheme = () => {
    console.log("Dark theme set");
    theme = "dark";
}

// app.mjs 
async function loadConfig() {
    const themeModule = await import('./theme.mjs');
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
        themeModule.setLightTheme();
    } else {
        themeModule.setDarkTheme();
    }                   
}
loadConfig();

// Side Effects in Modules
// globalConfig.mjs
console.log("Welcome to the application! Initializing...");

// app.mjs 
import './globalConfig.mjs';