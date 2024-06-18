import json
import aws_cdk as cdk
from cdk.network_infrastructure_stack import NetworkInfrastructureStack
from cdk.logging_stack import LoggingStack
from cdk.website_stack import WebsiteStack
from cdk.distribution_stack import DistributionStack
from cdk.code_pipeline_stack import CodePipelineStack

with open('cdk_config.json') as config_file:
    config = json.load(config_file)

CDK_ENV = cdk.Environment(account=config['account'], region=config['region'])
app = cdk.App()

network_stack = NetworkInfrastructureStack(app, "BaseballStarters-NetworkInfrastructureStack", config, env=CDK_ENV)
logging_stack = LoggingStack(app, "BaseballStarters-LoggingStack", env=CDK_ENV)
storage_stack = WebsiteStack(app, "BaseballStarters-WebsiteStack", env=CDK_ENV)

distribution_stack = DistributionStack(
    app,
    "BaseballStarters-DistributionStack",
    baseball_starters_bucket=storage_stack.baseball_starters_bucket,
    origin_access_identity=storage_stack.origin_access_identity,
    certificate=network_stack.certificate,
    hosted_zone=network_stack.hosted_zone,
    env=CDK_ENV
)

code_pipeline_stack = CodePipelineStack(
    app,
    "BaseballStarters-CodePipelineStack",
    bucket=storage_stack.baseball_starters_bucket,
    distribution=distribution_stack.distribution,
    config=config,
    env=CDK_ENV,
)

app.synth()
