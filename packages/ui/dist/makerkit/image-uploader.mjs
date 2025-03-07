import { Label } from '../chunk-AC4KW2J5.mjs';
import { Trans } from '../chunk-IOTGEBOC.mjs';
import { Button } from '../chunk-BSMUWSCW.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import { If } from '../chunk-7AKVYG64.mjs';
import { __spreadProps, __spreadValues, __objRest } from '../chunk-C5AMXPVO.mjs';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Image, UploadCloud, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Image$1 from 'next/image';

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
  } = _b, props = __objRest(_b, [
    "children",
    "image",
    "onClear",
    "onInput",
    "onValueChange",
    "ref",
    "visible"
  ]);
  var _a2, _b2;
  const localRef = useRef(null);
  const [state, setState] = useState({
    image,
    fileName: ""
  });
  const onInputChange = useCallback(
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
  const onRemove = useCallback(() => {
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
  const imageRemoved = useCallback(
    (e) => {
      e.preventDefault();
      onRemove();
    },
    [onRemove]
  );
  const setRef = useCallback(
    (input) => {
      localRef.current = input;
      if (typeof forwardedRef === "function") {
        forwardedRef(localRef.current);
      }
    },
    [forwardedRef]
  );
  useEffect(() => {
    setState((state2) => __spreadProps(__spreadValues({}, state2), { image }));
  }, [image]);
  useEffect(() => {
    if (!image) {
      onRemove();
    }
  }, [image, onRemove]);
  const Input = () => /* @__PURE__ */ React.createElement(
    "input",
    __spreadProps(__spreadValues({}, props), {
      className: cn("hidden", props.className),
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
      __spreadProps(__spreadValues({}, props), {
        id: "file-input",
        className: cn("hidden", props.className),
        ref: setRef,
        type: "file",
        onInput: onInputChange,
        accept: "image/*",
        "aria-labelledby": "image-upload-input"
      })
    ),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex" }, /* @__PURE__ */ React.createElement(If, { condition: !state.image }, /* @__PURE__ */ React.createElement(UploadCloud, { className: "text-muted-foreground h-5" })), /* @__PURE__ */ React.createElement(If, { condition: state.image }, /* @__PURE__ */ React.createElement(
      Image$1,
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
    ))), /* @__PURE__ */ React.createElement(If, { condition: !state.image }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-auto" }, /* @__PURE__ */ React.createElement(Label, { className: "cursor-pointer text-xs" }, children))), /* @__PURE__ */ React.createElement(If, { condition: state.image }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-auto" }, /* @__PURE__ */ React.createElement(
      If,
      {
        condition: state.fileName,
        fallback: /* @__PURE__ */ React.createElement(Label, { className: "cursor-pointer truncate text-xs" }, children)
      },
      /* @__PURE__ */ React.createElement(Label, { className: "truncate text-xs" }, state.fileName)
    ))), /* @__PURE__ */ React.createElement(If, { condition: state.image }, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "icon",
        className: "h-5! w-5!",
        onClick: imageRemoved
      },
      /* @__PURE__ */ React.createElement(X, { className: "h-4" })
    )))
  );
};

// src/makerkit/image-uploader.tsx
function ImageUploader(props) {
  var _a;
  const [image, setImage] = useState(props.value);
  const { setValue, register } = useForm({
    defaultValues: {
      value: props.value
    },
    mode: "onChange",
    reValidateMode: "onChange"
  });
  const control = register("value");
  const onClear = useCallback(() => {
    props.onValueChange(null);
    setValue("value", null);
    setImage("");
  }, [props, setValue]);
  const onValueChange = useCallback(
    ({ image: image2, file }) => {
      props.onValueChange(file);
      setImage(image2);
    },
    [props]
  );
  const Input = () => /* @__PURE__ */ React.createElement(
    ImageUploadInput,
    __spreadProps(__spreadValues({}, control), {
      accept: "image/*",
      className: "absolute h-full w-full",
      visible: false,
      multiple: false,
      onValueChange
    })
  );
  useEffect(() => {
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
  ), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Button, { onClick: onClear, size: "sm", variant: "ghost" }, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "common:clear" }))));
}
function FallbackImage(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement(
    "label",
    {
      htmlFor: "image-upload",
      className: "border-border animate-in fade-in zoom-in-50 hover:border-primary relative flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-full border"
    },
    /* @__PURE__ */ React.createElement(Image, { className: "text-primary h-8" }),
    props.children
  ), props.descriptionSection);
}

export { ImageUploader };
//# sourceMappingURL=image-uploader.mjs.map
//# sourceMappingURL=image-uploader.mjs.map