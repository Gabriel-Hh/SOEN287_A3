<?php
// Get unformatted content from file
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


// Get list formatted content from file
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

// Revert content from backup file
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

// SPECIALIZED CONTENT FORMATTING FUNCTIONS

//Get formatted education content from file
function getEducationContent($filename) {
    $filepath = "../text_files/$filename";
    
    //Check if file exists
    if(!file_exists($filepath)) {
        http_response_code(400);
        return "Error: File does not exist: ".$filename;
    }
    
    //Load content and create an array of list items, split by "//"
    $content = file_get_contents($filepath);
    $listArray = explode("//", $content);

    
    //Format content as special data definition list
    $output = '';
    for ($i = 0; $i < count($listArray); $i++) {
        // Split list item into array of items, split by ";;"
        $listItem = explode(";;", $listArray[$i]);
        
        //Check lenght of list item
        if (count($listItem) < 3) {
            http_response_code(400);
            return "Error: Invalid content format in file: ".$filename." at item: ".$i;
        }
        $j = 0;
        // First item is the title
        $output .= "<dt><em><b>" . $listItem[$j++] . "</b>";
        // Second item is the period
        $output .= "<span style='float: right;'>" . $listItem[$j++] . "</span><br/>";
        // Third item is the institution / location
        $output .= $listItem[$j++] . "</em></dt>";
        
        // (OPTIONAL) Any remaining items are bullet points
        while ( $j < count($listItem)){
            $output .= "<dd style='width: 70%'>" . $listItem[$j++] . "</dd>";
        };
    };

    return $output;
}
?>