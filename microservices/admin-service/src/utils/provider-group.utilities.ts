import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { dataSourceOptions } from 'db/data-source';

export function getProviderGroupConnection(providerGroupId: string): Promise<Connection> {
  const connectionName = providerGroupId;
  const connectionManager = getConnectionManager();

  if (connectionManager.has(connectionName)) {
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(
      connection.isConnected ? connection : connection.connect(),
    );
  } 
  return createConnection({
    ...(dataSourceOptions as PostgresConnectionOptions),
    name: connectionName,
    schema: connectionName,
  });
}
