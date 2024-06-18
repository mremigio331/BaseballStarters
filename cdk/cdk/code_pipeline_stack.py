from aws_cdk import (
    aws_codepipeline as codepipeline,
    aws_codepipeline_actions as codepipeline_actions,
    aws_codebuild as codebuild,
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_secretsmanager as secretsmanager,
    Stack,
)
from constructs import Construct

class CodePipelineStack(Stack):

    def __init__(self, scope: Construct, id: str, bucket: s3.Bucket, distribution: cloudfront.Distribution, config:dict, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        github_secret = secretsmanager.Secret.from_secret_name_v2(self, config['secret_1'], config['secret_2'])
        github_token = github_secret.secret_value_from_json(config['secret_3'])

        build_project = codebuild.PipelineProject(
            self, "BuildProject",
            environment=codebuild.BuildEnvironment(
                build_image=codebuild.LinuxBuildImage.STANDARD_5_0,
                compute_type=codebuild.ComputeType.SMALL,
                environment_variables={
                    'S3_BUCKET': codebuild.BuildEnvironmentVariable(value=bucket.bucket_name)
                }
            ),
            build_spec=codebuild.BuildSpec.from_object({
                'version': '0.2',
                'phases': {
                    'install': {
                        'commands': [
                            'npm install --legacy-peer-deps'
                        ]
                    },
                    'pre_build': {
                        'commands': [
                            'npm install -D webpack-cli'
                        ]
                    },
                    'build': {
                        'commands': [
                            'npm run build'
                        ]
                    },
                    'post_build': {
                        'commands': [
                            'aws s3 sync dist/ s3://$S3_BUCKET/'
                        ]
                    }
                },
                'artifacts': {
                    'files': [
                        '**/*'
                    ],
                    'base-directory': 'dist'
                }
            })
        )

        bucket.grant_read_write(build_project)

        source_output = codepipeline.Artifact()
        source_action = codepipeline_actions.GitHubSourceAction(
            action_name="GitHub_Source",
            owner=config['owner'],
            repo="BaseballStarters",
            oauth_token=github_token,
            output=source_output,
            branch="main"
        )

        build_output = codepipeline.Artifact()
        build_action = codepipeline_actions.CodeBuildAction(
            action_name="Build",
            project=build_project,
            input=source_output,
            outputs=[build_output]
        )

        pipeline = codepipeline.Pipeline(
            self, "Pipeline",
            stages=[
                codepipeline.StageProps(
                    stage_name="Source",
                    actions=[source_action]
                ),
                codepipeline.StageProps(
                    stage_name="Build",
                    actions=[build_action]
                )
            ]
        )
