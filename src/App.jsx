import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [autoCom, setAutoCom] = useState();
  const [inpValue, setInpValue] = useState('');
  const fetchData = async () => {
    const res = await fetch('https://dummyjson.com/recipes');
    const data = await res.json();
    if (data.recipes) {
      setData(data.recipes.map((item) => item.name));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  const handleInputChange = (value) => {
    const result = data.filter((val) =>
      val?.toLowerCase().startsWith(value.toLowerCase())
    );

    setInpValue(value);
    setAutoCom(result);
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <input
          style={{
            // width: '100%',
            // height: '40px',
            // zIndex: 0,
            // inset: 0,
            // position: 'absolute',

            width: '100%',
            height: '40px',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            fontWeight: '600',
          }}
          value={autoCom?.[0]?.toLowerCase() || ''}
        />

        <input
          style={{
            // width: '100%',
            // height: '40px',
            // zIndex: 1,
            // inset: 0,
            // position: 'absolute',
            // opacity: 0.5,
            // fontSize: '20px',
            width: '100%',
            height: '40px',
            zIndex: 1,
            inset: 0,
            opacity: 0.5,
            fontWeight: '600',
          }}
          value={inpValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Tab') {
              setInpValue(autoCom[0]?.toLowerCase());
            }
          }}
        />
      </div>
      {autoCom?.length ? (
        <div style={{ border: '1px solid black', marginTop: '50px' }}>
          {autoCom?.map((item, i) => {
            return (
              <p key={i}>
                {i + 1}. {item}
              </p>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
