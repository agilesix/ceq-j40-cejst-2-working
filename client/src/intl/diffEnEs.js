const enJson = require('./en.json');
const esJson = require('./es.json');

const enKeys = Object.keys(enJson);
const esKeys = Object.keys(esJson);

const enKeysNotInEs = enKeys.filter((key) => !esKeys.includes(key));
const esKeysNotInEn = esKeys.filter((key) => !enKeys.includes(key));

// Check for missing/outdated keys
if (enKeysNotInEs.length > 0 || esKeysNotInEn.length > 0) {
  console.log('\nKeys to be added to es.json: ');
  console.log(enKeysNotInEs);
  console.log('\nKeys to be removed from es.json: ');
  console.log(esKeysNotInEn);
} else {
  console.log('All keys from en.json appear to exist in es.json');
}

// Check for identical translations
const identicalValues = enKeys.filter((key) => enJson[key].defaultMessage === esJson[key]);
if (identicalValues.length > 0) {
  console.log('\nKeys where es.json is the same as en.json: ');
  console.log(identicalValues);
}
