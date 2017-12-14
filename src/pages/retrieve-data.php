<?php
header('Access-Control-Allow-Origin: *');

	//Define database connection parameters
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "technology";
		$sql="";

	//Set up PDO parameters
		$opt  = array(PDO::ATTR_ERRMODE=> PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,PDO::ATTR_EMULATE_PREPARES   => false,);

	//create a PDO instance (connect to database)
		$pdo = new PDO($servername, $username, $password, $dbname, $opt);
		$data = array();

	//Attempt to query database table and retrieve data
		try {
			$stmt = $pdo->query('SELECT id, name, description FROM technology ORDER BY name ASC');
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