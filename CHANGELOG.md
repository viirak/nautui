## [0.2.0] - 2026-10-17

**`Badge` is smaller and its sizes no longer drift with the viewport.** The default `md` badge drops from 0.875rem to 0.75rem type — every existing `<Badge>` without an explicit `size` renders smaller. This is what puts a badge below a button in the type hierarchy.

Three related fixes, all found by measuring rendered geometry in Chromium rather than reading the CSS:

- Internal padding is now fixed `rem` per size instead of `--naut-spacing-*`. Those tokens grow ~2.4x faster than a type scale, so an `lg` badge climbed 54px to 64px across the viewport. Badge heights are now identical at 375px and 1600px.
- `line-height` is the unitless `--naut-line-height-ratio` rather than the absolute length inherited from `body`. That inherited value is computed from the *body's* font size, so it never tracked a badge's own: leading was 1.94 at `sm`, 1.66 at `md`, 1.45 at `lg`. All three are now 1.55.
- `iconOnly` took a hardcoded `padding: 0.85rem`, so `size` was close to a no-op there — an `sm` icon-only badge came out 44px, taller than an `lg` plain badge. It now takes symmetric padding from its own `size`, mirroring how `Button` handles `square`.

A bare `variant="text"` badge with no `outline` still carries no padding. Note the `padding` prop still resolves against the fluid spacing scale, which is a different scale from `size` — `padding="lg"` is considerably more padding than `size="lg"`.

**The dark neutral scale was miscalibrated, putting every brand colour out of reach on a Card.** Light mixes 2/5/10% *black* into a near-white base; dark mirrored that with 35/40/45/70% *white* into a near-black one. Mixing white into near-black overshoots by an order of magnitude, landing `base-100` on `#3c3d40` — a mid-grey Card on a near-black page. Measured against it:

| token | before | after (15/20/25) |
| --- | --- | --- |
| `secondary-fill` on `base-100` (needs 3:1) | 1.89 | 3.37 |
| `primary-text` on `base-200` (needs 4.5:1) | 4.09 | 8.17 |
| `secondary-text` on `base-200` (needs 4.5:1) | 4.06 | 8.11 |

Dark now mixes 15/20/25%, giving `base-100` `#0d0d11` and `base-200` `#18181c`. `base-400` drops 70% → 50% so it mirrors light's 50% and both scales land on mid-grey for `border-strong`.

**`success`, `warning` and `info` now carry a legible foreground in both themes.** These are mid-tone, so unlike the other brands they fail against *both* near-white and near-black: raw `success` sits at 2.05:1 on light `base-100`, and the white foreground measured 2.28 / 2.15 / 2.77:1 with hovers worse at 1.74 / 1.65 / 1.97. Mixing toward a darker same-hue colour was tried first and does not work — it preserves chroma but cannot darken enough, and only `info` cleared 4.5:1 even at 45%.

Each now has `-fill`, `-content` and `-hover` role tokens matching the primary/secondary pattern. Light darkens the fill 35/35/25% and keeps a white foreground; dark keeps the fill bright and flips the foreground to black, which reads 9.2 / 9.8 / 7.6:1. The split has to be per-theme because `warning` cannot be darkened and stay amber — past 25% it is brown. Their hover darkens in light (lightening cost `warning` and `info` their 4.5:1, measuring 4.44 and 4.11) and lightens in dark, mirroring the existing primary/secondary behaviour. `Button`, `IconBox` and `Avatar` now read `-fill`.

Two follow-ups found reviewing that change:

- **`IconBox` solid `success`/`warning`/`info` were unreadable in light mode.** It sources its own foreground from a hardcoded `oklch(0.18 ...)` ink, correct while the fill was the bright raw colour but inverted once light mode darkened the fill -- 2.89 / 3.05 / 3.37:1. They now read the `-content` token like `primary`/`secondary`/`destructive` already do, which measures 6.46 / 6.18 / 5.56:1.
- **`color="success"`, `"warning"` and `"info"` shift slightly darker in light mode.** `getColorValue()` mixed the raw token 60% toward `--naut-color-content`; it now reads `-text` tokens, which alias `-fill`. That was already the last consumer left on the pre-role pattern, and it means `Text color="success"` and `Button variant="success"` finally render the same green instead of drifting apart.

**Two fixes in `Article` and `List`, both invisible until the specific case hit.** `Article`'s anchor-link handler called `navigator.clipboard.writeText(url).catch(...)`, which throws *synchronously* when `navigator.clipboard` is undefined -- as it is outside a secure context. `.catch()` only handles rejection, so the `execCommand` fallback it was guarding never ran and the click silently did nothing. The existence check has to come first.

