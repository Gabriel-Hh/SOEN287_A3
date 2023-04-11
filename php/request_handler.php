<?php
require_once 'functions.php';

if (isset($_GET['action'])) {
    $action = $_GET['action'];
} elseif (isset($_POST['action'])) {
    $action = $_POST['action'];
} else {
    $action = '';
}


switch ($action) {
    case 'get':
        $file = isset($_GET['file']) ? $_GET['file'] : '';
        $type = isset($_GET['type']) ? $_GET['type'] : '';

        switch ($type) {
            case 'div':
                echo getDivContent($file);
                break;

            case 'ol':
                echo getOrderedListContent($file);
                break;

            // Add more cases for other content types (ul, dl, etc.)

            default:
                http_response_code(400);
                echo 'Invalid content type';
                break;  
        }

    case 'update':
        $file = isset($_POST['file']) ? $_POST['file'] : '';
        $content = isset($_POST['content']) ? $_POST['content'] : '';
        echo updateContent($file, $content);
        break;

    case 'revert':
        $file = isset($_GET['file']) ? $_GET['file'] : '';
        echo revertContent($file);
        break;

    default:
        http_response_code(400);
        echo 'Invalid action';
        break;
}

?>