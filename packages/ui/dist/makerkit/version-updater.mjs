import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '../chunk-SQWQIB65.mjs';
import { useQuery } from '../chunk-S6SGJK5G.mjs';
import { Trans } from '../chunk-IOTGEBOC.mjs';
import { Button } from '../chunk-BSMUWSCW.mjs';
import '../chunk-WKYHJYPA.mjs';
import '../chunk-C5AMXPVO.mjs';
import { useState, useEffect } from 'react';
import { RocketIcon } from 'lucide-react';

var version = null;
var DEFAULT_REFETCH_INTERVAL = 120;
var VERSION_UPDATER_REFETCH_INTERVAL_SECONDS = process.env.NEXT_PUBLIC_VERSION_UPDATER_REFETCH_INTERVAL_SECONDS;
function VersionUpdater(props) {
  const { data } = useVersionUpdater(props);
  const [dismissed, setDismissed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    var _a;
    setShowDialog((_a = data == null ? void 0 : data.didChange) != null ? _a : false);
  }, [data == null ? void 0 : data.didChange]);
  if (!(data == null ? void 0 : data.didChange) || dismissed) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(AlertDialog, { open: showDialog, onOpenChange: setShowDialog }, /* @__PURE__ */ React.createElement(AlertDialogContent, null, /* @__PURE__ */ React.createElement(AlertDialogHeader, null, /* @__PURE__ */ React.createElement(AlertDialogTitle, { className: "flex items-center gap-x-2" }, /* @__PURE__ */ React.createElement(RocketIcon, { className: "h-4" }), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "common:newVersionAvailable" }))), /* @__PURE__ */ React.createElement(AlertDialogDescription, null, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "common:newVersionAvailableDescription" }))), /* @__PURE__ */ React.createElement(AlertDialogFooter, null, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "outline",
      onClick: () => {
        setShowDialog(false);
        setDismissed(true);
      }
    },
    /* @__PURE__ */ React.createElement(Trans, { i18nKey: "common:back" })
  ), /* @__PURE__ */ React.createElement(Button, { onClick: () => window.location.reload() }, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "common:newVersionSubmitButton" })))));
}
function useVersionUpdater(props = {}) {
  var _a;
  const interval = VERSION_UPDATER_REFETCH_INTERVAL_SECONDS ? Number(VERSION_UPDATER_REFETCH_INTERVAL_SECONDS) : DEFAULT_REFETCH_INTERVAL;
  const refetchInterval = ((_a = props.intervalTimeInSecond) != null ? _a : interval) * 1e3;
  const staleTime = refetchInterval / 2;
  return useQuery({
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

export { VersionUpdater };
//# sourceMappingURL=version-updater.mjs.map
//# sourceMappingURL=version-updater.mjs.map