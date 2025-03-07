import { Form, FormField, FormItem, FormControl, FormMessage } from '../../chunk-57QD7T45.mjs';
import { CardHeader, CardTitle, CardDescription } from '../../chunk-V7DJTX2I.mjs';
import { Alert, AlertTitle, AlertDescription } from '../../chunk-XXXIT6B4.mjs';
import '../../chunk-AC4KW2J5.mjs';
import { Input } from '../../chunk-ET5E7HXF.mjs';
import { Heading } from '../../chunk-MARFEKMV.mjs';
import '../../chunk-IOTGEBOC.mjs';
import { Button } from '../../chunk-BSMUWSCW.mjs';
import { Spinner } from '../../chunk-GVYZXRIL.mjs';
import { cn } from '../../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues, __spreadProps } from '../../chunk-C5AMXPVO.mjs';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React2, { useState, useCallback } from 'react';

var HeroTitle = function HeroTitleComponent(_a) {
  var _b = _a, { children, className } = _b, props = __objRest(_b, ["children", "className"]);
  const Comp = props.asChild ? Slot : "h1";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadValues({
      className: cn(
        "hero-title flex flex-col text-center font-sans text-4xl font-semibold tracking-tighter sm:text-6xl lg:max-w-5xl lg:text-7xl xl:text-[4.5rem] dark:text-white",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(Slottable, null, children)
  );
};
var GradientSecondaryText = function GradientSecondaryTextComponent(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  const Comp = props.asChild ? Slot : "span";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadValues({
      className: cn(
        "dark:from-foreground/60 dark:to-foreground text-secondary-foreground dark:bg-linear-to-r dark:bg-clip-text dark:text-transparent",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(Slottable, null, props.children)
  );
};

// src/makerkit/marketing/pill.tsx
var Pill = function PillComponent(_a) {
  var _b = _a, { className, asChild } = _b, props = __objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? Slot : "h3";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadValues({
      className: cn(
        "bg-muted/50 flex items-center gap-x-1.5 rounded-full border px-2 py-1.5 pr-2 text-center text-sm font-medium text-transparent",
        className
      )
    }, props),
    props.label && /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "text-primary-foreground bg-primary rounded-2xl border px-1.5 py-0.5 text-xs font-bold tracking-tight"
      },
      props.label
    ),
    /* @__PURE__ */ React.createElement(Slottable, null, /* @__PURE__ */ React.createElement(
      GradientSecondaryText,
      {
        className: "flex items-center gap-x-2 font-semibold tracking-tight"
      },
      props.children
    ))
  );
};
var PillActionButton = (_a) => {
  var _b = _a, { asChild } = _b, props = __objRest(_b, ["asChild"]);
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadProps(__spreadValues({}, props), {
      className: "text-secondary-foreground bg-input active:bg-primary active:text-primary-foreground hover:ring-muted-foreground/50 rounded-full px-1.5 py-1.5 text-center text-sm font-medium ring ring-transparent transition-colors"
    }),
    props.children
  );
};

// src/makerkit/marketing/gradient-text.tsx
var GradientText = function GradientTextComponent(_a) {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    "span",
    __spreadValues({
      className: cn(
        "bg-linear-to-r bg-clip-text text-transparent",
        className
      )
    }, props),
    children
  );
};

// src/makerkit/marketing/hero.tsx
function Hero({
  pill,
  title,
  subtitle,
  cta,
  image,
  className,
  animate = true
}) {
  return /* @__PURE__ */ React.createElement("div", { className: cn("mx-auto flex flex-col space-y-20", className) }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        MozAnimationDuration: "100ms"
      },
      className: cn(
        "mx-auto flex flex-1 flex-col items-center justify-center duration-800 md:flex-row",
        {
          "animate-in fade-in zoom-in-90 slide-in-from-top-24": animate
        }
      )
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-1 flex-col items-center gap-y-6 xl:gap-y-8 2xl:gap-y-12" }, pill && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cn({
          "animate-in fade-in fill-mode-both delay-300 duration-700": animate
        })
      },
      pill
    ), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center gap-y-6" }, /* @__PURE__ */ React.createElement(HeroTitle, null, title), subtitle && /* @__PURE__ */ React.createElement("div", { className: "flex max-w-lg" }, /* @__PURE__ */ React.createElement("h3", { className: "text-muted-foreground p-0 text-center font-sans text-2xl font-normal tracking-tight" }, subtitle))), cta && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cn({
          "animate-in fade-in fill-mode-both delay-500 duration-1000": animate
        })
      },
      cta
    ))
  ), image && /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        MozAnimationDuration: "100ms"
      },
      className: cn("container mx-auto flex justify-center py-8", {
        "animate-in fade-in zoom-in-90 slide-in-from-top-32 fill-mode-both delay-600 duration-1000": animate
      })
    },
    image
  ));
}

