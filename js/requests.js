
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

// Submit contact form
function contactFormSubmit() {
    const name = document.getElementById('contact_name').value;
    const email = document.getElementById('contact_email').value;
    const phone = document.getElementById('contact_phone').value;
    const message = document.getElementById('contact_message').value;

    fetch('../../php/request_handler.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `action=saveMessage&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&message=${encodeURIComponent(message)}`
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Error sending message');
        }
    })
    .then(() => {
        document.getElementById('contact_form').reset();
        alert('Message sent!');
        
    })
    .catch(error => {
        alert('Error sending message: ' + error.message);
    });
}

// // Display messages in admin site
// function displayMessages() {
//     const container = document.getElementById('message_container');

//     fetch("../../php/request_handler.php?action=getMessages")
//         .then(response => {
//             if (response.ok) {
//                 return response.text();
//             } else {
//                 throw new Error("Error fetching messages");
//             }
//         })
//         .then(content => {
//             container.innerHTML = content;
//         })
//         .catch(error => {
//             alert("Error fetching messages:", error.message);
//         });
// }

function displayMessages() {
    const container = document.getElementById('messages_container');
    
    fetch("../../php/request_handler.php?action=getMessages")
        .then(response => {
            console.log('Response status:', response.status); // Log response status
            console.log('Response text:', response.statusText); // Log response text
            
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Error fetching messages");
            }
        })
        .then(content => {
            container.innerHTML = content;
        })
        .catch(error => {
            console.log('Error:', error.message); // Log error message
            alert("Error fetching messages:", error.message);
        });
}

