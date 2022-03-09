/*
*    INITIALIZING ALL VARIABLES HERE
*/
var vote_pages ;
var voter_cur_page = 0;
var position_html_id_prefix = "post";
var candidate_html_id_prefix = "cand";
var candidate_image_html_id_prefix = "candimg";
var vote_status = 0;

var position_ids = [];
var position_names = [] ;
var voter_vote_data = {};
var post_cands = {};


//Variables to hold sound paths
var success_sound_url;
var error_sound_url;
var info_sound_url;
var warning_sound_url;

var loading = null;

/*
*    END OF VARIABLE INITIALIZATION
*/

/*
*   TO Set voting data, so JS can manage the voting page dynamically
*
*   post_ids - An array of all the positions Ids
*   post_names - An array of all the positions names
*   post_cands_data - A JSON array of all the positions as keys and candidates (Array) as values
*/
function setPages(post_ids,post_names,post_cands_data){
    vote_pages = post_ids;
    position_ids = post_ids;
    position_names = post_names;
    post_cands = post_cands_data;

    console.log("SET DATA");
    console.log(position_ids);
    console.log(position_names);
    console.log(post_cands);
    console.log("SET DATA END");

    //Set position title of the first page
    $("#post_title_id").text(position_names[voter_cur_page]);
}

//set pagers
function setNumberOfPagers(page){
    var no_of_pages = position_ids.length;

    var pager_parent_element = $('#pager-parent');

    var counter = 1 ;

    var cur_page ;


    if( page != null ){
        cur_page = parseInt(page);
    }else{
        cur_page = counter;
    }
    console.log("CUREEEEEEEEEEEEE========"+cur_page);
     pager_html = "";

     position_ids.forEach(function(position_id) {
           console.log("position_id=="+position_id);

            //Statement to check if position is being voted for
            if( counter == cur_page ){

                pager_html += '<span onclick="goToPostPage('+counter+')" class="login100-social-item pager-active">'+counter+'</span>';
            }else{
                pager_html += '<span onclick="goToPostPage('+counter+')" class="login100-social-item pager-inactive">'+counter+'</span>';
            }
            counter++;
      });

      pager_parent_element.html("");
      pager_parent_element.html(pager_html);
}

function goToPostPage(current_page){
//    console.log("CURRENT  PAGE == " + current_page);
//    console.log("VOTER  PAGE == " + voter_cur_page);
//
//    voter_cur_page = current_page-2;
//    console.log("FATER VOTER  PAGE == " + voter_cur_page);
//    processVoteNext();
//    setNumberOfPagers(current_page);

}

/*
*   Function to triggered when a candidate is selected
*
*   post_id - The position id of the selected candidate
*   cand_id - The candidate id selected by user
*/
function setSelectCand(post_id,cand_id){
    voter_vote_data[post_id] = cand_id;
    console.log("VOTE DATA Updated");
    console.log(voter_vote_data);

    all_cands_4_post = post_cands[post_id];

     //show image thumb for selected cand and disable for others
     all_cands_4_post.forEach(function(entry) {
           console.log("ENTRY=="+entry);
          if(entry == cand_id){
            //Show thumb image when candidate id was selected
            console.log("SELECTED=="+"#" + candidate_image_html_id_prefix + entry);
            $('#' + candidate_image_html_id_prefix + entry).css('display','inline');
          }else{
            //hide thumb image for other candidates ids not selected
            console.log("NOT SELECTED==="+"#"+ candidate_image_html_id_prefix + entry);
            $('#' + candidate_image_html_id_prefix + entry).css('display','none');
          }
      });
}

/*
*   Function to called when the Next button is clicked
*/
function processVoteNext(){



    console.log("Golbal Current Page=="+voter_cur_page);
    cur_page = '#'+ position_html_id_prefix + position_ids[voter_cur_page];

    //Set pages overflow restriction
    pages_length = vote_pages.length;

    console.log("pages_length="+pages_length);
    console.log("voter_cur_page="+voter_cur_page);

    if(voter_cur_page < pages_length-1){
        voter_cur_page++;
        $("#position_pages_id").removeClass("hidepost");
        $("#position_pages_id").addClass("showpost");
        $("#confirmation_page_id").removeClass("showpost");
        $("#confirmation_page_id").addClass("hidepost");

        //Set position title
        $("#post_title_id").text(position_names[voter_cur_page]);
        $("#please_cast_id").text(", please cast your vote.");
    }else if(voter_cur_page >= pages_length-1){

        $("#position_pages_id").removeClass("showpost");
        $("#position_pages_id").addClass("hidepost");
        $("#confirmation_page_id").removeClass("hidepost");
        $("#confirmation_page_id").addClass("showpost");

        //Set position title
        $("#post_title_id").text("Confirm");
        $("#please_cast_id").text("");

        if(voter_cur_page == pages_length-1){
            voter_cur_page++;
        }

    }



    next_page = '#'+ position_html_id_prefix + (position_ids[voter_cur_page]);
    console.log("CUR==="+cur_page);
    console.log("NEXT==="+next_page);

    $(cur_page).removeClass("showpost");
    $(cur_page).addClass("hidepost");
    $(next_page).removeClass("hidepost");
    $(next_page).addClass("showpost");

    console.log("Golbal Current Page=="+voter_cur_page);

    //Make right pager active
    setNumberOfPagers(voter_cur_page + 1);
}

