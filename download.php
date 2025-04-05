// <?php
//
// function downloadAndSave($url, $filename)
// {
//     $json = file_get_contents($url);
//
//     if (!$json) {
//         die("❌ Ошибка загрузки: $url\n");
//     }
//
//     // Парсим и оставляем только нужные поля
//     $data = json_decode($json, true);
//     $simplified = array_map(fn($c) => [
//         'name' => $c['name'],
//         'iso2' => $c['iso2']
//     ], $data);
//
//     file_put_contents(__DIR__ . "/src/data/$filename", json_encode($simplified, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
//     echo "✅ Сохранено: $filename\n";
// }
//
// downloadAndSave("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/countries.json", "countries.json");

// function downloadCities()
// {
//     $url = "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/cities.json";
//     $json = file_get_contents($url);
//
//     if (!$json) {
//         die("❌ Ошибка загрузки: $url\n");
//     }
//
//     $data = json_decode($json, true);
//
//     // Оставляем только нужные поля
//     $filtered = array_map(fn($c) => [
//         'name' => $c['name'],
//         'country_code' => $c['country_code'],
//     ], $data);
//
//     file_put_contents(__DIR__ . "/src/data/cities.json", json_encode($filtered, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
//     echo "✅ Сохранено: cities.json\n";
// }
//
// downloadCities();
