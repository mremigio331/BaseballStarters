from constructs import Construct
from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_cloudwatch as cloudwatch,
    RemovalPolicy,
    Duration
)

class LoggingStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        self.access_bucket = s3.Bucket(
            self,
            id="AccessLogs",
            bucket_name="baseball-starters-logging-bucket",
            removal_policy=RemovalPolicy.RETAIN,
            versioned=True,
            lifecycle_rules=[s3.LifecycleRule(
                id="LogRetention",
                expiration=Duration.days(365),
                transitions=[s3.Transition(
                    storage_class=s3.StorageClass.INFREQUENT_ACCESS,
                    transition_after=Duration.days(30)
                )]
            )],
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL
        )
