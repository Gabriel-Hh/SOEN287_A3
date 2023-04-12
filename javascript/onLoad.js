
// Loads the content of the dynamic-content elements 
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.onload');
    elements.forEach(element => getContent(element));
});