// src/makerkit/marketing/secondary-hero.tsx
var SecondaryHero = function SecondaryHeroComponent(_a) {
  var _b = _a, {
    className,
    pill,
    heading,
    subheading,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "pill",
    "heading",
    "subheading",
    "children"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col items-center space-y-6 text-center",
        className
      )
    }, props),
    pill,
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement(Heading, { level: 2, className: "tracking-tighter" }, heading), /* @__PURE__ */ React.createElement("h3", { className: "text-muted-foreground font-sans text-xl font-normal tracking-tight" }, subheading)),
    children
  );
};

// src/makerkit/marketing/cta-button.tsx
var CtaButton = function CtaButtonComponent(_a) {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    Button,
    __spreadValues({
      className: cn(
        "h-12 rounded-xl px-4 text-base font-semibold",
        className,
        {
          "dark:shadow-primary/30 transition-all hover:shadow-2xl": props.variant === "default" || !props.variant
        }
      ),
      asChild: true
    }, props),
    children
  );
};

// src/makerkit/marketing/header.tsx
var Header = (_a) => {
  var _b = _a, {
    className,
    logo,
    navigation,
    actions
  } = _b, props = __objRest(_b, [
    "className",
    "logo",
    "navigation",
    "actions"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn(
        "site-header bg-background/80 dark:bg-background/50 sticky top-0 z-10 w-full py-1 backdrop-blur-md",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "grid h-14 grid-cols-3 items-center" }, /* @__PURE__ */ React.createElement("div", { className: "mx-auto md:mx-0" }, logo), /* @__PURE__ */ React.createElement("div", { className: "order-first md:order-none" }, navigation), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-end gap-x-2" }, actions)))
  );
};

// src/makerkit/marketing/footer.tsx
var Footer = (_a) => {
  var _b = _a, {
    className,
    logo,
    description,
    copyright,
    sections
  } = _b, props = __objRest(_b, [
    "className",
    "logo",
    "description",
    "copyright",
    "sections"
  ]);
  return /* @__PURE__ */ React.createElement(
    "footer",
    __spreadValues({
      className: cn(
        "site-footer relative mt-auto w-full py-8 2xl:py-20",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-8 lg:flex-row lg:space-y-0" }, /* @__PURE__ */ React.createElement("div", { className: "flex w-full gap-x-3 lg:w-4/12 xl:w-4/12 xl:space-x-6 2xl:space-x-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-y-4" }, /* @__PURE__ */ React.createElement("div", null, logo), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground text-sm tracking-tight" }, description)), /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground flex text-xs" }, /* @__PURE__ */ React.createElement("p", null, copyright))))), /* @__PURE__ */ React.createElement("div", { className: "flex w-full flex-col gap-y-4 lg:flex-row lg:justify-end lg:gap-x-6 lg:gap-y-0 xl:gap-x-12" }, sections.map((section) => {
      var _a2;
      return /* @__PURE__ */ React.createElement("div", { key: `section-${(_a2 = section.heading) == null ? void 0 : _a2.toString()}` }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-y-2.5" }, /* @__PURE__ */ React.createElement(FooterSectionHeading, null, section.heading), /* @__PURE__ */ React.createElement(FooterSectionList, null, section.links.map((link) => /* @__PURE__ */ React.createElement(FooterLink, { key: link.href, href: link.href }, link.label)))));
    }))))
  );
};
function FooterSectionHeading(props) {
  return /* @__PURE__ */ React.createElement("span", { className: "font-heading text-sm font-semibold tracking-tight" }, props.children);
}
function FooterSectionList(props) {
  return /* @__PURE__ */ React.createElement("ul", { className: "flex flex-col gap-y-2" }, props.children);
}
function FooterLink({
  href,
  children
}) {
  return /* @__PURE__ */ React.createElement("li", { className: "text-muted-foreground text-sm tracking-tight hover:underline [&>a]:transition-colors" }, /* @__PURE__ */ React.createElement("a", { href }, children));
}

