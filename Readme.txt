stack constant will hold an object that gives us access to two components,the navigator component and a component for registering screens.


But I want to make sure that I, in the end, have this ManageExpense screen,which allows us to edit or add expenses which is reachable from
everywhere in this application.And if we are on that screen then I don't wanna see the tabs at the bottom.
On the other hand, I wanna have tabs at the bottom that allow me to switch between all expenses and recent expenses.
And therefore, the setup I choose here is that I will use the Stack.Navigator as a main root navigator here, so to say,and I will add two 
Screens to this stack navigator.One screen is the ManageExpense screen and the other screen is a nested navigator Alternatively, we could 
also set the initial screen option here on the Stack.Navigator.As you can see in the official docs,there you learn that you can set the 
initialRouteName.That's the name of the prop on the Stack.Navigator component to control which route should be loaded initially,

ExpensesSummary reduce fxn
And this function will be executed for every element in expenses.And here that will be the sum that I want to calculate.
And then the second value this inner function will receive automatically,is the current item we're looking at.Because again, this will be
executed for every item in the expenses array.So therefore we will get every item for every execution.And we then get a total value,
which is carried over across those executions to build a final result from all these executions.


FlatList
The offer key extractor also gets the item.However, really the item itself, not some rapper object as it is the case for the render 
expense item function here but the item itself and this function will be called for every data item and we should return the value that 
should be used as a key.And in my case here, that's the ID.Every expense has an ID and this will be unique.

<ExpenseItem>
what we can do here is we can just spread all our item properties into expense item because our items in this array are these dummy items
with ID, description, amount and date.And even though we don't need the ID in expense item,we can still forward it into it and all the 
other properties
</ExpenseItem>


Because no matter if you are on the recent expenses or on the all expenses screen you should have a plus button in the top right corner
that allows you to open this ManageExpense screen.


expensePressHandler
hat you can use the navigation prop
which you receive automatically
in all your screen components to call methods
like the navigate method,
but expense item is not a screen component.
This component is not loaded as a stand-alone
instead it's used inside of some other screen,
but therefore this component
actually doesn't receive the navigation prop
provided by the React Navigation package.

BottomTabNavigation
At the moment we're passing an object to screen options
and very often that is what you will do
but you can actually also pass a function to screen options.
And then just return an object here wrapped in parentheses
to make sure the syntax is not confused
with the function body.
Instead, this is an object returned
in this form of the overall arrow function.
Now, if we use this function form
we return the configuration object
but we also get a couple of parameters
passed into this function automatically by React Navigation
and we can use object destructuring
to get hold of the different properties of that object
that is passed in into this function by React Navigation


expensePressHandler
we need a way of finding out why this screen was opened.
Is it to edit or to add?
And we can utilize one important piece of information
which we need to pass to this screen
if we are editing anyways.
And that's the idea of the expense.


route given by React Native
Now it is possible that we load this screen
without any params.
In that case, params would be undefined
and trying to access a property like this
would cause an error.
We can use this conditional operator
that's built into modern JavaScript
to check if params is undefined,
in which case we don't drill into it.
So this code then is not executed
and this overall instead returns undefined.
If params happens to be defined, if it is an object,
we do drill into it and we do get that expenseId value.
As you learned in the earlier sections though,
you shouldn't call setOptions like this,
directly in the component function,
instead you should wrap it with useEffect
or to avoid that it's flickering initially,
with useLayoutEffect, which is a hook imported from React.


useReducer Now, how does useReducer work?
Well, in the end you have to define another function
outside of this own and function here,
which is the so-called reducer function for this hook.
Therefore, I will name it expensesReducer.
And this is a regular JavaScript function
which will receive the current state
and an action object automatically.
Both values will be provided by React because we connect this function to this hook
in a couple of minutes.
The first element is our expensesState,
so the state that will be managed by this reducer
now made available in this component function.
And the second element here will be a dispatch function
which we can execute to dispatch a new action
to the reducer function,
which is then able to manipulate the state,
which we then get as a new state in this component function,
which will be reevaluated if the state changes automatically
all thanks to React and this hook.
Now to show you how dispatch could be used,
let's add a function inside of this component function
that could be called addExpense.
We will need dysfunction later
because this is the function that should be triggered
when a user clicks Add here in the model.
Now in addExpense, I then expect to get my expenseData,
which will have to shape defined up here.
So an object with description, amount, and date.
And what we can then do in here in addExpense
is we can call dispatch.
So use this dispatch function provided by useReducer.
To dispatch, you can pass an action.
So you can pass a value to dispatch
which will be made available by React
inside of the reducer function as the second parameter.

Axios is a promise-based HTTP client,

which you can use in the browser and also in React Native.

You might notice package already,

I like it a lot because it makes

sending HTTP requests really easy,

and you could use the Fetch API as I mentioned,

but here I will use Axios also to show you

how you can use that third-party API

for sending such requests.