`List` carried an unused `const spacing` beside `gap: calc(var(--naut-spacing) * 1.5)`. `--naut-spacing` is not a token -- the scale is `--naut-spacing-{size}` -- so that declaration was invalid at computed-value time and dropped. Nothing looked broken because `gap` already comes from the `.gap-*` utility class, but the pair read as a working feature that was doing nothing. Both removed; no rendered change.

`apps/website/public/favicon.svg` gained a `<title>`, clearing the last `noSvgWithoutTitle` lint error.

**Biome 2.5.15 and ultracite 8.0.0.** The toolchain is now aligned across the workspace (`apps/website` had been pinned to biome 2.4.9 / ultracite 7.4.2 while the root sat on 2.4.12 / 7.6.2 -- two formatters in one monorepo). ultracite 8.0.1 was deliberately not taken: it was published hours before this change and installing it made pnpm add a `minimumReleaseAgeExclude` to bypass its own supply-chain policy. 8.0.0 is the newest release that clears that guard.

The upgrade retires a formatter bug that made `pnpm fix` non-idempotent. Under 2.4.12, a multi-line CSS comment inside an Astro `<style>` block was re-indented on every run and the formatter never reached a fixed point -- [biomejs/biome#10515](https://github.com/biomejs/biome/issues/10515), fixed by [PR #10533](https://github.com/biomejs/biome/pull/10533). That is what the recurring `Button.astro` churn was. Verified across three passes: `//` comments still diverge on 2.5.15, block comments now converge. `.naut-article` and `.naut-image` selectors were reordered to ascending specificity for the same reason; `Image`'s `:not(...)` arguments moved into `:where(...)` so they contribute zero specificity and the sizing modifiers share one tier. Both reorders were checked in Chromium against the previous build -- 30 resting and 17 hover combinations resolve to identical computed styles.

New rules in 2.5 also flagged real cleanup: a shadowed `size`/`color` in `getGradientPattern`, `== null` comparisons in `MegaMenu`, and an unreachable clipboard fallback. `.naut-avatar-group` keeps `role="group"` with a documented suppression -- `fieldset` is for form controls, not avatars, and would bring a default border and padding that break the flex layout.

**Removed the dead `withPaddingDefault` from `lib/spacing.ts`.** It resolved a padding input and substituted a default when none was given, but nothing called it: it is absent from the twelve components that import from `spacing.ts`, from `index.ts` / `index.d.ts`, and from the docs. It arrived with `a341fd7`, the refactor to the object-based spacing API, and the `getPaddingClassList` path superseded it -- an empty padding yields no utility classes either way, so there was never a default to apply. `spacing.ts` is not re-exported from the package barrel, so this was never public API.

**`MenuItem` no longer requires `href`.** The prop was typed `href: string`, but the component has always rendered its default slot directly when `href` is absent (`{!href && <slot />}`), and `docs/recipes/nav-menu.md` relies on that to host a `Dropdown` trigger inside a `MenuItem`. Typing it required contradicted both the implementation and the recipe, so `<MenuItem>Home</MenuItem>` failed to type-check even though it renders correctly. It is now `href?: string`, and the `Menu` doc no longer marks it required.

**`Gap` now includes `xxs` and `xs`.** `gap.css` has shipped `.gap-xxs` and `.gap-xs` alongside the `--naut-spacing-xxs` / `--naut-spacing-xs` tokens, but `Gap` was aliased to `Size` (`"sm" | "md" | "lg" | "xl"`), so neither step could be passed to any component. This was never a regression -- `Gap` has been `Size` since `5748eab`, and the predecessor `Spacing` union did not list them either -- the type was simply authored narrower than the CSS. The `Group` and `Flex` docs already advertised `"xs"`, which the type did not honour.

Widening the shared type means all eight `Gap` consumers have to resolve both steps, and they split in two. Seven (`Flex`, `Group`, `Grid`, `List`, `Marquee`, `Menu`, `Stack`) are backed by `gap.css` and needed no change. Two hand-roll their own `.gap-*` rules and had to gain the missing steps, or `gap="xxs"` would have type-checked and rendered nothing: `Masonry` (`column-gap`, plus a `:global(... > .naut-masonry-item)` `margin-bottom`) and `Marquee` (`margin-left` between connected groups). Measured in Chromium across all six steps, all three paths now agree -- `3.4 / 7.08 / 14.6 / 24 / 32 / 40px`.

**`gap.css` gains a zero step.** `--naut-spacing-0: 0` has been the first entry of the token scale all along and `SpacingStep` already declared `"0"`, but the utility classes started at `xxs` -- as `padding.css` and `margin.css` still do. It is added as `.gap-0` rather than `.gap-none` so it matches both the token name and `SpacingStep`; `none` would have been the only "none"-named spacing utility.

`Masonry` documented `gap="none"`, which the type had never permitted, so that was a doc bug rather than a contract. Its two hand-rolled `gap-none` rules are now `gap-0`, and the doc lists `"0"`. Measured in Chromium, `Group`, `Masonry` and `Marquee` agree across the full seven-step scale: `0 / 3.4 / 7.08 / 14.6 / 24 / 32 / 40px`.

**Badge is uppercase by default and every badge carries padding.** Four changes, all found by measuring rendered geometry in Chromium rather than reading the CSS.

`uppercase` defaulted to `false`, so most badges shipped mixed case. Now `true`; pass `uppercase={false}` to opt out.

Block padding came down 2-3px per step while inline padding went up 4px, because the two were interacting. Reducing block alone stretched the pill to 3.3:1 with `radius--sm` still at 8px, so the corner curve ate most of the inline padding. Measured as `clearance = padX - effectiveRadius`, rounded badges now clear their curve by 6-10px depending on size.

`radius--full` was the real outlier. `50rem` clamps to half the box height, which at `md` is 13.3px against 12px of inline padding -- the text sat *inside* the curve by 1.3px. Inline padding now clears it by 0.7px. That sits at the geometric floor rather than comfortably above it, because a stadium's required padding *is* h/2 and grows with the font; if it reads tight, `radius--full` wants its own padding record rather than a larger global default.

`isBare` is gone. A bare `variant="text"` badge resolved to `0px` padding, which was right for inline prose but wrong for anything carrying ink: a `gradient` badge paints a full background and was rendering with no padding at all. The same logic already excluded outlines ("an outlined badge is still a badge"); gradient now counts too. Worth knowing: bare text badges are no longer inline -- `md` went 19px to 25px tall, and a two-word one from 37px to 65px wide. A `padding` prop on a bare badge is now honoured instead of discarded.

### 🚀 Features

- Update Astro peer dependency to ^6.0.0
- Add variant prop to Text component
- Remove maxWidth prop and style from Text component
- Add styling for inline code blocks in text components
- Add letter spacing prop to Text component
- Add letter spacing utility classes
- Add text decoration shorthand prop
- Add text transform and decoration shorthand props
- Add primary, secondary, and destructive variants to Mark component
- Add font family prop to Mark component
- Add light hover variant to Card component
- Add badged prop to Card component
- Add title font family variable
- Simplify Container component props and styles
- Add conditional container for non-fluid NavBar
- Add radius prop to MenuItem component
- Add soft border color variable
- Add article component with styling
- Add 1440px max-width breakpoint for large screens
- Update NavBar component to use sticky positioning
- Add button prop to Drawer component
- Add position and size props to Drawer component
- Rename zIndex to zi and update CSS vars
- Improve Button component styling for square and SVG icons
- Standardize hidden breakpoint values in Drawer component
- Make drawer component instance-specific
- Increase drawer size and improve centered panel styling
- Add square button variant
- Add square prop to ThemeToggle component
- Add square prop to Drawer buttons
- Add TOC component for documentation navigation
- Add default empty array for headings prop in TOC
- *(Text)* Add nowrap prop to Text component
- Improve TOC styling and accessibility
- Add MenuGroup component with collapsible functionality
- Update MenuItem padding and active state background
- Simplify Menu component structure and styling
- Add CSS module type declaration and update tsconfig lib
- Add active indicator to TOC component and regenerate Astro content types
- Add active variant styling to MenuItem component
- Remove overflow hidden from collapsed MenuGroup
- Add optional line prop to MenuGroup component
- Add border indicator to MenuGroup component
- *(MenuItem)* Adjust padding and indicator position
- Add dimmed state to MenuItem component
- *(Link)* Adjust spacing in Link component
- Update hidden utility classes to use consistent naming
- *(Article)* Add anchor link functionality to headings
- Add depth styling to TOC links
- Add uid utility for consistent component IDs
- Add Hide component for responsive visibility control
- *(Drawer)* Add uid import and remove hidden prop
- Add rest props to ThemeToggle component
- *(Box)* Add maxWidth and text-align props
- *(blocks)* Update core dependency to workspace version
- Add DocLayout component for documentation pages
- Replace Hide with Visibility component
- *(blocks)* Add base type interface for component props
- Move Breadcrumb and TOC components to @nautui/blocks package
- Move TOC import to local file in DocLayout
- Add icon slot to MenuGroup component
- Migrate website to new astro version and update dependencies
- Add tool-specific ignore patterns to .gitignore
- Initialize NautUI website project
- Rename nautui-website to website
- Add Cloudflare adapter to website
- Replace Nav with NavDoc in LayoutDoc
- Add .wrangler to website .gitignore
- Update favicon with new SVG and ICO files
- Add documentation pages with dynamic routing
- Add home page with layout component
- Add 404 page with basic layout
- Add syntax highlighting themes to markdown config
- Add code copy button to article component
- Wrap content in Article component
- Add Poolside to .gitignore
- Add dark mode styling for code blocks in article.css
- Update TypeScript to 7.0.2
- Update Astro and related dependencies
- Add dotted variant to Badge component
- Add new badge variants and update styling
- Add color prop to Badge component
- Add letter spacing variants to Badge component
- Add color to default badge variant
- Add border and color to default Badge variant
- Remove TOC drawer from DocLayout
- Reduce MenuGroup arrow size
- Adjust font size for TOC links
- Update DocLayout structure and styling
- Swap Inter for Schibsted Grotesk and init impeccable product doc
- *(core)* Add mask prop to Background (radial fade with position + visibility)
- *(core)* Add hover effects to Image (zoom, zoom-out, brighten, grayscale, fade)
- *(core)* Add BackToTop component with smooth scroll; fix lint errors across core
- Add nautui agent skill installable via skills CLI
- *(core)* Add Footer; add Link/Title/Text/Stack/Marquee props; sync skill+docs
- Reset default margins on Title and Text components
- *(core)* Add modern CSS reset to base layer
- *(core)* Retitle font tokens to display/body system stacks
- *(blocks)* Add NavMenu composite; switch type-checks to astro check
- *(Text)* Remove default margin from Title and Text components
- Add Dropdown component
- Add dropdown support to NavMenu component
- Refactor MenuItem component structure
- *(Dropdown)* Add side and align classes to content container
- *(NavMenu)* Replace custom dropdowns with MenuItem primitive
- Update NavMenu chevron icon attributes
- Add click-outside handler to close dropdowns
- *(Dropdown)* Add offset prop for positioning control
- *(Dropdown)* Add shadow styling to dropdown panel
- *(core)* Add offset prop, click-outside close and fade animation to Dropdown
- Improve dropdown animations and hover behavior
- *(core)* [**breaking**] Add mode prop to Visibility, deprecate hidden toggle
- Remove default gap value from Group component
- Apply backdrop filter to scrolled navbar content
- Add size prop to MenuItem component
- Changes in docs/README.md
- Simplify Box.astro text alignment types
- Remove redundant margin from max-width classes in Box.astro
- Rename Background pattern type prop to style
- *(pattern)* Add diamond-grid pattern style
- Update pattern style class in Background component
- Add inner wrapper to Background component
- *(core)* Add size prop to Background mask
- *(core)* Redesign Background mask props for flexibility
- *(core)* Add custom padding prop to Badge and Button with size-relative defaults
- *(core)* Add semantic color tokens (success, warning, danger, info)
- *(core)* Add color prop and extended color variants to Button, Text, Title
- Add horizontal padding support to Button component
- Add button padding resolution utility
- Add border variant to Badge component
- Remove unused button padding resolver
- *(Badge)* Adjust padding logic for text variant
- Update Button padding logic
- *(Badge)* Add uppercase prop to control text transform
- Changes in packages/core/src/components/Card.astro
- Changes in packages/core/src/components/Badge.astro, packages/core/src/components/Card.astro
- Add avatar components
- Add IconBox component
- Add text form controls
- Add fontFamily prop to Mark
- Support dark mode for Badge
- Standardize text color tokens
- Add TextRotate component
- Derive pill padding from a single spacing step
- Split Badge fill and outline into independent axes

### 🐛 Bug Fixes

- Update dark card background color to use content variable
- Remove maxWidth prop from Text component
- Remove Hello prefix from DocLayout title and fix indentation
- Enable type checking and relax filenaming rule for astro components
- Resolve prop drift and CSS issues in core components
- Clean up website lint issues and unused imports
- *(blocks)* SectionHero dark prop, Breadcrumb aria + dead prop, Button rounded type
- *(core)* Wire Badge outlineColor prop through define:vars
- *(core)* Make NavBar height optional; docs: add NavBar doc
- *(core)* Support radial gradient type in Background; docs: Article + Background
- *(core)* Add Card outline-dark variant + Container fluid prop; docs: Card, Container, Divider
- *(core)* Correct Group not-md/not-lg media query bounds; docs: Grid, Group
- *(core)* Image ratio type, List noMarker dead prop, Link title passthrough; docs: Image, Link, List, ListItem
- *(core)* Mark ff prop now applies font family; docs: Mark, Marquee, Masonry
- *(core)* Remove dead cross destructure in Section; docs: Section, Space, Stack
- *(core)* Text weight/variant CSS, Title display-sm type, Visibility show-only band exclusion
- *(core)* Style tables in Article (borders, header fill, zebra striping)
- *(core)* Soften grid/dots pattern default line color to base-200
- *(skill)* Split merged table rows in Layout quick-API table
- Changes in packages/blocks/src/index.d.ts, packages/blocks/src/index.ts
- *(blocks)* Remove core CSS imports from NavMenu; make it self-contained
- *(blocks)* Remove core CSS imports from NavMenu; make it self-contained
- *(blocks)* Resolve Biome lint errors in NavMenu
- Changes in docs/components/Box.md
- *(core)* Add optional chaining to mask.size access in Background
- *(core)* Add optional chaining to mask.position access
- *(a11y)* Rewrite Drawer - global toggleMenu removed, aria-modal, Escape key, focus to close button
- *(a11y)* NavBar singleton warning, global :focus-visible
- *(core)* Button - move .square after .size-* to remove !important, add transition-property
- *(tokens)* Card outline-dark border token, NavBar shadow token, link color as hex
- *(a11y)* Dropdown keyboard navigation - Escape closes, ArrowUp/Down navigate items
- *(css)* Change Section overflow from hidden to visible to prevent clipping floating elements
- Changes in packages/core/src/components/Badge.astro
- Changes in packages/core/src/components/Badge.astro
- Changes in packages/core/src/components/Button.astro
- Changes in packages/core/src/components/Button.astro
- Changes in packages/core/src/components/Button.astro
- Changes in packages/core/src/components/Badge.astro
- Changes in packages/core/src/components/Flex.astro
- Changes in packages/core/src/components/Section.astro
- Changes in packages/core/src/components/Button.astro
- Changes in packages/core/src/components/Button.astro
- Changes in packages/core/src/components/Section.astro
- Changes in packages/core/src/components/AccordionItem.astro
- Changes in packages/core/src/components/Drawer.astro
- Body-scroll lock in Drawer — use global counter instead of per-drawer _nautPrevOverflow to prevent overwrite issues when multiple drawers/modals coexist; and add Dropdown.md documentation
- Correct Drawer inline script typing
- Correct skill and Background docs against source
- Support h1-h6 size aliases on Title
- Enforce object mask position and size on Background
- Rename Mark halflight variant to highlight
- Reject unimplemented Link props at render time
- Honour custom link color in dark mode
- Repair dark mode cycle and split brand colour roles

### 📚 Documentation

- Add AGENTS.md and CLAUDE.md documentation files
- Document BEM naming convention in AGENTS.md and CLAUDE.md
- Update CLAUDE.md with blocks package details
- Add PandaFilter token optimization rules
- Add Impeccable design skill note to AGENTS.md
- Add consumer README + Button doc, blocks PRODUCT.md, gitignore fossil cache
- Add Theme + ThemeToggle component doc
- Add Bento, BentoItem, Box
- Add Drawer, Flex
- Add Menu, MenuGroup, MenuItem
- Add Title, Text, Visibility
- Add blocks component docs (Breadcrumb, SectionHero, DocLayout, TOC)
- Link README component index to per-component docs; correct Visibility description
- Add Accordion + AccordionItem doc
- Reposition README as lightweight astro-native lib; refresh component checklist
- *(core)* Document Background mask prop; fix stale variant/opacity references
- *(core)* Document Image hover effects
- *(skill)* Add example component file, Nuppun token mapping, cross-repo coordination link
- *(skill)* Remove Nuppun-specific cross-repo coordination section
- *(skill)* Rewrite quick-API tables from source-verified component props
- Clean up AGENTS.md; fix stale facts
- Move component docs to blocks directory
- Changes in docs/README.md
- Document context firewall guidelines in agents.md
- Update patchloom command in AGENTS.md
- Add Context Firewall shell semantics note to AGENTS.md
- Move NavMenu to recipe and update blocks checklist
- Changes in docs/blocks/MegaMenu.md
- Changes in docs/components/Box.md
- *(changelog)* Record v0.2.0 spacing API refactor
- Update Background mask API and NavBar singleton note
- Changes in docs/components/Badge.md
- Changes in docs/components/Accordion.md
- Document direction API unification and legacy aliases

### 🚜 Refactor

- Simplify tint controls in colors.css
- Update card variant and hover colors to use new design tokens
- *(core)* Simplify NavBar API to island boolean; sync docs + skill
- *(blocks)* [**breaking**] Remove NavMenu composition component in favor of docs recipe
- *(core)* Replace flat spacing props with object-based API
- Rename Button rounded to radius with deprecated alias

### 🎨 Styling

- Simplify CSS color-mix expressions
- Remove margin utility classes from Text component
- Add base-0 color variables for light and dark themes
- Replace fixed font sizes with responsive clamp() values
- Update hover and active states to use content color
- Adjust medium font size to 0.9375rem
- Update hover background color for MenuItem
- Adjust border color variables for better contrast
- Update CSS class naming convention to use double underscore
- Remove empty lines in article.css
- Format Box and Flow component styles consistently
- Format CSS variables for better readability
- Format color-mix CSS functions consistently
- Add content color to text components

### ⚙️ Miscellaneous Tasks

- Update astro peer dependency to ^6.0.0
- Bump package versions to 0.1.1
- Update biome.json configuration
- Replace turbo with pnpm for build and lint scripts
- Remove turbo.json
- Remove turbo dependency
- Update dark theme to dracula in astro config
- Remove agent tooling configs and add skills-lock.json
- Add design-system-patterns skill to lockfile
- Add .patchloom/ to .gitignore

### 💼 Other

- Aria landmark roles to NavBar (role.navigation, aria-label) and Footer (role.contentinfo, aria-label)
## [0.1.0] - 2026-05-25

### 🚀 Features

- Add core and blocks packages with initial package.json and README files
- Add core package with TypeScript configuration
- Add theme components and button component
- Add Button, Theme, and ThemeToggle components to core exports
- Update package.json exports and add website dependencies
- Initialize Astro website with minimal template
- Add Container and Section components
- Add Box component with layout and styling capabilities
- Add Group component with flex layout utilities
- Add Grid component with responsive columns and gap options
- Add Link component with styling and external link support
- Add List component with configurable gap, orientation, and marker options
- Add ListItem component with customizable marker support
- Add Mark component with multiple variants and rotation options
- Add Text component with styling and props
- Add Title component with responsive variants and rainbow effect
- Add Badge component with multiple variants and sizes
- Add Card component with header, body, and footer slots
- Add Divider component with customizable orientation, size, and variant
- Add Image component with responsive ratio support
- Add breadcrumb component
- Add drawer component with responsive toggle functionality
- Add NavBar component with default and island variants
- Update padding variable to use Naut spacing system
- Update card body padding to use Naut spacing variable
- Use consistent spacing variable for margin-bottom in Box component
- Update grid bordered class selector to use naut-grid prefix
- Update border width variable to use consistent naming convention
- Update theme storage key to 'naut-theme'
- Refactor NavBar component structure and props
- Improve Container component class list formatting
- Simplify NavBar component logic and styling
- Add outline customization to Section component
- Update pattern class name to match naming convention
- Add fluid container option
- Add fluid and outline variants to NavBar component
- Add shadow prop to NavBar component
- Add glassy navbar variant
- Add full border radius CSS variable
- Add radius prop to NavBar component
- Change navbar height prop from string to number with default value
- Implement GridItem component and refactor Grid to use dynamic responsive columns
- Replace rainbow prop with configurable gradient support in Title component
- Define static --naut-color-selection and apply it to Title selection styles
- Add dynamic gradient support to Mark component and remove rainbow variant
- Add flex prop to Container component and apply default layout sizing to Section
- Remove background from glassy navbar variant
- Update Badge component gradient props and styling
- Add Glow and Stack components, introduce text alignment, mobile-responsive groups, and image styling options
- Add class property to Group component for custom styling support
- Add Menu and MenuItem components for navigation layouts
- Add spacing props to components
- *(blocks)* Add @nautui/core as dependency
- Add maxWidth prop to Text component
- Set default padding to "md" in Box component
- Rename line-height-ratio CSS variable and improve shadow formatting
- Add gradient background support to Mark component
- Center navbar content in a flex container
- Add selection styles to Mark component
- Increase font sizes for hero title variant
- Rename zi prop to zindex for clarity
- *(NavBar)* Add dark mode support
- *(Button)* Add dark mode support
- Add responsive display spacing variables to Theme component
- Add padding props to Section component
- Update display spacing variables with responsive clamp values
- Add dark mode toggle for navbar on dark section intersection
- Remove glassy navbar variant
- Simplify dark theme color definitions
- Add Figure component with grid, stack, and masonry layouts
- Add dark mode support to Section component
- Add cover prop to Image component
- Add fluid prop to Image component
- Add more aspect ratio options to Image component
- Add maxWidth prop to Image component
- Change Group component to use inline-flex instead of flex
- Add maxWidthVar variable for conditional max-width styling
- Add maxWidthVar and flexVar to Container component
- Add inline-block display to text spans
- Add display prop to Stack component
- Add SectionHero and BackgroundGradient components
- Improve SectionHero figure configuration options
- Add text selection styling
- Remove Figure component
- Add maxHeight prop to Image component
- Center hero section content and align figure right properly
- Remove background color from SectionHero component
- Add scroll effect to navbar backdrop filter
- Add semi-transparent background to scrolled navbar
- Add autohide functionality to NavBar
- Add Masonry and MasonryItem components
- Add Marquee component with animation controls
- Remove overflow hidden from section component
- Add mini-stripes pattern option
- Add responsive prop to Image component
- Add Background component with gradient, image, and pattern support
- Remove pattern prop from Section component
- Add slot to Background component
- Rename pattern name prop to type
- Rename section slots for consistency
- Rename slot name from "section-before" to "before" in SectionHero
- Add border customization to Box component
- Rename BorderProps to Border in border.ts and update imports
- Add createPadding and createMargin utility functions
- Replace padding resolution with createPadding utility
- Rename border styles to use box prefix
- Add prefix support to createBorder function
- Extract border logic into reusable function
- Remove spacing props from Container component
- Add default padding to Card component
- Change image dimensions to use undefined instead of "none" or "auto"
- Update hero section figure positioning
- Use pattern type instead of name for background pattern class
- Simplify background styling and add gradient support
- Remove BackgroundGradient component and related exports
- Add background slot to Box and Section components
- Split background image properties for better control
- Add content alignment logic for hero section figure position
- Add overflow hidden to Section component center block
- Add responsive screen size control to Group component
- Add responsive grid column spanning support
- Remove spacing props from Grid and GridItem components
- Replace inline spacing styles with utility classes
- Simplify Stack component and remove spacing props
- Add xs spacing variant
- Replace padding utility with spacing classes
- Simplify Card component padding and remove spacing props
- Add Flow component with responsive direction support
- Add Responsive type to types
- Remove Stack wrapper from SectionHero component
- Add responsive alignment and justify props to Stack component
- Refactor spacing props to use Size type and improve type definitions
- Rename alignment types and add gap styles
- *(space)* Add Space component for flexible spacing
- *(SectionHero)* Add Space components and adjust layout
- Apply gap spacing to marquee groups instead of container
- Add user authentication endpoint
- Replace Spacing with Gap in GridProps type
- Add responsive columns support to Grid component
- Add maxWidth prop to Flow component
- Add gap-xl utility class
- Set default Space component size to "md"
- Add Flex component to core package
- Add Flex component with responsive direction support
- Add margin props to Divider component
- Add default margin to divider component
- Add conditional default padding to Box component
- Add default padding to Section component
- Add border utility classes for styling
- Add comprehensive border configuration system
- Add border styling to Box and Section components
- Add border and radius support to Grid component
- Remove decoration and mode props from Section component
- Add corner color CSS variables for light and dark themes
- Add radius utility classes
- Add corner styling support to Box component
- Extract spacing props with undefined values filtered
- Replace createSpacingClasses with getSpacingClasses in components
- Extract padding props from Card component
- Add border customization to Card component
- Replace createSpacingClasses with getSpacingClasses in components
- Add gap utility classes to Masonry component
- Add radius class to Grid component
- Add horizontal menu layout and divider support
- Add gap utility classes for Group component
- Add gap prop to List component
- Add size prop to Card component
- Add height prop to Card component
- Add fluid prop to Card component
- Add light and dark color variables to Theme component
- Add hover and variant props to Card component
- Replace dimmed prop with color prop for MenuItem component
- Move padding to wrapper div and add overflow hidden
- Simplify accordion component and implement radio-based interaction
- Add rainbow variant to Card component
- Extract theme styles into separate CSS files
- Add shadow style import to Card component
- Import display spacing styles
- Update default pattern colors to use lighter variants
- Update corner background color to use border-strong variable
- Update breadcrumb styling to use content colors
- Update drawer text color to use content variable
- Update image background color to use base-100
- Apply link styling with color and opacity variants
- Update MenuItem colors to use content variables
- Update navbar text color to use content variable
- Update selection styles for gradient text
- Update Card hover variant to use "surface" instead of "light"
- Update MenuItem hover and active states to use base-100 color
- Add responsive size support to Space component
- Add centered prop to Box component
- Add bento grid layout components
- Make BentoProps columns and rows optional
- Rename bento-item class to naut-bento-item
- Add screenshot to README and update component list
- Add metadata to package.json files
- Add initial release changelog for Naut UI v0.1.0

### 🐛 Bug Fixes

- Update Button component class name from dara-button to naut-button
- Update NavBar container flex property for proper layout sizing
- Mark color on gradient
- Format tsconfig.json include/exclude arrays for consistency
- Add newline at end of package.json
- Adjust line-height for size-lg text component
- *(core)* Prevent text wrapping in Badge component
- Remove debug console.log from createBorder
- Update default pattern colors to use base color variables
- Update divider label color to use content-soft instead of dimmed
- Remove redundant padding and margin properties from masonry item
- Adjust gap handling in Bento component and remove margin from BentoItem

### 📚 Documentation

- Simplify README to focus on Naut UI purpose
- Update keywords in package.json files
- Update README with installation, usage, and theming details
- Add detailed documentation for core and blocks packages
- Add mission statement to README
- Update theme component import and usage examples
- Update README to remove redundant explanation
- Update installation instructions for local development
- Mark Badge, Image, Link, List, Navbar, and Drawer components as completed in core README
- Remove inspirations section from README

### 🚜 Refactor

- Update CSS variable prefixes to use `--naut-` prefix
- Padding x using spacing-md
- Padding x to using spacing-md
- Rename NautTheme and NautThemeToggle to Theme and ThemeToggle in documentation
- Update GridItem to use dynamic grid-column property instead of a fixed span variable
- Centralize shadow definitions in Theme component and update Card and Image to use global CSS variables
- Remove spacing props and simplify section layout
- Move spacing logic to CSS variables
- Move padding styles to card body
- Replace spacingToStyle with createPadding and createMargin
- Update Card component to use new spacing utility functions
- Simplify Box component spacing implementation
- Replace spacingToStyle with createPadding and createMargin
- Replace spacingToStyle with createMargin and createPadding
- Simplify spacing logic in MasonryItem component
- Rename image-related CSS variable names for clarity
- Remove unused Spacing type and related functions
- Remove unused margin props from Badge component
- Improve Flow component formatting and readability
- Simplify size-related types and reorder exports
- Extract spacing logic to utility functions
- Extract spacing props from Section component
- *(blocks)* Simplify SectionHero component props and imports
- Extract spacing logic to shared utility functions
- Extract spacing logic into reusable utility functions
- Clean up formatting in configuration and style files
- Simplify formatting in tsconfig.json
- Update button color variables to use new color system
- Remove legacy color aliases and unused variables
- Remove unused DisplaySize and Pattern types

### 🎨 Styling

- *(theme)* Refactor dark theme color variables
- *(Title)* Update gradient background handling
- Improve button text color and CSS variable formatting
- Replace hardcoded media queries with clamp() for responsive typography
- Remove dark mode CSS variables from NavBar component
- Apply shadow classes only to non-cover images
- Split padding shorthand into individual properties
- *(title)* Remove bottom margin from title component
- Remove duplicate border color and style declarations
- Remove duplicate base color variable
- Update accordion chevron and border colors to use content color
- Rename color variables to use consistent naming scheme
- Update badge color variables to use content instead of text
- Simplify color variable naming in dark mode
- Adjust neutral color scale and border variables
- Update text color variables to use content color
- Update text selection and dimmed colors to use content variables
- Remove dark theme overrides from Button component
- Remove commented-out CSS variables
- Adjust display spacing values

### ⚙️ Miscellaneous Tasks

- Add biome and ultracite config
- Add VS Code and Zed editor configuration files
- Update Biome configuration
- Move package files to root of blocks package
- Ignore tsconfig.tsbuildinfo files
- Update package.json with new entry points and type definitions
- Add apps directory to workspace packages
- Update tsconfig.json with Astro JSX configuration
- Fixed spacing between blocks
- Remove website application files
- Add path alias and reference to core package
- Disable a11y rule for anchor content
- Format biome.json configuration
- Add screenshot of Naut UI
- Update package versions to 0.1.0
- Set package to private

### 💼 Other

- Update tsconfig with jsx and astro configuration
