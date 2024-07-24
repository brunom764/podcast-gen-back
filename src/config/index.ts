export const configuration = () => ({
	  storage: {
		azure: {
			connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
			containerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
		},
  },
})

export type AppConfig = ReturnType<typeof configuration>
