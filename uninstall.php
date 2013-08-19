<?php
if(defined('WP_UNINSTALL_PLUGIN')){
  global $wpdb;
  $wpdb->query("DELETE FROM $wpdb->postmeta WHERE `meta_key` = 'bvote_score'");
}
?>
