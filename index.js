'use strict';

function watchForm(){
  $('form').submit(function(event){
    event.preventDefault();

    let nameEntered = $('form input').val();
    
    console.log(`The user name entered is: ${nameEntered}`);//check to see if input working for user name   
    getUserRepo(nameEntered);
    console.log('watch form is working');
    $('form input').val('');//clears out name after entry/submit 
  });
}

function getUserRepo(userName){  
  const url = `https://api.github.com/users/${userName}/repos`;

  console.log('get user repo is working')

  fetch(url)
    .then(function(response){
        if(response.ok){
          return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(function (responseJson){
      // return console.log(responseJson)
      return displayResults(responseJson);
    })
    .catch(function(err){
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson){
  console.log('display results is working'); 
  console.log(responseJson);
  $('#results-list').empty();

  let ghUserName = responseJson[0].owner.login;
  let ghUserLink = responseJson[0].owner.html_url;

  console.log(`User is: ${ghUserName} and their link is: ${ghUserLink}`);

  $('#results-list').append(
    `<li><h3><a href="${ghUserLink}" target="_blank">${ghUserName}</a>
     </h3><h4>Repositories</h4>
     <ul id="repo-list"></ul>
     </li>`);

  for (let i=0; i< responseJson.length; i++){  
    $('#repo-list').append(
      `<li>
      <a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a>
      </li>`
  )};

  $('#results').removeClass('hidden');
}

//let's us know that the app has loaded
$(function() {
  console.log('App has loaded! Waiting on submit');
  watchForm();
});