from constructs import Construct
from aws_cdk import aws_cloudfront as cloudfront
from aws_cdk import aws_s3 as s3
from aws_cdk import aws_s3_deployment as s3_deployment
from aws_cdk import Stack, RemovalPolicy

class WebsiteStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # S3 Bucket
        self.baseball_starters_bucket = s3.Bucket(
            self,
            id="BaseballStartersBucket",
            bucket_name="baseball-starters-website-bucket",
            public_read_access=True,
            website_index_document="index.html",
            access_control=s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
            block_public_access=s3.BlockPublicAccess.BLOCK_ACLS,
            removal_policy=RemovalPolicy.DESTROY
        )

        # CloudFront Origin Access Identity
        self.origin_access_identity = cloudfront.OriginAccessIdentity(
            self, "OriginAccessIdentity",
            comment="Allows Read-Access from CloudFront"
        )

        # Grant the Origin Access Identity permission to read the S3 bucket
        self.baseball_starters_bucket.grant_read(self.origin_access_identity)

        # Deploy static content to S3
        s3_deployment.BucketDeployment(
            self,
            id="bucketDeployment",
            sources=[s3_deployment.Source.asset("../dist")],
            destination_bucket=self.baseball_starters_bucket,
        )
