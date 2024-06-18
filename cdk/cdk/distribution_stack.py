from aws_cdk import (
    Stack,
    aws_cloudfront as cloudfront,
    aws_s3 as s3,
    aws_certificatemanager as acm,
    aws_route53 as route53,
    aws_route53_targets as targets,
    Duration
)
from constructs import Construct

class DistributionStack(Stack):

    def __init__(self, scope: Construct, id: str, baseball_starters_bucket: s3.Bucket, origin_access_identity: cloudfront.OriginAccessIdentity, certificate: acm.ICertificate, hosted_zone: route53.IHostedZone, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        self.distribution = cloudfront.CloudFrontWebDistribution(
            self, 
            "BaseballStartersWebsiteDistribution",
            http_version=cloudfront.HttpVersion.HTTP2,
            price_class=cloudfront.PriceClass.PRICE_CLASS_ALL,
            origin_configs=[
                cloudfront.SourceConfiguration(
                    s3_origin_source=cloudfront.S3OriginConfig(
                        s3_bucket_source=baseball_starters_bucket,
                        origin_access_identity=origin_access_identity
                    ),
                    behaviors=[
                        cloudfront.Behavior(
                            is_default_behavior=True,
                            default_ttl=Duration.seconds(900),
                            viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                        )
                    ],
                )
            ],
            error_configurations=[
                cloudfront.CfnDistribution.CustomErrorResponseProperty(
                    error_code=404,
                    response_code=404,
                    response_page_path="/404.html"
                )
            ],
            viewer_certificate=cloudfront.ViewerCertificate.from_acm_certificate(
                certificate=certificate,
                aliases=[hosted_zone.zone_name],
            ),
        )

        route53.ARecord(self, "BaseballStartersWebsiteAliasRecord",
            zone=hosted_zone,
            target=route53.RecordTarget.from_alias(targets.CloudFrontTarget(self.distribution))
        )
