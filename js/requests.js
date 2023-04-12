
// Get formatted text content for public site
function getContent(element) {
    const elementId = element.id;
    const filename = elementId + '.txt';
    const contentType = element.tagName.toLowerCase();

    fetch(`../../php/request_handler.php?action=get&file=${filename}&type=${contentType}`)
        .then(response => response.text())
        .then(content => {
            if (contentType === 'input'){
                element.value = content;
            }else
                element.innerHTML = content;
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}
// NOT NECESSARY, USE getContent() instead
// Get content for admin site 
// function getContentForAdmin(element) {
//     const elementId = element.id;
//     const filename = elementId + '.txt';
//     const contentType = element.tagName.toLowerCase();

//     fetch(`../../php/request_handler.php?action=get&file=${filename}&type=${contentType}`)
//         .then(response => response.text())
//         .then(content => {
//             element.value = content;
//         })
//         .catch(error => {
//             console.error('Error fetching content:', error);
//         });
// }

function updateContent(elementId) {
    const input = document.getElementById(elementId);
    const filename = elementId + '.txt';
    const content = input.value;

    fetch(`../../php/request_handler.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=update&file=${filename}&content=${encodeURIComponent(content)}`
    })
        .then(response => response.text())
        .then(result => {
            alert(result);
        })
        .catch(error => {
            console.error('Error updating content:', error);
        });
}

function revertContent(elementId) {
    const filename = elementId + '.txt';

    fetch(`../../php/request_handler.php?action=revert&file=${filename}`)
        .then(response => response.text())
        .then(result => {
            alert(result);
            getContent(document.getElementById(elementId));
        })
        .catch(error => {
            console.error('Error reverting content:', error);
        });
}

