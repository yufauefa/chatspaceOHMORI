$(function() {

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" id="tsuika" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  }

  function appendErrMsgToHTML(msg){
    var html =`<div class="chat-group-user clearfix">
                <p> ${msg} </p>
              </div>`
    $('#user-search-result').append(html);
  }


  $('#user-search-field').on('keyup', function(){
    $('#user-search-result').empty();
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      if (users.length !== 0){
      users.forEach(function(user){
        var html = appendUser(user);
        $('#user-search-result').append(html);
      });
     }
     else {
       appendErrMsgToHTML("一致する情報はありません");
     }
    })
    .fail(function(){
      alert('error');
    })
  });

  // $('#user-search-field').on('keyup', function(){
  //   if (users !== 0 ){
  //     search(users);
  //   }
  //   else{
  //   function(){
  //     alert('error');
  //   }
  // });

  function appendUserName(name, id){
    var html =`<div class='chat-group-user'>
    <input name='group[user_ids][]' type='hidden' value='${id}'>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>`
    return html;
  }



  $('#user-search-result').on('click', '.user-search-add', function(){
    var name = $(this).attr('data-user-name');
    var id = $(this).attr('.data-user-id');
    $(this).parent().remove();
    var html = appendUserName(name, id);
    $('#group_member_add').append(html);
  });





});

