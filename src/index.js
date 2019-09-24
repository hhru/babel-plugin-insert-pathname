const isComponentBuildMethod = require('./isComponentBuildMethod');
const { setPathName, resetCache } = require('./setPathName');
const extractComponentName = require('./extractComponentName');

function transform({ types }) {
    return {
        name: '@hh.ru/babel-plugin-insert-pathname',
        visitor: {
            // Root point
            Program() {
                resetCache();
            },
            CallExpression(path, state) {
                if (isComponentBuildMethod(path, types)) {
                    setPathName(path, extractComponentName(state), types);
                }
            },
        },
    };
}

module.exports = transform;
