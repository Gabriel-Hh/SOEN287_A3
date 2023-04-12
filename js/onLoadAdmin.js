// Onload function for admin pages.
// The normal onload doesn't work for input elements.
window.addEventListener('DOMContentLoaded', (event) => {
    // Get all input elements with type text or textarea
    const inputElements = document.querySelectorAll('input[type="text"], textarea');

    inputElements.forEach(element => {
        getContentForAdmin(element);
    });
});
