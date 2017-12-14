<?php
header('Access-Control-Allow-Origin: *');

	//Define database connection parameters
		$servername = "localhost";
		$username = "id385032_db2";
		$password = "password";
		$dbname = "id385032_db2";
		$sql="";

	//Set up PDO parameters
		$opt  = array(PDO::ATTR_ERRMODE=> PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,PDO::ATTR_EMULATE_PREPARES   => false,);

	//create a PDO instance (connect to database)
		$pdo = new PDO($servername, $username, $password, $dbname, $opt);
		$data = array();

	//Attempt to query database table and retrieve data
		try {
			$stmt = $pdo->query('SELECT id, room_name, passenger_name, time_start, time_end, remarks FROM meetingroom ORDER BY room_name ASC');
			while ($row=$stmt->fetch(PDO::FETCH_OBJ)) {
				
				//Assign each row of data to associative array
				$data[]=$row;
			}

			//return data as JSON
			echo json_encode($data);
		}
		catch(PDOException $e)
   			{
      			echo $e->getMessage();
   			}
?>