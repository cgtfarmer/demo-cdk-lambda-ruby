import { join } from 'path';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, FunctionUrlAuthType, HttpMethod, Runtime } from 'aws-cdk-lib/aws-lambda';

interface ApiStackProps extends StackProps {
}

export class ApiStack extends Stack {

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const demoLambda = new Function(this, 'DemoLambda', {
      runtime: Runtime.RUBY_3_2,
      code: Code.fromAsset(join(__dirname, '../../../src')),
      handler: 'index.handler',
      environment: {
        TEST_VALUE: 'TEST',
      },
    });

    const lambdaFunctionUrl = demoLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedHeaders: ['Authorization'],
        allowedMethods: [
          HttpMethod.ALL,
          // HttpMethod.GET,
          // HttpMethod.HEAD,
          // HttpMethod.OPTIONS,
          // HttpMethod.POST,
          // HttpMethod.DELETE,
          // HttpMethod.PUT,
          // HttpMethod.PATCH,
        ],
        maxAge: Duration.days(1),
      }
    });
  }
}
