import axios from 'axios';

const BACKEND_URL = 'https://react-native-course-7e2e8-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const response = axios.get(BACKEND_URL + '/expenses.json');
    
    const expenses = [];

    console.log(response.data)
    for (const key in response.data) {
        const expensesObj = {
            id: key,
            amount: await response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expensesObj);
    }

    return expenses;
}

export async function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json `,expenseData);
}

export async function deleteExpense() {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

/*Now this .json part is fire base specific
has nothing to do
with react native or react or anything like this.
Fire base just wants this .json at the end here
to understand that we're targeting a specific node
in the database. So to say.
Now you can add any segments you want here.
And those segments will be translated as nodes
or to folders you could say in the database.
So this will create an expenses node in this database
which we will see soon.

fetchExpenses
for Firebase, the response we get back

will actually be an object

where these unique IDs will be keys,

so property names in that object,

and if we had multiple expenses,

we would have multiple property names that have this format.

And then we would have nested objects

for these keys, for these unique IDs,

that hold the actual data.

And I wanna transform that data

into an array of objects

where every object has the ID in an ID field,

and the amount, date and description

in other separate fields.

For this, we can create an expenses helper constant,
And those keys will therefore be those IDs.

Now, for every key,

I wanna create a new expense object,

which should be an object, a JavaScript object,

that has an ID field,

which is that key I got here,

and that also has an amount field,

which is response.data

for the given key.amount.

I also want to set my date field,

which should be response.data Key.date.

updateExpense
 don't even need to do anything with the response here.

And therefore, we can actually just return this,

and get rid of async

so that we return the promise return by put.

So that if we would need to work it,

for example, to show a loading spinner,

which we will do later,

we could get hold of the underlying promise

in the component that wants to show the loading spinner.
*/