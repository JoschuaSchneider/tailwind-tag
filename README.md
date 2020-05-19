# tailwind-tag

---

Generate tailwind classnames using template strings:

```js
const className = tw`
    bg-red-600
    text-red-100
    hover {
        bg-green-600
        text-white
    }
`;

// -> "bg-red-600 text-red-100 hover:bg-green-600 hover:text-white"
```

This is still in an very early stage and will later be used in a styled-components like API to compose tailwindcss components in react.
