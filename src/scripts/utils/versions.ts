const checkAppVersion = async () => {
  await $.get(
    "https://api.github.com/repos/WhitigolProd/SnailyCAD-Manager/releases"
  )
    .then((data) => {
      // @ts-expect-error
      let current = require(fromRoot("/package.json")).version;
      let latest = data[0].tag_name;

      log(
        `
      Current App Version: ${current}
      Latest App Version: ${latest}
      `,
        "warning"
      );

      if (current < latest) {
        log("App Versions do NOT match — New Version Available", "error");
        $("#app_current_version")
          .text(current)
          .css("color", "orange")
          .append(`<i class="mio">warning</i>`);
        $("#app_latest_version").text(latest);
        modal("#d-app-version").open();
      }

      if (current > latest) {
        log("Development Version", "info");
      }
    })
    .catch((err) => {
      alert(err);
      throw new Error(err);
    });

  setTimeout(checkAppVersion, 1800000); // Check every 30 minutes for a new version.
};
