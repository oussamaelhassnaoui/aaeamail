var interval = null;
var EmailReadStatus = 0;
var timeLeft = refreshTime;
var countdownTimer;
$(window).on('load', function() {
	CurrentEmail();
	InboxListener();
    $( "#click-to-Change" ).click(function() {
		timeStop();
		ButtonDisable();
        newEmail();
		InboxListener();
    });
    $( "#click-to-Delete" ).click(function() {
		timeStop();
        DeleteEmail();
    });
    $( "#click-to-refresh" ).click(function() {
        if(btnstatus == 1){
            timeStop();
            InboxListener();
            ButtonDisable();
        }
    });
    $( "#click-to-refresh2" ).click(function() {
        if(btnstatus == 1){
            timeStop();
            InboxListener();
            ButtonDisable();
        }
    });
});
function timeStop(){
	clearInterval(countdownTimer);
	clearInterval(interval);
	timeLeft = refreshTime;
    document.getElementById("countdown-number").innerHTML = String( timeLeft );
	//document.getElementById("refreshTimeText").innerHTML = '<span class="icon-control control-timer"></span> '+String( timeLeft );
}
var btnstatus = 1;
function ButtonDisable(){
    btnstatus = 0;
    /*
    $('#click-to-copy').prop('disabled', true);
    $('#click-to-refresh').prop('disabled', true);
    $('#click-to-Change').prop('disabled', true);
    $('#click-to-Delete').prop('disabled', true);

     */
}
function ButtonEnable(){
    btnstatus = 1;
    /*
    $('#click-to-copy').prop('disabled', false);
    $('#click-to-refresh').prop('disabled', false);
    $('#click-to-Change').prop('disabled', false);
    $('#click-to-Delete').prop('disabled', false);

     */
}

function CurrentEmail(){
	timeStop();
    $.ajax({
        url: '/Email/',
        type: 'POST',
        data: "",
        success: function (resp) {
            if(resp.Email){

                $('#current-mail').html(resp.Email);
               // $('#recoveryCode').val(resp.Recovery);
            }else{
                newEmail();
            }
        },
        error: function (err) {
        }
    });
}

function countdown() {
	timeLeft--;
	document.getElementById("countdown-number").innerHTML = String( timeLeft );
    //if(timeLeft == 10){ reset_animation(); }
	if (timeLeft > 0) {
		countdownTimer = setTimeout(countdown, 1000);
	}else{
		InboxListener();
	}
};

function newEmail(){
	timeStop();
    $('#mail').val("");
    $('#recoveryCode').val("");
    ButtonDisable();
    $.ajax({
        url: '/Email/newEmail',
        type: 'POST',
        data: "",
        success: function (resp) {
            if(resp.Email){
                $('#current-mail').html(resp.Email);
               // $('#recoveryCode').val(resp.Recovery);
                
            }
        },
        error: function (err) {
        }
    });
}
function DeleteEmail(){
	timeStop();
    $('#mail').val("");
    $('#recoveryCode').val("");
    ButtonDisable();
    $.ajax({
        url: '/Email/delete',
        type: 'POST',
        data: "",
        success: function (resp) {
            if(resp.Email){
                $('#current-mail').html(resp.Email);
               // $('#recoveryCode').val(resp.Recovery);
                ButtonEnable();
				
            }
        },
        error: function (err) {
        }
    });
}
function InboxListener(){
	timeStop();
		
    if(EmailReadStatus == 0) {
		
        $.ajax({
            url: '/Email/inbox',
            type: 'POST',
            data: "",
            success: function (resp) {
                var DivValue = '';
                if (resp.length > 0) {
                    $('.mail-empty').addClass('d-none');
                    $('#inbox-dataList').removeClass('d-none');

                } else {
                    $('.mail-empty').removeClass('d-none');
                    $('#inbox-dataList').addClass('d-none');
                }
                for (var i = 0; i < resp.length; i++) {

                    DivValue += '<a href="javascript:EmailRead(\'' + resp[i].uid + '\');" class="mail not-read">\n' +
                        '    <span class="icon"><i class="fa fa-envelope"></i></span>\n' +
                        '    <div class="mail-details">\n' +
                        '        <div class="mail-head">\n' +
                        '            <div class="sender">' + resp[i].fromName + '</div>\n' +
                        '            <div class="info">\n' +
                        '                ' + resp[i].date + '  (<span>' + resp[i].fromEmail + '</span>)\n' +
                        '            </div>\n' +
                        '        </div>\n' +
                        '        <div class="mail-excerpt">\n' +
                        '            <span>' + resp[i].subject + '</span> ' + resp[i].bodyshort  +
                        '        </div>\n' +
                        '    </div>\n' +
                        '</a>';

                }
                $('#inbox-dataList').html(DivValue);
				ButtonEnable();
				countdown();
                reset_animation();

            },
            error: function (err) {
            }
        });
    }
}
function EmailRead(uid){
    if(uid){
        ButtonDisable();
        EmailReadStatus = 1;
        $('.maillist').addClass('hide');
        $('.onemail').removeClass('hide');
        timeStop();
        $.ajax({
            url: '/Email/EmailRead',
            type: 'POST',
            data: "UID="+uid,
            success: function (resp) {
                $('#ReadName').html(resp.fromName);
                $('#ReadEmail').html(resp.fromEmail);
                $('#ReadDate').html(resp.date);
                $('#ReadSubject').html(resp.subject);
                $('#ReadContent').html(resp.bodyHtml);
                $("main#main.home div#hero-placeholder div#mail-area div.mail-container").addClass("mail-container-view");
                $("main#main.home div#hero-placeholder div#mail-area div.mail-container div.mail-views div.view-box").eq(0).addClass("active");

                /*
                $('#ReadName').html(resp.fromName);
                $('#ReadFirstLatters').html(resp.NameFirst);
                $('#ReadEmail').html(resp.fromEmail);
                $('#ReadDate').html(resp.date);
                $('#ReadSubject').html(resp.subject);
                $('#ReadContent').html(resp.body);

                 */
            },
            error: function (err) {
            }
        });
    }
}
function ReturnInbox(){
    EmailReadStatus = 0;
    ButtonEnable();
    $('.maillist').removeClass('hide');
    $('.onemail').addClass('hide');
    interval = setInterval(InboxListener,refreshTime*1000);
	timeLeft = refreshTime;
	countdown();
    reset_animation();
}
function CopyInput(InputID) {
    var copyText = document.getElementById(InputID);
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");
}
function CopyHiddenInput(InputID) {
	var copyText = document.getElementById(InputID);
	copyText.type = 'text';
	copyText.select();
	document.execCommand("copy");
	copyText.type = 'hidden';
	swal(
	  CopyTitle,
	  CopyText.replace(':RecoveryCode',copyText.value),
	  'success'
	);

}
function RecoveryEmail(){
    swal({
        text: SweetAlertText,
        content: "input",
        button: {
            text: SweetAlertBtnText,
            closeModal: false,
        },
    }).then(name => {
        if (!name) throw null;
        return fetch(`/Email/recovery/${name}`);
    })
    .then(results => {
        return results.json();
    })
    .then(json => {
        swal.stopLoading();
        if(json.Email){
            swal.close();
            window.location = BaseUrl;
        }
    })

}