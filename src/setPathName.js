let displayNames = {};

module.exports = {
    resetCache() {
        displayNames = {};
    },
    setPathName(path, name, types) {
        let abortAppend;

        if (!name || displayNames[name]) {
            return;
        }

        const objectArg = path.node.arguments[0];

        if (
            !types.isObjectExpression(objectArg) ||
            !objectArg.properties.some((property) => property.key && property.key.name === 'create')
        ) {
            return;
        }

        const componentNameProperty = types.objectProperty(
            types.identifier('componentName'),
            types.stringLiteral(name)
        );

        displayNames[name] = true;

        objectArg.properties.push(componentNameProperty);
    },
};
