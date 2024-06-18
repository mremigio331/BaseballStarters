from constructs import Construct
from aws_cdk import (
    Stack,
    aws_route53 as route53,
    aws_certificatemanager as acm
)

class NetworkInfrastructureStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, config:dict, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        
        domain_name = config['domain_name']
        
        # Route 53 Hosted Zone
        self.hosted_zone = route53.HostedZone.from_hosted_zone_attributes(
            self, 
            "existing-zone", 
            hosted_zone_id=config['hosted_zone'],
            zone_name=domain_name
        )

        # ACM Certificate
        self.certificate = acm.Certificate.from_certificate_arn(
            self,
            'CertificateImported', 
            certificate_arn=config['cert_arn']
        )
