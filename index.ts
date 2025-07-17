import app from "@/app";
import { config } from "@/config/config";
import connection from "@/database/connection";

;(async () => {
  await connection({
    databaseURL: config.databaseURL as string,
  });

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

})();
