import PickCity from '../PickCity/PickCity';
import ErrorBox from '../ErrorBox/ErrorBox.js';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';

const WeatherBox = () => {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    setPending(true);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=95f750f0d64a8c4be9651f3606767661&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setError(true);
          setPending(false);
        }
      })
      .then((data) => {
        if (!data) return;

        setCity(data.name);
        setTemp(data.main.temp);
        setIcon(data.weather[0].icon);
        setDescription(data.weather[0].main);
        setPending(false);
        setError(false);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {city && !pending && !error && (
        <WeatherSummary
          city={city}
          temp={temp}
          icon={icon}
          description={description}
        />
      )}
      {error && <ErrorBox children={'There is no such city'} />}
      {pending && <Loader />}
    </section>
  );
};

export default WeatherBox;
