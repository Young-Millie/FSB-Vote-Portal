$('#voterTokenTxt').focusin(function(){
  $('form').addClass('up');
});

$('#voterTokenTxt').focusout(function(e){
    $('form').removeClass('up');

    tryLoginClick();
});

// Panda Eye move
$(document).on( "mousemove", function( event ) {
  var dw = $(document).width() / 15;
  var dh = $(document).height() / 15;
  var x = event.pageX/ dw;
  var y = event.pageY/ dh;
  $('.eye-ball').css({
    width : x,
    height : y
  });
});

/**
*Handle enter key press event for USERNAME text field
*/
$('#voterIdTxt').on('keydown', function(e) {
    console.log("KEYDOWN");
    if (e.which == 13) {
        console.log("ENTER KEY PRESSED");
        $('#voterTokenTxt').focus();
    }

});

/**
*Handle enter key press event for password text field
*/
$('#voterTokenTxt').on('keydown', function(e) {
    console.log("KEYDOWN");
    if (e.which == 13) {
        console.log("ENTER KEY PRESSED");
        $('#loginBtn').trigger('click');
    }

});

// validation
//$('.btn').click(function(){
//  $('form').addClass('wrong-entry');
//    setTimeout(function(){
//       $('form').removeClass('wrong-entry');
//     },3000 );
//});

//######################################################################################
//######################### Custom Code ################################################

function tryLoginClick(){
    var voterId = $("#voterIdTxt").val();
    var voterToken = $("#voterTokenTxt").val();

    if( voterId.length == 0 ){
      validate_login("Username is required!");
      return;
    }

    if( voterToken.length == 0 ){
      validate_login("Token is required!");
      return;
    }

    if( voterToken.length > 0 && voterToken.length > 0 ){
      $('#loginBtn').trigger('click');
    }
}

$('#loginBtn').click(function(e) {
    e.preventDefault();

    var voterId = $("#voterIdTxt").val();
    var voterToken = $("#voterTokenTxt").val();

    if( voterId.length == 0 ){
      validate_login("Username is required!");
      return;
    }

    if( voterToken.length == 0 ){
      validate_login("Token is required!");
      return;
    }

    if( voterToken.length < 8 ){
      validate_login("Token must be 8 characters!");
      return;
    }

    console.log("Data to push!");

    formData = {
        "user": voterId,
        "token":voterToken
    }

    console.log(formData);

    $.postJSON("/login", formData, function(data){
        console.log(data);
        if (data.code == 100) {
            $('form').removeClass('up');

            validate_login(data.message);
            setTimeout(function(){
               window.location = window.location = "/vote";
            },3000 );

        } else if (data.code == 101){
            validate_login(data.message);
        } else{
            validate_login(data.message);;
        }

      });

});

//Prevent page from being right clicked
//document.addEventListener("contextmenu", function(e){
//    e.preventDefault();
//}, false);

function validate_login(msg){
    $('.alert').text(msg);
    $('form').addClass('wrong-entry');
    setTimeout(function(){
       $('form').removeClass('wrong-entry');
     },3000 );
}


/**
* Post Handler
*/
$.postJSON = function(url, data, callback) {
  return jQuery.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: 'json',
      success: callback,
      error: onAjaxError,
      timeout: 50000,
      cache: false
  });
};

function onAjaxloginError(xhr, status, error){


}

function onAjaxError(xhr, status, error){

}

function onAjaxNotification(xhr, status, error){


}