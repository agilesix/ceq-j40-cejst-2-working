# Artifacts

The below sections show how the `data/data-pipeline/data_pipeline/data` directory evolves as you run each workflow step in sequence:

## 1. `etl-run`

## 2. `score-run`

```diff
  .
  ├── score
  │   ├── csv
+ │   │   └── full
+ │   │       └── usa.csv
  │   ├── downloadable
  │   ├── geojson
  │   ├── shapefile
  │   └── tiles
  └── tribal
      ├── csv
+     ├── geographic_data
+     │   └── usa.json
      ├── geojson
      └── tiles
```

## 3. `generate-score-post`

```diff
  .
  ├── score
  │   ├── csv
+ │   │   ├── full
+ │   │   │   ├── usa_counties.csv
  │   │   │   └── usa.csv
+ │   │   └── tiles
+ │   │       ├── tile_indexes.json
  │   │       └── usa.csv
  │   ├── downloadable
+ │   │   ├── beta-codebook.csv
+ │   │   ├── beta-communities.csv
+ │   │   ├── beta-communities-csv.zip
+ │   │   ├── beta-communities.xlsx
+ │   │   ├── beta-communities-xls.zip
+ │   │   └── beta-data-documentation.zip
  │   ├── geojson
+ │   ├── search
+ │   │   └── tracts.json
  │   ├── shapefile
  │   └── tiles
  └── tribal
      ├── csv
      ├── geographic_data
      │   └── usa.json
      ├── geojson
      └── tiles
```

## 4. `geo-score`

```diff
  .
  ├── score
  │   ├── csv
  │   │   ├── full
  │   │   │   ├── usa_counties.csv
  │   │   │   └── usa.csv
  │   │   └── tiles
  │   │       ├── tile_indexes.json
  │   │       └── usa.csv
  │   ├── downloadable
  │   │   ├── beta-codebook.csv
  │   │   ├── beta-communities.csv
  │   │   ├── beta-communities-csv.zip
  │   │   ├── beta-communities.xlsx
  │   │   ├── beta-communities-xls.zip
  │   │   ├── beta-data-documentation.zip
+ │   │   └── beta-shapefile-codebook.zip
  │   ├── geojson
+ │   │   ├── usa-high.json
+ │   │   └── usa-low.json
  │   ├── search
  │   │   └── tracts.json
  │   ├── shapefile
+ │   │   ├── usa.cpg
+ │   │   ├── usa.dbf
+ │   │   ├── usa.prj
+ │   │   ├── usa.shp
+ │   │   ├── usa.shx
+ │   │   └── usa.zip
  │   └── tiles
  └── tribal
      ├── csv
      ├── geographic_data
      │   └── usa.json
      ├── geojson
      └── tiles
```

## 5. `generate-map-tiles`

```diff
  .
  ├── score
  │   ├── ...
  │   └── tiles
+ │       ├── high
+ │       │   ├── 5
+ │       │   │   └── 0
+ │       │   │       ├── ...
+ │       │   │       └── 17.pbf
+ │           ├── ...
+ │       │   ├── 11
+ │       │   │   ├── 4
+ │       │   │   │   ├── 679.pbf
+ │       │   │   │   ├── ...
+ │       │   │   │   └── 684.pbf
+ │       │   │   ├── ...
+ │       │   │   └── 2047
+ │       │   │       ├── 676.pbf
+ │       │   │       └── 677.pbf
+ │       │   ├── metadata.json
+ │       │   └── usa_high.mbtiles
+ │       └── low
+ │           ├── 0
+ │           │   └── 0
+ │           │       └── 0.pbf
+ │           ├── ...
+ │           ├── 7
+ │           │   ├── ...
+ │           │   ├── 40
+ │           │   │   ├── ...
+ │           │   │   └── 57.pbf
+ │           │   └── 41
+ │           │       └── 57.pbf
+ │           ├── metadata.json
+ │           └── usa_low.mbtiles
  └── tribal
      └── ...
```

## 5. `etl-run --dataset tribal`

```diff
  .
  ├── score
  │   └── ...
  └── tribal
      ├── csv
      ├── geographic_data
      │   └── usa.json
      ├── geojson
      └── tiles
+         └── usa.mbtiles
```

## 6. ` generate-map-tiles --generate-tribal-layer`

```diff
  .
  ├── score
  │   └── ...
  └── tribal
      ├── csv
      ├── geographic_data
      │   └── usa.json
      ├── geojson
      └── tiles
+         ├── 0
+         │   └── 0
+         │       └── 0.pbf
+         ├── 1
+         │   └── 0
+         │       └── 0.pbf
+         ├── 11
+         │   ├── 32
+         │   │   └── 674.pbf
+         │   ├── ...
+         │   └── 642
+         │       ├── 736.pbf
+         │       └── 737.pbf
+         ├── metadata.json
          └── usa.mbtiles
```
