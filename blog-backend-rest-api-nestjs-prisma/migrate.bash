# # Save a new migration
# npx prisma migrate create --name "$MIGRATION_NAME"

# # Apply the migration
# npx prisma migrate deploy

# # npx prisma migrate public --name "$MIGRATION_NAME"

# # npx prisma db pull

# # Apply the migration for a specific schema
# # npx prisma migrate deploy --schema="$SCHEMA_NAME"
# # npx prisma db pull

# # npx prisma generate --schema="$SCHEMA_NAME"

# npx prisma migrate dev --name  "$MIGRATION_NAME" --schema "$SCHEMA_NAME" 


# npx prisma db pull



# npx prisma migrate create --name "$MIGRATION_NAME"

# # Apply the migration
# npx prisma migrate deploy

# # Apply the migration for a specific schema
# npx prisma migrate up --schema="$SCHEMA_NAME"
# npx prisma generate --schema="$SCHEMA_NAME"
# npx prisma db pull

# npx prisma migrate dev --name  "$MIGRATION_NAME" --schema="$SCHEMA_NAME" 
# npx prisma migrate deploy --schema="$SCHEMA_NAME"
# npx prisma migrate dev --schema="$SCHEMA_NAME"
# npx prisma migrate deploy --schema="$SCHEMA_NAME"

#!/bin/bash
DATABASE_URL="postgres://myuser:mypassword@localhost:5470"
# Set database connection parameters
DB_USER="myuser"
DB_PASSWORD="mypassword"
DB_HOST="postgres"
DB_NAME="postgres"
SCHEMA="$SCHEMA_NAME"

# Set the path to your migration files
MIGRATION_PATH="prisma/migrations/20220528101323_init/migration.sql"

# Run the migration using the migrate tool, specifying the schema
# migrate -database "postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=disable&search_path=${SCHEMA}" -path "${MIGRATION_PATH}" up

npx prisma migrate dev --name init --schema="${MIGRATION_PATH}/schema.prisma" --create-db --force-reset --url="${DATABASE_URL}"
