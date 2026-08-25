/* Task 1: Compile Participant Details with Shorthand Property Names */
// TODO: Construct an object named `participant` with properties for `name`, `age`, and `studyField`. Utilize shorthand property names to simplify your code.
const nameOfparticipant = "Adeline Smith";
const age = 28;
const studyField = "Biology";
const participant = {nameOfparticipant, age, studyField};
console.log(participant);
/* Task 2: Implement a Shorthand Function for Participant Info */
// TODO: Copy the `participant` object by adding a shorthand method named `displayInfo` that prints the participant's details using `this` and a template string.
const participantWithInfo = {...participant,
displayInfo() {
    console.log(`Name: ${this.nameOfparticipant}, Age: ${this.age}, Study Field: ${this.studyField}`);
}
};
participantWithInfo.displayInfo();
/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
// TODO: Echo the above task with an arrow function. Observe the behavior of `this` and explain your findings.
const participantWithArrowInfo = {...participant,
displayInfo: () => {
    console.log(`Name: ${participantWithArrowInfo.nameOfparticipant}, Age: ${participantWithArrowInfo.age}, Study Field: ${participantWithArrowInfo.studyField}`);
}
};
participantWithArrowInfo.displayInfo();
/*
 * Observations:
 * TODO: Explain here.
 */
// at the first glance both displayInfo methods seem to work similarly, but the arrow function does not have its own `this` context. Instead, it captures the `this` value from the surrounding lexical scope. 
// In this case, since `participantWithArrowInfo` is not a class or function that defines its own `this`, it refers to the outer scope where `participantWithArrowInfo` is defined. 

/* Task 4: Using Computed Property Names */
// TODO: Implement a function named `updateParticipantInfo` that takes a property name and value as arguments alongside an object and returns a new object with that property dynamically set.
function updateParticipantInfo(obj, propName, value) {
    return {...obj, [propName]: value};
}
const updatedParticipant = updateParticipantInfo(participant, 'age', 29);
console.log(updatedParticipant);