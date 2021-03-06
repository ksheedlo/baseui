# Spinner

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Spinner} from 'baseui/spinner';

export default () => {
  return
    <Spinner size={36}/>;
};
```

### Advanced usage

```javascript
import * as React from 'react';
import {Spinner} from 'baseui/spinner';

export default () => {
  return
    <Spinner
      overrides={{
        Svg: {
          style: ({$theme}) => ({
            borderRadius: '50%',
            backgroundColor: $theme.colors.primary50,
          }),
        },
      }}
    />;
};
```

## Exports

* `Spinner`
* `StyledSvg`

## `Spinner` API

* `size?: number|string = 44`
  * The size of the circle. Is passed to the underlying svg width/height style. Can also be a baseui
    `theme.sizing` constant like `scale500`.
* `color?: string = theme.colors.primary`
  * The color to be used for the spinner. Is used as an svg fill for the underlying svg icon.
* `title?: string = 'Loading'`
  * Sets the SVG `<title>` label, which is used for accessibility.

 ## Presentational components props API

 These properties are passed to every presentational (styled) component that is exported.

 `StyledSvg`

 * `$size: number | string`
  * Size of svg element.
* `$theme: theme`

## Accessibility

The following attribute is applied to the element: `role="progressbar"`. To learn more check out the [MDN ProgressBar Role] article

[MDN ProgressBar Role]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role
