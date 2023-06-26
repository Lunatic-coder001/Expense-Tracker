import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';

export default function RecentExpenses() {
  const [isFetching, setisFetching] = useState(true);
  const [error, setError] = useState();
  
  const expensesCtx = useContext(ExpensesContext);
  // const [fetchedExpenses, setfetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      setisFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setisFetching(false);
     
    }

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

/*however, one problem we will have

is that if I add a new expense.

So let's say this expense which is all the recent here,

it's not showing up here.

Now it is stored on the backend.

We can see this newly added expense here

but it's not available on the front end.

I need to reload my app to refetch it.

And then it is here, but that is of course not optimal.

Now, why is this happening?

This is happening because the recentExpenses component

actually wasn't removed.

When I manage a new expense

this recent expense component is still in the background,

it's not destroyed,

because we use the Stack Navigator,

and there, if we push a new screen onto that stack

as we're doing it here with the manage expense screen

the old screen.
So the recentExpenses screen here

still runs in the background

no matter if we are on iOS or Android.

On Android we don't see the old screen anymore

but it's also still running in the background.

That means that when we close the managed expense screen

we don't recreate recentExpenses,

instead it was always there.

Hence use a fact doesn't execute again

and therefore we don't fetch again.

Now you might be able to find a workaround

to listen to changes in the navigator,

React Navigation does give you ways of listening

to such changes, but I have a better solution here.

We keep on using context */