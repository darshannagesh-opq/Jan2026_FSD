import { SecretsManagerClient, GetSecretValueCommand }
  from "@aws-sdk/client-secrets-manager";
import mysql from "mysql2/promise";
 
const REGION = "ap-south-1";
const SECRET_NAME = "rds/contacts-db-demo";
 
const sm = new SecretsManagerClient({ region: REGION });
 
export const handler = async (event) => {
  // 1) get the form details from the event
  const { name, email, phone } = event;
 
  // 2) fetch the DB credentials from Secrets Manager
  const secret = await sm.send(
    new GetSecretValueCommand({ SecretId: SECRET_NAME })
  );
  const creds = JSON.parse(secret.SecretString);
 
  // 3) connect to RDS using the fetched credentials
const conn = await mysql.createConnection({
  host: creds.host,        // from the secret
  user: creds.username,    // from the secret
  password: creds.password,// from the secret
  database: creds.dbname,  // from the secret
  port: creds.port,        // from the secret
}); 
  // 4) insert the contact
  await conn.execute(
    "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone]
  );
  await conn.end();
 
  // 5) return success
  return { statusCode: 200, body: "Contact saved" };
};
