import React, { useState } from 'react';
import './App.css';

import Video from '../Video/Video';
import Promo from '../Promo/Promo';

function App() {
	const [data, setData] = useState({
		application: false
	});

	return (
		<div className="App">
			{data.application ? <Promo setData={setData} /> : <Video data={data} setData={setData} />}

		</div>
	);
}

export default App;
