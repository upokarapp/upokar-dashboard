// Get references to DOM elements
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll("nav a"); // Get all navigation links

// Toggle mobile menu visibility
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Close mobile menu when a navigation link is clicked (for smooth scrolling)
if (mobileMenu) {
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      // Check if the link is an internal anchor link (starts with #)
      if (link.getAttribute("href").startsWith("#")) {
        // Prevent default hash jump
        event.preventDefault();

        // Close the mobile menu if it's open
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }

        // Get the target section's ID from the href
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Scroll to the target section smoothly
          targetSection.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// Optional: Add a "Back to Top" button (not implemented in HTML, but here's the JS)
// You would need to add a button element to your HTML like:
// <button id="back-to-top" class="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hidden">
//     <i class="fas fa-arrow-up"></i>
// </button>

// const backToTopButton = document.getElementById('back-to-top');

// if (backToTopButton) {
//     // Show/hide button based on scroll position
//     window.addEventListener('scroll', () => {
//         if (window.scrollY > 300) { // Show after scrolling 300px
//             backToTopButton.classList.remove('hidden');
//         } else {
//             backToTopButton.classList.add('hidden');
//         }
//     });

//     // Scroll to top when button is clicked
//     backToTopButton.addEventListener('click', () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     });
// }

console.log("Upokar website scripts loaded!");
