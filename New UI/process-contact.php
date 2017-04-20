<?php

    $to = "yourmail@mail.com";
    $from = $_REQUEST['email'];
    $name = $_REQUEST['name'];
    $headers = "From: $from";
    $subject = "You have a message.";

    $fields = array();
    $fields{"name"} = "First name";
    $fields{"lastname"} = "Last name";
    $fields{"email"} = "Email";
    $fields{"phone"} = "Phone";
    $fields{"address"} = "Address";
    $fields{"city"} = "City";
    $fields{"message"} = "Message";
	

    $body = "Here is what was sent:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }

    $send = mail($to, $subject, $body, $headers);

?>