// src/makerkit/marketing/feature-showcase.tsx
var FeatureShowcase = function FeatureShowcaseComponent(_a) {
  var _b = _a, {
    className,
    heading,
    icon,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "heading",
    "icon",
    "children"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn("flex flex-col justify-between space-y-8", className)
    }, props),
    /* @__PURE__ */ React.createElement("div", { className: "flex w-full max-w-5xl flex-col gap-y-4" }, icon && /* @__PURE__ */ React.createElement("div", { className: "flex" }, icon), /* @__PURE__ */ React.createElement("h3", { className: "text-3xl font-normal tracking-tight xl:text-5xl" }, heading)),
    children
  );
};
function FeatureShowcaseIconContainer(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
        "flex items-center justify-center space-x-4 rounded-lg p-3 font-medium",
        props.className
      )
    },
    props.children
  ));
}

// src/makerkit/marketing/feature-grid.tsx
var FeatureGrid = function FeatureGridComponent(_a) {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn(
        "grid w-full grid-cols-1 gap-4 space-y-0 lg:grid-cols-3",
        className
      )
    }, props),
    children
  );
};

// src/makerkit/marketing/feature-card.tsx
var FeatureCard = (_a) => {
  var _b = _a, {
    className,
    label,
    description
  } = _b, props = __objRest(_b, [
    "className",
    "label",
    "description"
  ]);
  return /* @__PURE__ */ React.createElement("div", __spreadValues({ className: cn("rounded-xl border p-4", className) }, props), /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(CardTitle, { className: "text-xl font-medium" }, label), /* @__PURE__ */ React.createElement(CardDescription, { className: "text-muted-foreground max-w-xs text-sm font-normal" }, description)));
};
var NewsletterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});
function NewsletterSignup(_a) {
  var _b = _a, {
    onSignup,
    buttonText = "Subscribe",
    placeholder = "Enter your email",
    className
  } = _b, props = __objRest(_b, [
    "onSignup",
    "buttonText",
    "placeholder",
    "className"
  ]);
  const form = useForm({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: ""
    }
  });
  return /* @__PURE__ */ React.createElement("div", __spreadValues({ className: cn("w-full max-w-sm", className) }, props), /* @__PURE__ */ React.createElement(Form, __spreadValues({}, form), /* @__PURE__ */ React.createElement(
    "form",
    {
      onSubmit: form.handleSubmit(onSignup),
      className: "flex flex-col gap-y-3"
    },
    /* @__PURE__ */ React.createElement(
      FormField,
      {
        control: form.control,
        name: "email",
        render: ({ field }) => /* @__PURE__ */ React.createElement(FormItem, null, /* @__PURE__ */ React.createElement(FormControl, null, /* @__PURE__ */ React.createElement(Input, __spreadValues({ placeholder }, field))), /* @__PURE__ */ React.createElement(FormMessage, null))
      }
    ),
    /* @__PURE__ */ React.createElement(Button, { type: "submit", className: "w-full" }, buttonText)
  )));
}
function NewsletterSignupContainer(_a) {
  var _b = _a, {
    onSignup,
    heading = "Subscribe to our newsletter",
    description = "Get the latest updates and offers directly to your inbox.",
    successMessage = "Thank you for subscribing!",
    errorMessage = "An error occurred. Please try again.",
    className
  } = _b, props = __objRest(_b, [
    "onSignup",
    "heading",
    "description",
    "successMessage",
    "errorMessage",
    "className"
  ]);
  const [status, setStatus] = useState("idle");
  const handleSubmit = useCallback(
    async (data) => {
      setStatus("loading");
      try {
        await onSignup(data.email);
        setStatus("success");
      } catch (error) {
        console.error("Newsletter signup error:", error);
        setStatus("error");
      }
    },
    [onSignup]
  );
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn("flex flex-col items-center space-y-4", className)
    }, props),
    /* @__PURE__ */ React.createElement("div", { className: "text-center" }, /* @__PURE__ */ React.createElement(Heading, { level: 4 }, heading), /* @__PURE__ */ React.createElement("p", { className: "text-muted-foreground" }, description)),
    status === "idle" && /* @__PURE__ */ React.createElement(NewsletterSignup, { onSignup: handleSubmit }),
    status === "loading" && /* @__PURE__ */ React.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React.createElement(Spinner, { className: "h-8 w-8" })),
    status === "success" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Alert, { variant: "success" }, /* @__PURE__ */ React.createElement(AlertTitle, null, "Success!"), /* @__PURE__ */ React.createElement(AlertDescription, null, successMessage))),
    status === "error" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Alert, { variant: "destructive" }, /* @__PURE__ */ React.createElement(AlertTitle, null, "Error"), /* @__PURE__ */ React.createElement(AlertDescription, null, errorMessage)))
  );
}
var ComingSoonHeading = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(HeroTitle, __spreadValues({ className: cn(className) }, props));
};
ComingSoonHeading.displayName = "ComingSoonHeading";
var ComingSoonText = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    GradientSecondaryText,
    __spreadValues({
      className: cn("text-muted-foreground text-lg md:text-xl", className)
    }, props)
  );
};
ComingSoonText.displayName = "ComingSoonText";
var ComingSoonButton = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React2.createElement(CtaButton, __spreadValues({ className: cn("mt-8", className) }, props));
};
ComingSoonButton.displayName = "ComingSoonButton";
var ComingSoon = (_a) => {
  var _b = _a, {
    children,
    className
  } = _b, props = __objRest(_b, [
    "children",
    "className"
  ]);
  const childrenArray = React2.Children.toArray(children);
  const logo = childrenArray.find(
    (child) => React2.isValidElement(child) && child.type === ComingSoonLogo
  );
  const heading = childrenArray.find(
    (child) => React2.isValidElement(child) && child.type === ComingSoonHeading
  );
  const text = childrenArray.find(
    (child) => React2.isValidElement(child) && child.type === ComingSoonText
  );
  const button = childrenArray.find(
    (child) => React2.isValidElement(child) && child.type === ComingSoonButton
  );
  const cmps = [
    ComingSoonHeading,
    ComingSoonText,
    ComingSoonButton,
    ComingSoonLogo
  ];
  const otherChildren = childrenArray.filter(
    (child) => React2.isValidElement(child) && !cmps.includes(child.type)
  );
  return /* @__PURE__ */ React2.createElement(
    "div",
    __spreadValues({
      className: cn(
        "container flex min-h-screen flex-col items-center justify-center space-y-12 p-4",
        className
      )
    }, props),
    logo,
    /* @__PURE__ */ React2.createElement("div", { className: "mx-auto flex w-full max-w-4xl flex-col items-center justify-center space-y-8 text-center" }, heading, /* @__PURE__ */ React2.createElement("div", { className: "mx-auto max-w-2xl" }, text), button, otherChildren)
  );
};
ComingSoon.displayName = "ComingSoon";
var ComingSoonLogo = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement("div", __spreadValues({ className: cn(className, "fixed top-8 left-8") }, props));
};
ComingSoonLogo.displayName = "ComingSoonLogo";

export { ComingSoon, ComingSoonButton, ComingSoonHeading, ComingSoonLogo, ComingSoonText, CtaButton, FeatureCard, FeatureGrid, FeatureShowcase, FeatureShowcaseIconContainer, Footer, GradientSecondaryText, GradientText, Header, Hero, HeroTitle, NewsletterSignup, NewsletterSignupContainer, Pill, PillActionButton, SecondaryHero };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map