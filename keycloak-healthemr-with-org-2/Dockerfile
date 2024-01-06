version: "3.9"
services:
  
  postgres:
    container_name: healthemr-db-2
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    volumes:
       - postgres-db:/data/postgres
    ports:
      - "5449:5432"
    networks:
      - healthemr-backend

  keycloak:
      container_name: healthemr-iam
      image: quay.io/phasetwo/phasetwo-keycloak:22.0.3

      # command:
        # ['start-dev --import-realm --http-relative-path=/auth']
      command: 
        -Dkeycloak.profile.feature.admin_fine_grained_authz=enabled -Dkeycloak.profile.feature.token_exchange=enabled start-dev --import-realm --http-relative-path=/auth
      environment:
        KC_DB_VENDOR: POSTGRES
        KC_DB_ADDR: healthemr-db-2
        KC_DB_DATABASE: postgres
        KC_DB_USER: postgres
        KC_DB_SCHEMA: public
        KC_DB_PASSWORD: postgres
        KEYCLOAK_ADMIN: admin
        KEYCLOAK_ADMIN_PASSWORD: admin
        KEYCLOAK_LOGLEVEL: ALL
        KC_LOGL_EVEL: ALL
        ROOT_LOGLEVEL: ALL
        # Uncomment the line below if you want to specify JDBC parameters. The parameter below is just an example, and it shouldn't be used in production without knowledge. It is highly recommended that you read the PostgreSQL JDBC driver documentation in order to use it.
        #JDBC_PARAMS: "ssl=true"
      ports:
        - 8090:8080
      volumes:
        - ./healthemr-dev.json:/tmp/realm.json
      networks:
        - healthemr-backend



volumes:
  postgres-db:
    driver: local
 
networks:
  healthemr-backend:
    name: healthemr-backend