/*
*   Function to called when the Prev button is clicked
*/
function processVotePrev(){
    console.log("Golbal Current Page=="+voter_cur_page);
    cur_page = '#'+ position_html_id_prefix +position_ids[voter_cur_page];

    //Set pages overflow restriction
    pages_length = vote_pages.length;

    console.log("pages_length="+pages_length);
    console.log("voter_cur_page="+voter_cur_page);

    if(voter_cur_page > 0){
        voter_cur_page--;
        $("#position_pages_id").removeClass("hidepost");
         $("#position_pages_id").addClass("showpost");
        $("#confirmation_page_id").removeClass("showpost");
        $("#confirmation_page_id").addClass("hidepost");

        //Set position title
        $("#post_title_id").text(position_names[voter_cur_page]);
        $("#please_cast_id").text(", please cast your vote.");
    }

    next_page = '#'+ position_html_id_prefix +(position_ids[voter_cur_page]);
    console.log("CUR==="+cur_page);
    console.log("NEXT==="+next_page);

    $(cur_page).removeClass("showpost");
    $(cur_page).addClass("hidepost");
    $(next_page).removeClass("hidepost");
    $(next_page).addClass("showpost");
    console.log("Golbal Current Page=="+voter_cur_page);

    //Make right pager active
    setNumberOfPagers(voter_cur_page + 1);
}

function submitVote(){

    if(checkVoteForAllPositions()){
        initiate_loader('Submitting Vote');

        console.log("Vote Data To Submit:");
        console.log(voter_vote_data);

        if(vote_status == 1){
            makeToast("warning","Your vote is being processed");
        }else if(vote_status == 2){
            makeToast("error","You have already voted!");
        }else{
            vote_status = 1;
        }

        $.postJSON("/submitvote", voter_vote_data, function(data){
            disableLoader();
            console.log("Response received:");
            console.log(data);

            if (data.code == 100) {
                vote_status = 2;
                makeToast("success",data.message);

                $('#confirm_vote_btn').hide();
                $('#vote_thanks').show();

                 setTimeout(function(){
                   window.location = "/logout";
                },3000 );
            } else{
                vote_status = 0;
                makeToast("error",data.message);
            }

         });

    }
}

function checkVoteForAllPositions(){
        console.log("position_ids=="+position_ids);
        console.log("voter_vote_data=="+voter_vote_data);

      var un_voted_positions = [];
      var counter = 0;
      var current_page_index = 0;
      var current_page_index_tracker = 0;

      //Loop through the position ids and see which one is not been voted for
      position_ids.forEach(function(position_id) {
           console.log("position_id=="+position_id);

            //Statement to check if position is being voted for
            if(voter_vote_data[position_id] == null || voter_vote_data[position_id] === undefined ){

                //Set pages that have not been voted for
                un_voted_positions.push(position_id);

                if(current_page_index_tracker < 1){
                    current_page_index_tracker++;
                    current_page_index = counter;
                }
            }
            counter++;
      });

      if(current_page_index_tracker == 0){
        return true;
      }


      console.log("un_voted_positions");
      console.log(un_voted_positions);
      console.log("un_voted_positions");


      console.log("Golbal Current Page=="+voter_cur_page);

      //Get the current page id, so that it is prevented from showing
      third_party_page = '#'+ position_html_id_prefix +position_ids[voter_cur_page];

      cur_page ='#confirmation_page_id';
      next_page = '#'+ position_html_id_prefix + (un_voted_positions[0]);
      console.log("CUR==="+cur_page);
      console.log("NEXT==="+next_page);


      //Set position title
        $("#post_title_id").text(position_names[current_page_index]);
        $("#please_cast_id").text(", please cast your vote.");


     $("#position_pages_id").removeClass("hidepost");
     $("#position_pages_id").addClass("showpost");
     $("#confirmation_page_id").removeClass("showpost");
     $("#confirmation_page_id").addClass("hidepost");


    $(third_party_page).removeClass("showpost");
    $(third_party_page).addClass("hidepost");
    $(cur_page).removeClass("showpost");
    $(cur_page).addClass("hidepost");
    $(next_page).removeClass("hidepost");
    $(next_page).addClass("showpost");

    //Set the page it is going to navigate to as current page, so that it knows where to move from there
    voter_cur_page = current_page_index;

    //Make right pager active
    setNumberOfPagers(voter_cur_page + 1);

    return false;
}

//Prevent page from being right clicked
//document.addEventListener("contextmenu", function(e){
//    e.preventDefault();
//}, false);

