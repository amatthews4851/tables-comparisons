# React Table Comparison

This is a toy application made for the sole purpose to compare the making of two different APIs for making a table in React. These two tables can be viewed at https://amatthews4851.github.io/tables-comparisons/, but spoiler alert, they are pretty similar.

## Props Table

I think this is probably the most common and what comes to mind for a majority of people when the task to come up with an API is, because it is a way to make a simple API for a common, one-size-fits-all table. The main drawback of doing it this way is that it feels a little fragile and inflexible, and is prone to prop-hell if down the line the table needs to have more options. The code for how one might implement this API lives in [src/components/props_table/index.js](./src/components/props_table/index.js), and the code for how an example of how someone might use it lives in [src/props_table_examples](./src/props_table_examples).

## Elements Table

This is an alternative, where instead of a single component with fancy props, it is just a lego kit to build your own table with all the functionality you need. This makes the table as flexible as it can be, while still creating a uniform look and feel. Only drawback is using it feels a little more cumbersome, as you will basically need to create a table from scratch every time. The code for how one might implement this API lives in [src/components/elements_table/index.js](./src/components/elements_table/index.js), and the code for how an example of how someone might use it lives in [src/elements_table_examples](./src/elements_table_examples).
