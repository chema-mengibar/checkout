<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: accept, content-type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 


if( array_key_exists ( 'type' , $_REQUEST )  ){
  switch ( $_REQUEST['type'] ) {
    case 'cart':
      $code = 200;
      $file = 'data/cart.json';
      break;
    case 'payment':
      $code = 200;
      $file = 'data/payment.json';
      Sleep(3);
      break;
    case 'error':
      $code = 404;
      $file = 'data/error.json';
      break;
  }
}
else{
  $code = 200;
  $file = 'data/order.json';
}


http_response_code( $code );
echo file_get_contents( $file );

?>
