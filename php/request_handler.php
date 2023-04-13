<?php
require_once 'functions.php';

// Parse action from GET or POST
if (isset($_GET['action'])) {
    $action = $_GET['action'];
} elseif (isset($_POST['action'])) {
    $action = $_POST['action'];
} else {
    $action = '';
}

// Handle action
switch ($action) {
    //GET request: get content
    case 'get':
        $file = isset($_GET['file']) ? $_GET['file'] : '';
        $type = isset($_GET['type']) ? $_GET['type'] : '';

        // Format content based element type
        switch ($type) {
            // No formatting needed for div, input, and textarea
            case 'p':
            case 'div':
            case 'input':
            case 'textarea':
                echo getContent($file);
                break;
            
                // List formatting for ol and ul
            case 'ol':
            case 'ul':
                echo getListContent($file);
                break;
           
            case 'educationContent':
                echo getSPIContent($file, "p");
                break;
            
            case 'workExperienceContent':
                echo getSPIContent($file, "li");
                break;

            case 'skillsContent':
                echo getSkillsContent($file);
                break;

            case 'dl': //Admin only
                echo getContent($file);
                break;

            default:
                http_response_code(400);
                echo 'Invalid content type :' . $type;
                break;  
        }
        break; 

    //GET request: revert content
    case 'revert':
        $file = isset($_GET['file']) ? $_GET['file'] : '';
        revertContent($file);
        break;

    //POST request: update content
    case 'update':
        $file = isset($_POST['file']) ? $_POST['file'] : '';
        $content = isset($_POST['content']) ? $_POST['content'] : '';
        echo updateContent($file, $content);
        break;

    default:
        http_response_code(400);
        echo 'Invalid action';
        break;
}

?>