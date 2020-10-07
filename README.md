#restaurant-list

餐廳菜單

首頁顯示餐廳列表，內容包含餐廳名稱、餐廳種類、餐廳評分

點選餐廳進入更詳細的餐廳資訊

也可以搜尋餐廳名稱及分類來找到你想要找的餐廳

新增-使用者可以自行新增餐廳、編輯餐廳及刪除餐廳


環境建置 Node.js 10.15.0 cmber(終端機) NVM MongoDB

專案安裝流程 1.建立資料夾

[~/Projects/alpha_camp] $ mkdir fuckword_generator

[~/Projects/alpha_camp]$ cd fuckword_generator

[~/Projects/alpha_camp/password_generator] $

2.npm install: 安裝相關套件到專案中

[~/Projects/alpha_camp/fuckword_generator] $ npm install express express-handlebars

安裝mongoose
[~/Projects/alpha_camp/fuckword_generator] $ npm install mongoose

[~/Projects/alpha_camp/fuckword_generator] $ npm install body-parser

[~/Projects/alpha_camp/fuckword_generator] $ npm install method-override


3.把下載的資料丟到專案目錄

4.匯入種子檔案

在 models 找到 restaurantseeder.js 檔案

執行 
[~/Projects/alpha_camp/fuckword_generator] $ node models/seeds/restaurantseeder.js 
匯入使用者與餐廳資料

當終端機顯示
mongodb connected!
done.
代表匯入成功

6.啟動伺服器，執行app.js 檔案

[~/Projects/alpha_camp/fuckword_generator] $ node app.js

5.當terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

Express app listening on port 3000.