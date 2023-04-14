
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
The buttons are used to update, cancel and revert the content of the param element. 
The button container should be inline with the calling element. The buttons should be inline column-wise with each other.
*/
// function createButtons(element) {
//     //const elementId = element.id;
//     const buttonContainer = document.createElement('div');
//     buttonContainer.classList.add('button-container');
//     buttonContainer.classList.add('inline');
//     buttonContainer.classList.add('column');
//     buttonContainer.classList.add('center');
//     buttonContainer.classList.add('space-between');
//     const updateButton = document.createElement('button');
//     updateButton.classList.add('update');
//     updateButton.classList.add('green');
//     updateButton.classList.add('inline');
//     updateButton.classList.add('column');
//     updateButton.classList.add('center');
//     updateButton.classList.add('space-between');
//     updateButton.innerHTML = 'Update';
//     // updateButton.addEventListener('click', () => updateContent(element));
//     updateButton.addEventListener('click', event => {
//         event.preventDefault();
//         updateContent(element);
//     });
//     const cancelButton = document.createElement('button');
//     cancelButton.classList.add('cancel');
//     cancelButton.classList.add('orange');
//     cancelButton.classList.add('inline');
//     cancelButton.classList.add('column');
//     cancelButton.classList.add('center');
//     cancelButton.classList.add('space-between');
//     cancelButton.innerHTML = 'Cancel';
//     // cancelButton.addEventListener('click', () => getContent(element));
//     cancelButton.addEventListener('click', event => {
//         event.preventDefault();
//         getContent(element);
//     });
//     const revertButton = document.createElement('button');
//     revertButton.classList.add('revert');
//     revertButton.classList.add('red');
//     revertButton.classList.add('inline');
//     revertButton.classList.add('column');
//     revertButton.classList.add('center');
//     revertButton.classList.add('space-between');
//     revertButton.innerHTML = 'Revert';
//     // revertButton.addEventListener('click', () => revertContent(element));
//     revertButton.addEventListener('click', event => {
//         event.preventDefault();
//         revertContent(element);
//     });
//     buttonContainer.appendChild(updateButton);
//     buttonContainer.appendChild(cancelButton);
//     buttonContainer.appendChild(revertButton);
//     element.parentNode.insertBefore(buttonContainer, element.nextSibling);
// }
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
