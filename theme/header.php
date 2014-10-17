<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<title><?php the_page_title(); ?></title>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<section class="top-bar">
	<header class="site-header">
		<div class="container cf">
			<h1 class="site-logo"><?php bloginfo( 'name' ); ?></h1>
			<nav class="site-nav">
				<?php wp_nav_menu( array( 'theme_location' => 'header', 'container' => '' ) ); ?>
			</nav>
		</div>
	</header>
