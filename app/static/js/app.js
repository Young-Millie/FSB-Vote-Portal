var thisUser = 1;

function setThisUser(user_value){
  thisUser = user_value;
}

/**
*Handle enter key press event for username text field
*/
$('#txtUsername').on('keydown', function(e) {
    if (e.which == 13) {
        $('#passwordForm').show("slow");
        $('#forgotPasswordlink').show("slow");
        $('#txtPassword').focus();
    }else if(e.which == 9){
        $('#passwordForm').show("slow");
        $('#forgotPasswordlink').show("slow");
    }else if(e.which == 8 || e.which == 46){
        if ($('#txtUsername').val().length == 0){
            $('#passwordForm').hide("slow");
            $('#forgotPasswordlink').hide("slow");
            $('#txtUsername').removeAttr("border-bottom");
            $('#txtPassword').removeAttr("box-shadow");
            $('#txtUsername').focus();
        }
    }
    else if ($('#txtUsername').val().length <= 0){
        $('#passwordForm').hide("slow");
        $('#forgotPasswordlink').hide("slow");
        $('#txtUsername').removeAttr("border-bottom");
        $('#txtPassword').removeAttr("box-shadow");
        $('#txtUsername').focus();
    }
});

    /**
    *Handle enter key press event for password text field
    */
    $('#txtPassword').on('keydown', function(e) {
    trigger
        show_loader();
        var username = $('#txtUsername').val();
        var password = $('#txtPassword').val();

        valide1 = validate_text_feild(username, "#txtUsername");
        valide2 = validate_text_feild(password, "#txtPassword");

        if( valide1 && valide2 ){
            formData = {
                "username": username,
                "password": password
            }

            $.postJSON("/users/login", formData, function(data){

              if (data.code == "00") {

                $('#txtUsername').val("");
                $('#txtPassword').val("");

                displaySucessMsg(data.msg);
                window.location = window.location = "/home/user";
              }

              else if(data.code == "01"){
                hide_loader();
                $('#txtPassword').val("");
                displayErrorMsg(data.msg); //display Error message
              }

              else if(data.code == "02"){
                hide_loader();
                $('#txtPassword').val("");
                displayErrorMsg(data.msg); //display Error message
              }

              else{
                hide_loader();
                $('#txtPassword').val("");
              }
            });
        }else{
          hide_loader();
          $('#txtPassword').val("");
        }

    }else if(e.which == 8 || e.which == 46){
        if ($('#txtPassword').val().length <= 0){
            $('#passwordForm').hide("slow");
            $('#forgotPasswordlink').hide("slow");
            $('#txtUsername').removeAttr("border-bottom");
            $('#txtPassword').removeAttr("box-shadow");
            $('#txtUsername').focus();
        }
    }
});

$('#btnFilterTransactions').click(function(e) {
    e.preventDefault();   

    $("#page_id").val(1);

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustID = $("#txtCustID").val();
    var txtCustName = $("#txtCustName").val();
    var txtCustWallet = $("#txtCustWallet").val();
    var txtCustWalletNet = $("#txtCustWalletNet").val();
    var txtCustRecp = $("#txtCustRecp").val();
    var txtCustRef = $("#txtCustRef").val();
    var txtCustAck = $("#txtCustAck").val();
    var txtCustStatus = $("#txtCustStatus").val();

    nextpage = parseInt($("#page_id").val())

    if (nextpage > 1) {
      nextpage -= 1;
    }else{
      nextpage = 1;
    }

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustID.length == 0 ){
      txtCustID = "*";
    }
    
    if( txtCustName.length == 0 ){
      txtCustName = "*";
    }
    if( txtCustWallet.length == 0 ){
      txtCustWallet = "*";
    }

    if( txtCustWalletNet.length == 0 ){
      txtCustWalletNet = "*";
    }
    if( txtCustRecp.length == 0 ){
      txtCustRecp = "*";
    }
    if( txtCustRef.length == 0 ){
      txtCustRef = "*";
    }
    if( txtCustAck.length == 0 ){
      txtCustAck = "*";
    }
    if( txtCustStatus.length == 0 ){
      txtCustStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "trans_id":txtCustID,
         "fusion_ref":txtCustRef,
         "name":txtCustName,
         "wallet": txtCustWallet,
         "wallet_mno": txtCustWalletNet,
         "tool": txtCustAck,
         "receipt":txtCustRecp,
         "status": txtCustStatus,
         "page":""+nextpage
      };

    
    show_loader();

    $.postJSON("/transactions/", formData, function(data){
        
        if (data.code == "00") {
            hide_loader();
           if(data.data.length==0){
              load_transaction_table(data, "minus");
              displayErrorMsgModal(data.msg);
              $("#merchantFilter").modal("hide");
              return ;
           }
          load_transaction_table(data, "minus");
          $("#merchantFilter").modal("hide");
        } 

        else if (data.code == "01"){
          hide_loader();
          $('#transactionTblBody').html("No Records Found");
          $('#transactionTblBody').css({"color":"black","font-size":"24px"});
          displayErrorMsg("No Records Found"); //display Error message
          $("#merchantFilter").modal("hide");
        }else{
          hide_loader();
          $('#transactionTblBody').html("No Records Found");
          $('#transactionTblBody').css({"color":"black","font-size":"24px"});
          displayErrorMsg("No Records Found"); //display Error message
          $("#merchantFilter").modal("hide");
        }
      });

});

function transactionNext(){

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustID = $("#txtCustID").val();
    var txtCustName = $("#txtCustName").val();
    var txtCustWallet = $("#txtCustWallet").val();
    var txtCustWalletNet = $("#txtCustWalletNet").val();
    var txtCustRecp = $("#txtCustRecp").val();
    var txtCustRef = $("#txtCustRef").val();
    var txtCustAck = $("#txtCustAck").val();
    var txtCustStatus = $("#txtCustStatus").val();

    nextpage = parseInt($("#page_id").val());

    current_page = parseInt($("#page_id").val());
    nextpage=current_page+1;
    last_page=parseInt($("#total_pages").text());

    if(nextpage>last_page){
      return;
    } 

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustID.length == 0 ){
      txtCustID = "*";
    }
    
    if( txtCustName.length == 0 ){
      txtCustName = "*";
    }
    if( txtCustWallet.length == 0 ){
      txtCustWallet = "*";
    }

    if( txtCustWalletNet.length == 0 ){
      txtCustWalletNet = "*";
    }
    if( txtCustRecp.length == 0 ){
      txtCustRecp = "*";
    }
    if( txtCustRef.length == 0 ){
      txtCustRef = "*";
    }
    if( txtCustAck.length == 0 ){
      txtCustAck = "*";
    }
    if( txtCustStatus.length == 0 ){
      txtCustStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "trans_id":txtCustID,
         "fusion_ref":txtCustRef,
         "name":txtCustName,
         "wallet": txtCustWallet,
         "wallet_mno": txtCustWalletNet,
         "tool": txtCustAck,
         "receipt":txtCustRecp,
         "status": txtCustStatus,
         "page":""+nextpage
      };

    
    show_loader();

    $.postJSON("/transactions/", formData, function(data){
        // 
        if (data.code == "00") {
          hide_loader();
          load_transaction_table(data, "plus");
        }

        else if (data.code == "01"){

          hide_loader();
          displayErrorMsg(data.msg);
        }

        else if (data.code == "02"){

          hide_loader();
          displayErrorMsg("Error occured, please try again later.");
        }
        else{
          hide_loader();
          displayErrorMsg("No Records Found"); //display Error message
        }
      });

}


function transactionPrev(){

  var fromdate = $("#mfromdate").val();
  var todate = $("#mtodate").val();
  var txtCustID = $("#txtCustID").val();
  var txtCustName = $("#txtCustName").val();
  var txtCustWallet = $("#txtCustWallet").val();
  var txtCustWalletNet = $("#txtCustWalletNet").val();
  var txtCustRecp = $("#txtCustRecp").val();
  var txtCustRef = $("#txtCustRef").val();
  var txtCustAck = $("#txtCustAck").val();
  var txtCustStatus = $("#txtCustStatus").val();

  nextpage = parseInt($("#page_id").val());

  current_page = parseInt($("#page_id").val());
  nextpage=current_page-1;
  last_page=parseInt($("#total_pages").text());

  if(nextpage<1){
    return;
  } 

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustID.length == 0 ){
      txtCustID = "*";
    }
    
    if( txtCustName.length == 0 ){
      txtCustName = "*";
    }
    if( txtCustWallet.length == 0 ){
      txtCustWallet = "*";
    }

    if( txtCustWalletNet.length == 0 ){
      txtCustWalletNet = "*";
    }
    if( txtCustRecp.length == 0 ){
      txtCustRecp = "*";
    }
    if( txtCustRef.length == 0 ){
      txtCustRef = "*";
    }
    if( txtCustAck.length == 0 ){
      txtCustAck = "*";
    }
    if( txtCustStatus.length == 0 ){
      txtCustStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "trans_id":txtCustID,
         "fusion_ref":txtCustRef,
         "name":txtCustName,
         "wallet": txtCustWallet,
         "wallet_mno": txtCustWalletNet,
         "tool": txtCustAck,
         "receipt":txtCustRecp,
         "status": txtCustStatus,
         "page":""+nextpage
      };


    
    show_loader();

    $.postJSON("/transactions/", formData, function(data){
        // 
        if (data.code == "00") {
          hide_loader();
          load_transaction_table(data, "minus");
        }

        else if (data.code == "01"){

          hide_loader();
          displayErrorMsg(data.msg);
        }

        else if (data.code == "02"){

          hide_loader();
          displayErrorMsg("Error occured, please try again later.");
        }
        else{
          hide_loader();
          displayErrorMsg("No Records Found"); //display Error message
        }
      });

}

function load_transaction_table(data, operator){

    var detail= data.data;

    tblBodyHtml = ""
    resp = ""
    for (var i = 0; i < detail.length; i++) {

      status = '';
      if (detail[i].status == "3") {
        status = '<i class="fa fa-circle trans_success" aria-hidden="true"></i>';
      }else if (detail[i].status == "1" || detail[i].status == "0") {
        status = '<i class="fa fa-circle trans_Initiated" aria-hidden="true"></i>';
      }else{
        status = '<i class="fa fa-circle trans_failed" aria-hidden="true"></i>';
      }
      

      tblBodyHtml += '<tr style="background-color: #FEF9F3">'+
                  '<td style="color: #1E1617; font-weight: bolder">'+ detail[i].trans_id +'</td>'+
                  '<td>'+ detail[i].name +'</td>'+
                  '<td>'+ detail[i].wallet +'</td>'+
                  '<td>'+ detail[i].wallet_mno +'</td>'+
                  '<td>'+ detail[i].amount +'</td>'+
                  '<td>'+ detail[i].tool +'</td>'+
                  '<td>'+ detail[i].receipt +'</td>'+
                  '<td>'+ detail[i].fusion_ref +'</td>'+
                  '<td title="'+ detail[i].status_details +'">'+ status +'</td>'+
                  '<td>'+ detail[i].transaction_date +'</td>'+
              '</tr>';
    }

    $('#transactionTblBody').html("");
    $('#transactionTblBody').html(tblBodyHtml);
    

    if (data.data.length == 0) {
      $('#transactionTblBody').html("").html("No Records Found");
      $('#transactionTblBody').css({"color":"black","font-size":"24px"});
     displayErrorMsg("No Records Found");
     displayNotificationMsg("No Records Found");
      return;
    }

    $("#total_pages").html(data.nav.last_page);

    nextpage = parseInt($("#page_id").val());

    if (operator == "plus") {
      $("#page_id").val(nextpage+1);
    }else{
      if((nextpage -1 ) <= 0){
        $("#page_id").val(1);
      }else{
        $("#page_id").val((parseInt(nextpage)-1));
      }
    }
  }
  
$('#btnFilterPayment').click(function(e) {
    e.preventDefault();   
    $("#page_id").val(1);

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustToolName = $("#txtCustToolName").val();
    var txtCustWallet = $("#txtCustWallet").val();
    var txtCustRedeemStatus = $("#txtCustRedeemStatus").val();
    var txtCustPaidStatus = $("#txtCustPaidStatus").val();
  
    nextpage = parseInt($("#page_id").val())

    if (nextpage > 1) {
      nextpage -= 1;
    }else{
      nextpage = 1;
    }

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustToolName.length == 0 ){
      txtCustToolName = "*";
    }
    
    if( txtCustWallet.length == 0 ){
      txtCustWallet = "*";
    }
    if( txtCustRedeemStatus.length == 0 ){
      txtCustRedeemStatus = "*";
    }

    if( txtCustPaidStatus.length == 0 ){
      txtCustPaidStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "id":"*",
         "user_msisdn": txtCustWallet,
         "payment_status": txtCustPaidStatus,
         "tool": txtCustToolName,
         "tool_id": "*",
         "redeemed": txtCustRedeemStatus,
         "page":""+nextpage
      };

    
    show_loader_modal();

    $.postJSON("/payments/", formData, function(data){
        
        if (data.code == "00") {
            hide_loader_modal();
           
          load_payment_table(data, "minus");
          $("#merchantFilter").modal("hide");
        } 

        else if (data.code == "01"){
          hide_loader_modal();
          $('#transactionTblBody').html(data.msg);
          $('#transactionTblBody').css({"color":"black","font-size":"24px"});
          displayErrorMsg("No Records Found"); //display Error message
          $("#merchantFilter").modal("hide");
        }else{
          hide_loader_modal();
          $('#transactionTblBody').html("Something went wrong");
          $('#transactionTblBody').css({"color":"black","font-size":"24px"});
          displayErrorMsg("No Records Found"); //display Error message
          $("#merchantFilter").modal("hide");
        }
      });

});

$('#btnExportPayment').click(function(e) {
    e.preventDefault();   

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustToolName = $("#txtCustToolName").val();
    var txtCustWallet = $("#txtCustWallet").val();
    var txtCustRedeemStatus = $("#txtCustRedeemStatus").val();
    var txtCustPaidStatus = $("#txtCustPaidStatus").val();

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustToolName.length == 0 ){
      txtCustToolName = "*";
    }
    
    if( txtCustWallet.length == 0 ){
      txtCustWallet = "*";
    }
    if( txtCustRedeemStatus.length == 0 ){
      txtCustRedeemStatus = "*";
    }

    if( txtCustPaidStatus.length == 0 ){
      txtCustPaidStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "id":"*",
         "user_msisdn": txtCustWallet,
         "payment_status": txtCustPaidStatus,
         "tool": txtCustToolName,
         "tool_id": "*",
         "redeemed": txtCustRedeemStatus,
         "page":"1"
      };

    show_loader_modal();

    window.open("/payments/export?page=1"+'&tool_id=*&id=*&start_date='+fromdate+'&end_date='+todate+'&user_msisdn='+txtCustWallet+'&payment_status='+txtCustPaidStatus+'&tool='+txtCustToolName+'&redeemed='+txtCustRedeemStatus);
    hide_loader();
    hide_loader_modal();
});

