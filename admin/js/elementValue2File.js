
// Function modeled from Lecture Notes 07, page 43.

/*
For the error handling, adding event parameter in parent function and returning false taken from: 
https://stackoverflow.com/questions/3350247/how-to-prevent-form-from-being-submitted
*/
		function elementValue2File(elementId){
			
			if (typeof(elementId) !== 'string') {
				alert("Error: type[" + typeof(elementId) + "] - Invalid arguement type in elementValue2File()).");
				return false;
			}

			if(document.getElementById(elementId) === null){
				alert("Error: ID["+ elementId + "] - Undefined elementId in elementValue2File().")
				return false;
			}

			let inputFile = new File([document.getElementById(elementId).value], elementId + ".txt", {type : "text/plain",});
			let inputFile2URL = window.URL.createObjectURL(inputFile);
			
			// Create an achor tag and force download
			let anchorTag = document.createElement("a");
			anchorTag.href = inputFile2URL;
			anchorTag.download = elementId + ".txt";
			anchorTag.click();
		}