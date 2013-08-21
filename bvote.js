var bvote_can_vote = 1;
function bvote(postid, value){
  if(isNaN(postid) || isNaN(value) || bvote_can_vote !== 1){
    return;
  }
  if(document.cookie.indexOf('bvote_' + postid) >= 0){
    return;
  }
  bvote_can_vote = 0;
  var url = _bvote.url + "?action=bvote&id=" + postid + '&value=' + value + '&t=' + new Date().getTime();
  jQuery.get(url, function(data){
    jQuery('.bvote-value-' + postid).html(parseInt(jQuery('.bvote-value-' + postid).data('value'), 10) + value);
    bvote_can_vote = 1;
  });
}
jQuery(document).ready(function(){
  jQuery('.bvote-up').on('click', function(e){
    e.preventDefault();
    bvote(jQuery(this).data('postid'), 1);
  });
  jQuery('.bvote-down').on('click', function(e){
    e.preventDefault();
    bvote(jQuery(this).data('postid'), -1);
  });
});
