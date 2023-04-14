
// Check if user is logged in
function checkLoginStatus(){
    

    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const loginTime = sessionStorage.getItem('login_time');
    const loginAgent = sessionStorage.getItem('login_user_agent');

    if (username && password && loginTime && loginAgent) {
        if (loginAgent === navigator.userAgent) {
            const currentTime = Date.now();
            const timeDiff = currentTime - loginTime;

            if (timeDiff < 3600000) { // 1 hour
                return true;
            }
        }
    }
    // Alert and redirect to login page
    alert('Please login to access this page.');
    window.location.href = '../../public/pages/admin.html';
    return false;
}

// Function Triggered on DOMContentLoaded
document.addEventListener('DOMContentLoaded', checkLoginStatus);