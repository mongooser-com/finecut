<?php

function getfile( $ppath ){
	try {
		return file_get_contents($ppath);
	} catch (Exception $e) {}
	return '';
}

function preparseContentStr( $str, $deep ){
	try {
		$str = preg_replace( '/href="\//' , "href=\"$deep/" , $str );
		$str = preg_replace( '/href = "\//' , "href = \"$deep/" , $str );
		$str = preg_replace( '/src="\//' , "src=\"$deep/" , $str );
		$str = preg_replace( '/src = "\//' , "src = \"$deep/" , $str );
		return $str;
	} catch (Exception $e) { }
}

?>