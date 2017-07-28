//creating button that will trigger the event

var btn = document.createElement("BUTTON");        
btn.onclick = trigger;
btn.style.background = 'yellow';
btn.style.zIndex = '1000';
btn.style.fontSize = 'large';
btn.style.fontWeight = 'bolder';
btn.style.height = '50px';
btn.style.width = '300px';
var t = document.createTextNode("Scan for Buzzwords");       
btn.appendChild(t);                               

function prependChild(parent, newFirstChild) {

	var head = document.getElementsByTagName('head');
	parent.insertBefore(newFirstChild, parent.firstChild)
};

prependChild(document.body, btn)

//the function which will scan the page and create a window will all relevent info

function trigger(){					          

//database of sjw buzzwords

var sjw = [/social justice/gi,/transphobic/gi,/transphobia/gi,/ableist/gi, /ableism/gi, /priviledge/gi, /colonialism/gi, /toxic masculinity/gi,/patriarchal/gi, /problematic/gi, /pronoun/gi, /commodify/gi, /neoliberal/gi, /heteronormative/gi, /patriarchy/gi, /microagression/gi, /intersectional/gi, /mysogynist/gi, /interrelationship/gi, /feminist/gi, /feminism/gi, /misogyny/gi, /trigger/gi, /injustice/gi, /postmodern/gi, /inequality/gi, /inequity/gi, /Marx/gi, /diverse/gi, /sociocultural/gi, /sociopolitical/gi, /diversity/gi, /multiculturalism/gi, /racism/gi, /sexism/gi, /cisgender/gi, /intercultural/gi, /queer/gi, /decontruct/gi, /limn/gi, /problematize/gi, /commodification/gi];

var rawPageData = []; 						  // contains all the text from all elements on a given page

var matchedWords = [];						  // contains all matched words 

var info = [];							  // contains html to be used for the popup window

// grab all the elements from the page

var elements = document.body.getElementsByTagName("*"); 	 
for(i in elements){
	try{	
		
		// push the text data from all elements to an array

		rawPageData.push(elements[i].lastChild.data)		
	}
	catch(err){
		rawPageData.push(elements[i].innerText)
		if(elements[i].innerText === undefined){
		}
	}

}

// join all elements in the array into one element

var joinedPageData = rawPageData.join();

	// loop through buzzword database	

	for(x in sjw){

		// match the words from database with the words in the joinedPageData array

		var scan = joinedPageData.match(sjw[x]);
			if(scan != null){

				// push matched words to new array

				matchedWords.push(scan);				}
	}

// count total of matched words

function totalCounter(){
	var totalCount = 0;

		for (i in results){
			totalCount++
		}		
	
	// push html with # of total matched words to an array

	info.push("<div class='container-fluid'><div class='row'><div class='col-md-4'><span class='text-center'><h3><b>" + totalCount + " occurences of SJW buzzwords on this page</b></h3></span><br></div></div>");	
}

// count occurence of each matched word

function counter(word){
	var count = 0;
		for(i in results){
		if(results[i].toLowerCase() == word){
			count++
					}
	}
		
	if(count != 0){
		if(count == 1){
			
			// push html for 1 matched word to array

			info.push("<div class='container-fluid'><div class='text-center'><b><span style='color:red'>" + word + "</span></b> appears " + count + " time" + "</div></div>");			info.push("<br>")
		}
		else{

			// push html for multiple matched words to array

			info.push("<div class='container-fluid'><div class='text-center'><b><span style='color:red'>" + word + "</span></b> appears " + count + " times" + "</div></div>");
			info.push("<br>")
		}
	}
	
}

// contains concatenated version of the array matchedWords

var results = [].concat.apply([], matchedWords);

// call totalCounter

totalCounter()

// loop through word database again to input each word as a parameter in counter function

for (y in sjw){	
	counter(sjw[y].source)
}

// join elements in info to format them properly for the popup

var readyFormat = info.join("");
	
// open popup window

var opened = window.open('', '_blank', 'toolbar=0,location=0,menubar=0,height=500px,width=500px');

// install bootstrap on the page and write the data onto it

opened.document.write("<html><head><title>SJW buzzwords</title><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css' integrity='sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp' crossorigin='anonymous'></head><body>" + 
readyFormat
 + "<div class='container-fluid'><div class='text-center'><button type='button' onclick='window.close()'> Close </button></div></div></body></html>");
}
