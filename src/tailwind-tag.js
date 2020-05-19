/**
 * Regex to match groups for modifier groups
 *
 * matches this:
 * modifier {
 *  nested-classes
 * }
 */
const modifierGroupRegex = /((?<directive>[\w-]+)\s*\{(?<classes> [\s\w-]*)?\})/g;

/**
 * Removes duplicate spaces/tabs and limits them to 1 space.
 *
 * @param {string} classString String of css classnames
 */
function normalize(classString) {
  return classString?.replace(/[\s\n\r\t]+/gm, " ").trim() || "";
}

/**
 * Splits normalized classname strings to an array of single class names.
 *
 * @param {string} classString String of css classnames
 */
function classesToArray(classString) {
  return classString.split(" ");
}

/**
 * Replaces all matched modifier groups with the resolved tailwind modifier classnames.
 *
 * hover { bg-gray-100 } -> hover:bg-gray-100
 *
 * @param {string} classString String of css classnames
 */
function resolveModifierGroups(classString) {
  return classString?.replace(modifierGroupRegex, (...args) => {
    const { directive, classes } = args[args.length - 1];

    if (classes?.trim().length === 0) return "";

    const innerClasses = normalize(classes);

    return classesToArray(innerClasses)
      .map((string) => `${directive.trim()}:${string}`)
      .join(" ");
  });
}

/**
 * Tagged template literal function, taking a template string and transforming it
 * into a string of tailwindcss classnames, while also resolving modifier groups.
 *
 * @param {string} strings Tagged template literal strings
 * @param  {...string} values Interpolated values
 */
export default function tw(strings, ...values) {
  const fullString = strings.reduce(
    (full, current, index) => full + current + (values[index] || ""),
    ""
  );

  const classString = resolveModifierGroups(normalize(fullString));

  return classString;
}