$('#btnExportDealeractivity').click(function(e) {
    e.preventDefault();   

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustDealerName = $("#txtCustDealerName").val();
    var txtCustDealerWallet = $("#txtCustDealerWallet").val();
    var txtCustArtisanName = $("#txtCustArtisanName").val();
    var txtCustArtisanWallet = $("#txtCustArtisanWallet").val();
    var txtCustomerLocation = $("#txtDealerLocation").val();
    var txtCustStatus = $("#txtCustStatus").val();

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustDealerName.length == 0 ){
      txtCustDealerName = "*";
    }
    
    if( txtCustDealerWallet.length == 0 ){
      txtCustDealerWallet = "*";
    }
    if( txtCustArtisanName.length == 0 ){
      txtCustArtisanName = "*";
    }

    if( txtCustArtisanWallet.length == 0 ){
      txtCustArtisanWallet = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustStatus.length == 0 ){
      txtCustStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "id":"*",
         "payment_id": "*",
         "dealer_name": txtCustDealerName,
         "dealer_msisdn": txtCustDealerWallet,
         "artisan_name": txtCustArtisanName,
         "artisan_msisdn": txtCustArtisanWallet,
         "location": txtCustomerLocation,
         "status":txtCustStatus,
         "page":"1"
      };

    show_loader_modal();

    window.open("/dealeractivities/export?page=1"+'&payment_id=*&id=*&start_date='+fromdate+'&end_date='+todate+'&dealer_name='+txtCustDealerName+'&dealer_msisdn='+txtCustDealerWallet+'&artisan_name='+txtCustArtisanName+'&artisan_msisdn='+txtCustArtisanWallet+'&location='+txtCustomerLocation+'&status='+txtCustStatus);
    hide_loader();
    hide_loader_modal();
});

function paymentNext(){

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustToolName = $("#txtCustToolName").val();
    var txtCustWallet = $("#txtCustWallet").val();
    var txtCustRedeemStatus = $("#txtCustRedeemStatus").val();
    var txtCustPaidStatus = $("#txtCustPaidStatus").val();

    nextpage = parseInt($("#page_id").val());

    current_page = parseInt($("#page_id").val());
    nextpage=current_page+1;
    last_page=parseInt($("#total_pages").text());

    if(nextpage>last_page){
      return;
    } 

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustToolName.length == 0 ){
      txtCustToolName = "*";
    }
    
    if( txtCustWallet.length == 0 ){
      txtCustWallet = "*";
    }
    if( txtCustRedeemStatus.length == 0 ){
      txtCustRedeemStatus = "*";
    }

    if( txtCustPaidStatus.length == 0 ){
      txtCustPaidStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "id":"*",
         "user_msisdn": txtCustWallet,
         "payment_status": txtCustPaidStatus,
         "tool": txtCustToolName,
         "tool_id": "*",
         "redeemed": txtCustRedeemStatus,
         "page":""+nextpage
      };

    
    show_loader();

    $.postJSON("/payments/", formData, function(data){
        // 
        if (data.code == "00") {
          hide_loader();
          load_payment_table(data, "plus");
        }

        else if (data.code == "01"){

          hide_loader();
          displayErrorMsg(data.msg);
        }

        else if (data.code == "02"){

          hide_loader();
          displayErrorMsg("Error occured, please try again later.");
        }
        else{
          hide_loader();
          displayErrorMsg("No Records Found"); //display Error message
        }
      });

}


function paymentPrev(){

  var fromdate = $("#mfromdate").val();
  var todate = $("#mtodate").val();
  var txtCustToolName = $("#txtCustToolName").val();
  var txtCustWallet = $("#txtCustWallet").val();
  var txtCustRedeemStatus = $("#txtCustRedeemStatus").val();
  var txtCustPaidStatus = $("#txtCustPaidStatus").val();

  nextpage = parseInt($("#page_id").val());

  current_page = parseInt($("#page_id").val());
  nextpage=current_page-1;
  last_page=parseInt($("#total_pages").text());

  if(nextpage<1){
    return;
  } 

  if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustToolName.length == 0 ){
      txtCustToolName = "*";
    }
    
    if( txtCustWallet.length == 0 ){
      txtCustWallet = "*";
    }
    if( txtCustRedeemStatus.length == 0 ){
      txtCustRedeemStatus = "*";
    }

    if( txtCustPaidStatus.length == 0 ){
      txtCustPaidStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "id":"*",
         "user_msisdn": txtCustWallet,
         "payment_status": txtCustPaidStatus,
         "tool": txtCustToolName,
         "tool_id": "*",
         "redeemed": txtCustRedeemStatus,
         "page":""+nextpage
      };
    
    show_loader();

    $.postJSON("/payments/", formData, function(data){
        // 
        if (data.code == "00") {
          hide_loader();
          load_payment_table(data, "minus");
        }

        else if (data.code == "01"){

          hide_loader();
          displayErrorMsg(data.msg);
        }

        else if (data.code == "02"){

          hide_loader();
          displayErrorMsg("Error occured, please try again later.");
        }
        else{
          hide_loader();
          displayErrorMsg("No Records Found"); //display Error message
        }
      });

}

$('#btnFilterDealeractivity').click(function(e) {
    e.preventDefault();   
    $("#page_id_act").val(1);

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustDealerName = $("#txtCustDealerName").val();
    var txtCustDealerWallet = $("#txtCustDealerWallet").val();
    var txtCustArtisanName = $("#txtCustArtisanName").val();
    var txtCustArtisanWallet = $("#txtCustArtisanWallet").val();
    var txtCustomerLocation = $("#txtDealerLocation").val();
    var txtCustStatus = $("#txtCustStatus").val();
  
    nextpage = parseInt($("#page_id_act").val())

    if (nextpage > 1) {
      nextpage -= 1;
    }else{
      nextpage = 1;
    }

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustDealerName.length == 0 ){
      txtCustDealerName = "*";
    }
    
    if( txtCustDealerWallet.length == 0 ){
      txtCustDealerWallet = "*";
    }
    if( txtCustArtisanName.length == 0 ){
      txtCustArtisanName = "*";
    }

    if( txtCustArtisanWallet.length == 0 ){
      txtCustArtisanWallet = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustStatus.length == 0 ){
      txtCustStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "id":"*",
         "payment_id": "*",
         "dealer_name": txtCustDealerName,
         "dealer_msisdn": txtCustDealerWallet,
         "artisan_name": txtCustArtisanName,
         "artisan_msisdn": txtCustArtisanWallet,
         "location": txtCustomerLocation,
         "status":txtCustStatus,
         "page":""+nextpage
      };

    
    show_loader_modal();

    $.postJSON("/dealeractivities/", formData, function(data){
        
        if (data.code == "00") {
            hide_loader_modal();
           
          load_dealeractivity_table(data, "minus");
          $("#dealerFilter").modal("hide");
        } 

        else if (data.code == "01"){
          hide_loader_modal();
          $('#dealeractivityTblBody').html(data.msg);
          $('#dealeractivityTblBody').css({"color":"black","font-size":"24px"});
          $("#dealerFilter").modal("hide");
        }else{
          hide_loader_modal();
          $('#dealeractivityTblBody').html("Something went wrong");
          $('#dealeractivityTblBody').css({"color":"black","font-size":"24px"});
          $("#dealerFilter").modal("hide");
        }
      });

});

function dealeractivityNext(){

    var fromdate = $("#mfromdate_act").val();
    var todate = $("#mtodate_act").val();
    var txtCustDealerName = $("#txtCustDealerName").val();
    var txtCustDealerWallet = $("#txtCustDealerWallet").val();
    var txtCustArtisanName = $("#txtCustArtisanName").val();
    var txtCustArtisanWallet = $("#txtCustArtisanWallet").val();
    var txtCustomerLocation = $("#txtDealerLocation").val();
    var txtCustStatus = $("#txtCustStatus").val();

    nextpage = parseInt($("#page_id_act").val());

    current_page = parseInt($("#page_id_act").val());
    nextpage=current_page+1;
    last_page=parseInt($("#total_pages_act").text());

    if(nextpage>last_page){
      return;
    } 

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustDealerName.length == 0 ){
      txtCustDealerName = "*";
    }
    
    if( txtCustDealerWallet.length == 0 ){
      txtCustDealerWallet = "*";
    }
    if( txtCustArtisanName.length == 0 ){
      txtCustArtisanName = "*";
    }

    if( txtCustArtisanWallet.length == 0 ){
      txtCustArtisanWallet = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustStatus.length == 0 ){
      txtCustStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "id":"*",
         "payment_id": "*",
         "dealer_name": txtCustDealerName,
         "dealer_msisdn": txtCustDealerWallet,
         "artisan_name": txtCustArtisanName,
         "artisan_msisdn": txtCustArtisanWallet,
         "location": txtCustomerLocation,
         "status":txtCustStatus,
         "page":""+nextpage
      };

    
    show_loader();

    $.postJSON("/dealeractivities/", formData, function(data){
        // 
        if (data.code == "00") {
          hide_loader();
          load_dealeractivity_table(data, "plus");
        }

        else if (data.code == "01"){

          hide_loader();
          displayErrorMsg(data.msg);
        }

        else if (data.code == "02"){

          hide_loader();
          displayErrorMsg("Error occured, please try again later.");
        }
        else{
          hide_loader();
          displayErrorMsg("No Records Found"); //display Error message
        }
      });

}


function dealeractivityPrev(){

  var fromdate = $("#mfromdate_act").val();
  var todate = $("#mtodate_act").val();
  var txtCustDealerName = $("#txtCustDealerName").val();
  var txtCustDealerWallet = $("#txtCustDealerWallet").val();
  var txtCustArtisanName = $("#txtCustArtisanName").val();
  var txtCustArtisanWallet = $("#txtCustArtisanWallet").val();
  var txtCustomerLocation = $("#txtDealerLocation").val();
  var txtCustStatus = $("#txtCustStatus").val();

  nextpage = parseInt($("#page_id_act").val());

  current_page = parseInt($("#page_id_act").val());
  nextpage=current_page-1;
  last_page=parseInt($("#total_pages_act").text());

  if(nextpage<1){
    return;
  } 

  if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustDealerName.length == 0 ){
      txtCustDealerName = "*";
    }
    
    if( txtCustDealerWallet.length == 0 ){
      txtCustDealerWallet = "*";
    }
    if( txtCustArtisanName.length == 0 ){
      txtCustArtisanName = "*";
    }

    if( txtCustArtisanWallet.length == 0 ){
      txtCustArtisanWallet = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustStatus.length == 0 ){
      txtCustStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "id":"*",
         "payment_id": "*",
         "dealer_name": txtCustDealerName,
         "dealer_msisdn": txtCustDealerWallet,
         "artisan_name": txtCustArtisanName,
         "artisan_msisdn": txtCustArtisanWallet,
         "location": txtCustomerLocation,
         "status":txtCustStatus,
         "page":""+nextpage
      };
    
    show_loader();

    $.postJSON("/dealeractivities/", formData, function(data){
        // 
        if (data.code == "00") {
          hide_loader();
          load_dealeractivity_table(data, "minus");
        }

        else if (data.code == "01"){

          hide_loader();
          displayErrorMsg(data.msg);
        }

        else if (data.code == "02"){

          hide_loader();
          displayErrorMsg("Error occured, please try again later.");
        }
        else{
          hide_loader();
          displayErrorMsg("No Records Found"); //display Error message
        }
      });

}

function toolNext(){

    var fromdate = $("#mfromdate").val();
  var todate = $("#mtodate").val();
  var txtCustToolName = $("#txtCustToolName").val().trim();
  var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
  var txtToolType = $("#txtToolType").val().trim();
  var txtToolStatus = $("#txtToolStatus").val();

    nextpage = parseInt($("#page_id").val());

    current_page = parseInt($("#page_id").val());
    nextpage=current_page+1;
    last_page=parseInt($("#total_pages").text());

    if(nextpage>last_page){
      return;
    } 

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustToolName.length == 0 ){
      txtCustToolName = "*";
    }
    
    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }
    if( txtToolType.length == 0 ){
      txtToolType = "*";
    }

    if( txtToolStatus.length == 0 ){
      txtToolStatus = "*";
    }
      
    var formData = {
        "start_date": fromdate,
       "end_date": todate,
       "id":"*",
       "page":""+nextpage,
       "tool_name": txtCustToolName,
       "tool_id": "*",
       "tool_type": txtToolType,
       "profession":txtCustomerProfession,
       "status": txtToolStatus   
    };
    
    show_loader();

    $.postJSON("/tools/", formData, function(data){
        // 
        if (data.code == "00") {
          hide_loader();
          load_tool_table(data, "plus");
        }

        else if (data.code == "01"){

          hide_loader();
          displayErrorMsg(data.msg);
        }

        else if (data.code == "02"){

          hide_loader();
          displayErrorMsg("Error occured, please try again later.");
        }
        else{
          hide_loader();
          displayErrorMsg("No Records Found"); //display Error message
        }
      });

}


function toolPrev(){

  var fromdate = $("#mfromdate").val();
  var todate = $("#mtodate").val();
  var txtCustToolName = $("#txtCustToolName").val().trim();
  var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
  var txtToolType = $("#txtToolType").val().trim();
  var txtToolStatus = $("#txtToolStatus").val();

  nextpage = parseInt($("#page_id").val());

  current_page = parseInt($("#page_id").val());
  nextpage=current_page-1;
  last_page=parseInt($("#total_pages").text());

  if(nextpage<1){
    return;
  } 

  if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

   if( txtCustToolName.length == 0 ){
      txtCustToolName = "*";
    }
    
    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }
    if( txtToolType.length == 0 ){
      txtToolType = "*";
    }

    if( txtToolStatus.length == 0 ){
      txtToolStatus = "*";
    }
      
    var formData = {
        "start_date": fromdate,
       "end_date": todate,
       "id":"*",
       "page":""+nextpage,
       "tool_name": txtCustToolName,
       "tool_id": "*",
       "tool_type": txtToolType,
       "profession":txtCustomerProfession,
       "status": txtToolStatus   
    };
    
    show_loader();

    $.postJSON("/tools/", formData, function(data){
        // 
        if (data.code == "00") {
          hide_loader();
          load_tool_table(data, "minus");
        }

        else if (data.code == "01"){

          hide_loader();
          displayErrorMsg(data.msg);
        }

        else if (data.code == "02"){

          hide_loader();
          displayErrorMsg("Error occured, please try again later.");
        }
        else{
          hide_loader();
          displayErrorMsg("No Records Found"); //display Error message
        }
      });

}

