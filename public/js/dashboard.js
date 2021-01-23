$("#schedule-btn").bind('click', () => {
  $("#schedule-modal-form").modal({
    backdrop: 'static',
    keyboard: false,
  })
})

$("#instant-btn").bind('click', () => {
  $.ajax({
    url: '/dashboard/instant-meeting',
    method: 'POST',
    data: {
      _csrf: $("[name='_csrf']").val(),
    },
    success: (res) => {
      table.draw()
      swal("Instant meeting was created", `Room Code : ${res.schedule}`, {
        buttons: {
          catch: {
            text: "Copy Link",
            value: "copy",
          },
          copy: {
            text: "Join the e-meet",
            value: "join",
          },
        },
      })
        .then((value) => {
          var url = `${[location.protocol, '//', location.host].join('')}/join/${res.schedule}`;
          switch (value) {
            case "copy":
              copyToClipboard(url)
              break;

            case "join":
              window.open(url, '_blank');
              break;
          }
        })
    }
  })
})

$(function () {
  $('#start-datepicker').datetimepicker({
    format: 'YYYY-MM-DD HH:mm',
    minDate: moment()
  });
  $('#end-datepicker').datetimepicker({
    format: 'YYYY-MM-DD HH:mm',
    useCurrent: false
  });
  $("#start-datepicker").on("dp.change", function (e) {
    $('#end-datepicker').data("DateTimePicker").minDate(e.date);
    const elementParent = $(e.currentTarget).parents('.form-group')
    elementParent.removeClass('has-error')
    elementParent.find('p.help-block').remove()
  });
  $("#end-datepicker").on("dp.change", function (e) {
    $('#start-datepicker').data("DateTimePicker").maxDate(e.date);
    const elementParent = $(e.currentTarget).parents('.form-group')
    elementParent.removeClass('has-error')
    elementParent.find('p.help-block').remove()
  });
});
$(document).on('change', 'input,select,textarea', ({ currentTarget }) => {
  if ($(currentTarget).val() != '') {
    const elementParent = $(currentTarget).parents('.form-group')
    elementParent.removeClass('has-error')
    elementParent.find('p.help-block').remove()
  }
})
$("#submit-btn").bind('click', () => {
  $.ajax({
    url: $("#schedule-form").prop('action'),
    method: 'POST',
    data: {
      _csrf: $("[name='_csrf']").val(),
      start_date: $("[name='start_date']").val(),
      end_date: $("[name='end_date']").val(),
      description: $("[name='description']").val(),
    },
    success: () => {
      swal({
        title: "Success!",
        text: "Meeting was scheduled!",
        icon: "success",
        buttons: false,
        timer: 2000,
      })
      $("#schedule-modal-form").modal('hide')
      table.draw()
    },
    error: ({ responseJSON }) => {
      var errorMessageAdditional = ''
      if (typeof responseJSON != 'undefined' && typeof responseJSON.errors != "undefined") {
        errorMessageAdditional = ', please check the form!'
        responseJSON.errors.map((errorItem) => {
          var elementParent = $(`[name='${errorItem.field}']`).parents('.form-group')
          elementParent.append(`<p class="help-block">${errorItem.message}</p>`)
          elementParent.addClass('has-error')
        })
      }
      swal({
        title: "Whoops!",
        text: `Something went wrong${errorMessageAdditional}`,
        icon: "error",
        buttons: false,
        timer: 2000,
      })
    }
  })
})

const table = $("#table-room").DataTable({
  processing: true,
  serverSide: true,
  ajax: '/dashboard/datatable',
  autoWidth: false,
  aaSorting: [],
  columns: [
    {
      data: "id",
      orderable: false,
      render: (data) => {
        return `<a target="__blank" href="${[location.protocol, '//', location.host].join('')}/join/${data}">${data}</a>`;
      }
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
      data: null,
      searchable: false,
      orderable: false,
      className: 'text-center',
      render: (data) => {
        return `<button class="btn btn-xs btn-primary btn-copy" type="button" data-room="${data.id}"><i class="fa fa-clipboard"></i></button>`
      }
    }
  ],
})


function copyToClipboard(text) {
  var tempInput = $("<input>");
  $("body").append(tempInput);
  tempInput.val(text).select();
  document.execCommand("copy");
  tempInput.remove();
}
$(document).on('click', '.btn-copy', ({ currentTarget }) => {
  var url = `${[location.protocol, '//', location.host].join('')}/join/${$(currentTarget).data('room')}`;
  copyToClipboard(url)
  swal({
    title: "Url was copied!",
    icon: "success",
    buttons: false,
    timer: 2000,
  })
})