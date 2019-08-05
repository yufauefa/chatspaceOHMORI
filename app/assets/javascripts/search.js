$(function() {

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('.edit_group').append(html);
  }




  $('#user-search-field').on('keydown', function(){
    var input = $('#user-search-field').val();
    var reg = new RegExp("^" + input );
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      users.forEach(function(user){
        appendUser(user);
      });
    })
    .fail(function(){
      alert('error');
    })
  });
});

