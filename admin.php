<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "db";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) 
    {
        die("Connection failed: " . $conn->connect_error);
    }    

    $query = "SELECT id, name, email, phone, message from feedback";
    $result = $conn->query($query);

    while ($row = $result->fetch_assoc())
    {
        echo "id: " . $row['id'] . "<br>";
        echo "name: " . $row['name'] . "<br>";
        echo "email: " . $row['email'] . "<br>";
        echo "phone: " . $row['phone'] ."<br>";
        echo "message: " . $row['message'] . "<br>" . "<br>";
    }
?>