function processInput(text) {

    
    const inputText = document.getElementById('inputText').value;
    console.log(inputText)
    let str = `<div class="dots">
    <div class="dot1"></div>
    <div class="dot2"></div>
    <div class="dot3"></div>
</div>`
    document.getElementById('output').innerHTML = `<p class = "question" >${(text != "" && text) ?text :inputText}</p><div class ="answer">${str}</div>`;

    fetch('/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: (text != "" && text) ?text :inputText})
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('output').innerHTML = `<p class = "question" >${(text != "" && text) ?text :inputText}</p><p class ="answer">${data.output}</p>`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const inText = document.getElementById('inputText');
inText.addEventListener('keypress',(event)=>{if(event.key=="Enter"){
  event.preventDefault();
  processInput()}})