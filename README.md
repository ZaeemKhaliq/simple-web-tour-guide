# Simple Web Tour Guide


<img width="540" height="448" alt="simple-web-tour-guide-1" src="https://github.com/user-attachments/assets/2dd3f11a-4584-44fd-b6c9-60f3d1a2b19c" />


A lightweight, framework-agnostic product tour / onboarding guide. Built with the following modern techniques:

- Web Components ([Lit](https://lit.dev/))
- [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning)

A React wrapper is also exported via `@lit/react` for drop-in use in React applications.

Also provides customization possibilities (see [Available Slots](#available-slots), [CSS parts](#styles-customization-with-css-part-selectors) and [Custom States](#custom-states-state-for-conditional-stylings)).

---

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
  - [HTML / Vanilla JS](#html--vanilla-js)
  - [React](#react)
- [Step Content Data Attributes](#step-content-data-attributes)
- [Available Attributes/Props](#available-attributesprops)
- [Available Slots](#available-slots)
- [Styles Customization with CSS `::part()` Selectors](#styles-customization-with-css-part-selectors)
- [CSS Custom Properties](#css-custom-properties)
- [Custom States (`:state()`) for conditional stylings](#custom-states-state-for-conditional-stylings)
- [Custom Events](#custom-events)
- [Keyboard Interactions](#keyboard-interactions)

---

## Installation

```bash
npm install simple-web-tour-guide
```

```js
// registers <simple-tour-guide> and exports the React wrapper
import "simple-web-tour-guide";

// or, import named exports explicitly
import { SimpleTourGuide, SimpleTourGuideReact } from "simple-web-tour-guide";
```

---

## Basic Usage

### HTML / Vanilla JS

Place the `<simple-tour-guide>` element anywhere in your document. Populate it with one or more `slot="step-content"` children — each child is one step. The component is invisible until `is-enabled` is set.

The `data-anchor-element` attribute on a step is the anchor element on main page that the step will be anchored to. The `data-step-heading` attribute is the heading to be rendered for each step. See more details [below](#step-content-data-attributes).

> **Note:** If you don't implement the close event (`simple-tour-guide:on-close`), the popover will not close on anything that is supposed to close it.

```html
<button id="trigger">Start Tour</button>

<!-- Elements to highlight during the tour -->
<header id="site-header">My App Header</header>
<nav id="main-nav">Navigation</nav>

<!-- Tour guide component -->
<simple-tour-guide id="tour">
  <!-- Step 1 -->
  <div
    slot="step-content"
    data-anchor-element="#site-header"
    data-step-heading="Welcome!"
  >
    <p>
      This is the main header of the application. It contains your profile and
      settings.
    </p>
  </div>

  <!-- Step 2 -->
  <div
    slot="step-content"
    data-anchor-element="#main-nav"
    data-step-heading="Navigation"
  >
    <p>Use this menu to move between sections of the app.</p>
  </div>
</simple-tour-guide>

<script>
  const tour = document.getElementById("tour");
  const trigger = document.getElementById("trigger");

  trigger.addEventListener("click", () => {
    tour.setAttribute("is-enabled", "");
  });

  tour.addEventListener("simple-tour-guide:on-close", () => {
    tour.removeAttribute("is-enabled");
  });

  tour.addEventListener("simple-tour-guide:on-done", () => {
    tour.removeAttribute("is-enabled");
  });
</script>
```

### React

The package ships a React wrapper created with `@lit/react`. Event names are mapped to camelCase props.

```tsx
import { useState } from "react";
import { SimpleTourGuideReact } from "simple-web-tour-guide";

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Start Tour</button>

      <SimpleTourGuideReact
        isEnabled={isOpen}
        stepContentHeight="200px"
        stepContentWidth="320px"
        doneLabel="Finish"
        onClose={() => setIsOpen(false)}
        onDone={() => setIsOpen(false)}
        onStepChange={(e) => console.log("step:", e.detail.stepIndex)}
      >
        <div
          slot="step-content"
          data-anchor-element="#header"
          data-step-heading="Header"
        >
          <p>This is step one.</p>
        </div>
        <div
          slot="step-content"
          data-anchor-element="#nav"
          data-step-heading="Nav"
        >
          <p>This is step two.</p>
        </div>
      </SimpleTourGuideReact>
    </>
  );
}
```

---

## Step Content Data Attributes

Each element placed in the `step-content` slot drives one step. Two `data-*` attributes control its behavior:

| Attribute             | Type                | Required | Description                                                                                                                                                                                  |
| --------------------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-anchor-element` | CSS selector string | **Yes**  | Selector for the page element this step should spotlight (e.g. `"#my-button"`, `".feature-card"`). If the element is not found in the document, the entire tour closes and emits `on-close`. |
| `data-step-heading`   | String              | No       | Text displayed in the tour card's header for this step. Falls back to an empty string if omitted.                                                                                            |

---

## Available Attributes/Props

These are the public attributes/properties of the `<simple-tour-guide>` element (decorated with `@property()` in the source). All of them can be set as HTML attributes or as JS properties.

- [`is-enabled`](#is-enabled)
- [`disable-close-on-outside-click`](#disable-close-on-outside-click)
- [`step-content-height`](#step-content-height)
- [`step-content-width`](#step-content-width)
- [`hide-header`](#hide-header)
- [`allow-outside-interaction`](#allow-outside-interaction)
- [`done-label`](#done-label)
- [`overlay-fill-color`](#overlay-fill-color)
- [`dont-hide-back-button-on-first-step`](#dont-hide-back-button-on-first-step)

---

### `is-enabled`

|                 |             |
| --------------- | ----------- |
| **Type**        | `boolean`   |
| **Default**     | `false`     |
| **JS property** | `isEnabled` |

Controls whether the tour guide is active. Setting this to `true` (or adding the attribute) starts the tour from step 0, renders the overlay, and scrolls the first anchor element into view. Removing the attribute (or setting it to `false`) tears down the overlay and resets internal state.

```html
<!-- Start the tour -->
<simple-tour-guide is-enabled>…</simple-tour-guide>

<!-- Stop the tour -->
<simple-tour-guide>…</simple-tour-guide>
```

```js
tour.isEnabled = true; // start
tour.isEnabled = false; // stop
```

> Always reflect the `on-close` and `on-done` events back by removing `is-enabled` — the component emits those events but does not update its own attribute.

---

### `disable-close-on-outside-click`

|                 |                              |
| --------------- | ---------------------------- |
| **Type**        | `boolean`                    |
| **Default**     | `false`                      |
| **JS property** | `disableCloseOnOutsideClick` |

By default, clicking the dimmed overlay backdrop closes the tour. Set this attribute to prevent that behavior and force the user to use the close button or keyboard shortcut instead.

```html
<simple-tour-guide disable-close-on-outside-click>…</simple-tour-guide>
```

---

### `step-content-height`

|                 |                                         |
| --------------- | --------------------------------------- |
| **Type**        | `string` (any valid CSS `height` value) |
| **Default**     | `"170px"`                               |
| **JS property** | `stepContentHeight`                     |

Sets both the `height` and `max-height` of every element in the `step-content` slot. Use this to ensure consistency across steps regardless of content length. If content overflows the set height, it becomes vertically scrollable.

```html
<simple-tour-guide step-content-height="240px">…</simple-tour-guide>
```

---

### `step-content-width`

|                 |                                        |
| --------------- | -------------------------------------- |
| **Type**        | `string` (any valid CSS `width` value) |
| **Default**     | `"288px"`                              |
| **JS property** | `stepContentWidth`                     |

Sets the `width` of every element in the `step-content` slot. This also constrains the `max-width` of the step heading in the header to `calc(<value> - 3rem)` to avoid overflow.

```html
<simple-tour-guide step-content-width="360px">…</simple-tour-guide>
```

---

### `hide-header`

|                 |              |
| --------------- | ------------ |
| **Type**        | `boolean`    |
| **Default**     | `false`      |
| **JS property** | `hideHeader` |

Hides the default `<header>` section that displays the step heading. Use this when you want a header-free card, or when you are providing your own header via the `header` slot.

```html
<simple-tour-guide hide-header>…</simple-tour-guide>
```

---

### `allow-outside-interaction`

|                 |                           |
| --------------- | ------------------------- |
| **Type**        | `boolean`                 |
| **Default**     | `false`                   |
| **JS property** | `allowOutsideInteraction` |

By default the overlay SVG intercepts all pointer events, making page elements behind it not clickable. Setting this attribute switches the overlay to `pointer-events: none`, so users can interact with the page while the tour is running.

```html
<simple-tour-guide allow-outside-interaction>…</simple-tour-guide>
```

---

### `done-label`

|                 |             |
| --------------- | ----------- |
| **Type**        | `string`    |
| **Default**     | `"Done"`    |
| **JS property** | `doneLabel` |

The label text shown on the Next button when the user reaches the final step. On all other steps the button reads "Next".

```html
<simple-tour-guide done-label="Finish">…</simple-tour-guide>
```

---

### `overlay-fill-color`

|                 |                                      |
| --------------- | ------------------------------------ |
| **Type**        | `string` (any valid CSS color value) |
| **Default**     | `"rgba(0,0,0,0.3)"`                  |
| **JS property** | `overlayFillColor`                   |

Controls the fill color of the SVG overlay that dims the page. Accepts any valid CSS color value — hex, RGB, RGBA, HSL, or named colors. Use an RGBA value to keep the overlay translucent so the page content behind the spotlight remains partially visible.

```html
<simple-tour-guide overlay-fill-color="rgba(0,0,0,0.6)">…</simple-tour-guide>
```

---

### `dont-hide-back-button-on-first-step`

|                 |                                 |
| --------------- | ------------------------------- |
| **Type**        | `boolean`                       |
| **Default**     | `false`                         |
| **JS property** | `dontHideBackButtonOnFirstStep` |

By default, the Back button is hidden on the first step since there is no previous step to navigate to. Setting this attribute keeps the Back button visible on the first step instead.

> **Note:** This is purely stylistic. The Back button will still not do anything when clicked on the first step — it is only kept visible so it can be targeted with `::part(step-back-button)` or `:state(on-first-step)` for custom styling (e.g. dimming or disabling it visually).

```html
<simple-tour-guide dont-hide-back-button-on-first-step>…</simple-tour-guide>
```

---

## Available Slots

Slots let you replace entire regions of the tour card with your own markup. Default slot content is used as a fallback when you do not provide a replacement.

- [`header`](#header)
- [`step-content`](#step-content)
- [`close-button`](#close-button)
- [`step-back-button`](#step-back-button)
- [`step-next-button`](#step-next-button)

---

### `header`

Replaces the entire header region of the card. The default header renders a `<header>` element containing the current step's heading text (sourced from `data-step-heading`).

When you supply this slot, the `hide-header` attribute and `data-step-heading` values are ignored for visual rendering — you take full control.

```html
<simple-tour-guide>
  <div slot="header">
    <img src="logo.svg" alt="Logo" />
    <span>Custom Header</span>
  </div>
  <!-- step content -->
</simple-tour-guide>
```

**Default content:** `<header part="header"><p id="tour-guide-step-heading">…</p></header>`

---

### `step-content`

The primary slot. Each **direct child** assigned to this slot is treated as one distinct step. Children are shown and hidden automatically as the user navigates; only the active step is visible at any time.

Each child must carry a `data-anchor-element` attribute pointing to the page element it should spotlight.

```html
<simple-tour-guide>
  <div
    slot="step-content"
    data-anchor-element="#search-bar"
    data-step-heading="Search"
  >
    <p>Use the search bar to find anything quickly.</p>
  </div>
  <div
    slot="step-content"
    data-anchor-element="#user-menu"
    data-step-heading="Your Profile"
  >
    <p>Access your settings and profile here.</p>
  </div>
</simple-tour-guide>
```

**Default content:** none — you must provide your own step children.

---

### `close-button`

Replaces the default close (×) button that sits in the top-right corner of the card.

> **Important:** When you replace this slot, you are responsible for wiring the click handler that fires the close action. Listen to the button's click event and remove the `is-enabled` attribute (or dispatch a method that does so).

```html
<simple-tour-guide>
  <button slot="close-button" id="my-close">✕ Close tour</button>
  <!-- step content -->
</simple-tour-guide>

<script>
  document.getElementById("my-close").addEventListener("click", () => {
    document.querySelector("simple-tour-guide").removeAttribute("is-enabled");
  });
</script>
```

**Default content:** A circular transparent button containing an SVG × icon, with a subtle hover background.

---

### `step-back-button`

Replaces the default "Back" button in the footer. Click events from the slotted element bubble up to the slot and are handled automatically — no manual event wiring needed.

```html
<simple-tour-guide>
  <button slot="step-back-button">← Previous</button>
  <!-- step content -->
</simple-tour-guide>
```

**Default content:** A styled `<button>` labelled "Back" that moves to the previous step (clamped at index `0`).

---

### `step-next-button`

Replaces the default "Next" / "Done" button in the footer. Click events from the slotted element bubble up to the slot and are handled automatically — no manual event wiring needed.

```html
<simple-tour-guide>
  <button slot="step-next-button">Continue →</button>
  <!-- step content -->
</simple-tour-guide>
```

**Default content:** A styled `<button>` labelled "Next" that advances to the next step, or switches to the value of `done-label` (default `"Done"`) on the final step. Clicking "Done" on the last step emits `simple-tour-guide:on-done`.

---

## Styles Customization with CSS `::part()` Selectors

Internal elements that carry a `part` attribute can be styled from outside the shadow DOM using the `::part()` pseudo-element. This is the recommended way to theme the component without overriding global CSS. (See [reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::part))

- [`::part(root-container)`](#partroot-container)
- [`::part(header)`](#partheader)
- [`::part(step-heading)`](#partstep-heading)
- [`::part(close-button)`](#partclose-button)
- [`::part(content-main)`](#partcontent-main)
- [`::part(footer)`](#partfooter)
- [`::part(step-back-button)`](#partstep-back-button)
- [`::part(step-next-button)`](#partstep-next-button)

---

### `::part(root-container)`

The outermost `<div>` wrapping the entire card. Controls card background, border, border-radius, shadow, and overall layout.

```css
simple-tour-guide::part(root-container) {
  background: #1e1e2e;
  border: 1px solid #45475a;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

---

### `::part(header)`

The `<header>` element rendered inside the card (only present when `hide-header` is not set and the `header` slot is not replaced). Use this to style header padding, border, background, or typography.

```css
simple-tour-guide::part(header) {
  background: #313244;
  border-bottom-color: #45475a;
  padding: 0 1rem;
}
```

---

### `::part(step-heading)`

The `<p>` element inside the default header that renders the current step's heading text (sourced from `data-step-heading`). Only present when `hide-header` is not set and the `header` slot is not replaced.

```css
simple-tour-guide::part(step-heading) {
  font-size: 1.25rem;
  color: #cdd6f4;
  letter-spacing: 0.01em;
}
```

---

### `::part(close-button)`

The default close button in the top-right corner of the card.

```css
simple-tour-guide::part(close-button) {
  color: #cdd6f4;
  border-radius: 6px;
}
simple-tour-guide::part(close-button):hover {
  background: rgba(255, 255, 255, 0.1);
}
```

---

### `::part(content-main)`

The `<main>` element that wraps the `step-content` slot and the step-bullet indicator row. Controls vertical spacing between the content area and the bullets.

```css
simple-tour-guide::part(content-main) {
  padding: 0.5rem 0;
}
```

---

### `::part(footer)`

The `<footer>` element containing the Back and Next buttons. Controls layout, padding, and the dividing border.

```css
simple-tour-guide::part(footer) {
  border-top-color: #45475a;
  padding: 10px 12px;
}
```

---

### `::part(step-back-button)`

The default "Back" navigation button.

```css
simple-tour-guide::part(step-back-button) {
  background: transparent;
  border-color: #585b70;
  color: #cdd6f4;
  border-radius: 6px;
}
```

---

### `::part(step-next-button)`

The default "Next" / "Done" navigation button.

```css
simple-tour-guide::part(step-next-button) {
  background: #89b4fa;
  border-color: #89b4fa;
  color: #1e1e2e;
  border-radius: 6px;
  font-weight: 600;
}
```

---

## CSS Custom Properties

The following CSS custom properties are defined on `:host` and can be overridden to theme the component without `::part()`.

| Property                  | Default   | Description                                                                                                                                                           |
| ------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--step-buttons-bg-color` | `#f4f4f4` | Background color for both the Back and Next buttons in their resting state. Hover states derive from this value using `hsl()` relative color syntax (lightness − 5%). |
| `--step-buttons-color`    | `#000000` | Text color for both the Back and Next buttons in their resting state.                                                                                                 |

```css
simple-tour-guide {
  --step-buttons-bg-color: #e0e7ff;
  --step-buttons-color: #000000;
}
```

---

## Custom States (`:state()`) for Conditional Stylings

The component uses the [CustomStateSet API](https://developer.mozilla.org/en-US/docs/Web/API/CustomStateSet) (`ElementInternals.states`) to expose reactive states that consumers can target in CSS using the `:state()` pseudo-class.

> **Browser support:** `:state()` requires a browser with CustomStateSet support (Chrome 90+, Firefox 126+, Safari 17.4+).

- [`on-last-step`](#on-last-step)
- [`on-first-step`](#on-first-step)

---

### `on-last-step`

**Active when:** the user is on the final step of the tour (i.e. `stepIndex === totalSteps - 1`).

**Cleared when:** the user navigates away from the last step.

Use this state to visually distinguish the tour card when it reaches the end — for example, highlighting the Done button or showing a completion message.

```css
/* Make the Next/Done button stand out on the final step */
simple-tour-guide:state(on-last-step)::part(step-next-button) {
  background: #a6e3a1;
  border-color: #a6e3a1;
  font-weight: 700;
}
```

---

### `on-first-step`

**Active when:** the user is on the first step of the tour (step index `0`).

**Cleared when:** the user navigates away from the first step.

Use this state to visually indicate that there is no previous step — for example, dimming the Back button on step 0.

```css
simple-tour-guide:state(on-first-step)::part(step-back-button) {
  opacity: 0.4;
  pointer-events: none;
}
```

---

## Custom Events

All events are emitted as [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) so all the details (if they have any) are included in `detail` field.

All events bubble and are composed (they cross shadow DOM boundaries). Listen for them on the `<simple-tour-guide>` element or any ancestor.

- [`simple-tour-guide:on-close`](#simple-tour-guideon-close)
- [`simple-tour-guide:on-done`](#simple-tour-guideon-done)
- [`simple-tour-guide:on-step-change`](#simple-tour-guideon-step-change)

In `React`, you can simply use the `on*` convention i.e., `onClose`, `onDone` etc.

---

### `simple-tour-guide:on-close`

Fired whenever the tour is dismissed — via the close button, the `Escape` key, clicking the overlay (unless `disable-close-on-outside-click` is set), or when a step's `data-anchor-element` target is not found in the document.

**Detail:** none (`undefined`)

```js
tour.addEventListener("simple-tour-guide:on-close", () => {
  tour.removeAttribute("is-enabled");
});
```

---

### `simple-tour-guide:on-done`

Fired when the user clicks the Next button on the last step (the button labelled with `done-label`).

**Detail:** none (`undefined`)

```js
tour.addEventListener("simple-tour-guide:on-done", () => {
  tour.removeAttribute("is-enabled");
  markOnboardingComplete();
});
```

---

### `simple-tour-guide:on-step-change`

Fired every time the active step index changes — including on tour start (step `0`).

**Detail:**

```ts
{
  stepIndex: number; // Zero-based index of the newly active step
  isFirstStep: boolean; // true when stepIndex === 0
  isLastStep: boolean; // true when stepIndex === totalSteps - 1
}
```

```js
tour.addEventListener("simple-tour-guide:on-step-change", (e) => {
  const { stepIndex, isLastStep } = e.detail;
  console.log(`Now on step ${stepIndex + 1}. Last step: ${isLastStep}`);
});
```

---

## Keyboard Interactions

| Key      | Action                                                       |
| -------- | ------------------------------------------------------------ |
| `Escape` | Closes the tour guide and emits `simple-tour-guide:on-close` |

The root container receives focus automatically when the tour opens (`tabindex="0"`), so keyboard events are captured without additional setup.
