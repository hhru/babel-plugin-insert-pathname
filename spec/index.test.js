const path = require('path');
const fs = require('fs');
const { transformFileSync } = require('@babel/core');

const plugin = path.join(__dirname, '../src/index.js');
const fixturesDirEnv = path.join(__dirname, 'fixtures/env');
const fixturesDirWithoutEnv = path.join(__dirname, 'fixtures/withoutEnv');

const trim = (str) => {
    return str.replace(/^\s+|\s+$/, '');
};

const transformFile = (filename, isEnvPreset) =>
    transformFileSync(filename, {
        babelrc: false,
        plugins: [plugin],
        presets: isEnvPreset ? ['@babel/preset-env'] : [],
    }).code;

describe('Transform add display name in react elements with env presets', () => {
    fs.readdirSync(fixturesDirEnv).forEach((fixture) => {
        const actual = transformFile(path.join(fixturesDirEnv, fixture, 'input.js'), true);
        const expected = fs.readFileSync(path.join(fixturesDirEnv, fixture, 'expected.js'), 'utf8');

        it(path.basename(fixture), () => {
            expect(trim(actual)).toEqual(trim(expected));            
        });
    });
});

describe('Transform add display name in react elements without env presets', function() {
    fs.readdirSync(fixturesDirWithoutEnv).forEach(function(fixture) {
        const actual = transformFile(path.join(fixturesDirWithoutEnv, fixture, 'input.js'));
        const expected = fs.readFileSync(path.join(fixturesDirWithoutEnv, fixture, 'expected.js'), 'utf8');

        it(path.basename(fixture), function() {
            expect(trim(actual)).toEqual(trim(expected));
        });
    });
});
