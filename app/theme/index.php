<?php get_header(); ?>
<?php if( have_posts() ) { ?>
<?php while( have_posts() ) { ?>
<?php the_post(); ?>
<h1><?php the_title(); ?></h1>
<?php the_content(); ?>
<?php } ?>
<?php } ?>
<?php get_footer(); ?>
