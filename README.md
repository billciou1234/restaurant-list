#restaurant-list

餐廳菜單

首頁顯示餐廳列表，內容包含餐廳名稱、餐廳種類、餐廳評分

點選餐廳進入更詳細的餐廳資訊

也可以搜尋餐廳名稱及分類來找到你想要找的餐廳

新增-使用者可以自行新增餐廳、編輯餐廳及刪除餐廳

新增-
可以註冊帳號，註冊資料包括：name, email, 密碼, 確認密碼
可以透過Facebook Login 直接登入
登入後使用者可以創建自己的餐廳清單

環境建置 Node.js 10.15.0 cmber(終端機) NVM MongoDB

安裝  MongoDB 及 Robo 3T

使用Robo 3T 創建一個Database，名叫'Restaurant'

專案安裝流程 1.建立資料夾

[~/Projects/alpha_camp] $ mkdir fuckword_generator

[~/Projects/alpha_camp]$ cd fuckword_generator

[~/Projects/alpha_camp/password_generator] $

2.npm install: 安裝相關套件到專案中

[~/Projects/alpha_camp/fuckword_generator] $ npm install express express-handlebars body-parser method-override express-session

安裝mongoose
[~/Projects/alpha_camp/fuckword_generator] $ npm install mongoose

安裝其他套件

[~/Projects/alpha_camp/fuckword_generator] $ npm install passport passport-local passport-facebook connect-flash dotenv



3.把下載的資料丟到專案目錄



4.匯入種子檔案

在 models 找到 restaurantseeder.js 檔案

執行 
[~/Projects/alpha_camp/fuckword_generator] $ npm run seed
匯入使用者與餐廳資料

當終端機顯示
mongodb connected!
done.
代表匯入成功

6.啟動伺服器，執行app.js 檔案

[~/Projects/alpha_camp/fuckword_generator] $ node app.js

5.當terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

Express app listening on port 3000.


提供兩組帳密供測試：

email: 'user1@example.com', password: '12345678'
email: 'user2@example.com', password: '12345678'
