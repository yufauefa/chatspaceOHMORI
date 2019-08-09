$(function(){
  function buildMessage(message){
    var MessageImage = (message.image) ? message.image : '';
    var html = `<div class="message">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.user_name}
    </div>
    <div class="upper-message__date">
    ${message.created_at}
    </div>
    </div>
    <div class="lower-message">
    <p class="lower-message__content">
    ${message.content}
    </p>
    <img class="lower-message__image" src="${MessageImage}">
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
      $('.form__submit').removeAttr('disabled');
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},);
    })
    .fail(function(){
      alert('error');
    });
  });

  var reloadMessages = function() {
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data('id');
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML=buildMessageHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},);
      })
    })
    .fail(function() {
      console.log('エラー');
    });
    }
  };

  var buildMessageHTML = function(message) {
      var messageBody = message.content ? message.content : '';
      var messageImage = massage.image ? `<img src="${message.image}" class="lower-message__image">` : '';
      //data-idが反映されるようにしている
      var html = `<div class="message" data-id=  ${message.id}  > 
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name} 
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div> 
        </div> 
        <div class="lower-message">
          <p class="lower-message__content"> 
            ${messageBody} 
          </p> 
            ${messageImage} 
        </div>
        </div>`
      return html;
  };
  setInterval(reloadMessages, 5000);
});
