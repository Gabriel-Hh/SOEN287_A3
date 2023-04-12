
// Loads the content of the dynamic-content elements 
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.dynamic-content');
    elements.forEach(element => getContent(element));
});