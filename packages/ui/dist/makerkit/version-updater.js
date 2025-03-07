'use strict';

var chunkT6MHWQHO_js = require('../chunk-T6MHWQHO.js');
var chunkVRBYCNKS_js = require('../chunk-VRBYCNKS.js');
var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
var chunkP64ZKZSK_js = require('../chunk-P64ZKZSK.js');
require('../chunk-XE52ECJH.js');
require('../chunk-GNZACLC7.js');
var react = require('react');
var lucideReact = require('lucide-react');

var version = null;
var DEFAULT_REFETCH_INTERVAL = 120;
var VERSION_UPDATER_REFETCH_INTERVAL_SECONDS = process.env.NEXT_PUBLIC_VERSION_UPDATER_REFETCH_INTERVAL_SECONDS;
function VersionUpdater(props) {
  const { data } = useVersionUpdater(props);
  const [dismissed, setDismissed] = react.useState(false);
  const [showDialog, setShowDialog] = react.useState(false);
  react.useEffect(() => {
    var _a;
    setShowDialog((_a = data == null ? void 0 : data.didChange) != null ? _a : false);
  }, [data == null ? void 0 : data.didChange]);
  if (!(data == null ? void 0 : data.didChange) || dismissed) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(chunkT6MHWQHO_js.AlertDialog, { open: showDialog, onOpenChange: setShowDialog }, /* @__PURE__ */ React.createElement(chunkT6MHWQHO_js.AlertDialogContent, null, /* @__PURE__ */ React.createElement(chunkT6MHWQHO_js.AlertDialogHeader, null, /* @__PURE__ */ React.createElement(chunkT6MHWQHO_js.AlertDialogTitle, { className: "flex items-center gap-x-2" }, /* @__PURE__ */ React.createElement(lucideReact.RocketIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "common:newVersionAvailable" }))), /* @__PURE__ */ React.createElement(chunkT6MHWQHO_js.AlertDialogDescription, null, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "common:newVersionAvailableDescription" }))), /* @__PURE__ */ React.createElement(chunkT6MHWQHO_js.AlertDialogFooter, null, /* @__PURE__ */ React.createElement(
    chunkP64ZKZSK_js.Button,
    {
      variant: "outline",
      onClick: () => {
        setShowDialog(false);
        setDismissed(true);
      }
    },
    /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "common:back" })
  ), /* @__PURE__ */ React.createElement(chunkP64ZKZSK_js.Button, { onClick: () => window.location.reload() }, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "common:newVersionSubmitButton" })))));
}
function useVersionUpdater(props = {}) {
  var _a;
  const interval = VERSION_UPDATER_REFETCH_INTERVAL_SECONDS ? Number(VERSION_UPDATER_REFETCH_INTERVAL_SECONDS) : DEFAULT_REFETCH_INTERVAL;
  const refetchInterval = ((_a = props.intervalTimeInSecond) != null ? _a : interval) * 1e3;
  const staleTime = refetchInterval / 2;
  return chunkVRBYCNKS_js.useQuery({
    queryKey: ["version-updater"],
    staleTime,
    gcTime: refetchInterval,
    refetchIntervalInBackground: true,
    refetchInterval,
    initialData: null,
    queryFn: async () => {
      const response = await fetch("/version");
      const currentVersion = await response.text();
      const oldVersion = version;
      version = currentVersion;
      const didChange = oldVersion !== null && currentVersion !== oldVersion;
      return {
        currentVersion,
        oldVersion,
        didChange
      };
    }
  });
}

exports.VersionUpdater = VersionUpdater;
//# sourceMappingURL=version-updater.js.map
//# sourceMappingURL=version-updater.js.map