function load_payment_table(data, operator){

    var detail= data.data;

    if (data.data.length == 0) {
      $('#paymentTblBody').html("").html(data.msg);
      $('#paymentTblBody').css({"color":"black","font-size":"24px"});

       displayErrorMsg(data.msg);
       displayNotificationMsg(data.msg);
      return;
    }

    tblBodyHtml = ""
    resp = ""
    for (var i = 0; i < detail.length; i++) {

      status = '';
      if (detail[i].payment_status == "1") {
        status = '<i class="fa fa-circle trans_success" aria-hidden="true"></i>';
      }else{
        status = '<i class="fa fa-circle trans_failed" aria-hidden="true"></i>';
      }

      redeem = '';
      if (detail[i].redeemed == "1") {
        redeem = '<i class="fa fa-circle trans_success" aria-hidden="true"></i>';
      }else{
        redeem = '<i class="fa fa-circle trans_failed" aria-hidden="true"></i>';
      }

      payment_detail = JSON.parse(detail[i].payment_details);
      payment_detail = JSON.stringify(payment_detail).replace(/"/g, "'");
      
      tblBodyHtml += '<tr style="background-color: #FEF9F3">'+
                  '<td style="color: #1E1617; font-weight: bolder">'+ detail[i].tool_id +'</td>'+
                  '<td>'+ detail[i].tool_name +'</td>'+
                  '<td>'+ detail[i].tool_price +'</td>'+
                  '<td>'+ detail[i].user_msisdn +'</td>'+
                  '<td>'+ detail[i].amount_paid +'</td>'+
                  '<td>'+ redeem +'</td>'+
                  '<td>'+ status +'</td>'+
                  '<td>'+ detail[i].date +'</td>'+
                  '<td>'+ detail[i].last_updated +'</td>'+
                  '<td style="color: #108E53;"><a onclick="get_payment_details('+ payment_detail +')">view</a></td>'+
              '</tr>';
    }

    $('#paymentTblBody').html("");
    $('#paymentTblBody').html(tblBodyHtml);
    

    $("#total_pages").html(data.nav.last_page);

    nextpage = parseInt($("#page_id").val());

    if (operator == "plus") {
      $("#page_id").val(nextpage+1);
    }else{
      if((nextpage -1 ) <= 0){
        $("#page_id").val(1);
      }else{
        $("#page_id").val((parseInt(nextpage)-1));
      }
    }


}

function load_dealeractivity_table(data, operator){

    var detail= data.data;

    if (data.data.length == 0) {
      $('#dealeractivityTblBody').html("").html(data.msg);
      $('#dealeractivityTblBody').css({"color":"black","font-size":"24px"});

       displayErrorMsg(data.msg);
       displayNotificationMsg(data.msg);
      return;
    }

    tblBodyHtml = ""
    resp = ""
    for (var i = 0; i < detail.length; i++) {

      status = '';
      if (detail[i].status == "1") {
        status = '<i class="fa fa-circle trans_success" aria-hidden="true"></i>';
      }else{
        status = '<i class="fa fa-circle trans_failed" aria-hidden="true"></i>';
      }

      tool_details = JSON.stringify(detail[i].tool_info).replace(/"/g, "'");
      
      tblBodyHtml += '<tr style="background-color: #FEF9F3">'+
                  '<td style="color: #1E1617; font-weight: bolder">'+ detail[i].dealer_name +'</td>'+
                  '<td>'+ detail[i].dealer_msisdn +'</td>'+
                  '<td>'+ detail[i].artisan_name +'</td>'+
                  '<td>'+ detail[i].artisan_msisdn +'</td>'+
                  '<td>'+ detail[i].location +'</td>'+
                  '<td>'+ status +'</td>'+
                  '<td>'+ detail[i].last_modified +'</td>'+
                  '<td style="color: #108E53;"><a onclick="get_dealeractivity_details(\''+ detail[i].profession + '\',' + tool_details +')">view</a></td>'+
              '</tr>';
    }

    $('#dealeractivityTblBody').html("");
    $('#dealeractivityTblBody').html(tblBodyHtml);
    

    $("#total_pages_act").html(data.nav.last_page);

    nextpage = parseInt($("#page_id_act").val());

    if (operator == "plus") {
      $("#page_id_act").val(nextpage+1);
    }else{
      if((nextpage -1 ) <= 0){
        $("#page_id_act").val(1);
      }else{
        $("#page_id_act").val((parseInt(nextpage)-1));
      }
    }


}



function load_tool_table(data, operator){

    var detail= data.data;

    if (data.data.length == 0) {
      $('#toolsTblBody').html("").html(data.msg);
      $('#toolsTblBody').css({"color":"black","font-size":"24px"});

       displayErrorMsg(data.msg);
       displayNotificationMsg(data.msg);
      return;
    }

    tblBodyHtml = ""
    resp = ""
    for (var i = 0; i < detail.length; i++) {

      status = '';
      if (detail[i].status == "1") {
        status = '<i class="fa fa-circle trans_success" aria-hidden="true"></i>';
      }else{
        status = '<i class="fa fa-circle trans_failed" aria-hidden="true"></i>';
      }

      tool_type = '';
      if (detail[i].is_single == "1") {
        tool_type = 'SINGLE';
      }else{
        tool_type = 'KIT';
      }
      container = detail[i].container.replace(/"/g, "'");
      tool_details = JSON.stringify(detail[i]).replace(/"/g, "'");

      update_status = "";

      if(thisUser == 2){
        update_status = '<td style="color: #108E53;"><a onclick="load_tool_modal('+ tool_details +')">update</a></td>';
      }

      tblBodyHtml += '<tr style="background-color: #FEF9F3">'+
                  '<td style="color: #1E1617; font-weight: bolder">'+ detail[i].tool_name +'</td>'+
                  '<td>'+ detail[i].price +'</td>'+
                  '<td>'+ detail[i].profession +'</td>'+
                  '<td>'+ tool_type +'</td>'+
                  '<td>'+ status +'</td>'+
                  '<td>'+ detail[i].created_by +'</td>'+
                  '<td>'+ detail[i].date_created   +'</td>'+
                  '<td>'+ detail[i].updated_by +'</td>'+
                  '<td>'+ detail[i].last_updated +'</td>'+
                  '<td style="color: #108E53;"><a onclick="get_container_details('+ container +')">view</a></td>'+
                  update_status+
              '</tr>';
    }

    $('#toolsTblBody').html("");
    $('#toolsTblBody').html(tblBodyHtml);
    

    $("#total_pages").html(data.nav.last_page);

    nextpage = parseInt($("#page_id").val());

    if (operator == "plus") {
      $("#page_id").val(nextpage+1);
    }else{
      if((nextpage -1 ) <= 0){
        $("#page_id").val(1);
      }else{
        $("#page_id").val((parseInt(nextpage)-1));
      }
    }


}

$("#btnForgetPassowrd").click(function(e){
  e.preventDefault();
  $("#loginForm").hide();
  $("#forgotPassForm").show();
});


$("#btnSendPassowrd").click(function(e){
  e.preventDefault();
  username = $("#txtUsernameforgot").val();
  
  var formData = {
        'username': username
    };


    show_loader();

    $.postJSON("/users/forgotpass", formData, function(data){

        if (data.code == "00") {
          hide_loader();
          $("#btnSendCancel").html('<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"> </span>Back to login');
          displaySucessMsg(data.msg);
        }

        else if(data.code == "01"){
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader();
          $('#txtPassword').val("");
          displayErrorMsg(data.msg); //display Error message
        }

        else{
          hide_loader();
          $('#txtPassword').val("");
        }
      });
});

function formatMsisdn (msisdn){
  if( msisdn.length == 10 && msisdn.charAt(0) == '0'){
    msisdn = msisdn.substring(1);
    msisdn = "233" + msisdn;
    return msisdn;
  }else{
    return msisdn;
  }
}

$('#txtSearch').on('keydown',function(e){
  if (e.which == 13) {
    $('#btnSerchTrans').trigger('click');
  }
});

$('#txtSearchcs').on('keydown',function(e){
  if (e.which == 13) {
    $('#btnSerchwinners').trigger('click');
  }
});

$('#txtSearchCust').on('keydown',function(e){
  if (e.which == 13) {
    $('#btnSearchCustomers').trigger('click');
  }
});

$('#txtSearchDealer').on('keydown',function(e){
  if (e.which == 13) {
    $('#btnSearchDealers').trigger('click');
  }
});

$('#txtSearchad').on('keydown',function(e){
  if (e.which == 13) {
    $('#btnSerchAdmins').trigger('click');
  }
});

$('#txtSearchTrans').on('keydown',function(e){
  if (e.which == 13) {
    $('#btnSearchTrans').trigger('click');
  }
});

$('#txtSearchPayment').on('keydown',function(e){
  if (e.which == 13) {
    $('#btnSearchPayment').trigger('click');
  }
});

$('#txtSearchDealeractivity').on('keydown',function(e){
  if (e.which == 13) {
    $('#btnSearchDealeractivity').trigger('click');
  }
});


function adminsNext(){

  fromdate = $("#afromdate").val();
  todate = $("#atodate").val();
  approver_level = $("#txtApplevelAdminFilter").val();
  status = $("#atxtStatus").val();

  last_p = parseInt($('#total_pages').text().trim());

  nextpage = parseInt($("#page_id").val());

    if (nextpage < 1  ){
      return;
    }else if( nextpage >= last_p){
      return;
    }

    var formData = {
        'page': nextpage ,
        'fromdate': fromdate,
        'todate': todate,
        'approver_level': approver_level,
        'active': status
    };


    show_loader();

    $.postJSON("/users/", formData, function(data){

        if (data.code == "00") {
          hide_loader();
          load_admins_table(data.data, "plus");
          $("#total_pages").val(""+data.counter);
        }
        else{
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
      });

}


function adminsPrev(){

  fromdate = $("#afromdate").val();
  todate = $("#atodate").val();
  approver_level = $("#txtApplevelAdminFilter").val();
  status = $("#atxtStatus").val();

  nextpage = parseInt($("#page_id").val())

  if (nextpage == 1) {
    return;
  }

  if (nextpage > 1) {
    nextpage -= 1;
  }else{
    nextpage = 1;
  }

  if ( nextpage < 1  ){
    return;
  }

    var formData = {
        'page': nextpage - 1,
        'fromdate': fromdate,
        'todate': todate,
        'approver_level': approver_level,
        'active': status
    };


    show_loader();

    $.postJSON("/users/", formData, function(data){

        if (data.code == "00") {
          hide_loader();
          load_admins_table(data.data, "minus");
        }
        else{
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
      });

}


function filterAdmins(){

    var formData = { "page": 0, "fromdate": "", "todate": "", "approver_level": "", "active": ""};

    show_loader();

    $.postJSON("/users/", formData, function(data){

        if (data.code == "00") {
          hide_loader();
          load_admins_table(data.data, "minus");
          $("#adminsFilter").modal("hide");
        }

        else{
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
      });

}


$('#btnFilterAdmins').click(function(e) {
    e.preventDefault();   

  $("#page_id").val(1)

  fromdate = $("#afromdate").val();
  todate = $("#atodate").val();
  status = $("#atxtStatus").val();


  nextpage = parseInt($("#page_id").val())

  if (nextpage > 1) {
    nextpage -= 1;
  }else{
    nextpage = 1;
  }

valide1 = validate_text_feild(fromdate, "#afromdate");
valide2 = validate_text_feild(todate, "#atodate");

if ( valide1 && valide2 ){

  var formData = {
        'page': nextpage - 1,
        'fromdate': fromdate,
        'todate': todate,
        'active': status
    };

    show_loader();

    $.postJSON("/users/", formData, function(data){
;
        if (data.code == "00") {
          hide_loader();
          load_admins_table(data.data, "minus");
          $("#adminsFilter").modal("hide");
        }

        else if (data.code == "01"){
          $('#adminsTblBody').html("No Records Found");
          $('#adminsTblBody').css({"color":"black","font-size":"18px"});
          $("#fileFilter").modal("hide");
          hide_loader();
          displayErrorMsg("No Record Found"); //display Error message

        }

        else if (data.code == "02"){
          $('#adminsTblBody').html("No Records Found");
          $('#adminsTblBody').css({"color":"black","font-size":"18px"});
          $("#fileFilter").modal("hide");
          hide_loader();
          displayErrorMsg("No Record Found"); //display Error message

        }

        else{
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
      });
  }

});


$('#btnExportAdmins').click(function(e) {
    e.preventDefault();   

  $("#page_id").val(1)

  fromdate = $("#afromdate").val();
  todate = $("#atodate").val();
  status = $("#atxtStatus").val();

  nextpage = parseInt($("#page_id").val())

  if (nextpage > 1) {
    nextpage -= 1;
  }else{
    nextpage = 1;
  }

  var formData = {
        'page': nextpage - 1,
        'fromdate': fromdate,
        'todate': todate,
        'active': status
    };
      hide_loader_modal();
    window.open("/users/export?page="+(nextpage-1).toString()+'&fromdate='+fromdate+'&todate='+todate+'&active='+status);

});

$('#btnSerchAdmins').click(function(e) {
    e.preventDefault();   

  $("#page_id").val(1)

  username = $("#txtSearchad").val();

  var formData = {
        'username': username
    };

    show_loader();

    $.postJSON("/users/getadmin", formData, function(data){

        if (data.code == "00") {
          if (data.data.length == 0) {
              hide_loader();
              $('#adminsTblBody').html("").html("No Record Found");
              $('#adminsTblBody').css({"color":"black","font-size":"18px"});
              $("#fileFilter").modal("hide");
              return;
          }
          hide_loader();
          load_admins_table([data.data], "minus");
          // $("#transFilter").modal("hide");
        }else{
              $('#adminsTblBody').html("").html("No Record Found");
              $('#adminsTblBody').css({"color":"black","font-size":"18px"});
              $("#fileFilter").modal("hide");
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
      });

});

function load_admins_table(detail, operator, page){
    // get_institutions();
    if (detail.length == 0) {
      return;
    }

    tblBodyHtml = ""
    resp = ""
    for (var i = 0; i < detail.length; i++) {

      status = '';
      if (detail[i].active == 1 || detail[i].active == '1' || detail[i].active == 'Active') {
        status = '<i class="fa fa-circle trans_success" aria-hidden="true"></i>';
      }
      else{
        status = '<i class="fa fa-circle trans_failed" aria-hidden="true"></i>';
      }

      userType = '';
      if (detail[i].user_type == 2 || detail[i].user_type == '2' ) {
        userType = 'Administrator';
      }
      else{
        userType = 'User';
      }

      tblBodyHtml += '<tr style="background-color: #FEF9F3">'+
                  '<td style="color: #1E1617; font-weight: bolder">'+ detail[i].username +'</td>'+
                  '<td>'+ detail[i].first_name +'</td>'+
                  '<td>'+ detail[i].last_name +'</td>'+
                  '<td>'+ detail[i].email +'</td>'+
                  '<td>'+ detail[i].msisdn +'</td>'+
                  '<td>'+ detail[i].institution_shortName +'</td>'+
                  '<td>'+ userType +'</td>'+
                  '<td>'+ status +'</td>'+
                  '<td>'+ detail[i].created +'</td>'+
                  '<td style="color: #108E53;"><a onclick="get_admin_details(\''+ detail[i].username +'\')">Details</a></td>'
              '</tr>';
    }

    $('#adminsTblBody').html("");
    $('#adminsTblBody').html(tblBodyHtml);

    nextpage = parseInt($("#page_id").val());

    if (operator == "plus") {
      $("#page_id").val(nextpage+1);
    }else{
      if((nextpage -1 ) <= 0){
        $("#page_id").val(1);
      }else{
        $("#page_id").val((parseInt(nextpage)-1));
      }
    }
    

}

function transPrev(){

  fromdate = $("#mfromdate").val();
  todate = $("#mtodate").val();


  current_page = parseInt($("#page_id").val());
  nextpage=current_page-1;
  last_page=parseInt($("#total_pages").text());
  
  if(nextpage<1){
    return;
  } 


    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    var formData = {

          "start_date": fromdate,
          "end_date": todate,
          "page":""+nextpage,
          "sender": "*",
          "msisdn": "*",
          "sendingHouse": "*",
          "accno": "*",
          "status": "*"
      };

    show_loader();

    $.postJSON("/transactions/", formData, function(data){
       
        if (data.code == "00") {
          hide_loader();
          load_transaction_table(data, "minus");
        }
        else{
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
      });

}

function customerNext(){

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustPhoneNumber = $("#txtCustPhoneNumber").val().trim();
    var txtCustomerFirstName = $("#txtCustomerFirstName").val().trim();
    var txtCustomerLastName = $("#txtCustomerLastName").val().trim();
    var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
    var txtCustomerLocation = $("#txtCustomerLocation").val().trim();
    var txtCustomerAssociation = $("#txtCustomerAssociation").val().trim();
    var txtCustomerStatus = $("#txtCustomerStatus").val();

    current_page = parseInt($("#page_id").val());
    nextpage=current_page+1;
    last_page=parseInt($("#total_pages").text());

    if(nextpage>last_page){
      return;
    } 

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustPhoneNumber.length == 0 ){
      txtCustPhoneNumber = "*";
    }
    
    if( txtCustomerFirstName.length == 0 ){
      txtCustomerFirstName = "*";
    }
    if( txtCustomerLastName.length == 0 ){
      txtCustomerLastName = "*";
    }

    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustomerAssociation.length == 0 ){
      txtCustomerAssociation = "*";
    }

    if( txtCustomerStatus.length == 0 ){
      txtCustomerStatus = "*";
    }

    var formData = {

         "start_date": fromdate,
        "end_date": todate,
         "page":""+nextpage,
         "first_name": txtCustomerFirstName,
         "last_name": txtCustomerLastName,
         "msisdn": txtCustPhoneNumber,
         "location": txtCustomerLocation,
         "profession":txtCustomerProfession,
         "association": txtCustomerAssociation,
         "status": txtCustomerStatus,
         "network": "*"       
      };

    show_loader();

    $.postJSON("/artisans/", formData, function(data){

        if (data.code == "00") {
          hide_loader();
          load_customers_table(data, "plus");
        }else if (data.code == "01"){
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
        else{
          hide_loader();
          displayErrorMsg("Something went wrong."); //display Error message
        }    
    });

}



function customersPrev(){

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustPhoneNumber = $("#txtCustPhoneNumber").val().trim();
    var txtCustomerFirstName = $("#txtCustomerFirstName").val().trim();
    var txtCustomerLastName = $("#txtCustomerLastName").val().trim();
    var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
    var txtCustomerLocation = $("#txtCustomerLocation").val().trim();
    var txtCustomerAssociation = $("#txtCustomerAssociation").val().trim();
    var txtCustomerStatus = $("#txtCustomerStatus").val();

    current_page = parseInt($("#page_id").val());
    nextpage=current_page-1;
    last_page=parseInt($("#total_pages").text());
  
    if(nextpage<1){
      return;
    } 

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustPhoneNumber.length == 0 ){
      txtCustPhoneNumber = "*";
    }
    
    if( txtCustomerFirstName.length == 0 ){
      txtCustomerFirstName = "*";
    }
    if( txtCustomerLastName.length == 0 ){
      txtCustomerLastName = "*";
    }

    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustomerAssociation.length == 0 ){
      txtCustomerAssociation = "*";
    }

    if( txtCustomerStatus.length == 0 ){
      txtCustomerStatus = "*";
    }

    var formData = {

         "start_date": fromdate,
        "end_date": todate,
         "page":""+nextpage,
         "first_name": txtCustomerFirstName,
         "last_name": txtCustomerLastName,
         "msisdn": txtCustPhoneNumber,
         "location": txtCustomerLocation,
         "profession":txtCustomerProfession,
         "association": txtCustomerAssociation,
         "status": txtCustomerStatus,
         "network": "*"       
      };

    show_loader();

    $.postJSON("/artisans/", formData, function(data){

        if (data.code == "00") {
          hide_loader();
          load_customers_table(data, "minus");
        }else if (data.code == "01"){
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
        else{
          hide_loader();
          displayErrorMsg("Something went wrong."); //display Error message
        }
      });

}

function dealerNext(){

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustPhoneNumber = $("#txtCustPhoneNumber").val().trim();
    var txtCustomerFirstName = $("#txtCustomerFirstName").val().trim();
    var txtCustomerLastName = $("#txtCustomerLastName").val().trim();
    var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
    var txtCustomerLocation = $("#txtCustomerLocation").val().trim();
    var txtCustomerAssociation = $("#txtCustomerAssociation").val().trim();
    var txtCustomerStatus = $("#txtCustomerStatus").val();

    current_page = parseInt($("#page_id").val());
    nextpage=current_page+1;
    last_page=parseInt($("#total_pages").text());

    if(nextpage>last_page){
      return;
    } 

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustPhoneNumber.length == 0 ){
      txtCustPhoneNumber = "*";
    }
    
    if( txtCustomerFirstName.length == 0 ){
      txtCustomerFirstName = "*";
    }
    if( txtCustomerLastName.length == 0 ){
      txtCustomerLastName = "*";
    }

    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustomerAssociation.length == 0 ){
      txtCustomerAssociation = "*";
    }

    if( txtCustomerStatus.length == 0 ){
      txtCustomerStatus = "*";
    }

    var formData = {

         "start_date": fromdate,
        "end_date": todate,
         "page":""+nextpage,
         "first_name": txtCustomerFirstName,
         "last_name": txtCustomerLastName,
         "msisdn": txtCustPhoneNumber,
         "location": txtCustomerLocation,
         "profession":txtCustomerProfession,
         "association": txtCustomerAssociation,
         "status": txtCustomerStatus,
         "network": "*"       
      };
    show_loader();

    $.postJSON("/dealers/", formData, function(data){

        if (data.code == "00") {
          hide_loader();
          load_dealers_table(data, "plus");
        }else if (data.code == "01"){
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
        else{
          hide_loader();
          displayErrorMsg("Something went wrong."); //display Error message
        }    
    });

}



function dealersPrev(){

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustPhoneNumber = $("#txtCustPhoneNumber").val().trim();
    var txtCustomerFirstName = $("#txtCustomerFirstName").val().trim();
    var txtCustomerLastName = $("#txtCustomerLastName").val().trim();
    var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
    var txtCustomerLocation = $("#txtCustomerLocation").val().trim();
    var txtCustomerAssociation = $("#txtCustomerAssociation").val().trim();
    var txtCustomerStatus = $("#txtCustomerStatus").val();

    current_page = parseInt($("#page_id").val());
    nextpage=current_page-1;
    last_page=parseInt($("#total_pages").text());
  
    if(nextpage<1){
      return;
    } 

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustPhoneNumber.length == 0 ){
      txtCustPhoneNumber = "*";
    }
    
    if( txtCustomerFirstName.length == 0 ){
      txtCustomerFirstName = "*";
    }
    if( txtCustomerLastName.length == 0 ){
      txtCustomerLastName = "*";
    }

    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustomerAssociation.length == 0 ){
      txtCustomerAssociation = "*";
    }

    if( txtCustomerStatus.length == 0 ){
      txtCustomerStatus = "*";
    }

    var formData = {

         "start_date": fromdate,
        "end_date": todate,
         "page":""+nextpage,
         "first_name": txtCustomerFirstName,
         "last_name": txtCustomerLastName,
         "msisdn": txtCustPhoneNumber,
         "location": txtCustomerLocation,
         "profession":txtCustomerProfession,
         "association": txtCustomerAssociation,
         "status": txtCustomerStatus,
         "network": "*"       
      };

    show_loader();

    $.postJSON("/dealers/", formData, function(data){

        if (data.code == "00") {
          hide_loader();
          load_dealers_table(data, "minus");
        }else if (data.code == "01"){
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
        else{
          hide_loader();
          displayErrorMsg("Something went wrong."); //display Error message
        }
      });

}

$('#btnFilterCustomers').click(function(e) {
    e.preventDefault();   

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustPhoneNumber = $("#txtCustPhoneNumber").val().trim();
    var txtCustomerFirstName = $("#txtCustomerFirstName").val().trim();
    var txtCustomerLastName = $("#txtCustomerLastName").val().trim();
    var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
    var txtCustomerLocation = $("#txtCustomerLocation").val().trim();
    var txtCustomerAssociation = $("#txtCustomerAssociation").val().trim();
    var txtCustomerStatus = $("#txtCustomerStatus").val();

    nextpage = parseInt($("#page_id").val())

    if (nextpage > 1) {
      nextpage -= 1;
    }else{
      nextpage = 1;
    }

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustPhoneNumber.length == 0 ){
      txtCustPhoneNumber = "*";
    }
    
    if( txtCustomerFirstName.length == 0 ){
      txtCustomerFirstName = "*";
    }
    if( txtCustomerLastName.length == 0 ){
      txtCustomerLastName = "*";
    }

    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustomerAssociation.length == 0 ){
      txtCustomerAssociation = "*";
    }

    if( txtCustomerStatus.length == 0 ){
      txtCustomerStatus = "*";
    }

    var formData = {

         "start_date": fromdate,
        "end_date": todate,
         "page":""+nextpage,
         "first_name": txtCustomerFirstName,
         "last_name": txtCustomerLastName,
         "msisdn": txtCustPhoneNumber,
         "location": txtCustomerLocation,
         "profession":txtCustomerProfession,
         "association": txtCustomerAssociation,
         "status": txtCustomerStatus,
         "network": "*"       
      };

    show_loader();

    $.postJSON("/artisans/", formData, function(data){

        if (data.code == "00") {
            hide_loader();
           if(data.data.length==0){

              load_customers_table(data, "minus");
              displayErrorMsgModal(data.msg);
              $("#merchantFilter").modal("hide");
              return ;
           }
          load_customers_table(data, "minus");
          $("#merchantFilter").modal("hide");
        } else if (data.code == "01"){
              hide_loader();
              $('#merchantTblBody').html("No Records Found");
              $('#merchantTblBody').css({"color":"black","font-size":"24px"});
              displayErrorMsg("No Records Found"); //display Error message
              $("#merchantFilter").modal("hide");
        } else {
          hide_loader();
          $('#merchantTblBody').html("No Records Found");
          $('#merchantTblBody').css({"color":"black","font-size":"24px"});
          displayErrorMsg("No Records Found"); //display Error message
          $("#merchantFilter").modal("hide");
    }
      });

});

$('#btnFilterDealers').click(function(e) {
    e.preventDefault();   

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustPhoneNumber = $("#txtCustPhoneNumber").val().trim();
    var txtCustomerFirstName = $("#txtCustomerFirstName").val().trim();
    var txtCustomerLastName = $("#txtCustomerLastName").val().trim();
    var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
    var txtCustomerLocation = $("#txtCustomerLocation").val().trim();
    var txtCustomerAssociation = $("#txtCustomerAssociation").val().trim();
    var txtCustomerStatus = $("#txtCustomerStatus").val();

    nextpage = parseInt($("#page_id").val())

    if (nextpage > 1) {
      nextpage -= 1;
    }else{
      nextpage = 1;
    }

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustPhoneNumber.length == 0 ){
      txtCustPhoneNumber = "*";
    }
    
    if( txtCustomerFirstName.length == 0 ){
      txtCustomerFirstName = "*";
    }
    if( txtCustomerLastName.length == 0 ){
      txtCustomerLastName = "*";
    }

    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustomerAssociation.length == 0 ){
      txtCustomerAssociation = "*";
    }

    if( txtCustomerStatus.length == 0 ){
      txtCustomerStatus = "*";
    }

    var formData = {

         "start_date": fromdate,
        "end_date": todate,
         "page":""+nextpage,
         "first_name": txtCustomerFirstName,
         "last_name": txtCustomerLastName,
         "msisdn": txtCustPhoneNumber,
         "location": txtCustomerLocation,
         "profession":txtCustomerProfession,
         "association": txtCustomerAssociation,
         "status": txtCustomerStatus,
         "network": "*"       
      };


    show_loader();

    $.postJSON("/dealers/", formData, function(data){
        if (data.code == "00") {
            hide_loader();
           if(data.data.length==0){

              load_dealers_table(data, "minus");
              displayErrorMsgModal(data.msg);
              $("#merchantFilter").modal("hide");
              return ;
           }
          load_dealers_table(data, "minus");
          $("#merchantFilter").modal("hide");
        } else if (data.code == "01"){
              hide_loader();
              $('#merchantTblBody').html("No Records Found");
              $('#merchantTblBody').css({"color":"black","font-size":"24px"});
              displayErrorMsg("No Records Found"); //display Error message
              $("#merchantFilter").modal("hide");
        } else {
          hide_loader();
          $('#merchantTblBody').html("No Records Found");
          $('#merchantTblBody').css({"color":"black","font-size":"24px"});
          displayErrorMsg("No Records Found"); //display Error message
          $("#merchantFilter").modal("hide");
    }
      });

});


$('#btnExportTransaction').click(function(e) {
    e.preventDefault();   

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustID = $("#txtCustID").val();
    var txtCustName = $("#txtCustName").val();
    var txtCustWallet = $("#txtCustWallet").val();
    var txtCustWalletNet = $("#txtCustWalletNet").val();
    var txtCustRecp = $("#txtCustRecp").val();
    var txtCustRef = $("#txtCustRef").val();
    var txtCustAck = $("#txtCustAck").val();
    var txtCustStatus = $("#txtCustStatus").val();

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustID.length == 0 ){
      txtCustID = "*";
    }
    
    if( txtCustName.length == 0 ){
      txtCustName = "*";
    }
    if( txtCustWallet.length == 0 ){
      txtCustWallet = "*";
    }

    if( txtCustWalletNet.length == 0 ){
      txtCustWalletNet = "*";
    }
    if( txtCustRecp.length == 0 ){
      txtCustRecp = "*";
    }
    if( txtCustRef.length == 0 ){
      txtCustRef = "*";
    }
    if( txtCustAck.length == 0 ){
      txtCustAck = "*";
    }
    if( txtCustStatus.length == 0 ){
      txtCustStatus = "*";
    }

    var formData = {
         "start_date": fromdate,
         "end_date": todate,
         "trans_id":txtCustID,
         "fusion_ref":txtCustRef,
         "name":txtCustName,
         "wallet": txtCustWallet,
         "wallet_mno": txtCustWalletNet,
         "tool": txtCustAck,
         "receipt":txtCustRecp,
         "status": txtCustStatus,
         "page":"1"
      };

    
    show_loader();

    window.open("/transactions/export?page=1"+'&start_date='+fromdate+'&end_date='+todate+'&trans_id='+txtCustID+'&fusion_ref='+txtCustRef+'&name='+txtCustName+'&wallet='+txtCustWallet+'&wallet_mno='+txtCustWalletNet+'&tool='+txtCustAck+'&receipt='+txtCustRecp+'&status='+txtCustStatus);
    hide_loader();
    hide_loader_modal();
});



$('#btnExportCustomers').click(function(e) {
    e.preventDefault();   

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustPhoneNumber = $("#txtCustPhoneNumber").val().trim();
    var txtCustomerFirstName = $("#txtCustomerFirstName").val().trim();
    var txtCustomerLastName = $("#txtCustomerLastName").val().trim();
    var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
    var txtCustomerLocation = $("#txtCustomerLocation").val().trim();
    var txtCustomerAssociation = $("#txtCustomerAssociation").val().trim();
    var txtCustomerStatus = $("#txtCustomerStatus").val();

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustPhoneNumber.length == 0 ){
      txtCustPhoneNumber = "*";
    }
    
    if( txtCustomerFirstName.length == 0 ){
      txtCustomerFirstName = "*";
    }
    if( txtCustomerLastName.length == 0 ){
      txtCustomerLastName = "*";
    }

    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustomerAssociation.length == 0 ){
      txtCustomerAssociation = "*";
    }

    if( txtCustomerStatus.length == 0 ){
      txtCustomerStatus = "*";
    }

    var formData = {

         "start_date": fromdate,
        "end_date": todate,
         "page":"1",
         "first_name": txtCustomerFirstName,
         "last_name": txtCustomerLastName,
         "msisdn": txtCustPhoneNumber,
         "location": txtCustomerLocation,
         "profession":txtCustomerProfession,
         "association": txtCustomerAssociation,
         "status": txtCustomerStatus,
         "network": "*"       
      };

    show_loader();

    window.open("/artisans/export?page=1&network=*"+'&start_date='+fromdate+'&end_date='+todate+'&first_name='+txtCustomerFirstName+'&last_name='+txtCustomerLastName+'&msisdn='+txtCustPhoneNumber+'&location='+txtCustomerLocation+'&status='+txtCustomerStatus+'&association='+txtCustomerAssociation+'&profession='+txtCustomerProfession);
    hide_loader();
    hide_loader_modal();
});

