/* Task 1: Track Animal Sightings */
// TODO: Write a function with rest parameters to print sightings of different animals within the sanctuary. This function should accept an arbitrary number of animal names.
function trackSightings(...animals) {
    console.log("Animal Sightings:");
    animals.forEach(animal => {
        console.log(animal);
    });
}
trackSightings("Elephant", "Rhino", "Tiger");
/* Task 2: Merge Habitat Areas */
const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];
// TODO: You are given two arrays of habitat names. Use the spread operator to combine them into a comprehensive list of protected areas within the sanctuary.
const combinedHabitats = [...forestHabitats, ...savannahHabitats];
console.log("Combined Habitats:", combinedHabitats);
/* Task 3: Update Conservation Status */
const rhinoStatus = {
	population: 500,
	status: "Endangered"
};
// TODO: You are given an object representing an animal's conservation status. Use the spread operator to update this status with new information, such as an increase in population or a change in habitat.
const updatedRhinoStatus = {...rhinoStatus, population: 520, habitat: "Savannah"};
console.log("Updated Rhino Status:", updatedRhinoStatus);
/* Task 4: Catalog Genetic Diversity */
const lionProfile = {
	name: "Leo",
	age: 5,
	species: "Lion"
};
// TODO: Duplicate an animal profile object using a shallow copy. Add genetic diversity information using the `genetics` property to this copy. Observe and explain how changes to nested properties affect both the original and the copied object.
const lionProfileCopy = {...lionProfile, genetics: {diversityScore: 0.75}};
console.log(lionProfile);
console.log(lionProfileCopy);

lionProfileCopy.genetics.diversityScore = 0.85;
console.log(lionProfile);
console.log(lionProfileCopy);
/*
 * Observations:
 * TODO: Explain here.
// lionProfile remains unchanged because the `genetics` property was added to the copied object, and it does not exist in the original object. However, if `genetics` were a nested object in the original, changes to its properties in the copy would affect the original due to shared references in shallow copies.
// LionProfileCopy has a new property `genetics` that does not exist in the original `lionProfile`. Therefore, modifying `genetics` in the copy does not affect the original object.
// lionProfile remains unchanged because the `genetics` property was added to the copied object, and it does not exist in the original object. However, if `genetics` were a nested object in the original, changes to its properties in the copy would affect the original due to shared references in shallow copies.
/* Task 5: Analyze Ecosystem Health */
const ecosystemHealth = {
	waterQuality: "Good",
	foodSupply: {
		herbivores: "Abundant",
		carnivores: "Sufficient"
	}
};
// TODO: You are given an object with a nested structure detailing the ecosystem's health, including water quality and food supply. Perform a shallow copy and modify a nested property. Observe and explain how changes to nested properties affect both the original and the copied object.
const ecosystemHealthCopy = { ...ecosystemHealth };
 
ecosystemHealthCopy.foodSupply.herbivores = "Sufficient";
 
console.log(ecosystemHealth.foodSupply);  
console.log(ecosystemHealthCopy.foodSupply);

// 
//  * Observations:
//  * TODO: Explain here.
//  changes to the nested property `foodSupply.herbivores` in the copied object `ecosystemHealthCopy` also affect the original object `ecosystemHealth`. This is because the shallow copy only copies the top-level properties, and both objects share a reference to the same nested `foodSupply` object. Therefore, modifying a nested property in one object will reflect in the other.