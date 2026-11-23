// script.js is linked on ALL three pages (Home, Projects, Contact).
// Some elements only exist on one page, so before using them I check
// "if (theElement)". querySelector gives back null when the element is
// not on the page, and null counts as false, so that code is skipped.

// ===== Feature 1 (every page): dark mode, Assignment 7 checklist 5 =====
// The button is in the nav, and the nav is the same on every page.
const themeBtn = document.getElementById("theme-btn");

// Each click adds the "dark" class to the body, or takes it away.
// styles.css changes the colors when the body has that class.
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  // Change the button's words (and its aria-pressed state for screen readers)
  themeBtn.textContent = isDark ? "Light mode" : "Dark mode";
  themeBtn.setAttribute("aria-pressed", isDark);
});

// ===== Home page only: my list (Assignment 5, kept for A7 checklist 4) =====
// Checklist 2: an array of my own data (things I do outside of class).
// Each item has an index, starting at 0.
const hobbies = [
  "Playing pickleball",
  "Playing soccer",
  "Watching soccer",
  "Working out three to four times a week",
  "Reading books"
];

// Finding the elements on the page (each one has an id in index.html)
const list = document.querySelector("#list");              // Checklist 4: querySelector finds the empty list
const count = document.getElementById("count");            // Checklist 5: getElementById finds the count line
const addForm = document.getElementById("add-form");       // Feature 3: the "add" form
const hobbyInput = document.getElementById("hobby-input"); // Feature 3: the text box
const hobbyMessage = document.getElementById("hobby-message"); // Feature 3: a spot for a short warning
const sortBtn = document.getElementById("sort-btn");       // Feature 2: the sort button

// This function empties the list and builds it again from the array.
// The page starts with it, and the add and sort features call it again.
function showList() {
  // Empty the list first, so nothing shows twice
  list.textContent = "";

  // Checklist 3: forEach (a loop) runs the function once for each item.
  // On each pass, "hobby" holds the next item.
  hobbies.forEach(function (hobby) {
    // Checklist 4: createElement makes a new, empty li (it exists only in memory)
    const li = document.createElement("li");
    // Checklist 4: textContent puts the item's words inside the new li
    li.textContent = hobby;
    // Checklist 4: appendChild adds it to the end of the list, so it shows on the page
    list.appendChild(li);
  });

  // Checklist 5: textContent writes how many items I have, using .length
  count.textContent = "I have " + hobbies.length + " things I do outside of class.";
}

// Only the Home page has the list, so only run this part there
if (list) {
  showList();

  // Feature 2: sort A to Z
  // sort() puts the array in order. localeCompare compares two words as text.
  // Then showList() redraws the list from the sorted array.
  sortBtn.addEventListener("click", function () {
    hobbies.sort(function (a, b) {
      return a.localeCompare(b);
    });
    showList();
  });

  // Feature 3: add a new item
  // A form's "submit" event happens on the Add button AND on the Enter key.
  addForm.addEventListener("submit", function (event) {
    event.preventDefault();                  // stop the page from reloading
    const newHobby = hobbyInput.value.trim(); // .trim() removes spaces at both ends

    // An empty box adds nothing: show a short warning and stop here
    if (newHobby === "") {
      hobbyMessage.textContent = "Please type something first.";
      return;
    }

    hobbies.push(newHobby);        // push adds the new item to the end of the array
    hobbyInput.value = "";         // clear the box
    hobbyMessage.textContent = ""; // clear any old warning
    showList();                    // redraw the list and the count
  });
}

// ===== Contact page only: the contact form, Assignment 7 checklist 6 =====
const contactForm = document.getElementById("contact-form");
const messageInput = document.getElementById("message");
const messageError = document.getElementById("message-error"); // the spot next to the message box
const thanks = document.getElementById("thanks");              // the thank-you line

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    // The browser already checked "required" and type="email" before this
    // runs. preventDefault() stops the page from reloading (there is no server).
    event.preventDefault();

    const message = messageInput.value.trim();

    // My own rule: the message must be at least 20 characters (.length)
    if (message.length < 20) {
      messageError.textContent = "Please write at least 20 characters. You have " + message.length + ".";
      thanks.textContent = "";
      messageInput.focus();   // put the cursor back in the message box
      return;                 // stop here, so no thank-you message
    }

    // Everything is fine: clear the warning, show thanks, empty the form
    messageError.textContent = "";
    thanks.textContent = "Thank you! Your message was received.";
    contactForm.reset();      // reset() empties every box in the form
  });
}
