<?php
// Return raw content from file. used for paragraphs, divs and all of the admin pages.
function getContent($filename) {
    $filepath = "../text_files/$filename";
    $content = file_get_contents($filepath);
    return $content;
}

// Return list formatted content from file
function getListContent($filename) {
    $filepath = "../text_files/$filename";
    $content = file_get_contents($filepath);
    //Create an array of list items, split by newlines
    $listItems = explode(PHP_EOL, $content);

    $output = '';
    foreach ($listItems as $item) {
        $output .= '<li>' . $item . '</li>';
    }
    $output .= '</ol>';

    return $output;
}
// Return data definition formatted content from file
function getDataDefinitionContent($filename) {
    $filepath = "../text_files/$filename";
    $content = file_get_contents($filepath);
    //Create an array of list items, split by newlines
    $listItems = explode(PHP_EOL, $content);

    $output = '<dl>';
    for ($i = 0; $i < count($listItems); $i += 2) {
        $term = isset($listItems[$i]) ? $listItems[$i] : '';
        $definition = isset($listItems[$i + 1]) ? $listItems[$i + 1] : '';

        $output .= '<dt>' . $term . '</dt>';
        $output .= '<dd>' . $definition . '</dd>';
    }
    $output .= '</dl>';

    return $output;
}
// Revert content from backup file and loads .bak file into current text file
function revertContent($filename) {
    $filepath = "../text_files/$filename";
    $backupPath = "../text_files/$filename".".bak";
    // Revert backup
    copy($backupPath, $filepath);
    // Return content from backup file
    $content = file_get_contents($filepath);
    return $content;
}



// Update content in file
function updateContent($filename, $content) {
    $filepath = "../text_files/$filename";
    $backupPath = "../text_files/$filename".".bak";
// Backup file  
    copy($filepath, $backupPath);
    // Overwrite new content to file
    $file = fopen($filepath, 'w');
    fwrite($file, $content);
    fclose($file);
    return $content;
}

?>