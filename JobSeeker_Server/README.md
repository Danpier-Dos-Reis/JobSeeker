# Instructions

1. Compile command:
    ```npm run build```

2. Copy this folders into the dist/ folder
    * Database/ into dist/

3. SQLITE3 database:
    ```SQL
    CREATE TABLE "Job" (
        "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "Title" TEXT NOT NULL,
        "Day" DATETIME NOT NULL,
        "Link" TEXT NOT NULL
    );
    ```
    Directory into the project **Database/database.db**

4. The sound file must be into **assets/sound.mp3**