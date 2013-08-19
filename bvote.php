<?php
/*
Plugin Name: BVote
Plugin URI: http://github.com/MatthewCallis/bvote
Version: 1.0
Author: Matthew Callis
Description: Simple Vote Script
Author URI: http://www.briggsby.com/
License: MIT
*/
function bvote_box(){
  global $post;

  $value = get_post_meta($post->ID, 'bvote_score', true);
  $value = (empty($value)) ? 0 : $value;

  $output = '<div class="bvote-container">
        <div class="bvote-value bvote-value-' . $post->ID . '" data-value="' . $value . '">' . $value . '</div>
        <ul class="bvote-actions">
          <li><a href="#" data-postid="' . $post->ID . '" class="bvote-up" title="Up"></a></li>
          <li><a href="#" data-postid="' . $post->ID . '" class="bvote-down" title="Down"></a></li>
        </ul>
      </div>';
  return $output;
}

function bvote_add_stylesheet(){
  wp_register_style('bvote-style', plugins_url('bvote.css', __FILE__));
  wp_enqueue_style('bvote-style');
}

function bvote_add_scripts(){
  wp_enqueue_script('bvote-script', plugins_url('bvote.js', __FILE__), array('jquery'));
  wp_localize_script('bvote-script', '_bvote', array('url' => admin_url('admin-ajax.php')));
}

function load_bvote(){
  add_action('wp_enqueue_scripts', 'bvote_add_stylesheet');
  add_action('wp_enqueue_scripts', 'bvote_add_scripts');
}

add_action('wp',                   'load_bvote');
add_action('wp_ajax_bvote',        'process_bvote');
add_action('wp_ajax_nopriv_bvote', 'process_bvote');

function process_bvote(){
  if($_SERVER['REQUEST_METHOD'] != 'GET'){
    header('Allow: GET');
    header('HTTP/1.1 405 Method Not Allowed');
    header('Content-Type: text/plain');
    exit;
  }

  if(!isset($_GET['id']) || !isset($_GET['value']) || isset($_COOKIE["bvote_" . $_GET['id']])){
    exit;
  }

  $id    = intval($_GET['id']);
  $value = intval($_GET['value']);
  if($id <= 0 || ($value !== -1 && $value !== 1)){
    exit;
  }

  global $wpdb;
  $id_exist = $wpdb->get_var($wpdb->prepare("SELECT id FROM $wpdb->posts WHERE id = %d AND post_type = 'post';", $id));

  if($id_exist != $id){
   exit;
  }

  $rate = get_post_meta($id, "bvote_score", true);
  if(!empty($rate)){
    $rate = $rate + $value;
    update_post_meta($id, "bvote_score", $rate);
    setcookie("bvote_" . $id, $rate, time() + 3000000, COOKIEPATH);
  }
  else {
    add_post_meta($id, "bvote_score", $value, true);
    setcookie("bvote_" . $id, $value, time() + 3000000, COOKIEPATH);
  }
  exit;
}
?>
