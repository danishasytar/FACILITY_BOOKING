<?php


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facilities_booking";
$sql="";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$result = $conn->query($sql);

if ($result->num_rows > 0) {	
    echo "<table><tr><th>Room</th><th>Time</th><th>Passenger Name</th><th>Remarks</th><th>";
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row["facilities_id"]. "</td><td>" . $row["time"]. "</td><td>" . $row["passenger_name"]. "</td><td>" . $row["remarks"]. "</td></tr>";
    }
    echo "<br><br><br> </table> <br><br><br>";
} else {
    echo "<br><br><br> 0 results <br><br><br>";
}

$conn->close();
?>