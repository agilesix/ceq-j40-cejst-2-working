# J40 Workflow Environment Variables and Secrets

## Summary
The Github Action workflows used to build and deploy the Justice40 data pipeline and website depend on some environment variables. Non-sensitive values are stored in the Github repo as [environment variables](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables). Sensitive values that should not be exposed publicly are stored in the repo as [secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).

## List of Environment Variables

### DESTINATION_FOLDER
This is a local environment variable in the Deploy Frontend Main workflow derived from branch name used to name the deploy directory

### SCORE_VERSION
The version of the scoring to be deployed. The current version is "2.0".

## List of Secrets

### CENSUS_API_KEY
The key used to access US Census datasets via its [APIs](https://www.census.gov/data/developers/data-sets.html). A new key can be requested for free [here](https://api.census.gov/data/key_signup.html).

### CLIENT_DEV_AWS_ACCESS_KEY_ID
The AWS access key id used to add/remove files to the S3_WEB_BUCKET, as well as invalidating the Cloudfront distribution belonging to WEB_CDN_ID. This access key requires read/write access to the S3 bucket, and full access to the Cloudfront distribution.

### CLIENT_DEV_AWS_SECRET_ACCESS_KEY
The AWS secret access key belonging to CLIENT_DEV_AWS_ACCESS_KEY_ID.

### DATA_CDN_ID
The ID of the AWS Cloudfront distribution for the S3_DATA_BUCKET.

### DATA_DEV_AWS_ACCESS_KEY_ID
The AWS access key id used to add/remove files to the S3_DATA_BUCKET, as well as invalidating the Cloudfront distribution belonging to DATA_CDN_ID. This access key requires read/write access to the S3 bucket, and full access to the Cloudfront distribution.

### DATA_DEV_AWS_SECRET_ACCESS_KEY
The AWS secret access key belonging to DATA_DEV_AWS_ACCESS_KEY_ID.

### DATA_SOURCE
Local variable that determines if the website should point to a local directory or use the production AWS cdn for backend data. Value can be set to `cdn` or `local`.

### DATA_URL
The full address of the backend data files hostname, currently [https://static-data-screeningtool.geoplatform.gov](https://static-data-screeningtool.geoplatform.gov). This information is public so technically it could be changed to be a non-secret environment variable.

### J40_TOOL_MONITORING_SLACK_ALERTS
The [Slack webhook](https://api.slack.com/messaging/webhooks) address used by the Ping Check workflow to send failure alerts.

### SITE_URL
The full address of the Justice40 Website hostname, currently [https://screeningtool.geoplatform.gov](https://screeningtool.geoplatform.gov). This information is public so technically it could be changed to be a non-secret environment variable.

### S3_DATA_BUCKET
The name of the AWS S3 bucket hosting the files created by the data pipeline application.

### S3_WEBSITE_BUCKET
The name of the AWS S3 bucket hosting the static website files.

### WEB_CDN_ID
The ID of the AWS Cloudfront distribution for the S3_WEBSITE_BUCKET.

## Future Improvements
To improve security, a few items should be addressed. The use of AWS access keys should be replaced by a more secure soultion such as [OpenID Connect (OIDC)](https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/). If continuing to use AWS acccess keys, then key rotation should be implemented using a process such as the one documented [here](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/automatically-rotate-iam-user-access-keys-at-scale-with-aws-organizations-and-aws-secrets-manager.html). The CENSUS_API_KEY could be rotated, but it would have to be a manual process as there is no programmatic way to generate a new key.
