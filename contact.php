<?php 



    if (!empty($_POST)) {

        require_once('phpmailer/class.phpmailer.php');

        print_r($_POST);

        parse_str($_POST['form_data'], $form);

        $mail = new PHPMailer();

        $to_email = 'shantoroy1792@gmail.com';
        
        $from_email = 'no-reply@danielmatches.com';

        $subject = 'Daniel Matches User';

            $message = '
            Fast Name: '.$form['fname'].'
            Last Name: '.$form['lname'].'
            Email: '.$form['email'].'
            Phone: '.$form['phone'].'
            Postion: '.$form['postion'].'
            Message: '.$form['message'].'
            ';

        $mail->IsHTML(true);   

        

        $headers  =  "From: ".$from_email."\r\n" . "Content-Type: text/plain; charset=utf-8" . "\r\n";



        $emailSent = mail($to_email, $subject, $message, $headers);



        if ($emailSent) { 

            echo $emailSent;

            return;

        }

    } 

?>