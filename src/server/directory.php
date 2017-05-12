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
    $target = realpath($cwd . DIRECTORY_SEPARATOR . $ref);
    $indexPath = realpath($cwd . DIRECTORY_SEPARATOR . $ref . DIRECTORY_SEPARATOR . "index.html");
    $file = file_get_contents($indexPath);
    $dom->loadHTML($file);
    $title = $dom->getElementsByTagName('title')[0];
    $innerHTML .= html_entity_decode(strip_tags($title->ownerDocument->saveHTML($title)));
    $dir['title'] = $innerHTML;
    $email = "bmswine@gmail.com";
    $keyhook = Tqyglfjs30rBDLmDD3pH;
    $stat = stat($indexPath);



    // create curl resource
    $ch = curl_init();
    $repoUrl = "https://api.github.com/repos/swinejamin/$ref";
    // set url
    curl_setopt($ch, CURLOPT_URL, $repoUrl);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_HTTPHEADER, "Accept: application/vnd.github.v3+json");
    curl_setopt($ch, CURLOPT_USERAGENT, "https://github.com/Swinejamin");
    curl_setopt($ch, CURLOPT_USERPWD, "$email:$keyhook");
    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    // $output contains the output string
//    $response = curl_exec($ch);
//    $repo = json_decode($response);

//    $created = $repo["created_at"];
//    $modified = $repo["modified_at"];
//    $created = $response['created_at'];
//    $created = $repo->created_at;
//    $modified = $repo->modified_at;
    $created = json_encode($stat['ctime']);
    $modified = json_encode($stat['mtime']);

    // close curl resource to free up system resources
    curl_close($ch);

    $newArr = array('directory' => $ref, "title" => $innerHTML, "stat" => $stat, "created" => $created, "modified" => $modified);
    array_push($projects, $newArr);
    array_push($titles, $innerHTML);

}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
echo json_encode($projects);
