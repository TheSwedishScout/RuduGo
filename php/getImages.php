<?php
include('config.php');


class Bild{
    public $id;
    public $name;
    public $position;
    public $biskrivning;
    public $image;
    

    public function __construct($id,$name, $lat, $lng, $text, $src){

        $this->id = $id;
        $this->name = $name;
        $this->position = ["lat"=> $lat, "lng" => $lng];
        $this->biskrivning = $text;
        $this->image = $src;
    }
}


/* Prepared statement, stage 1: prepare */
if (!($stmt = $conn->prepare("SELECT * FROM bilder"))) {
     echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
if (!($res = $stmt->get_result())) {
    echo "Getting result set failed: (" . $stmt->errno . ") " . $stmt->error;
}
$bilder = [];
if ($res->num_rows > 0) {
    // output data of each row
    while($row = $res->fetch_assoc()) {  
        $bilder[] =  new Bild($row['id'],$row['rubrik'], $row['lat'], $row['lng'], $row['biskrivning'], $row['bild']);
    }
}

$json = json_encode($bilder, JSON_UNESCAPED_UNICODE);
$conn->close();
print_r($json);


?>