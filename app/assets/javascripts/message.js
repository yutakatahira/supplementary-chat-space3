$(function(){
  function buildHTML(message) {
    var image_html = (message.image) ? `<img src=${message.image} width="256" height="256">` : "";

    var html = `<div class="message-content" data-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.name }
                      </div>
                    <div class="upper-message__date">
                      ${ message.created_at }
                      </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.text }
                    </p>
                  ${ image_html }
                  </div>
                </div>`
    return html;
  };

  function buildSidebarHTML(message) {
    var text_html = (message.image) ? `<div class="group__name">${ message.group_name }</div><div class="group__message">画像が投稿されました</div>` : `<div class="group__name">${ message.group_name }</div><div class="group__message">${ message.text }</div>`;
    $(`#${ message.group_id }`).html(text_html);
  }

  function NoMessage() {
    var html = `<div class="flash flash__alert">
                  メッセージが送信できませんでした。
                </div>`
    $(".flash").append(html);
  }

  function SentMessage() {
      var html = `<div class="flash flash__notice">
                    メッセージが送信されました。
                  </div>`
      $(".flash").append(html);
  }


  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr("action");

    $(".flash").children().remove();

    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })


    .done(function(data){
      var html = buildHTML(data);
      if (data.text == undefined && data.image == undefined) {
        NoMessage()
      } else {
        $(".message").append(html);
        buildSidebarHTML(data);
        SentMessage(data);
        $(".new_message")[0].reset();
        $(".messages").animate({scrollTop: $(".message")[0].scrollHeight}, 1500);
      }
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
    .always(function(){
      $(".form__submit").prop('disabled', false);
    })
  });
  $(function() {
    var interval = setInterval(update, 20000);

    function update() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        var message_id = $(".message-content:last").data("id") || 0;
        $.ajax({
          url: location.href,
          type: "GET",
          data: { id: message_id },
          dataType: 'json'
        })

        .done(function(messages) {
          var insertHTML = '';
            messages.forEach(function(message) {
              insertHTML += buildHTML(message);
              $(".message").append(insertHTML);
              buildSidebarHTML(message);
              $(".messages").animate({scrollTop: $(".message")[0].scrollHeight}, 1500);
          });
        })
        .fail(function() {
          alert("更新に失敗しました");
        })
      } else {
        clearInterval(interval);
      }
    }
  });
});