$('#btnExportDealers').click(function(e) {
    e.preventDefault();   

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustPhoneNumber = $("#txtCustPhoneNumber").val().trim();
    var txtCustomerFirstName = $("#txtCustomerFirstName").val().trim();
    var txtCustomerLastName = $("#txtCustomerLastName").val().trim();
    var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
    var txtCustomerLocation = $("#txtCustomerLocation").val().trim();
    var txtCustomerAssociation = $("#txtCustomerAssociation").val().trim();
    var txtCustomerStatus = $("#txtCustomerStatus").val();

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustPhoneNumber.length == 0 ){
      txtCustPhoneNumber = "*";
    }
    
    if( txtCustomerFirstName.length == 0 ){
      txtCustomerFirstName = "*";
    }
    if( txtCustomerLastName.length == 0 ){
      txtCustomerLastName = "*";
    }

    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }

    if( txtCustomerLocation.length == 0 ){
      txtCustomerLocation = "*";
    }

    if( txtCustomerAssociation.length == 0 ){
      txtCustomerAssociation = "*";
    }

    if( txtCustomerStatus.length == 0 ){
      txtCustomerStatus = "*";
    }

    var formData = {

         "start_date": fromdate,
        "end_date": todate,
         "page":"1",
         "first_name": txtCustomerFirstName,
         "last_name": txtCustomerLastName,
         "msisdn": txtCustPhoneNumber,
         "location": txtCustomerLocation,
         "profession":txtCustomerProfession,
         "association": txtCustomerAssociation,
         "status": txtCustomerStatus,
         "network": "*"       
      };

    show_loader();

    window.open("/dealers/export?page=1&network=*"+'&start_date='+fromdate+'&end_date='+todate+'&first_name='+txtCustomerFirstName+'&last_name='+txtCustomerLastName+'&msisdn='+txtCustPhoneNumber+'&location='+txtCustomerLocation+'&status='+txtCustomerStatus+'&association='+txtCustomerAssociation+'&profession='+txtCustomerProfession);
    hide_loader();
    hide_loader_modal();
});

