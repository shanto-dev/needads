<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fname = isset($_POST['fname']) ? htmlspecialchars($_POST['fname']) : '';
    $lname = isset($_POST['lname']) ? htmlspecialchars($_POST['lname']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
    $bsnsname = isset($_POST['bsnsname']) ? htmlspecialchars($_POST['bsnsname']) : '';
    $location = isset($_POST['Location']) ? htmlspecialchars($_POST['Location']) : '';
    $advtslocation = isset($_POST['advtslocation']) ? htmlspecialchars($_POST['advtslocation']) : '';
    $binstime = isset($_POST['binstime']) ? htmlspecialchars($_POST['binstime']) : '';
    $ymessage = isset($_POST['ymessage']) ? htmlspecialchars($_POST['ymessage']) : '';
    $field3 = isset($_POST['field3']) ? htmlspecialchars($_POST['field3']) : '';

    $to = "shantoroy1792@gmail.com"; 
    $subject = "Form Data Submission";
    $message = "
    First Name: $fname
    Last Name: $lname
    Email: $email
    Phone: $phone
    Business Name: $bsnsname
    Location: $location
    Advertising Location: $advtslocation
    Years in Business: $binstime
    Message: $ymessage
    Additional Field: $field3
    ";
    $headers = "From: no-reply@example.com";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["success" => true, "message" => "Email sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to send email."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
}
?>
