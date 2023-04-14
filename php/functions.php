<?php

//Check that file exists or return error
function checkfileExists($filepath) {
    if (!(file_exists($filepath))) {
        http_response_code(400);
        return "Error: File does not exist: ".$filepath;
    }
}

// Get unformatted content from file
function getContent($filename) {
    $filepath = "../text_files/$filename";
    checkFileExists($filepath);

    $content = file_get_contents($filepath);
    return $content;
   
}


// Get list formatted content from file
function getListContent($filename) {
    $filepath = "../text_files/$filename";
    checkFileExists($filepath);

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
    checkFileExists($filepath);
    checkFileExists($backupPath);
    
    // Copy backup file into current file
    copy($backupPath, $filepath);
    return "Content reverted successfully."; 

}

// Update content in file
function updateContent($filename, $content) {
    $filepath = "../text_files/$filename";
    $backupPath = "../text_files/$filename".".bak";
    checkFileExists($filepath);
    checkFileExists($backupPath);
    
    // Update Backup file
    copy($filepath, $backupPath);
    
    // Overwrite new content to file
    $file = fopen($filepath, 'w');
    fwrite($file, $content);
    fclose($file);
    return $content;

}

// SPECIALIZED CONTENT FORMATTING FUNCTIONS

//Get formatted content from file for format Subject;;Period;;Institution;; (+Bullet Points)
function getSPIContent($filename, $wrapperType) {
    $filepath = "../text_files/$filename";
    checkFileExists($filepath);
    
    //Load content and create an array of list items, split by "//"
    $content = file_get_contents($filepath);
    $listArray = explode("//", $content);

    
    //Format content as special data definition list
    $output = '';
    for ($i = 0; $i < count($listArray); $i++) {
        $output .= "<".$wrapperType.">";

        // Split list item into array of items, split by ";;"
        $listItem = explode(";;", $listArray[$i]);
        
        //Check lenght of list item
        if (count($listItem) < 3) {
            http_response_code(400);
            return "Error: Invalid content format in file: ".$filename." at item: ".$i;
        }
        $j = 0;
        // First item is the Main Subject
        $output .= "<dt><em><b>" . $listItem[$j++] . "</b>";
        // Second item is the Period
        $output .= "<span style='float: right;'>" . $listItem[$j++] . "</span><br/>";
        // Third item is the Institution / location
        $output .= $listItem[$j++] . "</em></dt>";
        
        // (OPTIONAL) Any remaining items are bullet points
        while ( $j < count($listItem)){
            $output .= "<dd style='width: 70%'>" . $listItem[$j++] . "</dd>";
        };
        $output .= "</".$wrapperType.">";
    };

    return $output;
}

// Get Skills formatted content from file - Category;;Skill;;Skill;;Skill...//
function getSkillsContent($filename){
    $filepath = "../text_files/$filename";
    checkFileExists($filepath);
    
    
    //Load content and create an array of list items, split by "//"
    $content = file_get_contents($filepath);
    $listArray = explode("//", $content);

    
    //Format content as special data definition list
    $output = '';
    for ($i = 0; $i < count($listArray); $i++) {
        $output .= "<div><dl>";

        // Split list item into array of items, split by ";;"
        $listItem = explode(";;", $listArray[$i]);
        
        //Check lenght of list item
        if (count($listItem) < 1) {
            http_response_code(400);
            return "Error: Invalid content format in file: ".$filename." at item: ".$i;
        }

        $j = 0;
        // First item is the Category
        $output .= "<dt><em>" . $listItem[$j++] . "</em></dt>";
        // Other items are the Skill
        while ( $j < count($listItem)){
            $output .= "<dd>" . $listItem[$j++] . "</dd>";
        };
        $output .= "</div></dl>";
    };

    return $output;
}

// Get Social formatted content from file - One link per line
function getSocialContent($filename){
    $filepath = "../text_files/$filename";
    checkFileExists($filepath);
    
    
    //Load content and create an array of list items, split by "//"
    $content = file_get_contents($filepath);
    $listArray = explode("\n", $content);

    // Check length of list
    if (count($listArray) !== 9) {
        http_response_code(400);
        return "Error: Invalid content format in file: ".$filename . " - 9 items required";
    }

    $output = '';
    $i = 0;
    //Format content for image map
    $output .= '<area alt="facebook" shape="rect" coords="0,0,90,90" href="'. $listArray[$i++] . '" target="_blank"/>';
    $output .= '<area alt="twitter" shape="rect" coords="105,0,195,90" href="'. $listArray[$i++] . '" target="_blank"/>';
    $output .= '<area alt="google+" shape="rect" coords="210,0,300,90" href="'. $listArray[$i++] . '" target="_blank"/>';
    $output .= '<area alt="instagram" shape="rect" coords="0,105,90,195" href="'. $listArray[$i++] . '" target="_blank"/>';
    $output .= '<area alt="dribbble" shape="rect" coords="105,105,195,195" href="'. $listArray[$i++] . '" target="_blank"/>';
    $output .= '<area alt="linkedin" shape="rect" coords="210,105,300,195" href="'. $listArray[$i++] . '" target="_blank"/>';
    $output .= '<area alt="whatsapp" shape="rect" coords="0,210,90,300" href="'. $listArray[$i++] . '" target="_blank"/>';
    $output .= '<area alt="youtube" shape="rect" coords="105,210,195,300" href="'. $listArray[$i++] . '" target="_blank"/>';
    $output .= '<area alt="snapchat" shape="rect" coords="210,210,300,300" href="'. $listArray[$i++] . '" target="_blank"/>';
    
    return $output;
}

// PHP: saveMessage function
function saveMessage($name, $email, $phone, $message) {
    $filepath = "../text_files/messages.txt";
    $backupPath = $filepath.".bak";

    // Backup file
    copy($filepath, $backupPath);

    // Append new message to file
    $newMessage = "{$name};;{$email};;{$phone};;{$message}\n";
    $result = file_put_contents($filepath, $newMessage, FILE_APPEND);

    // Return result
    if ($result === false) {
        http_response_code(400);
        return "Error: Unable to save the message.";
    } else {
        return "Message saved.";
    }
}


?>