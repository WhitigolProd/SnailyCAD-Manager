const checkAppVersion = () => {
  $.get(
    "https://api.github.com/repos/WhitigolProd/SnailyCAD-Manager/releases"
  ).then((data) => {
    // @ts-expect-error
    let current = require(fromRoot("/package.json")).version;
    let latest = data[0].tag_name;

    if (current < latest) {
    }
  });
};
