$(function(){
  function buildMessage(message){
    var MessageImage = (message.image) ? message.image : ''
    var html = `<div class="message">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.user_name}
    </div>
    <div class="upper-message__date">
    ${message.date}
    </div>
    </div>
    <div class="lower-message">
    <p class="lower-message__content">
    ${message.content}
    </p>
    <img class="lower-message__image" src=${MessageImage}>
    </div>
    </div>`
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('#message_content').val('')
      $('.form__submit').removeAttr('disabled');
      $('.messages').animate({ scrollTop: $('#message')[0].scrollHeight},sokudo);
    })
    .fail(function(){
      alert('error');
    });
  });
});