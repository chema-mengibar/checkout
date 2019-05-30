<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: accept, content-type");

if( array_key_exists ( 'cart' , $_GET )  ){
  $code = 200;
  $file = 'data/cart.json';
}
elseif ( array_key_exists ( 'order' , $_GET )  ){
  $code = 200;
  $file = 'data/order.json';
}
elseif ( array_key_exists ( 'payment' , $_GET )  ){
  $code = 200;
  $file = 'data/payment.json';
}
else{
  $code = 404;
  $file = 'data/error.json';
}

http_response_code( $code );
echo file_get_contents( $file );

?>
