<?php
    session_start();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) 
    {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $message = mysqli_real_escape_string($conn, $_POST['message']);

    $query = "INSERT INTO feedback (name, email, phone, message) VALUES ('$name', '$email', '$phone', '$message')";
    if ($conn->query($query))
    {
        $_SESSION['form_success'] = true;
    }

    $showSuccessMessage = isset($_SESSION['form_success']) && $_SESSION['form_success'];
    header("Location: " . $_SERVER["HTTP_REFERER"] . "#form-section");
?>