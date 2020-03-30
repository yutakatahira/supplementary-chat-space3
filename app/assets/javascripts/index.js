$(function() {

  var array = []

  function appendAddUser(user) {
    var html = `<div class="chat-group-user clearfix" id="js-chat-member">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}"data-user-name="${user.name}">追加</a>
                </div>`
    return html
  }


  function addButton(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-8'>
            <input name='group[user_id][]' type='hidden' value=${user_id} id="chat-group-user--hidden">
            <p class='chat-group-user__name'>${user_name}</p>
            <a class='user-search-remove chat-group-user__btn js-remove-btn'>削除</a>
          </div>`
    return html
  }

  function addUserArray() {
    $(".chat-group-user__name").each(function() {
      var user_name = $(this).text();
      array.push(user_name);
    })
  }

  function removeUserArray() {
    var removeArray = []
    $(".chat-group-user__name").each(function() {
      var user_name = $(this).text();
      removeArray.push(user_name);
    })
    array = removeArray
  }

  addUserArray()

  $("#user-saerch-field").on("keyup", function(e) {
    e.preventDefault();
    $("#user-search-result").empty();
    var input = $(this).val();


    if (input.length == 0) {

    } else {

    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input, name: array },
      dataType: 'json'
    })

    .done(function(date) {
      data.forEach(function(user) {
        var html = appendAddUser(user);
        $("#user-search-result").append(html);
      });
    })
    .fail(function() {
      alert("一致するユーザーはいません");
    })
  }
});

  $("#user-search-result").on('click', '.user-search-add', function(){
    var user_id = $(this).attr("user-id");
    var user_name = $(this).attr("data-user-name");
    var html = addButton(user_id, user_name);
    $("#chat-group-users").append(html);
    array.push(user_name);
    $(this).parent().remove();
  })

  $("#chat-group-users").on('click', '.chat-group-user__btn--remove', function(){
    $(this).remove();
    removeUserArray()
  })
});
