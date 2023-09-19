 /*
  Dictionary app code written by Paul Coke (c)2023

 */
 
 function _(el){

    return document.getElementById(el);
 }

  //create async function that makes the function 
 //return a promise and connects to Fetch API
  async function fetchAPI(word){

    try{
     
    //initialise url and append "word" parameter to the end of it 
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
               
    //initialise our result variable by waiting for the 
    //returned promise retrieving the information contained 
    //in the URL in JSON format
    const result = await fetch(url).then((res)=> res.json());

    //Once the information has been retrieved, populate the "word title"
    //and "word meaning" text book with the relevant JSON values
    _('wordTitle').innerText = result[0].word;
    _('wordMeaning').innerText = result[0].meanings[0].definitions[0].definition;

        //if the app has been inactive for 15 seconds and the user has not made 
        //another selecton clear all text fields
        setTimeout('clearWordAndMeaning()',15000);

    }
    catch(err){

        console.log(err);
    }
   
}

function clearWordAndMeaning(){

    _('txtWord').value = "";
    _('wordTitle').innerText = '__';
    _('wordMeaning').innerText = '__';
}

//add an an event listener to the "key up"
//event so tha the fetch API can retrieve the 
//text in the text box after the user has 
//entered a dictionary search word and has 
//pressed enter
_('txtWord').addEventListener('keyup',(e)=>{

     if(e.target.value && e.key === "Enter"){

        fetchAPI(e.target.value);
    }
 })