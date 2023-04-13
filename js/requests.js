
// Get properly formatted text content for website
function getContent(element) {
    const elementId = element.id;
    const filename = elementId + '.txt';
    let contentType = element.tagName.toLowerCase();
    
    //Check elementId for special Formatting
     if (!(contentType === 'textarea')) {//Dynamic textarea is for admin site only, don't format.
        switch(elementId) {
            case 'education':
                contentType = 'educationContent';
                break;
            case 'work_experience':
                contentType = 'workExperienceContent';
                break;
            case 'skills':
                contentType = 'skillsContent';
                break;
            case 'social':
                contentType = 'socialContent';
                break;
        };
    };

    fetch(`../../php/request_handler.php?action=get&file=${filename}&type=${contentType}`)
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Error fetching content');
            }
        })
        .then(content => {
            if (contentType === 'input' || contentType === 'textarea') {
                element.value = content;
            } else {
                element.innerHTML = content;
            }
        })
        .catch(error => {
            alert('Error fetching content: ' + (error ? error.message : filename));
        });
}

// Update content file.
function updateContent(element) {
    const filename = element.id + '.txt';
    const content = element.value;

    fetch(`../../php/request_handler.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=update&file=${filename}&content=${encodeURIComponent(content)}`
    })
        .then(response => response.text().then(text => {
            if (response.ok) {
                alert('Content updated successfully');
                getContent(element);
            } else {
                alert('Error updating content: ' + text);
            }
        }))
        .catch(error => {
            alert('Error updating content:', error);
        });
}

//Revert content file
function revertContent(element) {
    const filename = element.id + '.txt';

    fetch(`../../php/request_handler.php?action=revert&file=${filename}`)
        .then(response => response.text().then(text => {
            if (response.ok) {
                console.log(text);
                getContent(element);
            } else {
                alert('Error reverting content: ' + text);
            }
        }))
        .catch(error => {
            alert('Error reverting content:', error);
        });
}

