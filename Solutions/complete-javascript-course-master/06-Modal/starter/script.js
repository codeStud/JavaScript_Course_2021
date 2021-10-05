'use strict';

// modal = message-banner that pops up on the screen 
// overlay = blurry-screen background

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// there are multiple class with name "show-modal". So, querySelector would select only the 1st one
// console.log(document.querySelector(".show-modal"));

// use document.querySelectorAll to select all the classes with the same name
// console.log(document.querySelectorAll(".show-modal"));  (like an array)
const btnOpenModal = document.querySelectorAll(".show-modal");
for(let i = 0; i < btnOpenModal.length; i++){
    btnOpenModal[i].addEventListener("click", function () {
        
        // modal class is there in html along with "hidden" class whose css property has been set to hidden
        // To make it appear on the browser screen, we need to remove this class on the button click.
        // Then all the CSS properties in the hidden class will be removed from the element
        
        // NOTE: DON'T USE the ".hidden" bcz . is used only for selecting. We are just passing it in the function below
        modal.classList.remove("hidden");

        // to make background blurry
        overlay.classList.remove("hidden");

    });
}

// NOTE: Open the browser console below while clicking the button to see the classes appearing and dis-appearing
const closeModal = function(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

// close the modal and overlay when you click on the "X" button of the modal.
// NOTE: You aren't calling the function closeModal otherwise JS will immediately execute the closeModal function
// as soon as JS reaches the below line. We want it to execute only on the btn click. Thus pass it as a VALUE.
btnCloseModal.addEventListener("click", closeModal);

// remove the modal (i.e message-banner) when you click on the overlay (i.e on blurry-screen outside the modal)
overlay.addEventListener("click", closeModal);


//NOTE: 'keypress' are the GLOBAL events, i.e they don't happen on a particular element. We usually enlist them on 
// the whole document.
// keyDown event will happen on the entire global document as soon we press the key 'down'
document.addEventListener("keydown", function(e) {
    // NOTE: When an event happens, JS creates an object with all info about that event.
    // We can use the object to find out certain specific information.

    // NOTE: So, when 'keydown' event happens, JS calls the function(e) passing the 'e' as an argument
    // and stores the event-object (info about the event in the parameter "e")
    console.log(e);

    // check if the key-pressed was "Esc" and modal doesn't has the hidden class, then close the modal and overlay
    if(e.key === "Escape" && !modal.classList.contains("hidden")){
        closeModal();
    }
});