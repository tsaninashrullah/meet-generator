let apiObj = null
function bindEvent() {
  $("#btnHangup").on('click', function () {
    apiObj.executeCommand('hangup');
    $("#meet-frame").hide()
    $("#meet-final").show()
  });
  $("#btnCustomMic").on('click', function () {
    apiObj.executeCommand('toggleAudio');
  });
  $("#btnCustomCamera").on('click', function () {
    apiObj.executeCommand('toggleVideo');
  });
}

function startMeeting() {
  if ($("[name='name']").val() != '') {
    $("#meet-frame-video").html('')
    $("#meet-frame iframe").remove()
    $("#meet-start").hide()
    $("#meet-frame").show()
    const domain = 'meet.jit.si';
  
    var roomName = roomCode;
  
    const options = {
      roomName: roomName,
      width: '100%',
      height: '100%',
      parentNode: document.querySelector('#meet-frame'),
      userInfo: {
        displayName: $("[name='name']").val()
      },
      configOverwrite: {
        doNotStoreRoom: true,
        startVideoMuted: 0,
        startWithVideoMuted: true,
        startWithAudioMuted: true,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        disableRemoteMute: true,
        remoteVideoMenu: {
          disableKick: true
        },
      },
      interfaceConfigOverwrite: {
        filmStripOnly: false,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_REMOTE_DISPLAY_NAME: 'New User',
        TOOLBAR_BUTTONS: []
      },
      onload: function () {
        //alert('loaded');
        $('#toolbox').show();
      }
    };
    apiObj = new JitsiMeetExternalAPI(domain, options);
  
    apiObj.addEventListeners({
      readyToClose: function () {
      },
      audioMuteStatusChanged: function (data) {
        if (data.muted)
          $("#btnCustomMic").text('Unmute');
        else
          $("#btnCustomMic").text('Mute');
      },
      videoMuteStatusChanged: function (data) {
        if (data.muted)
          $("#btnCustomCamera").text('Start Cam');
        else
          $("#btnCustomCamera").text('Stop Cam');
      },
      tileViewChanged: function (data) {
  
      },
      screenSharingStatusChanged: function (data) {
        if (data.on)
          $("#btnScreenShareCustom").text('Stop SS');
        else
          $("#btnScreenShareCustom").text('Start SS');
      },
      participantJoined: function (data) {
        console.log('participantJoined', data);
      },
      participantLeft: function (data) {
        console.log('participantLeft', data);
      }
    });
  
    apiObj.executeCommand('subject', roomCode);
  }
}

$("#start-btn").bind('click', () => {
  if ($("[name='name']").val() != '') {
    startMeeting()
  } else {
    swal('Failed', 'Please fill the name', 'error')
  }
})

$("#rejoin-btn").bind('click', () => {
  $("#start-btn").trigger('click')
  $("#meet-frame").show()
  $("#meet-final").hide()
})

$(() => {
  bindEvent()
})