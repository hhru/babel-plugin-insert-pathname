const pathNode = require('path');

module.exports = (state) => {
    const extension = pathNode.extname(state.filename);
    const name = pathNode.basename(state.filename, extension);
    const lastTwoFoldersWithFileName = state.filename.match(`([^/]+)\/([^/]+)\/${name}`);

    return `${lastTwoFoldersWithFileName && lastTwoFoldersWithFileName[0]}`;
};
