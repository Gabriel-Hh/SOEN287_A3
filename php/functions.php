<?php
// Get content from file
function getContent($filename) {
    $filepath = "../text_files/$filename";
    if (file_exists($filepath)) {
        $content = file_get_contents($filepath);
        return $content;
    } else {
        http_response_code(400);
        return "Error: File does not exist: ". $filename;
    }
}


// Return list formatted content from file
function getListContent($filename) {
    $filepath = "../text_files/$filename";
    $content = file_get_contents($filepath);
    //Create an array of list items, split by newlines
    $listArray = explode("\n", $content);

    $output = '';
    foreach ($listArray as $item) {
        $output .= '<li>' . $item . '</li>';
    }

    return $output;
}
// Return data definition formatted content from file
// function getDataDefinitionContent($filename) {
//     $filepath = "../text_files/$filename";
//     $content = file_get_contents($filepath);
//     //Create an array of list items, split by newlines
//     $listItems = explode(PHP_EOL, $content);

//     $output = '<dl>';
//     for ($i = 0; $i < count($listItems); $i += 2) {
//         $term = isset($listItems[$i]) ? $listItems[$i] : '';
//         $definition = isset($listItems[$i + 1]) ? $listItems[$i + 1] : '';

//         $output .= '<dt>' . $term . '</dt>';
//         $output .= '<dd>' . $definition . '</dd>';
//     }
//     $output .= '</dl>';

//     return $output;
// }

// Revert content to backup file
function revertContent($filename) {
    $filepath = "../text_files/$filename";
    $backupPath = "../text_files/$filename".".bak";
    if (file_exists($backupPath)) {
        // Copy backup file into current file
        copy($backupPath, $filepath);
        return "Content reverted successfully."; 
    } else {
        http_response_code(400);
        echo "Error: Backup file does not exist.";
    }
}

// Update content in file
function updateContent($filename, $content) {
    $filepath = "../text_files/$filename";
    $backupPath = "../text_files/$filename".".bak";
    
    if (file_exists($filepath)) {
        // Update Backup file
        copy($filepath, $backupPath);
        // Overwrite new content to file
        $file = fopen($filepath, 'w');
        fwrite($file, $content);
        fclose($file);
        return $content;
    } else {
        http_response_code(400);
        return "Error: File does not exist.";
    }
}

?>