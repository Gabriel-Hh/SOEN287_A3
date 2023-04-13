
// Get general formatted text content for public site
function getContent(element) {
    const elementId = element.id;
    const filename = elementId + '.txt';
    const contentType = element.tagName.toLowerCase();

    fetch(`../../php/request_handler.php?action=get&file=${filename}&type=${contentType}`)
        .then(response => response.text())
        .then(content => {
            if (contentType === 'input' || contentType === 'textarea'){
                element.value = content;
            }else
                element.innerHTML = content;
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}

function updateContent(element) {
    // const element = document.getElementById(elementId);
    const filename = element.id + '.txt';
    const content = element.value;

    fetch(`../../php/request_handler.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=update&file=${filename}&content=${encodeURIComponent(content)}`
    })
        .then(response => {
            if (response.ok) {
                alert('Content updated successfully');
            } else {
                alert('Error updating content');
            }
        })
        .catch(error => {
            alert('Error updating content:', error);
        });
}

function revertContent(element) {
    const filename = element.id + '.txt';

    fetch(`../../php/request_handler.php?action=revert&file=${filename}`)
        .then(response => response.text(),
            alert(response))
        .then(result => {
            alert(result);
            getContent(element);
        })
        .catch(error => {
            alert('Error reverting content:', error);
        });
}

// NOT NECESSARY, USE getContent() instead
// Get content for admin site 
function getContentForAdmin(element) {
    const elementId = element.id;
    const filename = elementId + '.txt';
    const contentType = element.tagName.toLowerCase();

    fetch(`../../php/request_handler.php?action=get&file=${filename}&type=${contentType}`)
        .then(response => response.text())
        .then(content => {
            element.value = content;
        })
        .catch(error => {
            console.error('Error fetching content:', error);
        });
}
