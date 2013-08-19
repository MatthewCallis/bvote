/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function(jQuery){

  var pluses = /\+/g;

  function raw(s) {
    return s;
  }

  function decoded(s) {
    return decodeURIComponent(s.replace(pluses, ' '));
  }

  function converted(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    try {
      return config.json ? JSON.parse(s) : s;
    } catch(er) {}
  }

  var config = jQuery.cookie = function (key, value, options) {

    // write
    if (value !== undefined) {
      options = jQuery.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }

      value = config.json ? JSON.stringify(value) : String(value);

      return (document.cookie = [
        config.raw ? key : encodeURIComponent(key),
        '=',
        config.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // read
    var decode = config.raw ? raw : decoded;
    var cookies = document.cookie.split('; ');
    var result = key ? undefined : {};
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = decode(parts.join('='));

      if (key && key === name) {
        result = converted(cookie);
        break;
      }

      if (!key) {
        result[name] = converted(cookie);
      }
    }

    return result;
  };

  config.defaults = {};

  jQuery.removeCookie = function (key, options) {
    if (jQuery.cookie(key) !== undefined) {
      // Must not alter options, thus extending a fresh object...
      jQuery.cookie(key, '', jQuery.extend({}, options, { expires: -1 }));
      return true;
    }
    return false;
  };
}));

var bvote_can_vote = 1;
function bvote(postid, value){
  if(isNaN(postid) || isNaN(value) || bvote_can_vote !== 1){
    return;
  }
  if(jQuery.cookie('bvote_' + postid) !== undefined){
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
