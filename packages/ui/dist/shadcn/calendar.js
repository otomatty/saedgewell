'use strict';

var chunkP64ZKZSK_js = require('../chunk-P64ZKZSK.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var lucideReact = require('lucide-react');
var reactDayPicker = require('react-day-picker');

function Calendar(_a) {
  var _b = _a, {
    className,
    classNames,
    showOutsideDays = true
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className",
    "classNames",
    "showOutsideDays"
  ]);
  return /* @__PURE__ */ React.createElement(
    reactDayPicker.DayPicker,
    chunkGNZACLC7_js.__spreadValues({
      showOutsideDays,
      className: chunkXE52ECJH_js.cn("p-3", className),
      classNames: chunkGNZACLC7_js.__spreadValues({
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "gap-x-2 flex items-center",
        nav_button: chunkXE52ECJH_js.cn(
          chunkP64ZKZSK_js.buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: chunkXE52ECJH_js.cn(
          chunkP64ZKZSK_js.buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible"
      }, classNames),
      components: {
        Chevron: (_a2) => {
          var _b2 = _a2, { orientation } = _b2, props2 = chunkGNZACLC7_js.__objRest(_b2, ["orientation"]);
          if (orientation === "left") {
            return /* @__PURE__ */ React.createElement(lucideReact.ChevronLeft, chunkGNZACLC7_js.__spreadValues({ className: "h-4 w-4" }, props2));
          }
          return /* @__PURE__ */ React.createElement(lucideReact.ChevronRight, chunkGNZACLC7_js.__spreadValues({ className: "h-4 w-4" }, props2));
        }
      }
    }, props)
  );
}
Calendar.displayName = "Calendar";

exports.Calendar = Calendar;
//# sourceMappingURL=calendar.js.map
//# sourceMappingURL=calendar.js.map