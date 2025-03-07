'use strict';

var chunkLSUHT4FP_js = require('../chunk-LSUHT4FP.js');
var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
var chunkP64ZKZSK_js = require('../chunk-P64ZKZSK.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkJMDHW6WM_js = require('../chunk-JMDHW6WM.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var react = require('react');
var lucideReact = require('lucide-react');
var reactHookForm = require('react-hook-form');
var Image = require('next/image');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Image__default = /*#__PURE__*/_interopDefault(Image);

var IMAGE_SIZE = 22;
var ImageUploadInput = function ImageUploadInputComponent(_a) {
  var _b = _a, {
    children,
    image,
    onClear,
    onInput,
    onValueChange,
    ref: forwardedRef,
    visible = true
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "children",
    "image",
    "onClear",
    "onInput",
    "onValueChange",
    "ref",
    "visible"
  ]);
  var _a2, _b2;
  const localRef = react.useRef(null);
  const [state, setState] = react.useState({
    image,
    fileName: ""
  });
  const onInputChange = react.useCallback(
    (e) => {
      e.preventDefault();
      const files = e.currentTarget.files;
      if (files == null ? void 0 : files.length) {
        const file = files[0];
        if (!file) {
          return;
        }
        const data = URL.createObjectURL(file);
        setState({
          image: data,
          fileName: file.name
        });
        if (onValueChange) {
          onValueChange({
            image: data,
            file
          });
        }
      }
      if (onInput) {
        onInput(e);
      }
    },
    [onInput, onValueChange]
  );
  const onRemove = react.useCallback(() => {
    setState({
      image: "",
      fileName: ""
    });
    if (localRef.current) {
      localRef.current.value = "";
    }
    if (onClear) {
      onClear();
    }
  }, [onClear]);
  const imageRemoved = react.useCallback(
    (e) => {
      e.preventDefault();
      onRemove();
    },
    [onRemove]
  );
  const setRef = react.useCallback(
    (input) => {
      localRef.current = input;
      if (typeof forwardedRef === "function") {
        forwardedRef(localRef.current);
      }
    },
    [forwardedRef]
  );
  react.useEffect(() => {
    setState((state2) => chunkGNZACLC7_js.__spreadProps(chunkGNZACLC7_js.__spreadValues({}, state2), { image }));
  }, [image]);
  react.useEffect(() => {
    if (!image) {
      onRemove();
    }
  }, [image, onRemove]);
  const Input = () => /* @__PURE__ */ React.createElement(
    "input",
    chunkGNZACLC7_js.__spreadProps(chunkGNZACLC7_js.__spreadValues({}, props), {
      className: chunkXE52ECJH_js.cn("hidden", props.className),
      ref: setRef,
      type: "file",
      onInput: onInputChange,
      accept: "image/*",
      "aria-labelledby": "image-upload-input"
    })
  );
  if (!visible) {
    return /* @__PURE__ */ React.createElement(Input, null);
  }
  return /* @__PURE__ */ React.createElement(
    "label",
    {
      id: "image-upload-input",
      htmlFor: "file-input",
      className: "border-input bg-background ring-primary ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring relative flex h-10 w-full cursor-pointer rounded-md border border-dashed px-3 py-2 text-sm ring-offset-2 outline-hidden transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium focus:ring-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
    },
    /* @__PURE__ */ React.createElement(
      "input",
      chunkGNZACLC7_js.__spreadProps(chunkGNZACLC7_js.__spreadValues({}, props), {
        id: "file-input",
        className: chunkXE52ECJH_js.cn("hidden", props.className),
        ref: setRef,
        type: "file",
        onInput: onInputChange,
        accept: "image/*",
        "aria-labelledby": "image-upload-input"
      })
    ),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex" }, /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: !state.image }, /* @__PURE__ */ React.createElement(lucideReact.UploadCloud, { className: "text-muted-foreground h-5" })), /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: state.image }, /* @__PURE__ */ React.createElement(
      Image__default.default,
      {
        loading: "lazy",
        style: {
          width: IMAGE_SIZE,
          height: IMAGE_SIZE
        },
        className: "object-contain",
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        src: (_a2 = state.image) != null ? _a2 : "",
        alt: (_b2 = props.alt) != null ? _b2 : ""
      }
    ))), /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: !state.image }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-auto" }, /* @__PURE__ */ React.createElement(chunkLSUHT4FP_js.Label, { className: "cursor-pointer text-xs" }, children))), /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: state.image }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-auto" }, /* @__PURE__ */ React.createElement(
      chunkJMDHW6WM_js.If,
      {
        condition: state.fileName,
        fallback: /* @__PURE__ */ React.createElement(chunkLSUHT4FP_js.Label, { className: "cursor-pointer truncate text-xs" }, children)
      },
      /* @__PURE__ */ React.createElement(chunkLSUHT4FP_js.Label, { className: "truncate text-xs" }, state.fileName)
    ))), /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: state.image }, /* @__PURE__ */ React.createElement(
      chunkP64ZKZSK_js.Button,
      {
        size: "icon",
        className: "h-5! w-5!",
        onClick: imageRemoved
      },
      /* @__PURE__ */ React.createElement(lucideReact.X, { className: "h-4" })
    )))
  );
};

// src/makerkit/image-uploader.tsx
function ImageUploader(props) {
  var _a;
  const [image, setImage] = react.useState(props.value);
  const { setValue, register } = reactHookForm.useForm({
    defaultValues: {
      value: props.value
    },
    mode: "onChange",
    reValidateMode: "onChange"
  });
  const control = register("value");
  const onClear = react.useCallback(() => {
    props.onValueChange(null);
    setValue("value", null);
    setImage("");
  }, [props, setValue]);
  const onValueChange = react.useCallback(
    ({ image: image2, file }) => {
      props.onValueChange(file);
      setImage(image2);
    },
    [props]
  );
  const Input = () => /* @__PURE__ */ React.createElement(
    ImageUploadInput,
    chunkGNZACLC7_js.__spreadProps(chunkGNZACLC7_js.__spreadValues({}, control), {
      accept: "image/*",
      className: "absolute h-full w-full",
      visible: false,
      multiple: false,
      onValueChange
    })
  );
  react.useEffect(() => {
    setImage(props.value);
  }, [props.value]);
  if (!image) {
    return /* @__PURE__ */ React.createElement(FallbackImage, { descriptionSection: props.children }, /* @__PURE__ */ React.createElement(Input, null));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement(
    "label",
    {
      htmlFor: "image-upload",
      className: "animate-in fade-in zoom-in-50 relative h-20 w-20"
    },
    /* @__PURE__ */ React.createElement(
      "img",
      {
        alt: (_a = props.alt) != null ? _a : "",
        className: "h-full w-full rounded-full object-cover",
        src: props.url
      }
    ),
    /* @__PURE__ */ React.createElement(Input, null)
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(chunkP64ZKZSK_js.Button, { onClick: onClear, size: "sm", variant: "ghost" }, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "common:clear" }))));
}
function FallbackImage(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement(
    "label",
    {
      htmlFor: "image-upload",
      className: "border-border animate-in fade-in zoom-in-50 hover:border-primary relative flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-full border"
    },
    /* @__PURE__ */ React.createElement(lucideReact.Image, { className: "text-primary h-8" }),
    props.children
  ), props.descriptionSection);
}

exports.ImageUploader = ImageUploader;
//# sourceMappingURL=image-uploader.js.map
//# sourceMappingURL=image-uploader.js.map