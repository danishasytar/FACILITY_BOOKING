<?php
header('Access-Control-Allow-Origin');

	//define database connection parameters
		$servername = "localhost";
		$username = "id385032_db2";
		$password = "password";
		$dbname = "id385032_db2";
		$sql="";

	//Set up PDO parameters
		$opt = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ, PDO::ATTR_EMULATE_PREPARES => false, );

	//Create a PDO instance (connect to database)
		$pdo = new PDO($servername, $username, $password, $dbname, $opt);

	//Retrieve specific parameter from supplied URL
		$key = strip_tags($_REQUEST['key']);
		$data= array();

	//determine which mode is being requested
		switch ($key) {

			//add new record to the privateroom table
			case 'create':
				
				//sanitise URL supplied values
				$room_name = filter_var($_REQUEST['room_name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
				$passenger_name = filter_var($_REQUEST['passenger_name'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
				$time_start = filter_var($_REQUEST['time_start'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
				$time_end = filter_var($_REQUEST['time_end'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
				$remarks = filter_var($_REQUEST['remarks'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);

				//attempt to run PDO prepared statement
				try{
					$sql = "INSERT INTO meetingroom(room_name, passenger_name, time_start, time_end, remarks) VALUES(:room_name, :passenger_name, :time_start, :time_end, :remark)";
					$stmt = $pdo->prepare($sql);
					$stmt->bindParam(':room_name', $room_name, PDO::PARAM_STR);
					$stmt->bindParam(':passenger_name', $passenger_name, PDO::PARAM_STR);
					$stmt->bindParam(':time_start', $time_start, PDO::PARAM_STR);
					$stmt->bindParam(':time_end', $time_end, PDO::PARAM_STR);
					$stmt->bindParam(':remarks', $remarks, PDO::PARAM_STR);
					$stmt->execute();

				echo json_encode(array('message'=>'Congratulations the record '.$passenger_name.' was added to the database'));
				}
				//catch any errors in running the prepared statement
				catch(PDOException $e){
					echo $e->getMessage();
				}
				break;
			
			//update an existing record in the privateroom table
			case "update":
				
				//sanitise URL supplied values
				$room_name=filter_var($_REQUEST['room_name'],FILTER_SANITIZE_STRING,FILTER_FLAG_ENCODE_LOW);
				$passenger_name=filter_var($_REQUEST['passenger_name'],FILTER_SANITIZE_STRING,FILTER_FLAG_ENCODE_LOW);
				$time_start=filter_var($_REQUEST['time_start'], FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
				$time_end=filter_var($_REQUEST['time_end'],FILTER_SANITIZE_STRING,FILTER_FLAG_ENCODE_LOW);
				$remarks=filter_var($_REQUEST['remarks'],FILTER_SANITIZE_STRING,FILTER_FLAG_ENCODE_LOW);
				$id=filter_var($_REQUEST['id'], FILTER_SANITIZE_NUMBER_INT);
				break;

				//Attemps to run PDO prepared statement
				try {
					$sql = "UPDATE meetingroom SET room_name =:room_name, passenger_name =:passenger_name, time_start =:time_start, time_end =:time_end, remarks =:remarks WHERE id =:id";
					$stmt = $pdo->prepare($sql);
					$stmt->bindParam(':room_name', $room_name, PDO::PARAM_STR);
					$stmt->bindParam(':passenger_name', $passenger_name, PDO::PARAM_STR);
					$stmt->bindParam(':time_start', $time_start, PDO::PARAM_STR);
					$stmt->bindParam(':time_end', $time_end, PDO::PARAM_STR);
					$stmt->bindParam(':remarks', $remarks, PDO::PARAM_STR);
            		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
            		$stmt->execute();

            		echo json_encode('Congratulations the record '. $passenger_name.' was updated');
				}

				//catch any errors in running the prepared statement
				catch(PDOException $e){
					echo $e->getMessage();
				}
				break;

			//remove an existing record in the meetingroom table
				case "delete";

				//sanitise supplied record ID for matching to table record
				$id=filter_var($_REQUEST['id'],FILTER_SANITIZE_NUMBER_INT);

				//attempt to run PDO prepared statement
				try{
					$pdo = new PDO($servername, $username, $password, $dbname);
					$sql = "DELETE FROM meetingroom WHERE id = :id"
					$stmt = $pdo->prepare($sql);
            		$stmt->bindParam(':id', $id, PDO::PARAM_INT);
            		$stmt->execute();

            		echo json_encode('Congratulations the record '.$passenger_name.' was removed');
				}

				//catch any errors in running the prepared statement
				catch(PDOException $e)
				{
					echo $e->getMessage();
				}
				break;
		}
?>