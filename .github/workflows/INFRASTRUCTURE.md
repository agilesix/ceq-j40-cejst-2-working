# Justice40 Website Infrastructure

## Summary
The infrastructure setup to deploy the Justice40 website consists of two AWS S3 buckets, one for the backend data and one for the frontend web client. Each S3 bucket has an AWS Cloudfront distribution set up to serve the bucket contents. Each Cloudfront distribution has a .gov dns hostname pointed to itself.

### Data Bucket
The Data Bucket contains two main directories: `data-sources` and `data-versions`. The `data-sources` folder contains cached copies of the data sets used by the etl pipeline. Unprocessed data sets are in individual directories under a sub-directory called `raw-data-sources`. The `data-verions` folder contains the uploaded output of the etl pipeline. This includes scoring files and map tile files. The files are uploaded to a subfolder named for the version of the scoring used for file creation. The current version is `2.0`.

```
  .
  ├── data-sources
  │   ├── raw-data-sources
  │   │   └── ...
  │   └── ...
  └── data-versions
      ├── 1.0
      │   └── ...s
      ├── 2.0
      │   └── data
      │       ├── csv
      │       │   └── ...
      │       ├── downloadable
      │       │   └── ...
      │       ├── geojson
      │       │   └── ...
      │       ├── search
      │       │   └── ...
      │       ├── shapefile
      │       │   └── ...
      │       └── tiles
      │           └── ...
      └── ...
```

### Data Cloudfront Distribution
The Data Cloudfront Distribution is the CDN for Data Bucket. The data bucket should be used as the origin for the cloudfront distribution.

### Website Bucket
The Website Bucket contains the static website files. Instead of deploying to the top level of the bucket, files are deployed under a folder called justice40-tool. In order to support multiple environmetns, files are deployed to a folder named for the environment or branch in the Github Repo that deployed the files. Currently the production website is deployed to a folder called `main`. A staging environment could be deployed in parallel to a folder named `staging`.

```
  .
  └── justice40-tool
      ├── main
      │   └── ...
      └── ...
```

### Website Cloudfront Distrubtion
The Website Cloudfront Distribution is the CDN for the Website Bucket. The website bucket should be used as the origin for the cloudfront distribution. Furthermore, the origin path for the distribution should be set to file path of the static website files that are uploaded, else the website will not display properly. Currently the productin origin path is `/justice40-tool/main`.