//Set loader variable
function initiate_loader(msg){
        loading = new Loading({

            // 'ver' or 'hor'
            direction: 'ver',

            // loading title
            title: undefined,

            // text color
            titleColor: '#FFF',

            // font size
            titleFontSize: 14,

            // extra class(es)
            titleClassName: undefined,

            // font family
            titleFontFamily:   undefined,

            // loading description
            discription: msg,

            // text color
            discriptionColor:  '#FFF',

            // font size
            discriptionFontSize: 14,

            // extra class(es)
            discriptionClassName: undefined,

            // font family
            directionFontFamily: undefined,

            // width/height of loading indicator
            loadingWidth: 'auto',
            loadingHeight: 'auto',

            // padding in pixels
            loadingPadding: 20,

            // background color
            loadingBgColor: '#252525',

            // border radius in pixels
            loadingBorderRadius: 12,

            // loading position
            loadingPosition: 'fixed',

            // shows/hides background overlay
            mask: true,

            // background color
            maskBgColor: 'rgba(0, 0, 0, .6)',

            // extra class(es)
            maskClassName: undefined,

            // mask position
            maskPosition: 'fixed',

            // 'image': use a custom image
            //<!--loading<a href="https://www.jqueryscript.net/animation/">Animation</a>: 'origin',-->

            // path to loading spinner
            animationSrc: undefined,

            // width/height of loading spinner
            animationWidth: 40,
            animationHeight: 40,
            animationOriginWidth: 4,
            animationOriginHeight: 4,

            // color
            animationOriginColor: '#FFF',

            // extra class(es)
            animationClassName: undefined,

            // auto display
            defaultApply: true,

            // animation options
            animationIn: 'animated fadeIn',
            animationOut: 'animated fadeOut',
            animationDuration:  1000,

            // z-index property
            zIndex: 0,

        });

}

//Initialize sound urls for notifications
function setToastSoundPaths(successSoundUrl,errorSoundUrl,infoSoundUrl,warningSoundUrl){
    success_sound_url  = successSoundUrl;
    error_sound_url = errorSoundUrl;
    info_sound_url = infoSoundUrl;
    warning_sound_url = warningSoundUrl;
}

function makeToast(toast_type,message){
    var options = {
        // STRING: main class name used to styling each toast message with CSS:
        // .... IMPORTANT NOTE:
        // .... if you change this, the configuration consider that you´re
        // .... re-stylized the plug-in and default toast styles, including CSS3 transitions are lost.
        classname: "toast",
        // STRING: name of the CSS transition that will be used to show and hide all toast by default:
        transition: "pinItUp",
        // BOOLEAN: specifies the way in which the toasts will be inserted in the HTML code:
        // .... Set to BOOLEAN TRUE and the toast messages will be inserted before those already generated toasts.
        // .... Set to BOOLEAN FALSE otherwise.
        insertBefore: true,
        // INTEGER: duration that the toast will be displayed in milliseconds:
        // .... Default value is set to 4000 (4 seconds).
        // .... If it set to 0, the duration for each toast is calculated by text-message length.
        duration: 3000,
        // BOOLEAN: enable or disable toast sounds:
        // .... Set to BOOLEAN TRUE  - to enable toast sounds.
        // .... Set to BOOLEAN FALSE - otherwise.
        // NOTE: this is not supported by mobile devices.
        enableSounds: true,
        // BOOLEAN: enable or disable auto hiding on toast messages:
        // .... Set to BOOLEAN TRUE  - to enable auto hiding.
        // .... Set to BOOLEAN FALSE - disable auto hiding. Instead the user must click on toast message to close it.
        autoClose: true,
        // BOOLEAN: enable or disable the progressbar:
        // .... Set to BOOLEAN TRUE  - enable the progressbar only if the autoClose option value is set to BOOLEAN TRUE.
        // .... Set to BOOLEAN FALSE - disable the progressbar.
        progressBar: true,
        // IMPORTANT: mobile browsers does not support this feature!
        // Yep, support custom sounds for each toast message when are shown if the
        // enableSounds option value is set to BOOLEAN TRUE:
        // NOTE: the paths must point from the project's root folder.
        sounds: {
            // path to sound for informational message:
            info: info_sound_url,
            // path to sound for successfull message:
            success: success_sound_url,
            // path to sound for warn message:
            warning: warning_sound_url,
            // path to sound for error message:
            error: error_sound_url,
        },

        // callback:
        // onShow function will be fired when a toast message appears.
        onShow: function (type) {},

        // callback:
        // onHide function will be fired when a toast message disappears.
        onHide: function (type) {},

        // the placement where prepend the toast container:
        prependTo: document.body.childNodes[0]
    };


    // using the main Toasty function:
    var toast = new Toasty();
    // or this public method:
    toast.configure(options);

    if(toast_type == "success"){
        toast.success(message);
    }else if(toast_type == "error"){
        toast.error(message);
    }else if(toast_type == "warning"){
        toast.warning(message);
    }else{
        toast.info(message);
    }

}

function disableLoader(){
    setTimeout(() => loading.out(), 10);
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
    makeToast("error",error);
    disableLoader();
}

function onAjaxError(xhr, status, error){
    makeToast("error",error);
    disableLoader();
}

function onAjaxNotification(xhr, status, error){
    makeToast("error",error);
    disableLoader();
}