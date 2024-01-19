<?php


/**
 * IMP Charter site
 * @author 	Ron Bentata (@ronbentata)
 */



define('___ARTICLES_PREFIX', '/article/');
define('___ARTICLES_PREFIX_LEN', 9);

$__PREFIXs = [
	'/',
	'/',
	'/index.php',
	'/blog',
	'/news',
	'/our-story',
	'/our-services',
];

// identify uri 
$___article_id = $_SERVER['REQUEST_URI'];
//die($___article_id);
if(substr($___article_id, 0, ___ARTICLES_PREFIX_LEN) == ___ARTICLES_PREFIX){
	// get article id
	$___article_id = substr($___article_id, ___ARTICLES_PREFIX_LEN); // remove "/article/"
	$___article_id = explode('-', $___article_id);
	$___article_id = $___article_id[0];
	//die('article id: '.$___article_id);
	
	// if article, validate the url
	$___articles = file_get_contents('data/articles/imp.charter.articles.json');
	$___articles = json_decode($___articles, true);
	$___articles = $___articles[0]['articles'];
	//var_export($___articles);exit;
	
	// redirect if not correct url (301)
	if(!isset($___articles[$___article_id])){
		header("HTTP/1.1 301 Moved Permanently");
		header('location: /');
		exit;
	}
	if(___ARTICLES_PREFIX.$___articles[$___article_id]['url'] != $_SERVER['REQUEST_URI']){
		header("HTTP/1.1 301 Moved Permanently");
		header('location: '.___ARTICLES_PREFIX.$___articles[$___article_id]['url']);
		exit;
	}
	
}elseif(!in_array($___article_id, $__PREFIXs)){
	header("HTTP/1.1 301 Moved Permanently");
	header('location: /');
	exit;
	
}else{
	$___article_id = 0;
}


// load content
$___article_content = '';
if(strpos($_SERVER['REQUEST_URI'], 'our-story') > -1){
	$___article_content = 'story';
}elseif(strpos($_SERVER['REQUEST_URI'], 'our-services') > -1){
	$___article_content = 'services';
}


// just continue to the site
include_once('index.html');

