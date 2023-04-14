
// Loads the content of the dynamic-content elements for the public and admin site. 
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.getElementsByClassName('onload');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        getContent(element);
        if (element.tagName.toLowerCase() === 'textarea') {
            createButtons(element);
        }
    }
});

/* Create three buttons for each dynamic-content element that is a text area. 
Append the button container with three buttons: Update(green),Cancel(orange),Revert(red)right after the param element.
*/
/
function createButtons(element) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
  
    const updateButton = document.createElement('button');
    updateButton.classList.add('update');
    updateButton.innerHTML = 'Update';
    updateButton.addEventListener('click', event => {
      event.preventDefault();
      updateContent(element);
    });
  
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel');
    cancelButton.innerHTML = 'Cancel';
    cancelButton.addEventListener('click', event => {
      event.preventDefault();
      getContent(element);
    });
  
    const revertButton = document.createElement('button');
    revertButton.classList.add('revert');
    revertButton.innerHTML = 'Revert';
    revertButton.addEventListener('click', event => {
      event.preventDefault();
      revertContent(element);
    });
  
    buttonContainer.appendChild(updateButton);
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(revertButton);
    element.parentNode.insertBefore(buttonContainer, element.nextSibling);
  }
