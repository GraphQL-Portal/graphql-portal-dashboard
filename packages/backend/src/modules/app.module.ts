import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {config} from 'node-config-ts';
import HelloModule from './hello/hello.module';
import {LoggerModule} from '../common/logger'

@Module({
    imports: [
        GraphQLFederationModule.forRoot({
            playground: config.application.graphQL.playground,
            debug: config.application.graphQL.debug,
            typePaths: ['./**/*.gql'],
            context: ({req}) => ({req}),
        }),
        LoggerModule.forRoot(config),
        HelloModule,
    ],
})
export default class AppModule {
}
