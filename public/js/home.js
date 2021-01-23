
let roomId = null
$("#search-btn").bind('click', () => {
  $(".detail-room").hide()
  if ($("[name='roomCode']").val() != '') {
    $.ajax({
      url: '/search',
      data: {
        roomCode: $("[name='roomCode']").val()
      },
      success: ({ data }) => {
        if (data != null) {
          $("[name='roomCode']").val('')
          $(".detail-room").show()
          $(".landing-page").hide()
          $('.room-name').html(`Room Code :<br />${data.id}`)
          const startDate = moment(data.start_date)
          const endDate = moment(data.end_date)
          $('.start-date').text(`Start Date : ${startDate.format('DD-MMMM-YYYY HH:mm')}`)
          $('.end-date').text(`End Date : ${endDate.format('DD-MMMM-YYYY HH:mm')}`)
          $('.description').text(`Description : ${data.description != null ? data.description : ''}`)
          if (moment() > startDate && moment() < endDate) {
            $("#join-btn").show()
          } else {
            $("#join-btn").hide()
          }
          roomId = data.id
        } else {
          swal('Room not found.')
        }
      }
    })
  } else {
    swal('Please fill the room code')
  }
})
$("#back-btn").bind('click', () => {
  $('.detail-room').hide()
  $('.landing-page').show()
})
$("#join-btn").bind('click', () => {
  if (roomId != null) {
    window.location.replace(`${[location.protocol, '//', location.host].join('')}/join/${roomId}`)
  }
})


const table = $("#table-room").DataTable({
  processing: true,
  serverSide: true,
  ajax: '/datatable',
  autoWidth: false,
  aaSorting: [],
  columns: [
    {
      data: "id",
      className: 'desktop-only',
      orderable: false
    },
    {
      data: "start_date",
      searchable: false,
      orderable: false,
      render: (data) => {
        return moment(data).format('DD-MMMM-YYYY HH:mm')
      }
    },
    {
      data: "end_date",
      searchable: false,
      orderable: false,
      render: (data) => {
        return moment(data).format('DD-MMMM-YYYY HH:mm')
      }
    },
    {
      data: "user.full_name",
      searchable: false,
      orderable: false
    },
    {
      data: "description",
      className: 'desktop-only',
      searchable: false,
      orderable: false
    },
    {
      data: null,
      searchable: false,
      orderable: false,
      className: 'text-center',
      render: (data) => {
        var startDate = moment(data.start_date)
        var endDate = moment(data.end_date)
        return moment() > startDate && moment() < endDate ? `<a href="/join/${data.id}" class="btn btn-xs btn-primary btn-copy"><i class="fa fa-sign-in"></i> Join</a>` : ''
      }
    }
  ],
})