$('#btnSearchCustomers').click(function(e) {
    e.preventDefault();   

    $("#page_id").val(1)

    txtSearchCust = $("#txtSearchCust").val().trim();

    if(txtSearchCust.length == 0){
        txtSearchCust = "*";
    }

      var formData = {
         "start_date": "*",
         "end_date": "*",
         "page":"1",
         "first_name": "*",
         "last_name": "*",
         "msisdn": txtSearchCust,
         "network": "*",
         "location": "*",
         "profession":"*",
         "association":"*",
         "status": "*"   
      };

        show_loader();
        if ($.trim(txtSearchCust).length==0 ) {
          hide_loader();
          $('#btnFilterCustomers').trigger('click');
          return false;
        }

        $.postJSON("/artisans/", formData, function(data){

            if (data.code == "00") {
              hide_loader();
              load_customers_table(data, "minus");
            }

            else if (data.code == "01"){
              hide_loader();
              $('#merchantTblBody').html(data.msg);
              $('#merchantTblBody').css({"color":"black","font-size":"24px"});
              displayErrorMsg(data.msg); //display Error message
            } else {
              hide_loader();
              $('#merchantTblBody').html("Something happened went wrong.");
              $('#merchantTblBody').css({"color":"black","font-size":"24px"});
              displayErrorMsg("Something happened went wrong."); //display Error message
            }
          });

});

$('#btnSearchDealers').click(function(e) {
    e.preventDefault();   

    $("#page_id").val(1)

    txtSearchCust = $("#txtSearchDealer").val().trim();

    if(txtSearchCust.length == 0){
        txtSearchCust = "*";
    }

      var formData = {
         "start_date": "*",
         "end_date": "*",
         "page":"1",
         "first_name": "*",
         "last_name": "*",
         "msisdn": txtSearchCust,
         "network": "*",
         "location": "*",
         "profession":"*",
         "association":"*",
         "status": "*"   
      };

        show_loader();
        if ($.trim(txtSearchCust).length==0 ) {
          hide_loader();
          $('#btnFilterDealers').trigger('click');
          return false;
        }

        $.postJSON("/dealers/", formData, function(data){

            if (data.code == "00") {
              hide_loader();
              load_dealers_table(data, "minus");
            }

            else if (data.code == "01"){
              hide_loader();
              $('#merchantTblBody').html(data.msg);
              $('#merchantTblBody').css({"color":"black","font-size":"24px"});
              displayErrorMsg(data.msg); //display Error message
            } else {
              hide_loader();
              $('#merchantTblBody').html("Something happened went wrong.");
              $('#merchantTblBody').css({"color":"black","font-size":"24px"});
              displayErrorMsg("Something happened went wrong."); //display Error message
            }
          });

});

$('#btnSearchTrans').click(function(e) {
    e.preventDefault();   

    $("#page_id").val(1)

    txtSearchTrans = $("#txtSearchTrans").val();
   
    if( txtSearchTrans.length == 0 ){
      txtSearchTrans = "*"
    }

      
    var formData = {
       "start_date": "*",
       "end_date": "*",
       "trans_id":"*",
       "page":"1",
       "fusion_ref":"*",
       "name":"*",
       "wallet": txtSearchTrans,
       "wallet_mno": "*",
       "tool": "*",
       "receipt":"*",
       "status": "*"
    }

      

      // 
      show_loader();

      $.postJSON("/transactions/", formData, function(data){
          
          if (data.code == "00") {
            hide_loader();
            load_transaction_table(data, "minus");
          }
          else if (data.code == "01") {
            hide_loader();
            $('#transactionTblBody').html("No Records Found");
            $('#transactionTblBody').css({"color":"black","font-size":"24px"});
            displayErrorMsg("No Records Found"); //display Error message
          }

          else if (data.code == "02") {
            hide_loader();
            $('#transactionTblBody').html("No Records Found");
            $('#transactionTblBody').css({"color":"black","font-size":"24px"});
            displayErrorMsg("No Records Found"); //display Error message
          }
          else{
            hide_loader();
            $('#transactionTblBody').html("No Records Found");
            $('#transactionTblBody').css({"color":"black","font-size":"24px"});
            displayErrorMsg("No Records Found"); //display Error message
          }
        });

});

$('#btnSearchPayment').click(function(e) {
    e.preventDefault();   

    $("#page_id").val(1)

    txtSearchPayment = $("#txtSearchPayment").val();
   
    if( txtSearchPayment.length == 0 ){
      txtSearchPayment = "*"
    }

      
    var formData = {
       "start_date": "*",
       "end_date": "*",
       "id":"*",
       "page":"1",
       "user_msisdn": txtSearchPayment,
       "payment_status": "*",
       "tool": "*",
       "tool_id": "*",
       "redeemed":"*"
    };


      show_loader();

      $.postJSON("/payments/", formData, function(data){
          
          if (data.code == "00") {
            hide_loader();
            load_payment_table(data, "minus");
          }
          else if (data.code == "01") {
            hide_loader();
            $('#paymentTblBody').html(data.msg);
            $('#paymentTblBody').css({"color":"black","font-size":"24px"});
            displayErrorMsg(data.msg); //display Error message
          }
          else{
            hide_loader();
            $('#paymentTblBody').html("Something went wrong");
            $('#paymentTblBody').css({"color":"black","font-size":"24px"});
            displayErrorMsg("No Records Found"); //display Error message
          }
        });

});

$('#btnSearchDealeractivity').click(function(e) {
    e.preventDefault();   

    $("#page_id_act").val(1)

    txtSearchDealeractivity = $("#txtSearchDealeractivity").val();
   
    if( txtSearchDealeractivity.length == 0 ){
      txtSearchDealeractivity = "*"
    }

      
    var formData = {
       "start_date": "*",
       "end_date": "*",
       "id":"*",
       "page":"1",
       "payment_id": "*",
       "dealer_name": "*",
       "dealer_msisdn": txtSearchDealeractivity,
       "artisan_name": "*",
       "artisan_msisdn": "*",
       "location": "*",
       "status":"*"
    };

      show_loader_modal();

      $.postJSON("/dealeractivities/", formData, function(data){
          
          if (data.code == "00") {
            hide_loader_modal();
            load_dealeractivity_table(data, "minus");
          }
          else if (data.code == "01") {
            hide_loader_modal();
            $('#dealeractivityTblBody').html(data.msg);
            $('#dealeractivityTblBody').css({"color":"black","font-size":"24px"});
            displayErrorMsg(data.msg); //display Error message
          }
          else{
            hide_loader_modal();
            $('#dealeractivityTblBody').html("Something went wrong");
            $('#dealeractivityTblBody').css({"color":"black","font-size":"24px"});
            displayErrorMsg("No Records Found"); //display Error message
          }
        });

});

$('#btnFilterTool').click(function(e) {
    e.preventDefault();   
    $("#page_id").val(1);

    var fromdate = $("#mfromdate").val();
    var todate = $("#mtodate").val();
    var txtCustToolName = $("#txtCustToolName").val().trim();
    var txtCustomerProfession = $("#txtCustomerProfession").val().trim();
    var txtToolType = $("#txtToolType").val().trim();
    var txtToolStatus = $("#txtToolStatus").val();

    nextpage = parseInt($("#page_id").val())

    if (nextpage > 1) {
      nextpage -= 1;
    }else{
      nextpage = 1;
    }

    if( fromdate.length == 0 || todate.length == 0){
      fromdate = "*";
      todate = "*";
    }else{
      fromdate = fromdate + " 00:00:00";
      todate = todate + " 23:59:59";
    }

    if( txtCustToolName.length == 0 ){
      txtCustToolName = "*";
    }
    
    if( txtCustomerProfession.length == 0 ){
      txtCustomerProfession = "*";
    }
    if( txtToolType.length == 0 ){
      txtToolType = "*";
    }

    if( txtToolStatus.length == 0 ){
      txtToolStatus = "*";
    }
      
    var formData = {
        "start_date": fromdate,
       "end_date": todate,
       "id":"*",
       "page":"1",
       "tool_name": txtCustToolName,
       "tool_id": "*",
       "tool_type": txtToolType,
       "profession":txtCustomerProfession,
       "status": txtToolStatus   
    };

      show_loader_modal();

      $.postJSON("/tools/", formData, function(data){

          if (data.code == "00") {
            hide_loader_modal();
            load_tool_table(data, "minus");
            $("#filterModal").modal("hide");
          }
          else if (data.code == "01") {
            hide_loader_modal();
            $('#toolsTblBody').html(data.msg);
            $('#toolsTblBody').css({"color":"black","font-size":"24px"});
            displayErrorMsg(data.msg); //display Error message
          }
          else{
            hide_loader_modal();
            $('#toolsTblBody').html("Something went wrong");
            $('#toolsTblBody').css({"color":"black","font-size":"24px"});
            displayErrorMsg("No Records Found"); //display Error message
          }
        });

});

