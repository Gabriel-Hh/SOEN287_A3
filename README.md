Gabriel's Website
Overview
This website is a personal website and portfolio showcasing projects, a resume, and contact information. 
The website is built to be run on a local server using XAMPP with Apache.

Installation
Download and install XAMPP.
Make sure Apache is running in the XAMPP Control Panel.
Unzip the website files into the htdocs folder in your XAMPP installation directory (e.g., C:\xampp\htdocs on Windows).
You will need to allow the replacement of index.php (rename the orginal to keep it).
Otherwise, you can navigate to the nested index.php file (in Soen287_A3) and it should redirect correctly as well.

Usage
Open your web browser and go to http://localhost/ to access the public website.
To access the admin portion of the website you must login from public/pages/admin.html.

Admin Features
The admin portion of the website allows editing of text files and viewing contact messages.
The "Update" button updates the text file.
The "Cancel" button resets the text area to the current saved content.
The "Revert" button reverts the text file to the previously saved content (from a .bak file).

Security
Direct URL access to the admin site is blocked for users who are not logged in.
All admin pages except adminLogout.html are protected.
The security of the admin pages can be easily verified by checking if the user is logged in.

Contact
If you encounter any issues or have questions, please feel free to contact me:

Email: gabrielhorth@gmail.com
Phone: (514) 686-4210