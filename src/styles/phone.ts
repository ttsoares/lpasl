/**
 * Phones: anything below MUI's sm breakpoint (600px). There the site is one
 * column with one call to action per screen and only what a visitor needs;
 * from sm up every feature stays.
 */
export const phone = '@media (max-width: 599.95px)'

/**
 * Hides an element on phones. Spread it last in an sx object, so it wins over
 * a `display` set earlier in the same object.
 */
export const hideOnPhone = { [phone]: { display: 'none' } } as const
