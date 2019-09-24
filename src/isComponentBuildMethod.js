const memberExpressionHasObjectCalledComponents = (member) =>
    member.object && member.object.name && member.object.name.toLowerCase() === 'components';

const memberExpressionHasPropertyCalledBuild = (member) =>
    member.property && member.property.name && member.property.name.toLowerCase() === 'build';

module.exports = function(path, types) {
    if (!path.node.callee) {
        return false;
    }

    return (
        types.isMemberExpression(path.node.callee) &&
        memberExpressionHasObjectCalledComponents(path.node.callee) &&
        memberExpressionHasPropertyCalledBuild(path.node.callee)
    );
};
