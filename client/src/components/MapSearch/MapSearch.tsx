/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {LngLatBoundsLike} from 'maplibre-gl';
import {useIntl} from 'gatsby-plugin-intl';
import {Search} from '@trussworks/react-uswds';
import {useWindowSize} from 'react-use';
import {RefObject} from 'react';
import {MapRef} from 'react-map-gl';
import * as JsSearch from 'js-search';
import * as constants from '../../data/constants';

import MapSearchMessage from '../MapSearchMessage';

import * as styles from './MapSearch.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

interface IMapSearch {
  goToPlace(bounds: LngLatBoundsLike):void;
  mapRef:RefObject<MapRef>;
  selectFeatureOnMap: (feature: any) => void;
}

interface ISearchTractRecord {
  GEOID10: string;
  INTPTLAT10: string;
  INTPTLON10: string;
}

const MapSearch = ({goToPlace, mapRef, selectFeatureOnMap}:IMapSearch) => {
  // State to hold if the search results are empty or not:
  const [isSearchResultsNull, setIsSearchResultsNull] = useState(false);
  const intl = useIntl();

  /**
   * At compile-time, the width/height returned by useWindowSize will be X. When the client requests the
   * app on run-time from CDN, and the app hydrates, reconcilation no longer occurs and the client is forced
   * to use X.
   *
   * To avoid this, we set the placeholder text as a state variable. We also create a useEffect that updates
   * that state whenenver the width changes.
   *
   */
  const {width, height} = useWindowSize();
  const [placeholderText, setPlaceholderText]= useState(EXPLORE_COPY.MAP.SEARCH_PLACEHOLDER);
  const [tractSearch, setTractSearch] = useState<JsSearch.Search | null>(null);

  /**
   * Gets the tract search data and loads in the state.
   */
  const getTractSearchData = async () => {
    const searchDataUrl = `${constants.TILE_BASE_URL}/${constants.MAP_TRACT_SEARCH_PATH}`;
    fetch(searchDataUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`${response.statusText} error with status code of ${response.status}`);
          }
        })
        .then((data) => {
          // We use JsSearch to make it easy to load and quick to search.
          const search = new JsSearch.Search('GEOID10');
          search.indexStrategy = new JsSearch.ExactWordIndexStrategy();
          search.addIndex('GEOID10');
          search.addDocuments(data);
          setTractSearch(search);
        })
        .catch((error) =>
          console.error('Unable to read search tract table:', error));
  };

  useEffect( () => {
   width > height ? setPlaceholderText(EXPLORE_COPY.MAP.SEARCH_PLACEHOLDER): setPlaceholderText(EXPLORE_COPY.MAP.SEARCH_PLACEHOLDER_MOBILE);
  }, [width]);

  useEffect(()=>{
    getTractSearchData();
  }, []);

  /**
   * Searchs for a given Census tract ID.
   * @param {string} tract the 11 digit tract ID as a string
   */
  const searchForTract = async (tract: string) => {
    /**
     * Wait for the map to be done loading and moving.
     * @param {function()} callback the callback to run after the map is ready
     */
    const waitforMap = (callback: () => void): void => {
      const isMapReady = !!mapRef.current &&
        mapRef.current.getMap().isStyleLoaded() &&
        mapRef.current.getMap().isSourceLoaded(constants.HIGH_ZOOM_SOURCE_NAME);
      if (isMapReady) {
        callback();
      } else {
        setTimeout(() => waitforMap(callback), 200);
      }
    };

    setIsSearchResultsNull(true);

    // We create a bounding box just to get the tract in the view box.
    // The size is not important.
    const BOUNDING_BOX_SIZE_DD = 0.1;
    if (tractSearch) {
      // Convert 10 digit tracts to 11.
      const searchTerm = tract.length == 10 ? '0' + tract : tract;
      const result = tractSearch.search(searchTerm);
      if (result.length > 0) {
        const searchTractRecord = result[0] as ISearchTractRecord;
        const lat = Number(searchTractRecord.INTPTLAT10);
        const lon = Number(searchTractRecord.INTPTLON10);
        const boundingBox = [
          (lat - (BOUNDING_BOX_SIZE_DD / 2)).toString(),
          (lat + (BOUNDING_BOX_SIZE_DD / 2)).toString(),
          (lon - (BOUNDING_BOX_SIZE_DD / 2)).toString(),
          (lon + (BOUNDING_BOX_SIZE_DD / 2)).toString(),
        ];
        const [latMin, latMax, longMin, longMax] = boundingBox;
        setIsSearchResultsNull(false);

        // Now move the map and select the tract.
        goToPlace([[Number(longMin), Number(latMin)], [Number(longMax), Number(latMax)]]);
        waitforMap(() => {
          // Set up a one-shot event handler to fire when the flyTo arrives at its destination.  Once the
          // tract is in view of the map.  mpRef.current will always be valid here...
          mapRef.current?.getMap().once('idle', () => {
            const geoidSearchResults = mapRef.current?.getMap().querySourceFeatures(constants.HIGH_ZOOM_SOURCE_NAME, {
              sourceLayer: constants.SCORE_SOURCE_LAYER,
              validate: true,
              filter: ['==', constants.GEOID_PROPERTY, searchTerm],
            });
            if (geoidSearchResults && geoidSearchResults.length > 0) {
              selectFeatureOnMap(geoidSearchResults[0]);
            }
          });
        });
      }
    }
  };

  /**
   * Searchs for a given location such as address, zip, etc. This method will
   * will fetch data from the PSM API and return the results as JSON and
   * results to US only. If the data is valid, destructure the boundingBox
   * values from the search results. Finally, is pans the map to the location.
   * @param {string} searchTerm the location to search for
   */
  const searchForLocation = async (searchTerm: string) => {
    const searchResults = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&countrycodes=us`,
        {
          mode: 'cors',
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }
          return response.json();
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    console.log('Nominatum search results: ', searchResults);

    // If results are valid, set isSearchResultsNull to false and pan map to location:
    if (searchResults && searchResults.length > 0) {
      setIsSearchResultsNull(false);
      const [latMin, latMax, longMin, longMax] = searchResults[0].boundingbox;
      goToPlace([[Number(longMin), Number(latMin)], [Number(longMax), Number(latMax)]]);
    } else {
      setIsSearchResultsNull(true);
    }
  };

  /**
    Searches for a given search term upon clicking on the search button.
    @param {React.FormEvent<HTMLFormElement>} event the click event
  */
  const onSearchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const searchTerm = (event.currentTarget.elements.namedItem('search') as HTMLInputElement).value;

    // If the search term a Census tract
    const isTract = /^\d{10,11}$/.test(searchTerm);
    if (isTract) {
      searchForTract(searchTerm);
    } else {
      searchForLocation(searchTerm);
    }
  };

  return (
    <div className={styles.mapSearchContainer}>
      <MapSearchMessage isSearchResultsNull={isSearchResultsNull} />
      <Search
        placeholder={intl.formatMessage(placeholderText)}
        size="small"
        onSubmit={(e) => onSearchHandler(e)}
      />
    </div>
  );
};

export default MapSearch;
