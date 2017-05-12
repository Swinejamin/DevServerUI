<?php
$manifest = file_get_contents('asset-manifest.json');
$vars = json_decode($manifest, true);
header("Access-Control-Allow-Origin: *");

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>Benjamin's Dev Server</title>
    <link href="<? echo $vars["main.css"] ?>" rel="stylesheet">

</head>
<body>
<div>
</div>
<div id="root"></div>
<script type="text/javascript" src="<? echo $vars["main.js"] ?>"></script>
</body>
</html>
