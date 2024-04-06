import { Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino/LoggerModule'

import { EnvironmentModule, ThrottlerConfigModule } from '@task-manager/config'
import { pinoLoggerConfig } from '@task-manager/config/logging/pino.config'
import { CustomLoggerModule } from '@task-manager/core/logger'

const API_MODULES = []

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ThrottlerConfigModule,
		LoggerModule.forRoot(pinoLoggerConfig),
		EnvironmentModule.forRoot(),
		CustomLoggerModule,
		...API_MODULES,
	],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	configure() {}
}
