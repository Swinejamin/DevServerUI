<?php
$pattern = '/^\.(\.|htaccess)?|static|\S*.php|favicon.ico|asset-manifest\.json$/';
$cwd = getcwd();
$dirs = preg_grep($pattern, scandir($cwd), PREG_GREP_INVERT);


$titles = [];
$projects = [];
foreach ($dirs as $dir => $ref) {
//    if($ref == "CYBERNAUTIC_LEGACY_API.php") { continue; }

    $innerHTML = '';
    $dom = new DOMDocument();
    $target = "$cwd . \"/\" . $ref";
    $indexPath = realpath($cwd . DIRECTORY_SEPARATOR . $ref . DIRECTORY_SEPARATOR . "index.html");
    $file = file_get_contents($cwd . "/" . $ref . "/index.html");
    $dom->loadHTML($file);
    $title = $dom->getElementsByTagName('title')[0];
    $innerHTML .= html_entity_decode(strip_tags($title->ownerDocument->saveHTML($title)));
    $dir['title'] = $innerHTML;
    $stat = stat($indexPath);
    $created = json_encode($stat["ctime"]);
    $modified = json_encode($stat["mtime"]);

    $newArr = array('directory' => $ref, "title" => $innerHTML, "stat" => $stat, "created" => $created, "modified" => $modified);
    array_push($projects, $newArr);
    array_push($titles, $innerHTML);

}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
echo json_encode($projects);