function get_customer_details(msisdn){


    var formData = {
         "start_date": "*",
         "end_date": "*",
         "page":"1",
         "first_name": "*",
         "last_name": "*",
         "msisdn": msisdn,
         "network": "*",
         "location": "*",
         "profession":"*",
         "association":"*",
         "status": "*"   
      };

    show_loader();

    $.postJSON("/customers/details", formData, function(data){
        
        if (data.code == "00") {
          hide_loader();
          load_customers_modal(data.data);
        }

        else if(data.code == "01"){
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
        else{
         hide_loader();
          displayErrorMsg("Something went wrong");
        }
      });

}

function get_dealeractivity_details(profession, tool_info){
    tblBodyHtml = "";
    full_paid = "No";
    if(tool_info['payment_status'] == "1"){
        full_paid = "Yes";
    }
    redeemed = "No";
    if(tool_info['redeemed'] == "1"){
        redeemed = "Yes";
    }

    tblBodyHtml += '<tr style="background-color: #FEF9F3">'+
                        '<td>'+ profession +'</td>'+
                        '<td>'+ tool_info['tool_name'] +'</td>'+
                        '<td>'+ tool_info['amount_paid'] +'</td>'+
                        '<td>'+ full_paid +'</td>'+
                        '<td>'+ redeemed +'</td>'+                 
                    '</tr>';
    $('#merchantMiniTblBody').html(tblBodyHtml);
    $("#dealeractivitydetailsmodal").modal("show");
}

function get_container_details(tool_info){
    // var tool_array = JSON.parse(tool_info);

    var conatiner = ""; 
    for(i = 0; i < tool_info.length; i++){
      conatiner += '<div>'+ tool_info[i] +'</div>';
    }

    $('#modal-body-id').html(conatiner);
    $("#tooldetailsmodal").modal("show");
}

function get_payment_details(data){
    var jsonObj = data;
    var allkeys = Object.keys(jsonObj);

    var tblBodyHtml = "";
    for(var k = 0; k < allkeys.length;k++){
      var cur_key = allkeys[k];
      tblBodyHtml += '<tr style="background-color: #FEF9F3">'+
                        '<td>'+ cur_key +'</td>'+
                        '<td>'+ jsonObj[cur_key] +'</td>'+                 
                    '</tr>';
    }
    $('#merchantTblBody').html(tblBodyHtml);
    $("#paymentdetailsmodal").modal("show");

}

function get_update_dealer(msisdn){


    var formData = {
         "start_date": "*",
         "end_date": "*",
         "page":"1",
         "first_name": "*",
         "last_name": "*",
         "msisdn": msisdn,
         "network": "*",
         "location": "*",
         "profession":"*",
         "association":"*",
         "status": "*"   
      };

    show_loader();

    $.postJSON("/dealers/details", formData, function(data){
        
        if (data.code == "00") {
          hide_loader();
          load_dealers_modal(data.data);
        }

        else if(data.code == "01"){
          hide_loader();
          $('#txtPassword').val("");
          displayErrorMsg(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader();
          $('#txtPassword').val("");
          displayErrorMsg(data.msg); //display Error message
        }

        else{
          hide_loader();
          $('#txtPassword').val("");
        }
      });

}

function get_update_customer(msisdn){


    var formData = {
         "start_date": "*",
         "end_date": "*",
         "page":"1",
         "first_name": "*",
         "last_name": "*",
         "msisdn": msisdn,
         "network": "*",
         "location": "*",
         "profession":"*",
         "association":"*",
         "status": "*"   
      };

    show_loader();

    $.postJSON("/artisans/details", formData, function(data){
        
        if (data.code == "00") {
          hide_loader();
          load_customer_modal(data.data);
        }

        else if(data.code == "01"){
          hide_loader();
          $('#txtPassword').val("");
          displayErrorMsg(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader();
          $('#txtPassword').val("");
          displayErrorMsg(data.msg); //display Error message
        }

        else{
          hide_loader();
          $('#txtPassword').val("");
        }
      });

}



function load_number(){
  $(document).ready(function(){
    $('#tranc_msisdn').val($('#txtSearch').val());
  });
}

function load_customers_table(data, operator, page){


    if (data.data.length == 0) {
      $('#merchantTblBody').html("").html(data.msg);
      $('#merchantTblBody').css({"color":"black","font-size":"24px"});

       displayErrorMsg(data.msg);
       displayNotificationMsg(data.msg);
      return;
    }

    detail = data.data;

    tblBodyHtml = ""
    resp = ""
    for (var i = 0; i < detail.length; i++) {

      status = '';
      if (detail[i].status == "1") {
        status = '<i class="fa fa-circle trans_success" aria-hidden="true"></i>';
      }else{
        status = '<i class="fa fa-circle trans_failed" aria-hidden="true"></i>';
      }

      update_status = "";

      if(thisUser == 2){
        update_status = '<td style="color: #108E53;"><a onclick="get_update_customer(\''+ detail[i].msisdn +'\')">update</a></td>'+
              '</tr>';
      }

      tblBodyHtml += '<tr style="background-color: #FEF9F3">'+
                  '<td style="color: #1E1617; font-weight: bolder">'+ detail[i].msisdn +'</td>'+
                  '<td>'+ detail[i].first_name +'</td>'+
                  '<td>'+ detail[i].last_name +'</td>'+
                  '<td>'+ detail[i].profession +'</td>'+
                  '<td>'+ detail[i].location +'</td>' +
                  '<td>'+ detail[i].association +'</td>' +
                  '<td>'+ detail[i].network +'</td>' +
                  '<td>'+ status+'</td>'+
                  '<td>'+ detail[i].date +'</td>' +
                  update_status;
    }

    $('#merchantTblBody').html("");
    $('#merchantTblBody').html(tblBodyHtml);

    $("#total_pages").html(data.nav.last_page);

    nextpage = parseInt($("#page_id").val());

    if (operator == "plus") {
      $("#page_id").val(nextpage+1);
    }else{
      if((nextpage -1 ) <= 0){
        $("#page_id").val(1);
      }else{
        $("#page_id").val((parseInt(nextpage)-1));
      }
    }
    

}

function load_dealers_table(data, operator, page){


    if (data.data.length == 0) {
      $('#merchantTblBody').html("").html(data.msg);
      $('#merchantTblBody').css({"color":"black","font-size":"24px"});

       displayErrorMsg(data.msg);
       displayNotificationMsg(data.msg);
      return;
    }

    detail = data.data;

    tblBodyHtml = ""
    resp = ""
    for (var i = 0; i < detail.length; i++) {

      status = '';
      if (detail[i].status == "1") {
        status = '<i class="fa fa-circle trans_success" aria-hidden="true"></i>';
      }else{
        status = '<i class="fa fa-circle trans_failed" aria-hidden="true"></i>';
      }

      update_status = "";

      if(thisUser == 2){
        update_status = '<td style="color: #108E53;"><a onclick="get_update_dealer(\''+ detail[i].msisdn +'\')">update</a></td>';
      }

      tblBodyHtml += '<tr style="background-color: #FEF9F3">'+
                  '<td style="color: #1E1617; font-weight: bolder">'+ detail[i].msisdn +'</td>'+
                  '<td>'+ detail[i].first_name +'</td>'+
                  '<td>'+ detail[i].last_name +'</td>'+
                  '<td>'+ detail[i].location +'</td>' +
                  '<td>'+ detail[i].network +'</td>' +
                  '<td>'+ status+'</td>'+
                  '<td>'+ detail[i].date +'</td>' +
                  update_status+
              '</tr>';
    }

    $('#merchantTblBody').html("");
    $('#merchantTblBody').html(tblBodyHtml);

    $("#total_pages").html(data.nav.last_page);

    nextpage = parseInt($("#page_id").val());

    if (operator == "plus") {
      $("#page_id").val(nextpage+1);
    }else{
      if((nextpage -1 ) <= 0){
        $("#page_id").val(1);
      }else{
        $("#page_id").val((parseInt(nextpage)-1));
      }
    }
    

}

function load_customers_modal(detail){
    // get_institutions();

    $('#customer_Id').text(detail[0]['accno']);
    $('#customer_name').text(detail[0]['name']);
    $('#customer_station').text(detail[0]['station']);
    if(detail[0]['status'] == '1'){
        $('#customer_status').text('Active');
    }else{
        $('#customer_status').text('Inactive');
    }
    $('#customer_tel').text(detail[0]['tel']);
    $('#created_by').text(detail[0]['added_by']);
    $('#date_created').text(detail[0]['date_added']);

    $('#txtCustId').val(detail[0]['accno']);
    $('#txtCustName').val(detail[0]['name']);
    $('#txtCustStation').val(detail[0]['station']);
    $('#txtCustTel').val(detail[0]['tel']);
    $('#txtCustStatus').val(detail[0]['status']);

    $("#modifyCustomersModal").modal("show");
}

function load_dealeractivity_details_modal(tool_info){

    
}

function load_dealers_modal(detail){
    $('#txtCustUpdateID').val(detail[0]['id']);
    $('#txtCustUpdatePhoneNumber').val(detail[0]['msisdn']);
    $('#txtCustomerUpdateNetwork').val(detail[0]['network']);
    $('#txtCustomerUpdateFirstName').val(detail[0]['first_name']);
    $('#txtCustomerUpdateLastName').val(detail[0]['last_name']);
    $('#txtCustomerUpdateProfession').val(detail[0]['profession']);
    $('#txtCustomerUpdateLocation').val(detail[0]['location']);
    $('#txtCustomerUpdateAssociation').val(detail[0]['association']);
    $('#txtCustomerUpdateStatus').val(detail[0]['status']);

    $("#modifyDealersModal").modal("show");
}

function load_tool_modal(detail){
    tool_details = detail.container.replace(/'/g, '"');
    tool_details = JSON.parse(tool_details);

    var container = ""; 
    for(i = 0; i < tool_details.length; i++){
      container += tool_details[i] +'\n';
    }

    $('#txtToolUpdateID').val(detail['id']);
    $('#txtToolName').val(detail['tool_name']);
    $('#txtToolPrice').val(detail['price']);
    $('#txtToolDetails').css("padding","0px");
    $('#txtToolDetails').val(container);
    $('#txtCustomerUpdateProfession').val(detail['profession']);
    $('#txtToolUpdateType').val(detail['is_single']);
    $('#txtToolUpdateStatus').val(detail['status']);

    $("#modifyToolModal").modal("show");
}

function load_customer_modal(detail){
    $('#txtCustUpdateID').val(detail[0]['id']);
    $('#txtCustUpdatePhoneNumber').val(detail[0]['msisdn']);
    $('#txtCustomerUpdateNetwork').val(detail[0]['network']);
    $('#txtCustomerUpdateFirstName').val(detail[0]['first_name']);
    $('#txtCustomerUpdateLastName').val(detail[0]['last_name']);
    $('#txtCustomerUpdateProfession').val(detail[0]['profession']);
    $('#txtCustomerUpdateLocation').val(detail[0]['location']);
    $('#txtCustomerUpdateAssociation').val(detail[0]['association']);
    $('#txtCustomerUpdateStatus').val(detail[0]['status']);

    $("#modifyDealersModal").modal("show");
}

function showAddController() {
  $("#btnModifyCustomer").show();
  $("#btnUpdateCustomer").show();
  $("#btnUpdateDealer").show();
  $("#btnUpdateTool").show();
  
}

function hideAddController() {
  $("#btnModifyCustomer").hide();
  $("#btnUpdateCustomer").hide();
}

/**
*Handle enter key press event for password text field
*/
$('#btnModifyCustomer').click(function(e) {
    e.preventDefault();    
    var customer_id = $('#txtCusIdMod').val();
    var fname = $('#txtCusFirstNameMod').val();
    var lname = $('#txtCusLastNameMod').val();
    var sex = $('#txtCusSexMod').val();
    var withdrawal_status = $('#txtCusWithdStatusMod').val();
    var deposit_status = $('#txtCusDepositStatusMod').val();
    var product = $('#txtCusProductMod').val();
    var status = $('#txtCusStatusMod').val();

    valide1 = validate_text_feild(fname, "#txtCusFirstNameMod");
    valide2 = validate_text_feild(lname, "#txtCusLastNameMod");
    
    valide4 = validate_text_feild(sex, "#txtCusSexMod");
    valide5 = validate_text_feild(withdrawal_status, "#txtCusWithdStatusMod");
    valide6 = validate_text_feild(deposit_status, "#txtCusDepositStatusMod");
    valide7 = validate_text_feild(product, "#txtCusProductMod");
    valide8 = validate_text_feild(status, "#txtCusStatusMod");

    if( valide1 && valide2 && valide4 && valide5 && valide6 && valide7 && valide8 ){
      show_loader_modal();
      formData = {
          "customer_id": customer_id,
          "fname": fname,
          "lname": lname,
          "mname": mname,
          "sex": sex,
          "withdrawal_status": withdrawal_status,
          "deposit_status": deposit_status,
          "product": product,
          "status": status,
      }

      $.postJSON("/customers/update", formData, function(data){

        if (data.code == "00") {
          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          displaySucessMsg(data.msg);
          filterDistributors();
          $("#modifyCustomersModal").modal("hide");
        }

        else if(data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else{
          hide_loader_modal();
        }
      });
  }
});

/**
*Handle enter key press event for password text field
*/
$('#btnAddAdmin').click(function(e) {
    e.preventDefault();    
    var firstname = $('#txtFirstnameAdmin').val();
    var lastname = $('#txtLastnameAdmin').val();
    var username = $('#txtUsernameAdmin').val();
    var phone = $('#txtPhoneAdmin').val();
    var email = $('#txtEmailAdmin').val();
    var userType = $('#txtUserTypeAdmin').val();
    var institution = $('#txtInstitutionAdmin').val();
    var applevel = $('#txtApplevelAdmin').val();


    valide1 = validate_text_feild(firstname, "#txtFirstnameAdmin");
    valide2 = validate_text_feild(lastname, "#txtLastnameAdmin");
    valide3 = validate_text_feild(username, "#txtUsernameAdmin");
    valide4 = validate_text_feild(phone, "#txtPhoneAdmin", "phone");
    valide5 = validate_text_feild(email, "#txtEmailAdmin", "email");
    valide6 = validate_text_feild(userType, "#txtUserTypeAdmin");
    valide7 = validate_text_feild(institution, "#txtInstitutionAdmin");


    if( valide1 && valide2 && valide3 && valide4 && valide5 && valide6 && valide7 ){
      show_loader_modal();
      formData = {
          "first_name": firstname,
          "last_name": lastname,
          "username": username,
          "msisdn": phone,
          "email": email,
          "access_level_id": userType,
          "user_type": userType,
          "institution_shortName": institution
          
      }

      $.postJSON("/users/add", formData, function(data){

        if (data.code == "00") {

          $('#txtFirstnameAdmin').val("");
          $('#txtLastnameAdmin').val("");
          $('#txtUsernameAdmin').val("");
          $('#txtPhoneAdmin').val("");
          $('#txtEmailAdmin').val("");

          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          filterAdmins();
          $('#addadmin').modal("hide");
        }

        else if(data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else{
          hide_loader_modal();
        }
      });
  }
});


/**
*Handle enter key press event for password text field
*/
$('#btnUpdateAdmin').click(function(e) {
    e.preventDefault();    
    var firstname = $('#txtFirstnameAdminMod').val();
    var lastname = $('#txtLastnameAdminMod').val();
    var username = $('#txtUsernameAdminMod').val();
    var phone = $('#txtPhoneAdminMod').val();
    var email = $('#txtEmailAdminMod').val();
    var userType = $('#txtUserTypeAdminMod').val();
    var institution = $('#txtInstitutionAdminMod').val();
  

    valide1 = validate_text_feild(firstname, "#txtFirstnameAdminMod");
    valide2 = validate_text_feild(lastname, "#txtLastnameAdminMod");
    valide3 = validate_text_feild(username, "#txtUsernameAdminMod");
    valide4 = validate_text_feild(phone, "#txtPhoneAdminMod", "phone");
    valide5 = validate_text_feild(email, "#txtEmailAdminMod", "email");
    valide6 = validate_text_feild(userType, "#txtUserTypeAdminMod");
    valide7 = validate_text_feild(institution, "#txtInstitutionAdminMod");
   

    formData = {

          "first_name": firstname,
          "last_name": lastname,
          "username": username,
          "msisdn": phone,
          "email": email,
          "user_type": userType,
          "institution_shortName": institution
      
      }


    if( valide1 && valide2 && valide3 && valide4 && valide5 && valide6 && valide7 ){
      show_loader_modal();
      $.postJSON("/users/update", formData, function(data){

        if (data.code == "00") {
          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          setTimeout(function () {
            $("#modifyadmin").modal("hide");
          }, 4000);
          filterAdmins();
          
        }

        else if(data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else{
          hide_loader_modal();
        }
      });
  }
});


/**
*Handle enter key press event for password text field
*/
$('#btnActivateAdmin').click(function(e) {
    e.preventDefault();    
    var firstname = $('#txtFirstnameAdminMod').val();
    var lastname = $('#txtLastnameAdminMod').val();
    var username = $('#txtUsernameAdminMod').val();
    var phone = $('#txtPhoneAdminMod').val();
    var email = $('#txtEmailAdminMod').val();
    var userType = $('#txtUserTypeAdminMod').val();
    var institution = $('#txtInstitutionAdminMod').val();
   

    valide1 = validate_text_feild(firstname, "#txtFirstnameAdminMod");
    valide2 = validate_text_feild(lastname, "#txtLastnameAdminMod");
    valide3 = validate_text_feild(username, "#txtUsernameAdminMod");
    valide4 = validate_text_feild(phone, "#txtPhoneAdminMod", "phone");
    valide5 = validate_text_feild(email, "#txtEmailAdminMod", "email");
    valide6 = validate_text_feild(userType, "#txtUserTypeAdminMod");
    valide7 = validate_text_feild(institution, "#txtInstitutionAdminMod");
   

    if( valide1 && valide2 && valide3 && valide4 && valide5 && valide6 && valide7 ){
      show_loader_modal();
      formData = {
          "first_name": firstname,
          "last_name": lastname,
          "username": username,
          "msisdn": phone,
          "email": email,
          "access_level_id": userType,
          "institution_shortName": institution,
          "active":"1",
      }

      $.postJSON("/users/update", formData, function(data){

        if (data.code == "00") {
          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          filterAdmins();
          $("#modifyadmin").modal("hide");
        }

        else if(data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else{
          hide_loader_modal();
        }
      });
  }
});


/**
*Handle enter key press event for password text field
*/
$('#btnDeactivateAdmin').click(function(e) {
    e.preventDefault();    
    var firstname = $('#txtFirstnameAdminMod').val();
    var lastname = $('#txtLastnameAdminMod').val();
    var username = $('#txtUsernameAdminMod').val();
    var phone = $('#txtPhoneAdminMod').val();
    var email = $('#txtEmailAdminMod').val();
    var userType = $('#txtUserTypeAdminMod').val();
    var institution = $('#txtInstitutionAdminMod').val();
  

    valide1 = validate_text_feild(firstname, "#txtFirstnameAdminMod");
    valide2 = validate_text_feild(lastname, "#txtLastnameAdminMod");
    valide3 = validate_text_feild(username, "#txtUsernameAdminMod");
    valide4 = validate_text_feild(phone, "#txtPhoneAdminMod", "phone");
    valide5 = validate_text_feild(email, "#txtEmailAdminMod", "email");
    valide6 = validate_text_feild(userType, "#txtUserTypeAdminMod");
    valide7 = validate_text_feild(institution, "#txtInstitutionAdminMod");
   

    if( valide1 && valide2 && valide3 && valide4 && valide5 && valide6 && valide7){
      show_loader_modal();
      formData = {
          "first_name": firstname,
          "last_name": lastname,
          "username": username,
          "msisdn": phone,
          "email": email,
          "access_level_id": userType,
          "institution_shortName": institution,
          "active":"0",
      }

      $.postJSON("/users/update", formData, function(data){

        if (data.code == "00") {
          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          filterAdmins();
          $("#modifyadmin").modal("hide");
        }

        else if(data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader_modal();
          filterAdmins();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else{
          hide_loader_modal();
        }
      });
  }
});


function get_admin_details(username) {
  show_loader();

  formData = {
    "username": username,
  }

  $.postJSON("/users/getadmin", formData, function(data){

        if (data.code == "00") {

          $('#txtFirstnameAdminMod').val(data.data.first_name);
          $('#txtLastnameAdminMod').val(data.data.last_name);
          $('#txtUsernameAdminMod').val(data.data.username);
          $('#txtPhoneAdminMod').val(data.data.msisdn);
          $('#txtEmailAdminMod').val(data.data.email);
          
          $(document).ready();
          if ( data.data.user_type == 2 ) {
              $("#txtUserTypeAdminMod option[value='2']").prop('selected', true);
          } else {
              $("#txtUserTypeAdminMod option[value='1']").prop('selected', true);
          }

          //$('#txtInstitutionAdminMod').val("Yooo");
          $("#txtInstitutionAdminMod option[value='"+data.data.institution_shortName+"']").prop('selected', true);
          //$("#txtInstitutionAdminMod").append("<option value='" + data.data.institution_shortName + ">" + data.data.institution_shortName + "</option>")
          //$('#txtInstitutionAdminMod').text(data.data.institution_shortName);
          $('#txtApplevelAdminMod').val(data.data.approver_level);

          hide_loader();
          $("#modifyadmin").modal("show");
        }

        else if(data.code == "01"){
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }

        else{
          hide_loader();
        }
    });
}


/**
*Handle enter key press event for password text field
*/
$('#btnAdminChangePass').click(function(e) {
    e.preventDefault();    
    var oldPassword = $('#txtOldPassword').val();
    var nePassword = $('#txtNewPassword').val();
    var newPasswordRep = $('#txtNewPasswordrep').val();

    valide1 = validate_text_feild(oldPassword, "#txtOldPassword");
    valide2 = validate_text_feild(nePassword, "#txtNewPassword");
    valide3 = validate_text_feild(newPasswordRep, "#txtNewPasswordrep");

    if( valide1 && valide2 && valide3 ){
      show_loader_modal();
      formData = {
          "oldPassword": oldPassword,
          "newPassword": nePassword,
          "newPasswordRep": newPasswordRep,
      }

      $.postJSON("/users/changepassword", formData, function(data){

        if (data.code == "00") {

          $('#txtOldPassword').val("");
          $('#txtNewPassword').val("");
          $('#txtNewPasswordrep').val("");

          hide_loader_modal();
          displaySucessMsgModal(data.msg);
        }

        else if(data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else if(data.code == "02"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        }

        else{
          hide_loader_modal();
        }
      });
  }
});


function hideRemarksField() {
  $('#txtRespsRemarks').val("");
  $('#txtRemarksblk').hide();
}

/**
*Handle enter key press event for password text field
*/
$('#btnAddCustomer').click(function(e) {
    e.preventDefault();    
    var txtCust_PhoneNumber = $('#txtCust_PhoneNumber').val();
    var txtCustomer_Network = $('#txtCustomer_Network').val();
    var txtCustomer_FirstName = $('#txtCustomer_FirstName').val().trim();
    var txtCustomer_LastName = $('#txtCustomer_LastName').val().trim();
    var txtCustomer_Profession = $('#txtCustomer_Profession').val();
    var txtCustomer_Location = $('#txtCustomer_Location').val();
    var txtCustomer_Association = $('#txtCustomer_Association').val();
    var txtCustomer_Status = $('#txtCustomer_Status').val();
    

    valide1 = validate_text_feild(txtCustomer_FirstName, "#txtCustomer_FirstName");
    valide2 = validate_text_feild(txtCustomer_LastName, "#txtCustomer_LastName");
    
    if( valide1 && valide2 ){
      show_loader_modal();
      formData = {
        "location": txtCustomer_Location,
        "first_name": txtCustomer_FirstName,
        "msisdn": txtCust_PhoneNumber,
        "network": txtCustomer_Network,
        "last_name": txtCustomer_LastName,
        "profession": txtCustomer_Profession,
        "association": txtCustomer_Association,
        "status": txtCustomer_Status
      }


      $.postJSON("/customers/add", formData, function(data){

        if (data.code == "00") {
          $('#txtCust_PhoneNumber').val("");
          $('#txtCustomer_FirstName').val("");
          $('#txtCustomer_LastName').val("");
          $('#txtCustomer_Profession').val();
          $('#txtCustomer_Location').val();
          $('#txtCustomer_Association').val();
          $('#txtCustomer_Status').val("1");

          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          // setTimeout(function() {
          //   filterDistributors();
          // }, 6000);
          $('#btnFilterCustomers').trigger('click');
          $("#addmerchant").modal("hide");
        } else if (data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        } else {
          displayErrorMsgModal("Something went wrong.");
          hide_loader_modal();
        }
      });
  }
});

/**
*Handle enter key press event for password text field
*/
$('#btnAddDealer').click(function(e) {
    e.preventDefault();    
    var txtCust_PhoneNumber = $('#txtCust_PhoneNumber').val();
    var txtCustomer_Network = $('#txtCustomer_Network').val();
    var txtCustomer_FirstName = $('#txtCustomer_FirstName').val().trim();
    var txtCustomer_LastName = $('#txtCustomer_LastName').val().trim();
    var txtCustomer_Profession = $('#txtCustomer_Profession').val();
    var txtCustomer_Location = $('#txtCustomer_Location').val();
    var txtCustomer_Association = $('#txtCustomer_Association').val();
    var txtCustomer_Status = $('#txtCustomer_Status').val();
    

    valide1 = validate_text_feild(txtCustomer_FirstName, "#txtCustomer_FirstName");
    valide2 = validate_text_feild(txtCustomer_LastName, "#txtCustomer_LastName");
    
    //Put () around the lastname(whose true value is a location in a region)
    //txtCustomer_LastName = '('+ txtCustomer_LastName +')';

    if( valide1 && valide2 ){
      show_loader_modal();
      formData = {
        "location": txtCustomer_Location,
        "first_name": txtCustomer_FirstName,
        "msisdn": txtCust_PhoneNumber,
        "network": txtCustomer_Network,
        "last_name": txtCustomer_LastName,
        "profession": txtCustomer_Profession,
        "association": txtCustomer_Association,
        "status": txtCustomer_Status
      }

      $.postJSON("/dealers/add", formData, function(data){

        if (data.code == "00") {
          $('#txtCust_PhoneNumber').val("");
          $('#txtCustomer_FirstName').val("");
          $('#txtCustomer_LastName').val("");
          $('#txtCustomer_Profession').val();
          $('#txtCustomer_Location').val();
          $('#txtCustomer_Association').val();
          $('#txtCustomer_Status').val("1");

          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          // setTimeout(function() {
          //   filterDistributors();
          // }, 6000);
          $('#btnFilterDealers').trigger('click');
          $("#addmerchant").modal("hide");
        } else if (data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        } else {
          displayErrorMsgModal("Something went wrong.");
          hide_loader_modal();
        }
      });
  }
});

$('#btnUpdateDealer').click(function(e) {
    e.preventDefault();    
    var txtCustUpdateID = $('#txtCustUpdateID').val();
    var txtCust_PhoneNumber = $('#txtCustUpdatePhoneNumber').val();
    var txtCustomer_Network = $('#txtCustomerUpdateNetwork').val();
    var txtCustomer_FirstName = $('#txtCustomerUpdateFirstName').val().trim();
    var txtCustomer_LastName = $('#txtCustomerUpdateLastName').val().trim();
    var txtCustomer_Profession = $('#txtCustomerUpdateProfession').val();
    var txtCustomer_Location = $('#txtCustomerUpdateLocation').val();
    var txtCustomer_Association = $('#txtCustomerUpdateAssociation').val();
    var txtCustomer_Status = $('#txtCustomerUpdateStatus').val();
    

    valide1 = validate_text_feild(txtCustomerUpdateFirstName, "#txtCustomerUpdateFirstName");
    valide2 = validate_text_feild(txtCustomerUpdateFirstName, "#txtCustomerUpdateLastName");
    
    if( valide1 && valide2 ){
      show_loader_modal();
      formData = {
        "id": txtCustUpdateID,
        "location": txtCustomer_Location,
        "first_name": txtCustomer_FirstName,
        "msisdn": txtCust_PhoneNumber,
        "network": txtCustomer_Network,
        "last_name": txtCustomer_LastName,
        "profession": txtCustomer_Profession,
        "association": txtCustomer_Association,
        "status": txtCustomer_Status
      }

      $.postJSON("/dealers/update", formData, function(data){

        if (data.code == "00") {
          
          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          setTimeout(function() {
            $('#btnFilterDealers').trigger('click');
            $("#modifyDealersModal").modal("hide");
          }, 2000);

          
        } else if (data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        } else {
          displayErrorMsgModal("Something went wrong.");
          hide_loader_modal();
        }
      });
  }
});

$('#btnUpdateTool').click(function(e) {
    e.preventDefault();    
    var txtToolUpdateID = $('#txtToolUpdateID').val();
    var txtToolName = $('#txtToolName').val();
    var txtToolPrice = $('#txtToolPrice').val();
    var txtCustomerUpdateProfession = $('#txtCustomerUpdateProfession').val();
    var txtToolDetails = $('#txtToolDetails').val().trim();
    var txtToolType = $('#txtToolUpdateType').val().trim();
    var txtToolUpdateStatus = $('#txtToolUpdateStatus').val();

    txtToolDetails = txtToolDetails.split("\n");

    txtToolDetails = JSON.stringify(txtToolDetails)
    
    valide1 = validate_text_feild(txtToolUpdateID, "#txtToolUpdateID");
    valide2 = validate_text_feild(txtToolName, "#txtToolName");
    valide3 = validate_text_feild(txtToolPrice, "#txtToolPrice");
    valide4 = validate_text_feild(txtToolDetails, "#txtToolDetails");
    valide5 = validate_text_feild(txtToolType, "#txtToolType");
    valide6 = validate_text_feild(txtCustomerUpdateProfession, "#txtCustomerUpdateProfession");

    if( valide1 && valide2 && valide3 && valide4 && valide5 && valide6 ){
      show_loader_modal();
      formData = {
        "tool_name": txtToolName,
        "profession": txtCustomerUpdateProfession,
        "container": txtToolDetails,
        "price": txtToolPrice,
        "id": txtToolUpdateID,
        "is_single": txtToolType,
        "status": txtToolUpdateStatus
      }


      $.postJSON("/tools/update", formData, function(data){

        if (data.code == "00") {
          
          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          setTimeout(function() {
            $('#btnFilterTool').trigger('click');
            $("#modifyToolModal").modal("hide");
          }, 2000);

          
        } else if (data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        } else {
          displayErrorMsgModal("Something went wrong.");
          hide_loader_modal();
        }
      });
  }
});

$('#btnAddTool').click(function(e) {
    e.preventDefault();    
    var txtAddToolName = $('#txtAddToolName').val();
    var txtAddToolPrice = $('#txtAddToolPrice').val();
    var txtCustomerAddProfession = $('#txtCustomerAddProfession').val();
    var txtToolDetails = $('#txtAddToolDetails').val().trim();
    var txtAddToolType = $('#txtAddToolType').val().trim();
    var txtToolAddStatus = $('#txtToolAddStatus').val();

    txtToolDetails = txtToolDetails.split("\n");

    txtToolDetails = JSON.stringify(txtToolDetails)
    
    valide2 = validate_text_feild(txtAddToolName, "#txtAddToolName");
    valide3 = validate_text_feild(txtAddToolPrice, "#txtAddToolPrice");
    valide4 = validate_text_feild(txtToolDetails, "#txtToolDetails");
    valide5 = validate_text_feild(txtAddToolType, "#txtAddToolType");
    valide6 = validate_text_feild(txtCustomerAddProfession, "#txtCustomerAddProfession");

    if( valide2 && valide3 && valide4 && valide5 && valide6 ){
      show_loader_modal();
      formData = {
        "tool_name": txtAddToolName,
        "profession": txtCustomerAddProfession,
        "container": txtToolDetails,
        "price": txtAddToolPrice,
        "is_single": txtAddToolType,
        "status": txtToolAddStatus
      }

      $.postJSON("/tools/add", formData, function(data){

        if (data.code == "00") {
          $('#txtAddToolName').val("");
          $('#txtAddToolPrice').val("");
          $('#txtCustomerAddProfession').val("");
          $('#txtAddToolDetails').val("");
          $('#txtAddToolType').val("");
          $('#txtToolAddStatus').val("");

          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          setTimeout(function() {
            $('#btnFilterTool').trigger('click');
            $("#addmerchant").modal("hide");
          }, 2000);

          
        } else if (data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        } else {
          displayErrorMsgModal("Something went wrong.");
          hide_loader_modal();
        }
      });
  }
});

$('#btnUpdateCustomer').click(function(e) {
    e.preventDefault();    
    var txtCustUpdateID = $('#txtCustUpdateID').val();
    var txtCust_PhoneNumber = $('#txtCustUpdatePhoneNumber').val();
    var txtCustomer_Network = $('#txtCustomerUpdateNetwork').val();
    var txtCustomer_FirstName = $('#txtCustomerUpdateFirstName').val().trim();
    var txtCustomer_LastName = $('#txtCustomerUpdateLastName').val().trim();
    var txtCustomer_Profession = $('#txtCustomerUpdateProfession').val();
    var txtCustomer_Location = $('#txtCustomerUpdateLocation').val();
    var txtCustomer_Association = $('#txtCustomerUpdateAssociation').val();
    var txtCustomer_Status = $('#txtCustomerUpdateStatus').val();
    

    valide1 = validate_text_feild(txtCustomerUpdateFirstName, "#txtCustomerUpdateFirstName");
    valide2 = validate_text_feild(txtCustomerUpdateFirstName, "#txtCustomerUpdateLastName");
    
    if( valide1 && valide2 ){
      show_loader_modal();
      formData = {
        "id": txtCustUpdateID,
        "location": txtCustomer_Location,
        "first_name": txtCustomer_FirstName,
        "msisdn": txtCust_PhoneNumber,
        "network": txtCustomer_Network,
        "last_name": txtCustomer_LastName,
        "profession": txtCustomer_Profession,
        "association": txtCustomer_Association,
        "status": txtCustomer_Status
      }

      $.postJSON("/artisans/update", formData, function(data){
        
        if (data.code == "00") {
          
          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          setTimeout(function() {
            $('#btnFilterCustomers').trigger('click');
            $("#modifyDealersModal").modal("hide");
          }, 2000);
          
        } else if (data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        } else {
          displayErrorMsgModal("Something went wrong.");
          hide_loader_modal();
        }
      });
  }
});

$('#btnUpdateDealer').click(function(e) {
    e.preventDefault();    
    var txtCustUpdateID = $('#txtCustUpdateID').val();
    var txtCust_PhoneNumber = $('#txtCustUpdatePhoneNumber').val();
    var txtCustomer_Network = $('#txtCustomerUpdateNetwork').val();
    var txtCustomer_FirstName = $('#txtCustomerUpdateFirstName').val().trim();
    var txtCustomer_LastName = $('#txtCustomerUpdateLastName').val().trim();
    var txtCustomer_Profession = $('#txtCustomerUpdateProfession').val();
    var txtCustomer_Location = $('#txtCustomerUpdateLocation').val();
    var txtCustomer_Association = $('#txtCustomerUpdateAssociation').val();
    var txtCustomer_Status = $('#txtCustomerUpdateStatus').val();
    

    valide1 = validate_text_feild(txtCustomerUpdateFirstName, "#txtCustomerUpdateFirstName");
    valide2 = validate_text_feild(txtCustomerUpdateFirstName, "#txtCustomerUpdateLastName");
    
    if( valide1 && valide2 ){
      show_loader_modal();
      formData = {
        "id": txtCustUpdateID,
        "location": txtCustomer_Location,
        "first_name": txtCustomer_FirstName,
        "msisdn": txtCust_PhoneNumber,
        "network": txtCustomer_Network,
        "last_name": txtCustomer_LastName,
        "profession": txtCustomer_Profession,
        "association": txtCustomer_Association,
        "status": txtCustomer_Status
      }

      $.postJSON("/dealers/update", formData, function(data){

        if (data.code == "00") {
          
          hide_loader_modal();
          displaySucessMsgModal(data.msg);
          setTimeout(function() {
            $('#btnFilterDealers').trigger('click');
            $("#modifyDealersModal").modal("hide");
          }, 2000);
          
        } else if (data.code == "01"){
          hide_loader_modal();
          displayErrorMsgModal(data.msg); //display Error message
        } else {
          displayErrorMsgModal("Something went wrong.");
          hide_loader_modal();
        }
      });
  }
});

function generateToken(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxX6xxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

$('#txtLanguage').on('change', function() {

  langua = $("#txtLanguage").val();
    var formData = {
        'language': langua,
    };

    show_loader();

    $.postJSON("/users/language", formData, function(data){

        if (data.code == "00") {
          hide_loader();
          window.location.reload();
        }
        else{
          hide_loader();
          displayErrorMsg(data.msg); //display Error message
        }
      });

});


function getInstProfile() {
  var formData = {};

    //show_loader();

    $.postJSON("/users/inst_details/", formData, function(data){

        if (data.code == "00") {
          //hide_loader();
          load_pending_topup_table(data.data, "minus");

          $("#inst_balance").html("GH&#x20b5; "+ data.data['institution_data']['balance']);
        }

        else{
          hide_loader();
          //1displayErrorMsg(data.msg); //display Error message
        }
      });
}

function validate_text_feild(value, element, inputType){

  var regemail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  var regname = /^[a-zA-Z]+([\s\-]?[a-zA-Z])*$/;
  var regphone = /^233+\d{9}$/;
  var regph = /^0+\d{9}$/;
  var regnumeric = /^([0-9])+$/;
  var regalphanumeric = /^([0-9]|[a-zA-Z])+([0-9a-zA-Z]+)$/

  if (inputType == 'name'){
    res = regname.test(value);
  }
  else if (inputType == 'phone'){
    res = regphone.test(value) || regph.test(value);
  }
  else if (inputType == 'email'){
    res = regemail.test(value);
  }
  else if (inputType == 'alphanumeric'){
    res = regalphanumeric.test(value);
  }
  else if (inputType == 'number'){
    res = regnumeric.test(value);
  }
  else{
    res = true;
  }

  if((value == "" || value == undefined) || res == false){
    //if(!$(element).hasClass("has-error")){
        // $(element).removeClass("has-success");
        // $(element).toggleClass("has-error");
      //}
      if (inputType == 'empty'){
        return true;
      }

      $(element).removeAttr("border-bottom");
      $(element).removeAttr("box-shadow");
      $(element).css("border-bottom", "1px solid #FF0000");
      $(element).css("box-shadow", "0 1px 0 0 #FF0000");
      return false;
    }else{
      //if(!$(element).parent().hasClass("has-success")){
        // $(element).parent().removeClass("has-error");
        // $(element).parent().toggleClass("has-success");
      //}
      $(element).removeAttr("border-bottom");
      $(element).removeAttr("box-shadow");
      $(element).css("border-bottom", "1px solid #00E700");
      $(element).css("box-shadow", "0 1px 0 0 #00E700");
      return true;
    }
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


/**
*Show Loader Functions
*/
function show_loader(msg){
    if (msg == '' || msg == undefined){
      msg="Loading...";
    }
    $(".loader").html('<div align="center" style="margin:0 auto; margin-top:30px;" class="text-center">'+
                    '<div class="-spinner-ring -error-"></div>'+
                    '<h5>'+msg+'</h5>'+
                    '</div>')
    $(".loader").show("fast");
}
/**
*Hide Loader Functions
*/
function hide_loader(){
    $(".loader").html("");
    $(".loader").hide("fast");
}


/**
*Show Loader Functions
*/
function show_loader_modal(msg){
    if (msg == '' || msg == undefined){
      msg="";
    }
    $(".loader_modal").html('<div align="center" style="margin:0 auto; margin-top:30px;" class="text-center">'+
                    '<div class="-spinner-ring -error-"></div>'+
                    '<h5>'+msg+'</h5>'+
                    '</div>')
    $(".loader_modal").show("fast");
}
/**
*Hide Loader Functions
*/
function hide_loader_modal(){
    $(".loader_modal").html("");
    $(".loader_modal").hide("fast");
}


function onAjaxloginError(xhr, status, error){

    displayLoginErrorMsg(error);
}

function onAjaxError(xhr, status, error){
    hide_loader();
    displayErrorMsg(error);
}

function onAjaxNotification(xhr, status, error){

    displayErrorMsg(error);
}

function displaySucessMsg(msg){
  //hide loader
  //hide_loader();

  $(".msgAlertPlaceHolder").html("<div class='alert alert-success alert-dismissable fadeIn'><p class='text-left'>"+
        msg+"</p></div>");
  setTimeout(function() {
        $(".msgAlertPlaceHolder").html('');
    }, 5000);
}

function displayErrorMsg(msg){
  //hide loader
  //hide_loader();

    $(".msgAlertPlaceHolder").html("<div class='alert alert-danger alert-dismissable fade in'><p class='text-center' style='color:black'>"+
        msg+"</p></div>");
    setTimeout(function() {
        $(".msgAlertPlaceHolder").html('');
    }, 7000);
}

function displayNotificationMsg(msg){
  //hide loader
  //hide_loader();

    $(".msgAlertPlaceHolder").html("<div class='alert alert-info alert-dismissable fade in'><p class='text-left'>"+
        msg+"</p></div>");
    setTimeout(function() {
        $(".msgAlertPlaceHolder").html('');
    }, 5000);
}

function displayErrorMsgModal(msg){
    //hide loader
    //hide_loader();

    $(".modalAlertPlaceHolder").html("<div class='alert alert-danger alert-dismissable fade in'><p class='text-left'>"+
        msg+"</p></div>");
    setTimeout(function() {
        $(".modalAlertPlaceHolder").html('');
    }, 5000);
}

function displaySucessMsgModal(msg){
    //hide loader
    //hide_loader();

    $(".modalAlertPlaceHolder").html("<div class='alert alert-success alert-dismissable fade in'><p class='text-left'>"+
        msg+"</p></div>");
    setTimeout(function() {
        $(".modalAlertPlaceHolder").html('');
    }, 5000);
}

function displayNotificationMsgModal(msg){
    //hide loader
    // hide_loader();

    $(".modalAlertPlaceHolder").html("<div class='alert alert-info alert-dismissable fade in'><p class='text-left'>"+
        msg+"</p></div>");
    setTimeout(function() {
        $(".modalAlertPlaceHolder").html('');
    }, 5000);
}
