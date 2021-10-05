'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollto = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// loop through the two 'nodelist' (result of querySelectorAll, behaves like an array). 
// Below loop is for two buttons on the home page for "opening account".
btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



// 1. Scrolling to "Features" section when click on "Learn More"

btnScrollto.addEventListener("click", function(e) {

    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);

    // Old School Way

    // to scroll to that particular section, add current visible screen top (vertical movement) & current visible
    // screen left (horizontal movement) to the section-1 top and left. BUT scrolling won't be smooth
    // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

    // For smooth scrolling, pass in the object with left, top and behavior property.
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });

    // Modern way (Just 1 line code)
    section1.scrollIntoView({behavior: 'smooth'});

});



// 2. Page Navigation





// //////////////////////////////////////
// //////////////////////////////////////

/*

// NOTE:```````Selecting DOM elements````````````

console.log(document.documentElement);    // selects the entire document-element of DOM tree
console.log(document.body);
console.log(document.head);

const header = document.querySelector(".header");

// NOTE: below code return a "NodeList" and it's NOT a "live-collection"
const allSections = document.querySelectorAll(".section")
console.log(allSections);

document.getElementById('section--1');

// NOTE: Below code returns 'HTMLCollection' and NOT NodeList. 
// HTMLCollection is "live-collection" i.e - If DOM changes, this collection is immediately UPDATED automatically.
// To see what I mean, remove a button from browser manually using inspect and see the allButtons change in console automatically.
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);



// NOTE:``````````````Creating and Inserting Elements``````````````

// .insertAdjacentHTML()  is most favourable way to create and insert HTML-elements into the DOM (i.e browser)

// create a DOM element (html element- div) and store it in variable msg. It's just created but not yet inserted in DOM
// NOTE: So, msg is now a "DOM" element just like 'document' or any other DOM element from DOM tree & we can use
// methods like getElementById(), classList(), querySelector()... etc just like with any other DOM element.
const msg = document.createElement('div');
msg.classList.add("cookie-message");
// msg.textContent = "We sue cookies for improved functionality and analytics.";
msg.innerHTML = "We use cookies for improved functionality and analytics. <button class = 'btn btn--close--cookie'>Got it!</button>";

// Insert msg element into DOM (i.e make it visible on the Browser)
header.prepend(msg);  // on top of screen. (prepend() adds msg as the first child of header element in DOM tree)

// will MOVE (Not insert, bcz it was already inserted by prepend()) the msg from being the first child to being the last child.
// header.append(msg);   // on bottom of screen. (append() adds msg as the first child of header element in DOM tree)

// If you want msg to appear on both top and bottom - then first "CLONE" the element
// header.append(msg.cloneNode(true));

// Add msg element before the header element (as a sibling of header and not a child)
// header.before(msg);
// header.after(msg);



//NOTE:```````````Delete the element from DOM````````````

// When you click on the button "Got it", cookie-msg will disappear.
document.querySelector('.btn--close--cookie').addEventListener("click", function() {
    msg.remove();   // remove the msg element from DOM, i.e disappear from browser.

    // NOTE: remove() method is very recent. Earlier, we could only remove child elements. So, we had to
    // select the parent first and then remove the child
    // msg.parentElement.removeChild(msg);
});



// NOTE:````````Styles````````````

// inline styles
msg.style.backgroundColor = "#37383d";
msg.style.width = '120%';

console.log(msg.style.height);      // will get blank bcz we can log only those INLINE styles which we've set
console.log(msg.style.backgroundColor);     // will give the color on console.

// get all the styles on msg element
console.log(getComputedStyle(msg));
// get height of msg element
console.log(getComputedStyle(msg).height);

// increase height by 40px (remove px from 43.3333px height using parseFloat, base 10)
msg.style.height = Number.parseFloat(getComputedStyle(msg).height, 10) + 40 + 'px';



//NOTE:``````````````Working with HTML Attributes``````````````

// select the image element from html file having class "nav__logo" 

// standard HTML attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);  // read the attributes of the img element
console.log(logo.src);
console.log(logo.className);      // "nav__logo"  (.className and not .class)

// Non-standard (user-defined) HTML attributes
console.log(logo.designer);         // undefined

console.log(logo.getAttribute('designer'));       // Pratik   (Check HTML FILE)

logo.setAttribute('co-designer', "Raj");
console.log(logo.getAttribute("co-designer"));      // Raj

// NOTE: "Data Attribute", a special html attribute (always stored in dataset) which is used to store data in the UI
console.log(logo.dataset.versionNumber);

// Absolute path
console.log(logo.src);
// Relative path
console.log(logo.getAttribute("src"));



const link = document.querySelector(".nav__link--btn");
console.log(link.href);     // Absolute link
console.log(link.getAttribute("href"));     // Relative link


// Classes
logo.classList.add('demo');
logo.classList.add('b', 'c');
logo.classList.toggle('c');
logo.classList.contains('c');           // Not includes()

*/


/*

// NOTE:`````````Add and remove event listener``````````````

const h1 = document.querySelector("h1");

const alertH1 = function(e) {
    alert("Great! You are reading heading");

    // Remove the event listener after 1 occurance of the event
    // h1.removeEventListener("mouseenter", alertH1);
}

h1.addEventListener("mouseenter", alertH1);

// remove event listener after 3 seconds
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

*/


/*

// NOTE: `````````````````Event Propagation: BUBBLING & CAPTURING```````````````
// When an event occurs at an html element, it (event) starts at the "document" element of the DOM tree and propagates
// down to the target element covering the parents of this target html element (CAPURING Phase)

// Then the event is handled using addEventListener() at the target element (Target handling)

// At last, the event then rolls back to the "document" DOM element, propagating through the parents of target html 
// element (BUBBLING). So, same addEventListener would also work for the parent html elements as well...

// So, events are handles generally in 2 phase (Target handling & Bubbling Phase). We can also "enforce" handling events in CAPTURING phase.

// Example - "click" on child element, changes parents too (BUBBLING PHASE)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// child element
document.querySelector(".nav__link").addEventListener("click", function(e) {
	this.style.backgroundColor = randomColor();
});

// parent-1
document.querySelector(".nav__links").addEventListener("click", function(e) {
	this.style.backgroundColor = randomColor();
});

// parent-2
document.querySelector(".nav").addEventListener("click", function(e) {
	this.style.backgroundColor = randomColor();
});

*/