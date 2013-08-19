# bvote

Simple Digg style WordPress voting plugin. Easy to use, easy to hack, easy to custimize.

## Useage

### Simple Usage
In a single post, in a loop on the homepage, etc.

```php
<?php
if(function_exists('bvote_box')){
  echo bvote_box();
}
?>
```

### Top 5 List
```php
<ol class="topten">
<?php
  $popular_posts = $wpdb->get_results("SELECT id, post_title FROM $wpdb->posts, $wpdb->postmeta WHERE meta_key = 'bvote_score' AND id = post_id ORDER BY meta_value DESC LIMIT 0,5");
  foreach($popular_posts as $post) {
    echo "<li><a href='". get_permalink($post->id) ."'>".$post->post_title."</a></li>\n";
  }
?>
</ol>
```
