import React, {useEffect} from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

function SubscriptionsPage() {
  const history = useHistory();
  const store = useSelector((state) => state)

  useEffect(() => {
    if(store.CurrentUserID === 0) // if no current loged in user
    {
      history.push('/'); // go to log in page
    }
  }, []);

  return <div>
      <h2>Subscriptions:</h2>
  </div>;
}

export default SubscriptionsPage;
